import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { todayInSaoPaulo } from "@/lib/daily-news";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Seções do Banco de Notícias e as buscas correspondentes no Google News.
// "when:2d" limita às últimas 48h. Ajuste as queries livremente.
const SECTIONS: { title: string; query: string }[] = [
  {
    title: "Camarotes e hospitality",
    query: 'camarote OR hospitality (estádio OR futebol OR esporte) when:2d',
  },
  {
    title: "Grandes eventos e ingressos",
    query:
      'ingressos ("Fórmula 1" OR "Copa do Mundo" OR "Champions League" OR NBA OR "Grand Slam") when:2d',
  },
  {
    title: "Experiências premium e turismo esportivo",
    query: '"turismo esportivo" OR "experiência VIP" OR "pacote de viagem" esporte when:2d',
  },
  {
    title: "Mercado, marcas e patrocínios",
    query: '"patrocínio esportivo" OR "sports business" OR naming rights when:2d',
  },
];

const MAX_ITEMS_PER_SECTION = 5;

type NewsItem = { title: string; link: string; source: string; pubDate: string };

function decodeEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

/** Extrai itens do XML do RSS do Google News (sem dependências). */
function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const get = (tag: string) => {
      const t = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      return t ? decodeEntities(t[1]) : "";
    };
    let title = get("title");
    const source = get("source");
    // Google News costuma sufixar " - Fonte" no título; remove se redundante
    if (source && title.endsWith(` - ${source}`)) {
      title = title.slice(0, -(source.length + 3)).trim();
    }
    const link = get("link");
    if (title && link) {
      items.push({ title, link, source: source || "Google News", pubDate: get("pubDate") });
    }
  }
  return items;
}

async function fetchSection(query: string): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=pt-BR&gl=BR&ceid=BR:pt-150`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (BluePandaNewsBot)" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google News RSS ${res.status}`);
  return parseRss(await res.text());
}

function buildMarkdown(sections: { title: string; items: NewsItem[] }[]): string {
  const parts: string[] = [];
  for (const { title, items } of sections) {
    parts.push(`### ${title}`);
    if (items.length === 0) {
      parts.push("- Sem novidades relevantes nas últimas 48h.");
    } else {
      for (const item of items) {
        parts.push(`- **${item.title}** ([${item.source}](${item.link}))`);
      }
    }
    parts.push("");
  }
  return parts.join("\n").trim();
}

export async function GET(request: NextRequest) {
  // Segurança: valida o header enviado pelo cron da Vercel
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayInSaoPaulo();
  const seen = new Set<string>();
  const sections: { title: string; items: NewsItem[] }[] = [];

  for (const section of SECTIONS) {
    let items: NewsItem[] = [];
    try {
      items = await fetchSection(section.query);
    } catch (err) {
      console.error(`[fetch-daily-news] falha na seção "${section.title}":`, err);
    }
    const deduped: NewsItem[] = [];
    for (const item of items) {
      const key = item.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
      if (deduped.length >= MAX_ITEMS_PER_SECTION) break;
    }
    sections.push({ title: section.title, items: deduped });
  }

  const total = sections.reduce((n, s) => n + s.items.length, 0);
  if (total === 0) {
    // Nada coletado (provável falha de rede): não grava, e o envio das 08:00 manda alerta
    return NextResponse.json({ saved: false, reason: "no-items", date: today }, { status: 502 });
  }

  const contentMd = buildMarkdown(sections);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("daily_news")
    .upsert({ news_date: today, content_md: contentMd }, { onConflict: "news_date" });

  if (error) {
    console.error("[fetch-daily-news] Supabase error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ saved: true, date: today, items: total });
}

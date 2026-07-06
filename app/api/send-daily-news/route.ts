import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { dailyNewsToEmailHtml, todayInSaoPaulo } from "@/lib/daily-news";

export const dynamic = "force-dynamic";

// Enquanto bluepandatravel.com.br não estiver verificado no Resend, use um domínio verificado via EMAIL_FROM
const FROM = process.env.EMAIL_FROM ?? "Blue Panda Travel <news@brasilsportsbusiness.com>";
// Aceita múltiplos destinatários separados por vírgula
const TO = (process.env.DAILY_NEWS_TO ?? "agenciazebrapubli@gmail.com,brunoleoguilherme@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

export async function GET(request: NextRequest) {
  // Segurança: valida o header enviado pelo cron da Vercel
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayInSaoPaulo();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("daily_news")
    .select("id, news_date, content_md, sent_at")
    .eq("news_date", today)
    .maybeSingle();

  if (error) {
    console.error("[send-daily-news] Supabase error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Sem conteúdo para hoje: envia alerta curto, nunca e-mail vazio/antigo
  if (!data) {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `⚠️ Banco de Notícias — atualização de ${today} não encontrada`,
      html: `<p style="font-family:sans-serif;font-size:14px;">A atualização diária do Banco de Notícias para <strong>${today}</strong> não foi encontrada no banco de dados até o horário do envio (08:00 BRT). Verifique se o cron de coleta das 07:15 rodou corretamente.</p>`,
    });
    return NextResponse.json({ sent: false, reason: "no-content", date: today });
  }

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Banco de Notícias Premium — ${today}`,
    html: dailyNewsToEmailHtml(today, data.content_md),
  });

  if (sendError) {
    console.error("[send-daily-news] Resend error:", sendError);
    return NextResponse.json({ error: "Email send failed" }, { status: 502 });
  }

  await supabase
    .from("daily_news")
    .update({ sent_at: new Date().toISOString() })
    .eq("id", data.id);

  return NextResponse.json({ sent: true, date: today });
}

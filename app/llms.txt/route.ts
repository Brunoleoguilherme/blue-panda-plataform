import { getPublishedEvents } from "@/lib/events";

export const revalidate = 3600;

const BASE = "https://www.bluepandatravel.com.br";

// /llms.txt — resumo estruturado da Blue Panda para modelos de IA (ChatGPT, Claude, etc.)
export async function GET() {
  const events = await getPublishedEvents();

  const lines = [
    "# Blue Panda Travel",
    "",
    "> A Blue Panda Travel é uma empresa brasileira especializada em experiências e viagens para os maiores eventos esportivos do mundo — NFL, Fórmula 1, Champions League, NBA, Grand Slams de tênis e flag football. Oferece pacotes premium completos com ingressos, hospedagem, transfer, hospitalidade e atendimento bilíngue dedicado.",
    "",
    "## Contato",
    `- Site: ${BASE}`,
    "- E-mail: contato@bluepandatravel.com.br",
    "- WhatsApp: +55 11 94044-0078",
    "- Instagram: @bluepanda.travel",
    "",
    "## Páginas principais",
    `- Eventos: ${BASE}/eventos`,
    `- Experiências: ${BASE}/experiencias`,
    `- Destinos: ${BASE}/destinos`,
    `- Sobre: ${BASE}/sobre`,
    `- Contato: ${BASE}/contato`,
    "",
    "## Próximos eventos",
    ...events.map(
      (e) =>
        `- ${e.title}${e.subtitle ? ` — ${e.subtitle}` : ""} (${e.location}, ${e.country}${e.date ? `, ${e.date}` : ""}): ${BASE}/eventos/${e.slug}`
    ),
    "",
    "## Como comprar",
    "O cliente escolhe o evento e fala com a equipe pelo formulário de contato ou WhatsApp; a Blue Panda monta um pacote personalizado (ingressos + hospedagem + transfer + hospitalidade).",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

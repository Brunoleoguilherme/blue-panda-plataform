import type { MetadataRoute } from "next";

const BASE = "https://www.bluepandatravel.com.br";

// Liberamos explicitamente os robôs de IA (ChatGPT, Claude, Perplexity, Google-Extended)
// para que a Blue Panda possa ser encontrada e citada nessas ferramentas.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/cliente", "/api/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

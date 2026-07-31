import type { MetadataRoute } from "next";
import { getPublishedEventSlugs } from "@/lib/events";

const BASE = "https://www.bluepandatravel.com.br";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/eventos", priority: 0.9 },
    { path: "/experiencias", priority: 0.8 },
    { path: "/destinos", priority: 0.8 },
    { path: "/sobre", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/contato", priority: 0.7 },
    { path: "/termos", priority: 0.2 },
    { path: "/privacidade", priority: 0.2 },
    { path: "/lgpd", priority: 0.2 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority,
  }));

  const slugs = await getPublishedEventSlugs();
  const eventRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/eventos/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}

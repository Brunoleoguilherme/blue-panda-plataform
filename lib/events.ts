import { createPublicClient } from "@/lib/supabase/public";
import type { Event } from "@/types";

type EventRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  event_date: string | null;
  location: string | null;
  country: string | null;
  category: Event["category"];
  cover_image: string | null;
  featured: boolean;
  status: Event["status"];
  created_at: string;
  updated_at: string;
};

function mapEvent(r: EventRow): Event {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle ?? "",
    description: r.description ?? "",
    date: r.event_date ?? "",
    location: r.location ?? "",
    country: r.country ?? "",
    category: r.category,
    coverImage: r.cover_image ?? "/images/og-image.jpg",
    featured: r.featured,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

/** Todos os eventos publicados, destaques primeiro, por data. */
export async function getPublishedEvents(): Promise<Event[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("event_date", { ascending: true });

  if (error) {
    console.error("[events] getPublishedEvents:", error.message);
    return [];
  }
  return (data as EventRow[]).map(mapEvent);
}

/** Um evento publicado pelo slug (ou null). */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapEvent(data as EventRow);
}

/** Slugs publicados (para sitemap e generateStaticParams). */
export async function getPublishedEventSlugs(): Promise<string[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("events")
    .select("slug")
    .eq("published", true);

  if (error || !data) return [];
  return data.map((r) => r.slug as string);
}

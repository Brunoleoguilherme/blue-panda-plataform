import { createClient } from "@/lib/supabase/server";
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
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminEvent = Event & { published: boolean };

function mapEvent(r: EventRow): AdminEvent {
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
    coverImage: r.cover_image ?? "",
    featured: r.featured,
    status: r.status,
    published: r.published,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

/** Todos os eventos (inclui rascunhos) — só admin, via RLS. */
export async function getAllEventsAdmin(): Promise<AdminEvent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error || !data) return [];
  return (data as EventRow[]).map(mapEvent);
}

/** Um evento por id (inclui rascunho) — para edição no admin. */
export async function getEventByIdAdmin(id: string): Promise<AdminEvent | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapEvent(data as EventRow);
}

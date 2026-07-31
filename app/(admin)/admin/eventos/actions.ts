"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role =
    (user?.app_metadata as { role?: string } | undefined)?.role ??
    (user?.user_metadata as { role?: string } | undefined)?.role;

  if (!user || role !== "admin") {
    return { supabase: null };
  }
  return { supabase };
}

const schema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .min(1, "Slug obrigatório")
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens"),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  event_date: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  category: z.enum(["futebol", "formula1", "nfl", "nba", "tenis", "flag", "outros"]),
  cover_image: z.string().optional(),
  status: z.enum(["open", "soldout", "soon"]),
  featured: z.boolean(),
  published: z.boolean(),
});

function revalidateAll() {
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
}

export async function saveEvent(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) return;

  const raw = {
    id: (formData.get("id") as string) || undefined,
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    event_date: String(formData.get("event_date") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
    category: String(formData.get("category") ?? "outros"),
    cover_image: String(formData.get("cover_image") ?? "").trim(),
    status: String(formData.get("status") ?? "open"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return;

  const { id, ...v } = parsed.data;
  const payload = {
    slug: v.slug,
    title: v.title,
    subtitle: v.subtitle || null,
    description: v.description || null,
    event_date: v.event_date || null,
    location: v.location || null,
    country: v.country || null,
    category: v.category,
    cover_image: v.cover_image || null,
    status: v.status,
    featured: v.featured,
    published: v.published,
  };

  if (id) {
    await supabase.from("events").update(payload).eq("id", id);
  } else {
    await supabase.from("events").insert(payload);
  }

  revalidateAll();
  redirect("/admin/eventos");
}

export async function deleteEvent(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) return;

  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("events").delete().eq("id", id);

  revalidateAll();
  redirect("/admin/eventos");
}

export async function togglePublished(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) return;

  const id = String(formData.get("id") ?? "");
  const current = formData.get("current") === "true";
  if (id) await supabase.from("events").update({ published: !current }).eq("id", id);

  revalidateAll();
  redirect("/admin/eventos");
}

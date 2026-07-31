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
  if (!user || role !== "admin") return { supabase: null };
  return { supabase };
}

const schema = z.object({
  id: z.string().optional(),
  profile_id: z.string().optional(),
  event_id: z.string().optional(),
  status: z.enum(["pendente", "confirmada", "paga", "concluida", "cancelada"]),
  total_amount: z.number().min(0),
  paid_amount: z.number().min(0),
  pax: z.number().int().min(1),
  travel_date: z.string().optional(),
  notes: z.string().optional(),
});

function num(v: FormDataEntryValue | null): number {
  const n = parseFloat(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export async function saveReserva(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) return;

  const raw = {
    id: (formData.get("id") as string) || undefined,
    profile_id: (formData.get("profile_id") as string) || undefined,
    event_id: (formData.get("event_id") as string) || undefined,
    status: String(formData.get("status") ?? "pendente"),
    total_amount: num(formData.get("total_amount")),
    paid_amount: num(formData.get("paid_amount")),
    pax: Math.max(1, Math.round(num(formData.get("pax")))),
    travel_date: String(formData.get("travel_date") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return;
  const v = parsed.data;

  // Snapshot do cliente e do evento
  let customer_name = "";
  let customer_email: string | null = null;
  let event_title: string | null = null;

  if (v.profile_id) {
    const { data: prof } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", v.profile_id)
      .maybeSingle();
    customer_name = prof?.full_name ?? "";
    customer_email = prof?.email ?? null;
  }
  if (v.event_id) {
    const { data: ev } = await supabase
      .from("events")
      .select("title")
      .eq("id", v.event_id)
      .maybeSingle();
    event_title = ev?.title ?? null;
  }

  const payload = {
    profile_id: v.profile_id || null,
    event_id: v.event_id || null,
    customer_name,
    customer_email,
    event_title,
    status: v.status,
    total_amount: v.total_amount,
    paid_amount: v.paid_amount,
    pax: v.pax,
    travel_date: v.travel_date || null,
    notes: v.notes || null,
  };

  if (v.id) {
    await supabase.from("reservas").update(payload).eq("id", v.id);
  } else {
    await supabase.from("reservas").insert(payload);
  }

  revalidatePath("/admin/reservas");
  revalidatePath("/cliente");
  revalidatePath("/cliente/experiencias");
  revalidatePath("/cliente/pagamentos");
  redirect("/admin/reservas");
}

export async function deleteReserva(formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!supabase) return;
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("reservas").delete().eq("id", id);
  revalidatePath("/admin/reservas");
  redirect("/admin/reservas");
}

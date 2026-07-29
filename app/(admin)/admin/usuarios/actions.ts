"use server";

import { revalidatePath } from "next/cache";
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

export async function approveUser(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireAdmin();
  if (!supabase) return;

  await supabase.from("profiles").update({ active: true }).eq("id", id);
  revalidatePath("/admin/usuarios");
}

export async function deactivateUser(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireAdmin();
  if (!supabase) return;

  await supabase.from("profiles").update({ active: false }).eq("id", id);
  revalidatePath("/admin/usuarios");
}

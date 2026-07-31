import { createClient } from "@/lib/supabase/server";

export type Cliente = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  active: boolean;
  createdAt: string;
  reservasCount: number;
  totalGasto: number;
  totalPago: number;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getClientesComStats(): Promise<Cliente[]> {
  const supabase = await createClient();
  const [profilesRes, reservasRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, phone, role, active, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("reservas").select("profile_id, total_amount, paid_amount, status"),
  ]);

  const profiles = profilesRes.data ?? [];
  const reservas = reservasRes.data ?? [];

  const stats = new Map<string, { count: number; gasto: number; pago: number }>();
  for (const r of reservas as any[]) {
    if (!r.profile_id) continue;
    const cur = stats.get(r.profile_id) ?? { count: 0, gasto: 0, pago: 0 };
    cur.count += 1;
    if (r.status !== "cancelada") cur.gasto += Number(r.total_amount ?? 0);
    cur.pago += Number(r.paid_amount ?? 0);
    stats.set(r.profile_id, cur);
  }

  return (profiles as any[])
    .map((p) => {
      const s = stats.get(p.id) ?? { count: 0, gasto: 0, pago: 0 };
      return {
        id: p.id,
        fullName: p.full_name ?? "",
        email: p.email,
        phone: p.phone ?? null,
        role: p.role,
        active: p.active,
        createdAt: p.created_at,
        reservasCount: s.count,
        totalGasto: s.gasto,
        totalPago: s.pago,
      };
    })
    .filter((c) => c.role === "consulta" || c.reservasCount > 0);
}

export type ClienteReserva = {
  id: string;
  code: string;
  status: string;
  totalAmount: number;
  paidAmount: number;
  pax: number;
  travelDate: string | null;
  eventTitle: string | null;
};

export type ClienteDetalhe = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: string;
  active: boolean;
  createdAt: string;
  reservas: ClienteReserva[];
};

export async function getClienteById(id: string): Promise<ClienteDetalhe | null> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, active, created_at")
    .eq("id", id)
    .maybeSingle();
  if (!profile) return null;

  const { data: reservas } = await supabase
    .from("reservas")
    .select(
      "id, code, status, total_amount, paid_amount, pax, travel_date, event_title, event:events(title)"
    )
    .eq("profile_id", id)
    .order("created_at", { ascending: false });

  const mapped: ClienteReserva[] = ((reservas ?? []) as any[]).map((r) => {
    const ev = Array.isArray(r.event) ? r.event[0] : r.event;
    return {
      id: r.id,
      code: r.code,
      status: r.status,
      totalAmount: Number(r.total_amount ?? 0),
      paidAmount: Number(r.paid_amount ?? 0),
      pax: Number(r.pax ?? 1),
      travelDate: r.travel_date ?? null,
      eventTitle: ev?.title ?? r.event_title ?? null,
    };
  });

  return {
    id: profile.id,
    fullName: profile.full_name ?? "",
    email: profile.email,
    phone: profile.phone ?? null,
    role: profile.role,
    active: profile.active,
    createdAt: profile.created_at,
    reservas: mapped,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

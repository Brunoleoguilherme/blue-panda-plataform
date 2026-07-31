import { createClient } from "@/lib/supabase/server";

export type ReservaStatus =
  | "pendente"
  | "confirmada"
  | "paga"
  | "concluida"
  | "cancelada";

export type Reserva = {
  id: string;
  code: string;
  profileId: string | null;
  eventId: string | null;
  customerName: string;
  customerEmail: string | null;
  eventTitle: string | null;
  status: ReservaStatus;
  totalAmount: number;
  paidAmount: number;
  pax: number;
  travelDate: string | null;
  notes: string | null;
  createdAt: string;
  event: {
    title: string;
    location: string | null;
    country: string | null;
    date: string | null;
    coverImage: string | null;
    slug: string;
  } | null;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapReserva(r: any): Reserva {
  const ev = Array.isArray(r.event) ? r.event[0] : r.event;
  return {
    id: r.id,
    code: r.code,
    profileId: r.profile_id ?? null,
    eventId: r.event_id ?? null,
    customerName: r.customer_name ?? "",
    customerEmail: r.customer_email ?? null,
    eventTitle: r.event_title ?? null,
    status: r.status,
    totalAmount: Number(r.total_amount ?? 0),
    paidAmount: Number(r.paid_amount ?? 0),
    pax: Number(r.pax ?? 1),
    travelDate: r.travel_date ?? null,
    notes: r.notes ?? null,
    createdAt: r.created_at,
    event: ev
      ? {
          title: ev.title,
          location: ev.location ?? null,
          country: ev.country ?? null,
          date: ev.event_date ?? null,
          coverImage: ev.cover_image ?? null,
          slug: ev.slug,
        }
      : null,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const SELECT =
  "id, code, profile_id, event_id, customer_name, customer_email, event_title, status, total_amount, paid_amount, pax, travel_date, notes, created_at, event:events(title, location, country, event_date, cover_image, slug)";

/** Reservas do cliente logado (RLS filtra por profile_id = auth.uid()). */
export async function getMyReservas(): Promise<Reserva[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("reservas")
    .select(SELECT)
    .eq("profile_id", user.id)
    .order("travel_date", { ascending: true, nullsFirst: false });

  if (error || !data) return [];
  return data.map(mapReserva);
}

/** Todas as reservas (admin). */
export async function getAllReservasAdmin(): Promise<Reserva[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservas")
    .select(SELECT)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapReserva);
}

export async function getReservaByIdAdmin(id: string): Promise<Reserva | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservas")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapReserva(data);
}

export type ClientOption = { id: string; full_name: string | null; email: string };
export type EventOption = { id: string; title: string };

export async function getClientsForSelect(): Promise<ClientOption[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .order("full_name", { ascending: true });
  return (data as ClientOption[]) ?? [];
}

export async function getEventsForSelect(): Promise<EventOption[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("id, title")
    .order("event_date", { ascending: true });
  return (data as EventOption[]) ?? [];
}

export const statusMeta: Record<
  ReservaStatus,
  { label: string; cls: string }
> = {
  pendente: {
    label: "Pendente",
    cls: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  confirmada: {
    label: "Confirmada",
    cls: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  paga: {
    label: "Paga",
    cls: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  concluida: {
    label: "Concluída",
    cls: "text-white/60 bg-white/5 border-white/10",
  },
  cancelada: {
    label: "Cancelada",
    cls: "text-red-400 bg-red-500/10 border-red-500/20",
  },
};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

import { createClient } from "@/lib/supabase/server";
import type { Reserva, ReservaStatus } from "@/lib/reservas";

export type FinanceTotals = {
  totalVendido: number;
  recebido: number;
  aReceber: number;
  ticketMedio: number;
  reservasAtivas: number;
};

const ATIVA = (r: Reserva) => r.status !== "cancelada";

export function computeTotals(reservas: Reserva[]): FinanceTotals {
  const ativas = reservas.filter(ATIVA);
  const totalVendido = ativas.reduce((s, r) => s + r.totalAmount, 0);
  const recebido = reservas.reduce((s, r) => s + r.paidAmount, 0);
  const aReceber = Math.max(0, totalVendido - recebido);
  const ticketMedio = ativas.length ? totalVendido / ativas.length : 0;
  return {
    totalVendido,
    recebido,
    aReceber,
    ticketMedio,
    reservasAtivas: ativas.length,
  };
}

export function reservasAbertas(reservas: Reserva[]): number {
  return reservas.filter((r) =>
    ["pendente", "confirmada", "paga"].includes(r.status)
  ).length;
}

export function revenueByMonth(
  reservas: Reserva[],
  months = 6
): { label: string; total: number }[] {
  const now = new Date();
  const buckets: { key: string; label: string; total: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("pt-BR", { month: "short" });
    buckets.push({ key, label, total: 0 });
  }
  for (const r of reservas) {
    if (!ATIVA(r)) continue;
    const d = new Date(r.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const b = buckets.find((x) => x.key === key);
    if (b) b.total += r.totalAmount;
  }
  return buckets.map((b) => ({ label: b.label, total: b.total }));
}

export function byStatus(
  reservas: Reserva[]
): { status: ReservaStatus; count: number; total: number }[] {
  const all: ReservaStatus[] = [
    "pendente",
    "confirmada",
    "paga",
    "concluida",
    "cancelada",
  ];
  return all
    .map((status) => {
      const rs = reservas.filter((r) => r.status === status);
      return {
        status,
        count: rs.length,
        total: rs.reduce((a, r) => a + r.totalAmount, 0),
      };
    })
    .filter((x) => x.count > 0);
}

export function byEvent(
  reservas: Reserva[]
): { title: string; count: number; total: number }[] {
  const map = new Map<string, { title: string; count: number; total: number }>();
  for (const r of reservas) {
    if (!ATIVA(r)) continue;
    const title = r.event?.title ?? r.eventTitle ?? "Sem evento";
    const cur = map.get(title) ?? { title, count: 0, total: 0 };
    cur.count += 1;
    cur.total += r.totalAmount;
    map.set(title, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

/** Contagem de clientes (perfis com papel de cliente). */
export async function getClientesCount(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "consulta");
  return count ?? 0;
}

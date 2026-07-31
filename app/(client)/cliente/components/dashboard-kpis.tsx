import { CreditCard, FileText, Plane, Calendar } from "lucide-react";
import { formatBRL, type Reserva } from "@/lib/reservas";

function shortDate(iso: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  } catch {
    return iso;
  }
}

export function DashboardKpis({ reservas }: { reservas: Reserva[] }) {
  const ativas = reservas.filter((r) => r.status !== "cancelada");
  const next = ativas[0] ?? null;
  const totalDevido = ativas.reduce((s, r) => s + r.totalAmount, 0);
  const totalPago = ativas.reduce((s, r) => s + r.paidAmount, 0);
  const restante = Math.max(0, totalDevido - totalPago);

  const proximoData = next ? shortDate(next.travelDate ?? next.event?.date ?? null) : null;

  const kpis = [
    {
      icon: Calendar,
      label: "Próximo evento",
      color: "text-gold",
      bg: "bg-gold/10 border-gold/20",
      value: proximoData ?? "—",
      hint: next
        ? next.event?.title ?? next.eventTitle ?? "Experiência"
        : "Sem dados ainda",
    },
    {
      icon: CreditCard,
      label: "Pagamento",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      value: totalDevido > 0 ? formatBRL(restante) : "—",
      hint: totalDevido > 0 ? "Saldo a pagar" : "Sem dados ainda",
    },
    {
      icon: FileText,
      label: "Experiências",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      value: ativas.length > 0 ? String(ativas.length) : "—",
      hint: ativas.length > 0 ? "Reservas ativas" : "Sem dados ainda",
    },
    {
      icon: Plane,
      label: "Total pago",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      value: totalDevido > 0 ? formatBRL(totalPago) : "—",
      hint: totalDevido > 0 ? "Já quitado" : "Sem dados ainda",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const hasData = kpi.value !== "—";
        return (
          <div
            key={kpi.label}
            className={`p-5 rounded-xl border bg-navy/30 ${kpi.bg}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <kpi.icon size={15} className={kpi.color} />
              <span className="text-xs text-white/40 font-medium">
                {kpi.label}
              </span>
            </div>
            <p
              className={`text-xl font-bold ${hasData ? "text-white" : "text-white/30"}`}
            >
              {kpi.value}
            </p>
            <p className="text-xs text-white/30 mt-0.5 truncate">{kpi.hint}</p>
          </div>
        );
      })}
    </div>
  );
}

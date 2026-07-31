import { TrendingUp, Wallet, Clock, Receipt } from "lucide-react";
import { getAllReservasAdmin, statusMeta, formatBRL } from "@/lib/reservas";
import {
  computeTotals,
  revenueByMonth,
  byStatus,
  byEvent,
} from "@/lib/finance";
import { AdminRevenueChart } from "../components/admin-revenue-chart";

export const dynamic = "force-dynamic";

export default async function FinanceiroPage() {
  const reservas = await getAllReservasAdmin();
  const t = computeTotals(reservas);
  const statuses = byStatus(reservas);
  const eventos = byEvent(reservas);

  const cards = [
    {
      icon: TrendingUp,
      label: "Total vendido",
      value: formatBRL(t.totalVendido),
      color: "text-gold",
      bg: "bg-gold/10 border-gold/15",
    },
    {
      icon: Wallet,
      label: "Recebido",
      value: formatBRL(t.recebido),
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/15",
    },
    {
      icon: Clock,
      label: "A receber",
      value: formatBRL(t.aReceber),
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/15",
    },
    {
      icon: Receipt,
      label: "Ticket médio",
      value: formatBRL(t.ticketMedio),
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/15",
    },
  ];

  const hasData = reservas.length > 0;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Financeiro</h1>
        <p className="text-white/35 text-sm">
          Receitas, despesas e resultado da operação. Os valores vêm das reservas
          automaticamente.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`p-5 rounded-xl border ${c.bg}`}>
            <c.icon size={16} className={`${c.color} mb-3`} />
            <p className="text-xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Gráfico mensal */}
      <AdminRevenueChart data={revenueByMonth(reservas)} />

      {!hasData ? null : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Por status */}
          <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
            <h2 className="text-sm font-bold text-white mb-4">Por status</h2>
            <div className="space-y-3">
              {statuses.map((s) => {
                const meta = statusMeta[s.status];
                return (
                  <div
                    key={s.status}
                    className="flex items-center justify-between gap-3"
                  >
                    <span
                      className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${meta.cls}`}
                    >
                      {meta.label}
                    </span>
                    <span className="text-xs text-white/40">
                      {s.count} {s.count === 1 ? "reserva" : "reservas"}
                    </span>
                    <span className="text-sm font-semibold text-white ml-auto">
                      {formatBRL(s.total)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Por evento */}
          <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
            <h2 className="text-sm font-bold text-white mb-4">Por evento</h2>
            <div className="space-y-3">
              {eventos.map((e) => (
                <div
                  key={e.title}
                  className="flex items-center justify-between gap-3"
                >
                  <p className="text-sm text-white/80 truncate">{e.title}</p>
                  <span className="text-xs text-white/30 whitespace-nowrap">
                    {e.count}x
                  </span>
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    {formatBRL(e.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

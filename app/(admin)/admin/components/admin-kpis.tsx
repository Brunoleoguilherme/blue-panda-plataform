import { Users, CalendarDays, TrendingUp, BookOpen } from "lucide-react";
import { formatBRL } from "@/lib/reservas";

export function AdminKpis({
  clientes,
  eventosAtivos,
  reservasAbertas,
  recebido,
}: {
  clientes: number;
  eventosAtivos: number;
  reservasAbertas: number;
  recebido: number;
}) {
  const kpis = [
    {
      icon: Users,
      label: "Total de Clientes",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/15",
      value: String(clientes),
    },
    {
      icon: CalendarDays,
      label: "Eventos Ativos",
      color: "text-gold",
      bg: "bg-gold/10 border-gold/15",
      value: String(eventosAtivos),
    },
    {
      icon: BookOpen,
      label: "Reservas Abertas",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/15",
      value: String(reservasAbertas),
    },
    {
      icon: TrendingUp,
      label: "Recebido",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/15",
      value: formatBRL(recebido),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className={`p-5 rounded-xl border ${kpi.bg}`}>
          <div className="flex items-center justify-between mb-3">
            <kpi.icon size={16} className={kpi.color} />
          </div>
          <p className="text-2xl font-bold text-white">{kpi.value}</p>
          <p className="text-xs text-white/40 mt-0.5">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}

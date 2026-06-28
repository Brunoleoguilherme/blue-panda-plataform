import { Users, CalendarDays, TrendingUp, BookOpen, ArrowUpRight, ArrowDownRight } from "lucide-react";

const kpis = [
  {
    icon: Users,
    label: "Total de Clientes",
    value: "312",
    delta: "+18 este mês",
    trend: "up",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/15",
  },
  {
    icon: CalendarDays,
    label: "Eventos Ativos",
    value: "6",
    delta: "2 vendendo agora",
    trend: "up",
    color: "text-gold",
    bg: "bg-gold/10 border-gold/15",
  },
  {
    icon: BookOpen,
    label: "Reservas Abertas",
    value: "47",
    delta: "+5 hoje",
    trend: "up",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/15",
  },
  {
    icon: TrendingUp,
    label: "Receita (mês)",
    value: "R$ 284k",
    delta: "+12% vs mês anterior",
    trend: "up",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/15",
  },
];

export function AdminKpis() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`p-5 rounded-xl border ${kpi.bg} hover:scale-[1.01] transition-transform`}
        >
          <div className="flex items-center justify-between mb-3">
            <kpi.icon size={16} className={kpi.color} />
            {kpi.trend === "up" ? (
              <ArrowUpRight size={14} className="text-green-400" />
            ) : (
              <ArrowDownRight size={14} className="text-red-400" />
            )}
          </div>
          <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          <p className="text-xs text-white/40 mt-0.5">{kpi.label}</p>
          <p className="text-[11px] text-white/20 mt-1">{kpi.delta}</p>
        </div>
      ))}
    </div>
  );
}

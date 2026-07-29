import { Users, CalendarDays, TrendingUp, BookOpen } from "lucide-react";

const kpis = [
  { icon: Users, label: "Total de Clientes", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/15" },
  { icon: CalendarDays, label: "Eventos Ativos", color: "text-gold", bg: "bg-gold/10 border-gold/15" },
  { icon: BookOpen, label: "Reservas Abertas", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/15" },
  { icon: TrendingUp, label: "Receita (mês)", color: "text-green-400", bg: "bg-green-500/10 border-green-500/15" },
];

export function AdminKpis() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className={`p-5 rounded-xl border ${kpi.bg}`}>
          <div className="flex items-center justify-between mb-3">
            <kpi.icon size={16} className={kpi.color} />
          </div>
          <p className="text-2xl font-bold text-white/30">—</p>
          <p className="text-xs text-white/40 mt-0.5">{kpi.label}</p>
          <p className="text-[11px] text-white/20 mt-1">Sem dados ainda</p>
        </div>
      ))}
    </div>
  );
}

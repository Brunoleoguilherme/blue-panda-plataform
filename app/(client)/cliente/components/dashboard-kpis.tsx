"use client";

import React from "react";
import { CreditCard, FileText, Plane, Calendar } from "lucide-react";

const kpis = [
  {
    icon: Calendar,
    label: "Próximo evento",
    value: "35 dias",
    sub: "NFL Brasil 2026",
    color: "text-gold",
    bg: "bg-gold/10 border-gold/20",
  },
  {
    icon: CreditCard,
    label: "Pagamento",
    value: "80%",
    sub: "R$ 4.000 restantes",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: FileText,
    label: "Documentação",
    value: "Completa",
    sub: "Todos os docs ok",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Plane,
    label: "Transfer",
    value: "Confirmado",
    sub: "Ida e volta",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

export function DashboardKpis() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className={`p-5 rounded-xl border bg-navy/30 ${kpi.bg} transition-all hover:scale-[1.01]`}
        >
          <div className="flex items-center gap-2 mb-3">
            <kpi.icon size={15} className={kpi.color} />
            <span className="text-xs text-white/40 font-medium">{kpi.label}</span>
          </div>
          <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
          <p className="text-xs text-white/30 mt-0.5">{kpi.sub}</p>
        </div>
      ))}
    </div>
  );
}

import { BarChart3 } from "lucide-react";

export function AdminRevenueChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6 h-full">
      <h2 className="text-sm font-bold text-white mb-6">Receita mensal</h2>
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <BarChart3 size={22} className="text-white/20 mb-3" />
        <p className="text-sm text-white/40">Sem dados de receita ainda</p>
        <p className="text-xs text-white/25 mt-1">
          O gráfico será preenchido quando o financeiro estiver conectado.
        </p>
      </div>
    </div>
  );
}

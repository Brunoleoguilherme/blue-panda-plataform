import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from "lucide-react";

const meses = [
  { mes: "Janeiro", receita: 180000, despesas: 42000, lucro: 138000 },
  { mes: "Fevereiro", receita: 210000, despesas: 51000, lucro: 159000 },
  { mes: "Março", receita: 195000, despesas: 48000, lucro: 147000 },
  { mes: "Abril", receita: 240000, despesas: 55000, lucro: 185000 },
  { mes: "Maio", receita: 220000, despesas: 50000, lucro: 170000 },
  { mes: "Junho", receita: 284000, despesas: 63000, lucro: 221000 },
];

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

const totalReceita = meses.reduce((a, m) => a + m.receita, 0);
const totalLucro = meses.reduce((a, m) => a + m.lucro, 0);
const totalDespesas = meses.reduce((a, m) => a + m.despesas, 0);
const margem = Math.round((totalLucro / totalReceita) * 100);

export default function FinanceiroPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Financeiro</h1>
        <p className="text-white/35 text-sm">Receita, despesas e margem — 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita total", value: fmt(totalReceita), icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10 border-green-500/15" },
          { label: "Despesas totais", value: fmt(totalDespesas), icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10 border-red-500/15" },
          { label: "Lucro líquido", value: fmt(totalLucro), icon: DollarSign, color: "text-gold", bg: "bg-gold/10 border-gold/15" },
          { label: "Margem de lucro", value: `${margem}%`, icon: ArrowUpRight, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/15" },
        ].map((k) => (
          <div key={k.label} className={`p-5 rounded-xl border ${k.bg}`}>
            <k.icon size={16} className={`${k.color} mb-3`} />
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-white/35 mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Resultado mensal</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Mês", "Receita", "Despesas", "Lucro líquido", "Margem"].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-6 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {meses.map((m) => {
              const mg = Math.round((m.lucro / m.receita) * 100);
              return (
                <tr key={m.mes} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-white">{m.mes}</td>
                  <td className="px-6 py-4 text-sm text-green-400 font-semibold">{fmt(m.receita)}</td>
                  <td className="px-6 py-4 text-sm text-red-400">{fmt(m.despesas)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gold">{fmt(m.lucro)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold/60 rounded-full" style={{ width: `${mg}%` }} />
                      </div>
                      <span className="text-xs text-white/40">{mg}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

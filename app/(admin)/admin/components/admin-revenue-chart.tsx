import { BarChart3 } from "lucide-react";
import { formatBRL } from "@/lib/reservas";

function compact(v: number): string {
  if (v >= 1000) return `${Math.round(v / 1000)}k`;
  return String(Math.round(v));
}

export function AdminRevenueChart({
  data,
}: {
  data: { label: string; total: number }[];
}) {
  const max = Math.max(...data.map((d) => d.total), 1);
  const hasData = data.some((d) => d.total > 0);

  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6 h-full">
      <h2 className="text-sm font-bold text-white mb-6">Receita mensal</h2>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <BarChart3 size={22} className="text-white/20 mb-3" />
          <p className="text-sm text-white/40">Sem receita registrada ainda</p>
          <p className="text-xs text-white/25 mt-1">
            Os valores aparecem aqui conforme você registra reservas.
          </p>
        </div>
      ) : (
        <div className="flex items-end gap-3 h-44">
          {data.map((d, i) => {
            const h = Math.round((d.total / max) * 100);
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
              >
                <span className="text-[10px] font-semibold text-white/50">
                  {d.total > 0 ? compact(d.total) : ""}
                </span>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-gold/40 to-gold min-h-[2px] transition-all"
                  style={{ height: `${h}%` }}
                  title={formatBRL(d.total)}
                />
                <span className="text-xs text-white/40 capitalize">
                  {d.label.replace(".", "")}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

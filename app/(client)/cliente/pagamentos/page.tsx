import { CreditCard } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getMyReservas, statusMeta, formatBRL } from "@/lib/reservas";

export const dynamic = "force-dynamic";

export default async function PagamentosPage() {
  const reservas = await getMyReservas();
  const comValor = reservas.filter((r) => r.totalAmount > 0);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Pagamentos</h1>
        <p className="text-white/40 text-sm">
          Acompanhe suas parcelas e comprovantes.
        </p>
      </div>

      {comValor.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Nenhum pagamento registrado"
          description="Quando sua experiência for confirmada, o plano de pagamento aparecerá aqui."
        />
      ) : (
        <div className="space-y-3">
          {comValor.map((r) => {
            const st = statusMeta[r.status];
            const restante = Math.max(0, r.totalAmount - r.paidAmount);
            const pct =
              r.totalAmount > 0
                ? Math.min(100, Math.round((r.paidAmount / r.totalAmount) * 100))
                : 0;
            const title = r.event?.title ?? r.eventTitle ?? "Experiência Blue Panda";
            return (
              <div
                key={r.id}
                className="rounded-xl border border-white/5 bg-navy/20 p-5"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-white/25">{r.code}</span>
                    <h2 className="text-sm font-bold text-white">{title}</h2>
                    <span
                      className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${st.cls}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatBRL(r.totalAmount)}
                  </p>
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-gold rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-400">
                    Pago: {formatBRL(r.paidAmount)}
                  </span>
                  <span className="text-white/40">
                    Restante: {formatBRL(restante)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

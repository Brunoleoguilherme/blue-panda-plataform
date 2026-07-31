import Link from "next/link";
import { BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getAllReservasAdmin, statusMeta, formatBRL } from "@/lib/reservas";
import { deleteReserva } from "./actions";

export const dynamic = "force-dynamic";

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
  } catch {
    return iso;
  }
}

export default async function ReservasAdminPage() {
  const reservas = await getAllReservasAdmin();

  const totalVendido = reservas
    .filter((r) => r.status !== "cancelada")
    .reduce((s, r) => s + r.totalAmount, 0);
  const totalRecebido = reservas.reduce((s, r) => s + r.paidAmount, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Reservas</h1>
          <p className="text-white/35 text-sm">
            Gerencie as reservas dos clientes. O cliente vê a própria reserva na
            área dele.
          </p>
        </div>
        <Link
          href="/admin/reservas/nova"
          className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors"
        >
          <Plus size={13} /> Nova reserva
        </Link>
      </div>

      {reservas.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhuma reserva registrada"
          description="Clique em “Nova reserva” para registrar a primeira."
        />
      ) : (
        <>
          {/* Resumo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Reservas ativas</p>
              <p className="text-xl font-bold text-white mt-1">
                {reservas.filter((r) => r.status !== "cancelada").length}
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Total vendido</p>
              <p className="text-xl font-bold text-gold mt-1">
                {formatBRL(totalVendido)}
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Recebido</p>
              <p className="text-xl font-bold text-green-400 mt-1">
                {formatBRL(totalRecebido)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden divide-y divide-white/5">
            {reservas.map((r) => {
              const st = statusMeta[r.status];
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-white/30">
                        {r.code}
                      </span>
                      <p className="text-sm font-semibold text-white truncate">
                        {r.customerName || "—"}
                      </p>
                      <span
                        className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-white/30 mt-0.5 truncate">
                      {r.event?.title ?? r.eventTitle ?? "Sem evento"} ·{" "}
                      {fmtDate(r.travelDate)} · {r.pax} pax
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {formatBRL(r.totalAmount)}
                      </p>
                      <p className="text-[11px] text-white/30">
                        pago {formatBRL(r.paidAmount)}
                      </p>
                    </div>
                    <Link
                      href={`/admin/reservas/${r.id}`}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-btn border border-white/10 text-white/60 text-xs font-semibold hover:text-gold hover:border-gold/30 transition-colors"
                    >
                      <Pencil size={13} /> Editar
                    </Link>
                    <form action={deleteReserva}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        title="Excluir"
                        className="flex items-center justify-center h-8 w-8 rounded-btn border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/40 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

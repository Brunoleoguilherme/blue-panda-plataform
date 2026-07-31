import Link from "next/link";
import { BookOpen } from "lucide-react";
import { statusMeta, formatBRL, type Reserva } from "@/lib/reservas";

export function AdminRecentBookings({ reservas }: { reservas: Reserva[] }) {
  const recent = reservas.slice(0, 6);

  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h2 className="text-sm font-bold text-white">Reservas recentes</h2>
        <Link
          href="/admin/reservas"
          className="text-xs text-gold hover:text-gold-light transition-colors"
        >
          Ver todas →
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen size={22} className="text-white/20 mb-3" />
          <p className="text-sm text-white/40">Nenhuma reserva ainda</p>
          <p className="text-xs text-white/25 mt-1">
            Registre a primeira em Reservas → Nova reserva.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {recent.map((r) => {
            const st = statusMeta[r.status];
            return (
              <Link
                key={r.id}
                href={`/admin/reservas/${r.id}`}
                className="flex items-center justify-between gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-white/30">
                      {r.code}
                    </span>
                    <p className="text-sm font-semibold text-white truncate">
                      {r.customerName || "—"}
                    </p>
                  </div>
                  <p className="text-xs text-white/30 truncate">
                    {r.event?.title ?? r.eventTitle ?? "Sem evento"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${st.cls}`}
                  >
                    {st.label}
                  </span>
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    {formatBRL(r.totalAmount)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

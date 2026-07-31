import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { AdminEvent } from "@/lib/events-admin";

const statusLabel: Record<string, { label: string; cls: string }> = {
  open: { label: "Vagas abertas", cls: "text-green-400" },
  soon: { label: "Em breve", cls: "text-white/40" },
  soldout: { label: "Esgotado", cls: "text-red-400" },
};

export function AdminEventosStatus({ events }: { events: AdminEvent[] }) {
  const published = events.filter((e) => e.published).slice(0, 6);

  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold text-white">Eventos</h2>
        <Link
          href="/admin/eventos"
          className="text-xs text-gold hover:text-gold-light transition-colors"
        >
          Gerenciar →
        </Link>
      </div>

      {published.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CalendarDays size={22} className="text-white/20 mb-3" />
          <p className="text-sm text-white/40">Nenhum evento publicado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {published.map((e) => {
            const st = statusLabel[e.status] ?? statusLabel.soon;
            return (
              <div key={e.id} className="flex items-center justify-between gap-3">
                <p className="text-sm text-white/80 truncate">{e.title}</p>
                <span className={`text-xs font-semibold whitespace-nowrap ${st.cls}`}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

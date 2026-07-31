import Link from "next/link";
import { Sparkles, MapPin, CalendarDays, Users } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getMyReservas, statusMeta } from "@/lib/reservas";

export const dynamic = "force-dynamic";

function fmt(iso: string | null) {
  if (!iso) return "Data a definir";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function ExperienciasPage() {
  const reservas = await getMyReservas();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Minhas experiências</h1>
        <p className="text-white/40 text-sm">
          Acompanhe as viagens e eventos que você contratou.
        </p>
      </div>

      {reservas.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Você ainda não tem experiências"
          description="Quando você fechar uma experiência com a Blue Panda, ela aparecerá aqui com todos os detalhes."
          action={
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-btn bg-gradient-gold text-midnight text-sm font-bold hover:brightness-110 transition-all"
            >
              Explorar eventos
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {reservas.map((r) => {
            const st = statusMeta[r.status];
            const title = r.event?.title ?? r.eventTitle ?? "Experiência Blue Panda";
            const local = r.event
              ? [r.event.location, r.event.country].filter(Boolean).join(", ")
              : "";
            return (
              <div
                key={r.id}
                className="rounded-xl border border-white/5 bg-navy/20 p-5 flex items-start justify-between gap-4 flex-wrap"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="text-base font-bold text-white">{title}</h2>
                    <span
                      className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${st.cls}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} /> {fmt(r.travelDate ?? r.event?.date ?? null)}
                    </span>
                    {local && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} /> {local}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Users size={12} /> {r.pax} {r.pax === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-white/25">{r.code}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { CalendarClock, MapPin, Users } from "lucide-react";
import { statusMeta, type Reserva } from "@/lib/reservas";

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

export function DashboardHero({ reserva }: { reserva: Reserva | null }) {
  if (!reserva) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-navy/20">
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[180px]">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <CalendarClock size={22} className="text-gold/60" />
          </div>
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">
            Sua próxima experiência
          </p>
          <h2 className="text-lg font-bold text-white mb-1">
            Nenhuma experiência agendada
          </h2>
          <p className="text-white/40 text-sm max-w-md">
            Assim que sua reserva for confirmada pela nossa equipe, os detalhes da
            viagem aparecerão aqui.
          </p>
        </div>
      </div>
    );
  }

  const st = statusMeta[reserva.status];
  const title = reserva.event?.title ?? reserva.eventTitle ?? "Experiência Blue Panda";
  const local = reserva.event
    ? [reserva.event.location, reserva.event.country].filter(Boolean).join(", ")
    : "";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-navy/40 to-navy/10">
      <div className="p-7">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest">
            Sua próxima experiência
          </p>
          <span
            className={`text-[10px] font-bold rounded border px-2 py-0.5 uppercase tracking-wider ${st.cls}`}
          >
            {st.label}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

        <div className="flex items-center gap-5 text-sm text-white/50 flex-wrap">
          <span className="flex items-center gap-2">
            <CalendarClock size={15} className="text-gold/70" />
            {fmt(reserva.travelDate ?? reserva.event?.date ?? null)}
          </span>
          {local && (
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-gold/70" /> {local}
            </span>
          )}
          <span className="flex items-center gap-2">
            <Users size={15} className="text-gold/70" /> {reserva.pax}{" "}
            {reserva.pax === 1 ? "pessoa" : "pessoas"}
          </span>
        </div>

        <p className="text-[11px] font-mono text-white/25 mt-5">
          Reserva {reserva.code}
        </p>
      </div>
    </div>
  );
}

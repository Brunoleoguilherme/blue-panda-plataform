import { CalendarClock } from "lucide-react";

export function DashboardHero() {
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

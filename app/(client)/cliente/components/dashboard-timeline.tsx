import { Clock } from "lucide-react";

export function DashboardTimeline() {
  return (
    <div className="rounded-xl border border-white/5 bg-navy/20 p-6">
      <h3 className="text-sm font-bold text-white mb-6">Linha do tempo</h3>
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Clock size={22} className="text-white/20 mb-3" />
        <p className="text-sm text-white/40">Ainda não há etapas registradas</p>
        <p className="text-xs text-white/25 mt-1">
          O acompanhamento da sua experiência aparecerá aqui.
        </p>
      </div>
    </div>
  );
}

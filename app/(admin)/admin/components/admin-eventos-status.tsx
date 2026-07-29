import { CalendarDays } from "lucide-react";

export function AdminEventosStatus() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
      <h2 className="text-sm font-bold text-white mb-5">Eventos — Vagas</h2>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CalendarDays size={22} className="text-white/20 mb-3" />
        <p className="text-sm text-white/40">Nenhum evento cadastrado</p>
      </div>
    </div>
  );
}

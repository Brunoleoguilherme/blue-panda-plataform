import { BookOpen } from "lucide-react";

export function AdminRecentBookings() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h2 className="text-sm font-bold text-white">Reservas recentes</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen size={22} className="text-white/20 mb-3" />
        <p className="text-sm text-white/40">Nenhuma reserva ainda</p>
        <p className="text-xs text-white/25 mt-1">
          As reservas aparecerão aqui quando o módulo for ativado.
        </p>
      </div>
    </div>
  );
}

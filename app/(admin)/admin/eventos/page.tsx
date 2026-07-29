import { CalendarDays, Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function EventosAdminPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Eventos</h1>
          <p className="text-white/35 text-sm">
            Gerencie os eventos e experiências oferecidos.
          </p>
        </div>
        <button
          disabled
          title="Em breve"
          className="flex items-center gap-2 h-9 px-4 rounded-btn bg-white/5 text-white/30 text-xs font-bold cursor-not-allowed"
        >
          <Plus size={13} /> Novo evento
          <span className="text-[10px] font-semibold text-white/25 bg-white/5 rounded px-1.5 py-0.5">
            em breve
          </span>
        </button>
      </div>

      <EmptyState
        icon={CalendarDays}
        title="Nenhum evento cadastrado"
        description="Os eventos aparecerão aqui quando o módulo estiver ativado."
      />
    </div>
  );
}

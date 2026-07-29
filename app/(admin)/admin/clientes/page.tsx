import { Users, Plus, Download } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function ClientesAdminPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Clientes</h1>
          <p className="text-white/35 text-sm">
            Gerencie os clientes da plataforma.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled
            title="Em breve"
            className="flex items-center gap-2 h-9 px-4 rounded-btn border border-white/10 text-white/30 text-xs font-bold cursor-not-allowed"
          >
            <Download size={13} /> Exportar
          </button>
          <button
            disabled
            title="Em breve"
            className="flex items-center gap-2 h-9 px-4 rounded-btn bg-white/5 text-white/30 text-xs font-bold cursor-not-allowed"
          >
            <Plus size={13} /> Novo cliente
            <span className="text-[10px] font-semibold text-white/25 bg-white/5 rounded px-1.5 py-0.5">
              em breve
            </span>
          </button>
        </div>
      </div>

      <EmptyState
        icon={Users}
        title="Nenhum cliente cadastrado"
        description="A lista de clientes aparecerá aqui quando o módulo estiver conectado ao banco."
      />
    </div>
  );
}

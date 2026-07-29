import { Megaphone, Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function MarketingAdminPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Marketing</h1>
          <p className="text-white/35 text-sm">
            Campanhas e comunicação com a base de clientes.
          </p>
        </div>
        <button
          disabled
          title="Em breve"
          className="flex items-center gap-2 h-9 px-4 rounded-btn bg-white/5 text-white/30 text-xs font-bold cursor-not-allowed"
        >
          <Plus size={13} /> Nova campanha
          <span className="text-[10px] font-semibold text-white/25 bg-white/5 rounded px-1.5 py-0.5">
            em breve
          </span>
        </button>
      </div>

      <EmptyState
        icon={Megaphone}
        title="Nenhuma campanha criada"
        description="O envio de campanhas por e-mail será ativado com a integração real de disparo."
      />
    </div>
  );
}

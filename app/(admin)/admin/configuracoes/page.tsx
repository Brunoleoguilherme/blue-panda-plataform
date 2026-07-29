import { Settings } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function ConfiguracoesAdminPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Configurações</h1>
        <p className="text-white/35 text-sm">
          Preferências e dados da plataforma.
        </p>
      </div>

      <EmptyState
        icon={Settings}
        title="Configurações em breve"
        description="Esta área será ativada quando definirmos quais ajustes ficam sob seu controle."
      />
    </div>
  );
}

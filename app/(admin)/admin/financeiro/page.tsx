import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function FinanceiroAdminPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Financeiro</h1>
        <p className="text-white/35 text-sm">
          Receitas, despesas e resultado da operação.
        </p>
      </div>

      <EmptyState
        icon={Wallet}
        title="Nenhum lançamento financeiro"
        description="Receitas e despesas aparecerão aqui quando o financeiro estiver conectado."
      />
    </div>
  );
}

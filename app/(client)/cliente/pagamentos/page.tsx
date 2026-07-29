import { CreditCard } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function PagamentosPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Pagamentos</h1>
        <p className="text-white/40 text-sm">
          Acompanhe suas parcelas e comprovantes.
        </p>
      </div>

      <EmptyState
        icon={CreditCard}
        title="Nenhum pagamento registrado"
        description="Quando sua experiência for confirmada, o plano de pagamento e os comprovantes aparecerão aqui."
      />
    </div>
  );
}

import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function DocumentosPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Documentos</h1>
        <p className="text-white/40 text-sm">
          Seus documentos de viagem em um só lugar.
        </p>
      </div>

      <EmptyState
        icon={FileText}
        title="Nenhum documento disponível"
        description="Assim que sua experiência for confirmada, os documentos (vouchers, ingressos, contratos) aparecerão aqui para download."
      />
    </div>
  );
}

import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function ReservasAdminPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Reservas</h1>
        <p className="text-white/35 text-sm">
          Acompanhe as reservas dos clientes.
        </p>
      </div>

      <EmptyState
        icon={BookOpen}
        title="Nenhuma reserva registrada"
        description="As reservas aparecerão aqui quando o módulo estiver conectado."
      />
    </div>
  );
}

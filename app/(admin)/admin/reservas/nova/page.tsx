import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReservaForm } from "../reserva-form";

export const dynamic = "force-dynamic";

export default function NovaReservaPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/admin/reservas"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft size={13} /> Voltar para Reservas
        </Link>
        <h1 className="text-2xl font-bold text-white">Nova reserva</h1>
        <p className="text-white/35 text-sm mt-1">
          Vincule um cliente a um evento e defina valores e status.
        </p>
      </div>

      <ReservaForm />
    </div>
  );
}

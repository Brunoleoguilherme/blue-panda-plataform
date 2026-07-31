import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReservaByIdAdmin } from "@/lib/reservas";
import { ReservaForm } from "../reserva-form";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarReservaPage({ params }: Props) {
  const { id } = await params;
  const reserva = await getReservaByIdAdmin(id);
  if (!reserva) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/admin/reservas"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft size={13} /> Voltar para Reservas
        </Link>
        <h1 className="text-2xl font-bold text-white">Editar reserva</h1>
        <p className="text-white/35 text-sm mt-1">
          {reserva.code} · {reserva.customerName || "—"}
        </p>
      </div>

      <ReservaForm reserva={reserva} />
    </div>
  );
}

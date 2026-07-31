import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getEventByIdAdmin } from "@/lib/events-admin";
import { EventForm } from "../event-form";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarEventoPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventByIdAdmin(id);
  if (!event) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/admin/eventos"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft size={13} /> Voltar para Eventos
        </Link>
        <h1 className="text-2xl font-bold text-white">Editar evento</h1>
        <p className="text-white/35 text-sm mt-1">{event.title}</p>
      </div>

      <EventForm event={event} />
    </div>
  );
}

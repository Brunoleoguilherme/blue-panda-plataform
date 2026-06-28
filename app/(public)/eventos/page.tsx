import type { Metadata } from "next";
import { EventsClient } from "./events-client";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Explore todos os eventos esportivos premium disponíveis. NFL, Fórmula 1, Champions League, NBA e muito mais.",
};

export default function EventsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-eventos.jpg')" }} />
        <div className="absolute inset-0 bg-midnight/80" />
        <div className="container-bp relative z-10">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Próximas experiências
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">Eventos</h1>
          <p className="text-white/50 text-lg max-w-xl">
            Selecione a experiência que deseja viver. Nossa equipe cuidará de
            cada detalhe para você.
          </p>
        </div>
      </div>

      <EventsClient />
    </>
  );
}

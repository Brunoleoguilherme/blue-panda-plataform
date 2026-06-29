import type { Metadata } from "next";
import { DestinosClient } from "./destinos-client";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Destinos",
  description:
    "Explore os destinos internacionais da Blue Panda. De São Paulo a Mônaco, de Nova York a Dubai — experiências premium em todo o mundo.",
};

export default function DestinosPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-destinos.jpg')" }}
        />
        <div className="absolute inset-0 bg-midnight/75" />
        <div className="container-bp relative z-10">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Explorando o mundo
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 max-w-xl">
            Os destinos que definem
            <br />
            <span className="text-gold-gradient">sua próxima experiência premium.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Da América à Europa, levamos você aos maiores eventos do mundo com a curadoria e o cuidado de quem pensa em cada detalhe para que seu próximo destino seja ainda melhor.
          </p>
        </div>
      </div>

      <DestinosClient />
      <CtaSection />
    </>
  );
}

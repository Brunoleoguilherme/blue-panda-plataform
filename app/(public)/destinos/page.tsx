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
      <div className="relative pt-40 pb-20 bg-[#060f22] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/4 rounded-full blur-[150px] pointer-events-none" />
        <div className="container-bp relative z-10">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Onde estamos
          </p>
          <h1 className="text-5xl font-bold text-white mb-4 max-w-xl">
            Os destinos que
            <br />
            <span className="text-gold-gradient">definem experiências.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg leading-relaxed">
            Da América à Europa, levamos você aos maiores eventos esportivos
            do mundo com organização, conforto e atendimento premium.
          </p>
        </div>
      </div>

      <DestinosClient />
      <CtaSection />
    </>
  );
}

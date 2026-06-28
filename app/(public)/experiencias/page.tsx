import type { Metadata } from "next";
import { ExperienciasHero } from "./experiencias-hero";
import { ExperienciasGrid } from "./experiencias-grid";
import { ExperienciasJourney } from "./experiencias-journey";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Experiências",
  description:
    "Descubra como é viver um Super Bowl, uma final da Champions League ou o Grande Prêmio de Mônaco. A Blue Panda transforma eventos em memórias.",
};

export default function ExperienciasPage() {
  return (
    <>
      <ExperienciasHero />
      <ExperienciasGrid />
      <ExperienciasJourney />
      <CtaSection />
    </>
  );
}

import type { Metadata } from "next";
import { SobreHero } from "./sobre-hero";
import { SobreManifesto } from "./sobre-manifesto";
import { SobreValores } from "./sobre-valores";
import { SobreNumeros } from "./sobre-numeros";
import { SobreEquipe } from "./sobre-equipe";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Blue Panda — a plataforma de experiências esportivas premium que transforma grandes eventos em memórias inesquecíveis.",
};

export default function SobrePage() {
  return (
    <>
      <SobreHero />
      <SobreManifesto />
      <SobreNumeros />
      <SobreValores />
      <SobreEquipe />
      <CtaSection />
    </>
  );
}

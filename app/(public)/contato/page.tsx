import type { Metadata } from "next";
import { ContatoForm } from "./contato-form";
import { ContatoInfo } from "./contato-info";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe Blue Panda e planeje sua próxima experiência esportiva internacional. Respondemos em até 2 horas.",
};

export default function ContatoPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-36 pb-16 bg-[#060f22] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-bp relative z-10">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Vamos conversar
          </p>
          <h1 className="text-5xl font-bold text-white mb-4">
            Planeje sua
            <br />
            <span className="text-gold-gradient">próxima experiência.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg leading-relaxed">
            Nossa equipe está pronta para criar um pacote exclusivo para você.
            Sem compromisso. Respondemos em até 2 horas.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section bg-midnight">
        <div className="container-bp">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <ContatoForm />
            </div>
            {/* Info — 2 cols */}
            <div className="lg:col-span-2">
              <ContatoInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LGPD",
  description: "Conformidade com a LGPD — Blue Panda Travel.",
};

export default function LgpdPage() {
  return (
    <div className="pt-40 pb-20 bg-midnight min-h-screen">
      <div className="container-bp max-w-3xl">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-10">LGPD</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/60 leading-relaxed">
          <p>A Blue Panda Travel está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
          <p>Seus dados pessoais são coletados exclusivamente para a prestação dos serviços contratados e não são compartilhados com terceiros sem seu consentimento.</p>
          <p>Para exercer seus direitos como titular de dados ou esclarecer dúvidas, entre em contato: <a href="mailto:contato@bluepandatravel.com.br" className="text-gold hover:underline">contato@bluepandatravel.com.br</a>.</p>
        </div>
      </div>
    </div>
  );
}

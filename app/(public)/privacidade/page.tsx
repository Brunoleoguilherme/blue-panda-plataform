import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade da Blue Panda Travel.",
};

export default function PrivacidadePage() {
  return (
    <div className="pt-40 pb-20 bg-midnight min-h-screen">
      <div className="container-bp max-w-3xl">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-10">Política de Privacidade</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-white/60 leading-relaxed">
          <p>Em breve publicaremos nossa política completa de privacidade.</p>
          <p>A Blue Panda Travel trata seus dados com total segurança e em conformidade com a LGPD (Lei Geral de Proteção de Dados).</p>
          <p>Para dúvidas, entre em contato pelo WhatsApp <a href="https://wa.me/5511940440078" className="text-gold hover:underline">+55 (11) 94044-0078</a> ou pelo e-mail <a href="mailto:contato@bluepandatravel.com.br" className="text-gold hover:underline">contato@bluepandatravel.com.br</a>.</p>
        </div>
      </div>
    </div>
  );
}

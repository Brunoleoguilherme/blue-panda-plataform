import { Mail } from "lucide-react";

export default function SuportePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Suporte</h1>
        <p className="text-white/40 text-sm">
          Nossa equipe está disponível para ajudar você.
        </p>
      </div>

      <a
        href="mailto:contato@bluepandatravel.com.br"
        className="flex items-center gap-4 p-6 rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all hover:scale-[1.01] max-w-md"
      >
        <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
          <Mail size={20} className="text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Fale por e-mail</p>
          <p className="text-xs text-white/40 mt-0.5">
            contato@bluepandatravel.com.br
          </p>
          <span className="text-xs font-semibold text-blue-400">
            Enviar e-mail →
          </span>
        </div>
      </a>

      <div className="rounded-xl border border-white/5 bg-navy/20 p-6">
        <p className="text-sm text-white/50 leading-relaxed">
          Precisa de ajuda com sua experiência? Escreva para o e-mail acima com o
          máximo de detalhes e nossa equipe responde o quanto antes. Em breve
          você poderá abrir chamados diretamente por aqui.
        </p>
      </div>
    </div>
  );
}

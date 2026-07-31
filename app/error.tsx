"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registra o erro para diagnóstico (aparece nos logs da Vercel).
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <Image
          src="/images/logo.png"
          alt="Blue Panda Travel"
          width={140}
          height={49}
          className="h-16 w-auto object-contain mx-auto mb-10"
          priority
        />

        <p className="text-xs font-semibold text-gold uppercase tracking-[0.3em] mb-4">
          Algo saiu do lugar
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Não conseguimos carregar esta parte
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10">
          Tivemos um problema momentâneo ao exibir este conteúdo. Tentar de novo
          costuma resolver. Se continuar, fale com a nossa equipe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RefreshCw size={16} /> Tentar novamente
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home size={16} /> Voltar para o início
            </Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 text-[11px] text-white/20 font-mono">
            Código do erro: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}

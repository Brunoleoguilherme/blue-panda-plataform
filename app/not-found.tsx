import Link from "next/link";
import Image from "next/image";
import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center relative overflow-hidden px-6">
      {/* Fundo sutil */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />

      <div className="relative z-10 max-w-md text-center">
        <Image
          src="/images/logo.png"
          alt="Blue Panda Travel"
          width={140}
          height={49}
          className="h-16 w-auto object-contain mx-auto mb-10"
          priority
        />

        <p className="text-xs font-semibold text-gold uppercase tracking-[0.3em] mb-4">
          Erro 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Não encontramos esta página
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10">
          O endereço pode ter mudado de lugar ou a página não existe mais. Vamos
          te levar de volta para o começo da jornada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home size={16} /> Voltar para o início
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
            <Link href="/experiencias">
              <Compass size={16} /> Ver experiências
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

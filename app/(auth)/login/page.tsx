import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { User, ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta Blue Panda",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;
  const isEquipe = area === "equipe";
  const variant: "cliente" | "admin" = isEquipe ? "admin" : "cliente";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Blue Panda Travel"
            width={200}
            height={70}
            className="h-32 w-auto object-contain"
            priority
          />
        </div>

        {/* Card único (Cliente OU Equipe, conforme a área escolhida no topo) */}
        <div
          className={`rounded-2xl border ${
            isEquipe ? "border-gold/30" : "border-white/10"
          } bg-midnight/80 backdrop-blur-xl shadow-2xl px-7 py-8 flex flex-col`}
        >
          <div className="mb-6">
            <div
              className={`w-11 h-11 rounded-xl ${
                isEquipe ? "bg-gold/15" : "bg-white/10"
              } flex items-center justify-center mb-4`}
            >
              {isEquipe ? (
                <ShieldCheck size={20} className="text-gold" />
              ) : (
                <User size={20} className="text-white" />
              )}
            </div>
            <p
              className={`text-[11px] font-semibold ${
                isEquipe ? "text-gold" : "text-white/40"
              } uppercase tracking-widest mb-1`}
            >
              {isEquipe ? "Área da Equipe" : "Área do Cliente"}
            </p>
            <h2 className="text-xl font-bold text-white">
              {isEquipe ? "Painel de gestão" : "Acesse sua experiência"}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {isEquipe
                ? "Operação, financeiro e conteúdo. Acesso restrito."
                : "Acompanhe reservas, documentos e pagamentos."}
            </p>
          </div>

          <LoginForm variant={variant} />

          {/* Alternar entre as áreas */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            {isEquipe ? (
              <Link
                href="/login"
                className="text-xs text-white/35 hover:text-gold transition-colors"
              >
                ← Sou cliente — acessar Área do Cliente
              </Link>
            ) : (
              <Link
                href="/login?area=equipe"
                className="text-xs text-white/35 hover:text-gold transition-colors"
              >
                Sou da equipe — acessar Área da Equipe →
              </Link>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-white/20 mt-8 font-serif italic">
          &ldquo;Nós cuidamos da experiência para que você cuide apenas de viver
          o momento.&rdquo;
        </p>
      </div>
    </div>
  );
}

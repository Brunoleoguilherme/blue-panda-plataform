import type { Metadata } from "next";
import Image from "next/image";
import { User, ShieldCheck } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta Blue Panda",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Blue Panda Travel"
            width={160}
            height={56}
            className="h-32 w-auto object-contain"
            priority
          />
        </div>

        {/* Dois cards: Cliente e Administrativo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Card Cliente */}
          <div className="rounded-2xl border border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl px-7 py-8 flex flex-col">
            <div className="mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <User size={20} className="text-white" />
              </div>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">
                Área do Cliente
              </p>
              <h2 className="text-xl font-bold text-white">
                Acesse sua experiência
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Acompanhe reservas, documentos e pagamentos.
              </p>
            </div>
            <LoginForm variant="cliente" />
          </div>

          {/* Card Administrativo */}
          <div className="rounded-2xl border border-gold/30 bg-midnight/80 backdrop-blur-xl shadow-2xl px-7 py-8 flex flex-col">
            <div className="mb-6">
              <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                <ShieldCheck size={20} className="text-gold" />
              </div>
              <p className="text-[11px] font-semibold text-gold uppercase tracking-widest mb-1">
                Área Administrativa
              </p>
              <h2 className="text-xl font-bold text-white">Painel de gestão</h2>
              <p className="text-white/40 text-sm mt-1">
                Operação, financeiro e conteúdo. Acesso restrito.
              </p>
            </div>
            <LoginForm variant="admin" />
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

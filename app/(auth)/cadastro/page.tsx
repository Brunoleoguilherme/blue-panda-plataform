import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Cadastre-se na Blue Panda Travel",
};

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
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

        <div className="rounded-2xl border border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl px-8 py-10">
          <SignupForm />
        </div>

        <p className="text-center text-xs text-white/20 mt-8 font-serif italic">
          &ldquo;Nós cuidamos da experiência para que você cuide apenas de viver
          o momento.&rdquo;
        </p>
      </div>
    </div>
  );
}

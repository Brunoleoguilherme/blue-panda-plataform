import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta Blue Panda",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-2xl border border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Blue Panda Travel"
              width={160}
              height={56}
              className="h-40 w-auto object-contain"
            />
          </div>

          <LoginForm />

          <p className="text-center text-xs text-white/20 mt-8 font-serif italic">
            "Nós cuidamos da experiência para que você cuide apenas de viver o momento."
          </p>
        </div>
      </div>
    </div>
  );
}

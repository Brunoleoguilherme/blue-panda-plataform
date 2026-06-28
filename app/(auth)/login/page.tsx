import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta Blue Panda",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Visual */}
      <div className="hidden lg:flex relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2400"
          alt="Blue Panda Experience"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/20 to-midnight/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />

        {/* Logo + Quote */}
        <div className="absolute bottom-12 left-12 right-12">
          <Image
            src="/images/logo.png"
            alt="Blue Panda Travel"
            width={160}
            height={56}
            className="h-12 w-auto object-contain mb-8 opacity-90"
          />
          <blockquote className="text-white/70 font-serif italic text-lg leading-relaxed">
            "Nós cuidamos da experiência para que você cuide apenas de viver o
            momento."
          </blockquote>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center p-8 bg-midnight">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Image
              src="/images/logo.png"
              alt="Blue Panda Travel"
              width={160}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

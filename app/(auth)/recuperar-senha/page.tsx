"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export default function RecuperarSenhaPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/redefinir-senha`
          : undefined,
    });

    // Por segurança, não revelamos se o e-mail existe: sucesso genérico.
    if (err) {
      setError("Não foi possível enviar o e-mail agora. Tente novamente em instantes.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/70" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Blue Panda Travel"
            width={160}
            height={56}
            className="h-28 w-auto object-contain"
            priority
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-midnight/80 backdrop-blur-xl shadow-2xl px-7 py-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Verifique seu e-mail</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Se houver uma conta com esse e-mail, enviamos um link para você
                redefinir sua senha. O link expira em 1 hora.
              </p>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full">
                  Voltar para o login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-[11px] font-semibold text-gold uppercase tracking-widest mb-1">
                  Recuperar acesso
                </p>
                <h1 className="text-xl font-bold text-white">Esqueceu sua senha?</h1>
                <p className="text-white/40 text-sm mt-1">
                  Informe seu e-mail e enviaremos um link para criar uma nova senha.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      className={cn(
                        "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
                        errors.email ? "border-red-500/50" : "border-white/10"
                      )}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email.message}
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-btn px-4 py-3"
                    >
                      <AlertCircle size={15} /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>

              <Link
                href="/login"
                className="mt-6 flex items-center justify-center gap-1.5 text-sm text-white/35 hover:text-gold transition-colors"
              >
                <ArrowLeft size={14} /> Voltar para o login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

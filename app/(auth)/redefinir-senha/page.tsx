"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const schema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [validLink, setValidLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // O supabase-js detecta o token de recuperação na URL e cria uma sessão temporária.
  useEffect(() => {
    const supabase = createClient();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setValidLink(true);
      setReady(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setValidLink(true);
      setReady(true);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (err) {
      setError("Não foi possível atualizar a senha. Solicite um novo link e tente de novo.");
      setLoading(false);
      return;
    }

    // Encerra a sessão de recuperação; o login será feito com a nova senha.
    await supabase.auth.signOut();
    setDone(true);
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
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Senha atualizada!</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Sua nova senha já está valendo. Faça login para acessar sua conta.
              </p>
              <Link href="/login">
                <Button variant="primary" size="lg" className="w-full">
                  Ir para o login
                </Button>
              </Link>
            </motion.div>
          ) : !ready ? (
            <p className="text-center text-sm text-white/40 py-8">Validando o link...</p>
          ) : !validLink ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-5">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Link inválido ou expirado</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Este link de recuperação não é mais válido. Solicite um novo para
                redefinir sua senha.
              </p>
              <Link href="/recuperar-senha">
                <Button variant="secondary" size="lg" className="w-full">
                  Solicitar novo link
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-[11px] font-semibold text-gold uppercase tracking-widest mb-1">
                  Nova senha
                </p>
                <h1 className="text-xl font-bold text-white">Crie sua nova senha</h1>
                <p className="text-white/40 text-sm mt-1">
                  Escolha uma senha segura para voltar a acessar sua conta.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                    Nova senha
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      autoComplete="new-password"
                      className={cn(
                        "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-12 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
                        errors.password ? "border-red-500/50" : "border-white/10"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />
                    <input
                      {...register("confirm")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Repita a nova senha"
                      autoComplete="new-password"
                      className={cn(
                        "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
                        errors.confirm ? "border-red-500/50" : "border-white/10"
                      )}
                    />
                  </div>
                  {errors.confirm && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.confirm.message}
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
                  {loading ? "Salvando..." : "Salvar nova senha"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

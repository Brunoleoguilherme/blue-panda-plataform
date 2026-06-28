"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError("E-mail ou senha incorretos. Tente novamente.");
      setLoading(false);
      return;
    }

    router.push("/cliente");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">
          Bem-vindo de volta
        </p>
        <h1 className="text-3xl font-bold text-white mb-2">Acesse sua conta</h1>
        <p className="text-white/40 text-sm">
          Entre para acompanhar sua experiência.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
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

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
            Senha
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
            />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
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

        {/* Forgot password */}
        <div className="flex justify-end">
          <a
            href="/recuperar-senha"
            className="text-xs text-white/35 hover:text-gold transition-colors"
          >
            Esqueci minha senha
          </a>
        </div>

        {/* Error */}
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
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-white/20">ou</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <p className="text-center text-sm text-white/35">
        Não tem acesso?{" "}
        <a href="/contato" className="text-gold hover:text-gold-light transition-colors font-semibold">
          Fale com nossa equipe
        </a>
      </p>

      <p className="text-center text-xs text-white/20 mt-8">
        Portal Administrativo?{" "}
        <a href="/admin" className="underline hover:text-white/40 transition-colors">
          Acesso restrito
        </a>
      </p>
    </motion.div>
  );
}

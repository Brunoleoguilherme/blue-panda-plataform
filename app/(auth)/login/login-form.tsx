"use client";

import React, { useState } from "react";
import Link from "next/link";
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

type LoginVariant = "cliente" | "admin";

export function LoginForm({ variant = "cliente" }: { variant?: LoginVariant }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isAdmin = variant === "admin";

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
      const msg = authError.message?.toLowerCase() ?? "";
      if (msg.includes("not confirmed")) {
        setError(
          "Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada."
        );
      } else {
        setError("E-mail ou senha incorretos. Tente novamente.");
      }
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isAdmin) {
      // Confirma o papel administrativo antes de liberar o painel.
      const role =
        (user?.app_metadata as { role?: string } | undefined)?.role ??
        (user?.user_metadata as { role?: string } | undefined)?.role;

      if (role !== "admin") {
        await supabase.auth.signOut();
        setError("Esta conta não possui acesso administrativo.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
      return;
    }

    // Área do cliente: confirma que a conta já foi aprovada (active = true).
    const { data: profile } = await supabase
      .from("profiles")
      .select("active")
      .eq("id", user?.id ?? "")
      .maybeSingle();

    if (!profile?.active) {
      await supabase.auth.signOut();
      setError(
        "Sua conta ainda está aguardando aprovação de um administrador."
      );
      setLoading(false);
      return;
    }

    router.push("/cliente");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-1 flex-col space-y-4"
    >
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
              "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all",
              isAdmin ? "focus:border-gold/50" : "focus:border-white/40",
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
              "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-12 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all",
              isAdmin ? "focus:border-gold/50" : "focus:border-white/40",
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

      {/* Rodapé do card */}
      <div className="mt-auto pt-2">
        <div className="flex justify-end mb-3 h-4 leading-4">
          <a
            href="/recuperar-senha"
            className="text-xs text-white/35 hover:text-gold transition-colors"
          >
            Esqueci minha senha
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          {loading ? "Entrando..." : isAdmin ? "Entrar no painel" : "Entrar"}
        </Button>

        <p className="text-center text-sm text-white/35 mt-4">
          Não tem conta?{" "}
          <Link
            href="/cadastro"
            className="text-gold hover:text-gold-light transition-colors font-semibold"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
}

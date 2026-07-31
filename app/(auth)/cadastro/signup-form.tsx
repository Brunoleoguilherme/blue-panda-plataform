"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { notifyNewSignup } from "@/actions/notify-signup";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    nome: z.string().min(2, "Informe seu nome completo"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(10, "Informe um telefone válido com DDD"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export function SignupForm({ tipo }: { tipo?: string }) {
  const isEquipe = tipo === "equipe";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.nome,
          phone: data.telefone,
          account_type: isEquipe ? "equipe" : "cliente",
        },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/login`
            : undefined,
      },
    });

    if (signUpError) {
      const msg = signUpError.message?.toLowerCase() ?? "";
      if (msg.includes("already") || msg.includes("registered")) {
        setError("Este e-mail já possui cadastro. Faça login.");
      } else {
        setError("Não foi possível concluir o cadastro. Tente novamente.");
      }
      setLoading(false);
      return;
    }

    // Avisa a equipe (não bloqueia o cadastro se o e-mail falhar).
    try {
      await notifyNewSignup({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      });
    } catch {
      // silencioso — o cadastro já foi registrado
    }

    // Encerra qualquer sessão criada no cadastro (confirmação de e-mail pendente).
    await supabase.auth.signOut();

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          {isEquipe ? "Solicitação enviada!" : "Confirme seu e-mail"}
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          {isEquipe
            ? "Sua conta foi criada e está aguardando a aprovação de um administrador. Você também receberá um e-mail para confirmar seu endereço."
            : "Enviamos um link de confirmação para o seu e-mail. Confirme para liberar o acesso à sua Área do Cliente."}
        </p>
        <Link href="/login">
          <Button variant="secondary" size="lg" className="w-full">
            Voltar para o login
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">
          {isEquipe ? "Área da Equipe" : "Área do Cliente"}
        </p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEquipe ? "Solicitar acesso" : "Criar sua conta"}
        </h1>
        <p className="text-white/40 text-sm">
          {isEquipe
            ? "Preencha para solicitar acesso à equipe. Um administrador libera o seu acesso após a análise."
            : "Cadastre-se para acompanhar suas experiências. Basta confirmar seu e-mail para acessar."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Nome */}
        <Field label="Nome completo" error={errors.nome?.message}>
          <User
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            {...register("nome")}
            type="text"
            placeholder="Seu nome"
            autoComplete="name"
            className={inputCls(!!errors.nome)}
          />
        </Field>

        {/* Email */}
        <Field label="E-mail" error={errors.email?.message}>
          <Mail
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            className={inputCls(!!errors.email)}
          />
        </Field>

        {/* Telefone */}
        <Field label="Telefone (com DDD)" error={errors.telefone?.message}>
          <Phone
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            {...register("telefone")}
            type="tel"
            placeholder="(11) 99999-9999"
            autoComplete="tel"
            className={inputCls(!!errors.telefone)}
          />
        </Field>

        {/* Senha */}
        <Field label="Senha" error={errors.password?.message}>
          <Lock
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            className={cn(inputCls(!!errors.password), "pr-12")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Field>

        {/* Confirmar senha */}
        <Field label="Confirmar senha" error={errors.confirm?.message}>
          <Lock
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            {...register("confirm")}
            type={showPassword ? "text" : "password"}
            placeholder="Repita a senha"
            autoComplete="new-password"
            className={inputCls(!!errors.confirm)}
          />
        </Field>

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
          {loading ? "Enviando..." : isEquipe ? "Solicitar acesso" : "Criar conta"}
        </Button>
      </form>

      <p className="text-center text-sm text-white/35 mt-6">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="text-gold hover:text-gold-light transition-colors font-semibold"
        >
          Fazer login
        </Link>
      </p>
    </motion.div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full h-14 bg-navy/50 border rounded-btn pl-11 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
    hasError ? "border-red-500/50" : "border-white/10"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

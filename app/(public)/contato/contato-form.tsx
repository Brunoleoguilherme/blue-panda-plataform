"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sendContactEmail } from "@/actions/send-contact";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(/^[\d\s\(\)\-\+]+$/, "Telefone inválido"),
  evento: z.string().optional(),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

const eventosOpcoes = [
  "NFL Brasil 2026",
  "F1 Grand Prix de Monaco",
  "Champions League Final",
  "Super Bowl LXI",
  "US Open 2026",
  "NBA Finals 2026",
  "Outro evento",
];

function InputField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/60 uppercase tracking-widest">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "h-14 w-full bg-navy/50 border border-white/10 rounded-btn px-5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:bg-navy/70 transition-all duration-200";

export function ContatoForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 rounded-xl border border-green-500/20 bg-green-500/5"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Mensagem enviada!
        </h3>
        <p className="text-white/55 leading-relaxed mb-8 max-w-sm">
          Recebemos seu contato e nossa equipe responderá em até 2 horas.
          Fique de olho no seu e-mail.
        </p>
        <Button variant="secondary" size="md" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField label="Nome completo" error={errors.nome?.message}>
          <input
            {...register("nome")}
            placeholder="Seu nome"
            className={cn(inputClass, errors.nome && "border-red-500/50")}
          />
        </InputField>

        <InputField label="E-mail" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            className={cn(inputClass, errors.email && "border-red-500/50")}
          />
        </InputField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField label="WhatsApp / Telefone" error={errors.telefone?.message}>
          <input
            {...register("telefone")}
            placeholder="(11) 99999-9999"
            className={cn(inputClass, errors.telefone && "border-red-500/50")}
          />
        </InputField>

        <InputField label="Evento de interesse" error={errors.evento?.message}>
          <select
            {...register("evento")}
            className={cn(
              inputClass,
              "appearance-none cursor-pointer",
              errors.evento && "border-red-500/50"
            )}
          >
            <option value="" className="bg-navy">
              Selecione um evento
            </option>
            {eventosOpcoes.map((e) => (
              <option key={e} value={e} className="bg-navy">
                {e}
              </option>
            ))}
          </select>
        </InputField>
      </div>

      <InputField label="Mensagem" error={errors.mensagem?.message}>
        <textarea
          {...register("mensagem")}
          placeholder="Conte-nos sobre sua experiência ideal. Quantas pessoas, datas preferidas, expectativas..."
          rows={5}
          className={cn(
            "w-full bg-navy/50 border border-white/10 rounded-btn px-5 py-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 focus:bg-navy/70 transition-all duration-200 resize-none",
            errors.mensagem && "border-red-500/50"
          )}
        />
      </InputField>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-btn px-4 py-3"
        >
          <AlertCircle size={16} />
          Erro ao enviar. Tente novamente ou nos chame no WhatsApp.
        </motion.div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="w-full group"
      >
        <Send size={16} />
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>

      <p className="text-xs text-white/25 text-center">
        Ao enviar, você concorda com nossa{" "}
        <a href="/privacidade" className="underline hover:text-white/50">
          política de privacidade
        </a>
        .
      </p>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  assunto: z.string().min(3, "Informe o assunto"),
  mensagem: z.string().min(10, "Mensagem muito curta"),
});

type FormData = z.infer<typeof schema>;

const canais = [
  {
    icon: MessageCircle,
    label: "WhatsApp Concierge",
    desc: "Resposta em até 30 minutos",
    action: "Abrir WhatsApp",
    href: "https://wa.me/5511999999999",
    cor: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    destaque: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    desc: "suporte@bluepandatravel.com",
    action: "Enviar e-mail",
    href: "mailto:suporte@bluepandatravel.com",
    cor: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Phone,
    label: "Telefone",
    desc: "+55 (11) 99999-9999",
    action: "Ligar agora",
    href: "tel:+5511999999999",
    cor: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

export default function SuportePage() {
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormData) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setEnviado(true);
    reset();
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Suporte</h1>
        <p className="text-white/40 text-sm">
          Nossa equipe está disponível para ajudar você a qualquer momento.
        </p>
      </div>

      {/* Canais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {canais.map((canal) => (
          <a
            key={canal.label}
            href={canal.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-col gap-3 p-5 rounded-xl border transition-all hover:scale-[1.02]",
              canal.bg
            )}
          >
            <canal.icon size={20} className={canal.cor} />
            <div>
              <p className="text-sm font-bold text-white">{canal.label}</p>
              <p className="text-xs text-white/35 mt-0.5">{canal.desc}</p>
            </div>
            <span className={`text-xs font-semibold ${canal.cor}`}>
              {canal.action} →
            </span>
          </a>
        ))}
      </div>

      {/* Form */}
      <div className="rounded-xl border border-white/5 bg-navy/20 p-6">
        <h2 className="text-sm font-bold text-white mb-5">
          Enviar mensagem pelo portal
        </h2>

        {enviado ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle size={36} className="text-green-400" />
            <p className="text-white font-semibold">Mensagem enviada!</p>
            <p className="text-sm text-white/40">
              Responderemos em breve pelo seu e-mail ou WhatsApp.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="text-xs text-gold hover:text-gold-light transition-colors mt-2"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Assunto
              </label>
              <input
                {...register("assunto")}
                placeholder="Ex: Dúvida sobre meu voo"
                className={cn(
                  "w-full h-12 bg-navy/50 border rounded-btn px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
                  errors.assunto ? "border-red-500/50" : "border-white/10"
                )}
              />
              {errors.assunto && (
                <p className="text-xs text-red-400">{errors.assunto.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Mensagem
              </label>
              <textarea
                {...register("mensagem")}
                rows={4}
                placeholder="Descreva sua dúvida ou solicitação..."
                className={cn(
                  "w-full bg-navy/50 border rounded-btn px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all resize-none",
                  errors.mensagem ? "border-red-500/50" : "border-white/10"
                )}
              />
              {errors.mensagem && (
                <p className="text-xs text-red-400">{errors.mensagem.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="flex items-center gap-2"
            >
              <Send size={14} />
              {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

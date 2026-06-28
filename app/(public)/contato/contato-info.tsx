"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Instagram,
  MapPin,
} from "lucide-react";

const canais = [
  {
    icon: MessageCircle,
    titulo: "WhatsApp",
    valor: "+55 (11) 99999-9999",
    descricao: "Resposta imediata em horário comercial",
    href: "https://wa.me/5511999999999",
    destaque: true,
  },
  {
    icon: Mail,
    titulo: "E-mail",
    valor: "contato@bluepandatravel.com.br",
    descricao: "Respondemos em até 2 horas",
    href: "mailto:contato@bluepandatravel.com.br",
    destaque: false,
  },
  {
    icon: Phone,
    titulo: "Telefone",
    valor: "+55 (11) 3333-4444",
    descricao: "De segunda a sexta, 9h às 18h",
    href: "tel:+551133334444",
    destaque: false,
  },
  {
    icon: Instagram,
    titulo: "Instagram",
    valor: "@bluepandatravel",
    descricao: "Fotos, vídeos e novidades",
    href: "https://instagram.com/bluepandatravel",
    destaque: false,
  },
];

const horarios = [
  { dia: "Segunda a Sexta", horario: "9h às 18h" },
  { dia: "Sábado", horario: "9h às 13h" },
  { dia: "Domingo e Feriados", horario: "Emergências apenas" },
];

export function ContatoInfo() {
  return (
    <div className="space-y-8">
      {/* Canais */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-5">
          Canais de atendimento
        </p>

        <div className="space-y-3">
          {canais.map((canal) => (
            <a
              key={canal.titulo}
              href={canal.href}
              target={canal.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                canal.destaque
                  ? "border-gold/30 bg-gold/5 hover:bg-gold/10 hover:border-gold/50"
                  : "border-white/5 bg-navy/30 hover:border-white/10 hover:bg-navy/50"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  canal.destaque
                    ? "bg-gold/15 border border-gold/30"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <canal.icon
                  size={18}
                  className={canal.destaque ? "text-gold" : "text-white/50"}
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${
                    canal.destaque ? "text-gold/70" : "text-white/40"
                  }`}
                >
                  {canal.titulo}
                </p>
                <p
                  className={`text-sm font-semibold truncate ${
                    canal.destaque ? "text-white" : "text-white/80"
                  }`}
                >
                  {canal.valor}
                </p>
                <p className="text-xs text-white/35 mt-0.5">{canal.descricao}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Horários */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="p-6 rounded-xl border border-white/5 bg-navy/30"
      >
        <div className="flex items-center gap-2 mb-5">
          <Clock size={16} className="text-gold/60" />
          <p className="text-xs font-semibold text-gold uppercase tracking-widest">
            Horário de atendimento
          </p>
        </div>
        <div className="space-y-3">
          {horarios.map((h) => (
            <div
              key={h.dia}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <span className="text-sm text-white/55">{h.dia}</span>
              <span className="text-sm font-semibold text-white">{h.horario}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Localização */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="p-6 rounded-xl border border-white/5 bg-navy/30"
      >
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-gold/60" />
          <p className="text-xs font-semibold text-gold uppercase tracking-widest">
            Localização
          </p>
        </div>
        <p className="text-sm text-white/55 leading-relaxed">
          São Paulo — SP, Brasil
          <br />
          Atendimento presencial com agendamento.
        </p>
      </motion.div>

      {/* Promessa */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="border-l-2 border-gold/40 pl-5"
      >
        <p className="text-sm font-serif italic text-white/60 leading-relaxed">
          "Nós cuidamos da experiência para que você cuide apenas de viver o
          momento."
        </p>
        <p className="text-xs text-gold/50 mt-2 font-semibold tracking-widest uppercase">
          Blue Panda Travel
        </p>
      </motion.div>
    </div>
  );
}

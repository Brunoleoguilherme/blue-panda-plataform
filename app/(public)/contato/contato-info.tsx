"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Instagram,
} from "lucide-react";

const canais = [
  {
    icon: MessageCircle,
    titulo: "WhatsApp",
    valor: "+55 (11) 94044-0078",
    descricao: "Resposta imediata em horário comercial",
    href: "https://wa.me/5511940440078",
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
    icon: Instagram,
    titulo: "Instagram",
    valor: "@bluepanda.travel",
    descricao: "Fotos, vídeos e novidades",
    href: "https://instagram.com/bluepanda.travel",
    destaque: false,
  },
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

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, Ticket, Star, ArrowRight } from "lucide-react";
import type { Event } from "@/types";

const etapas = [
  {
    icon: Plane,
    dia: "Dia 1",
    titulo: "Chegada",
    descricao: "Transfer do aeroporto ao hotel. Check-in e acomodação. Welcome kit Blue Panda.",
  },
  {
    icon: Hotel,
    dia: "Dia 2",
    titulo: "Exploração",
    descricao: "Café da manhã incluso. City tour guiado. Jantar em restaurante selecionado.",
  },
  {
    icon: Ticket,
    dia: "Dia 3",
    titulo: "O grande dia",
    descricao: "Transfer exclusivo ao evento. Entrada com ingresso oficial. Suporte durante todo o jogo.",
  },
  {
    icon: Star,
    dia: "Dia 4",
    titulo: "Retorno",
    descricao: "Manhã livre para experiências extras. Transfer ao aeroporto. Fim da experiência.",
  },
];

interface Props {
  event: Event;
}

export function EventoCronograma({ event: _ }: Props) {
  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Sua jornada
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">Cronograma</h2>
          <p className="text-white/50 leading-relaxed">
            Um roteiro pensado para que você aproveite ao máximo cada momento
            da experiência.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {etapas.map((etapa, i) => (
            <motion.div
              key={etapa.dia}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Line */}
              {i < etapas.length - 1 && (
                <div className="absolute left-[22px] top-12 bottom-0 w-px bg-gradient-to-b from-gold/30 to-transparent" />
              )}

              {/* Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center z-10">
                <etapa.icon size={18} className="text-gold" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1 pb-6 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                    {etapa.dia}
                  </span>
                  <ArrowRight size={10} className="text-white/20" />
                  <h3 className="text-base font-bold text-white">{etapa.titulo}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {etapa.descricao}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-white/25 mt-8"
        >
          * Cronograma ilustrativo. O roteiro detalhado é enviado após a confirmação da reserva.
        </motion.p>
      </div>
    </section>
  );
}

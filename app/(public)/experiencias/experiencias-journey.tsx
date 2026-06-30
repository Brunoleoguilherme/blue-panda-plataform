"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageCircle,
  FileText,
  Plane,
  Star,
  Heart,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    numero: "01",
    titulo: "Você sonha",
    descricao: "Escolhe o evento que sempre quis viver de perto.",
  },
  {
    icon: MessageCircle,
    numero: "02",
    titulo: "Personalizamos",
    descricao: "Criamos uma experiência sob medida, pensada em você.",
  },
  {
    icon: FileText,
    numero: "03",
    titulo: "Planejamento",
    descricao: "Seguros, passagens, ingressos, hospedagem, transfers, experience.",
  },
  {
    icon: Plane,
    numero: "04",
    titulo: "Cuidado",
    descricao: "Um concierge dedicado ao seu lado todos os dias, para que tudo seja perfeito.",
  },
  {
    icon: Star,
    numero: "05",
    titulo: "Vivência",
    descricao: "A emoção de estar presente, colecionando grandes momentos.",
  },
  {
    icon: Heart,
    numero: "06",
    titulo: "Memórias",
    descricao: "Uma lembrança que dura a vida inteira e a vontade de viver a próxima.",
  },
];

export function ExperienciasJourney() {
  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            A jornada Blue Panda
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Do desejo de viver o extraordinário,
            <br />
            à lembrança que ficará para sempre!
          </h2>
          <p className="text-white/50 leading-relaxed">
            A sua experiência começa muito antes da viagem e continua muito
            depois do retorno.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.numero}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="relative mx-auto w-14 h-14 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/40 transition-all duration-300">
                <step.icon size={20} className="text-gold" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-midnight text-[10px] font-bold flex items-center justify-center">
                  {step.numero.replace("0", "")}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                {step.titulo}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                {step.descricao}
              </p>

              {/* Connector line (hide on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%_-_12px)] w-full h-px bg-gradient-to-r from-gold/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

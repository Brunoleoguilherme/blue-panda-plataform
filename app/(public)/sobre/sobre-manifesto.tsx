"use client";

import React from "react";
import { motion } from "framer-motion";

const pilares = [
  {
    titulo: "Propósito",
    texto:
      "Criar experiências que conectem pessoas aos maiores eventos esportivos do mundo com excelência, conforto e atendimento personalizado. Cada viagem deve ser lembrada durante toda a vida.",
  },
  {
    titulo: "Missão",
    texto:
      "Transformar grandes eventos esportivos em experiências inesquecíveis, oferecendo planejamento completo, atendimento humanizado e uma jornada premium do primeiro contato até o retorno para casa.",
  },
  {
    titulo: "Visão",
    texto:
      "Ser reconhecida como a principal empresa brasileira especializada em viagens esportivas premium, tornando-se referência em hospitalidade, organização e experiências internacionais.",
  },
];

export function SobreManifesto() {
  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        {/* Manifesto central */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <div className="w-12 h-px bg-gold/40 mx-auto mb-8" />
          <blockquote className="text-2xl lg:text-3xl font-serif italic text-white/80 leading-relaxed mb-6">
            "A Blue Panda não vende apenas viagens. Ela cria memórias. Não
            entrega apenas reservas. Entrega tranquilidade. Não oferece apenas
            suporte. Oferece hospitalidade."
          </blockquote>
          <div className="w-12 h-px bg-gold/40 mx-auto" />
        </motion.div>

        {/* Propósito, Missão, Visão */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pilares.map((pilar, i) => (
            <motion.div
              key={pilar.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative pl-6 border-l border-gold/20"
            >
              <span className="absolute -left-px top-0 w-px h-8 bg-gold" />
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
                {pilar.titulo}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                {pilar.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

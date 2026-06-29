"use client";

import React from "react";
import { motion } from "framer-motion";

export function ExperienciasHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-experiencias.jpg')" }}
      />
      <div className="absolute inset-0 bg-midnight/80" />

      <div className="container-bp relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-badge px-4 py-2 mb-8"
        >
          <span className="text-xs font-semibold text-gold tracking-widest uppercase">
            Mais do que viagens
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6"
        >
          O mundo dos esportes possui{" "}
          <span className="text-gold-gradient">palcos inesquecíveis.</span>
          <br />
          Nós levamos você ao encontro de todos eles.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/55 leading-relaxed font-serif italic"
        >
          Mais do que organizar viagens, desenhamos cada detalhe que deixa
          mais perto de viver grandes emoções em cada experiência pensada
          para que você viva intensamente cada momento.
        </motion.p>
      </div>
    </section>
  );
}

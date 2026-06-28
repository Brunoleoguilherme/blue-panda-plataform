"use client";

import React from "react";
import { motion } from "framer-motion";

export function ExperienciasHero() {
  return (
    <section className="relative pt-40 pb-24 bg-[#060f22] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

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
          className="text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6"
        >
          Nós não vendemos viagens.
          <br />
          <span className="text-gold-gradient">Nós criamos memórias.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/55 leading-relaxed font-serif italic"
        >
          Enquanto outras empresas organizam logística, a Blue Panda organiza
          emoções. Cada experiência é desenhada para que você cuide apenas
          de viver o momento.
        </motion.p>
      </div>
    </section>
  );
}

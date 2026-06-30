"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function SobreHero() {
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-sobre.jpg"
          alt="Blue Panda Experience"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 to-transparent" />
      </div>

      <div className="container-bp relative z-10 pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
            Quem somos
          </p>
          <h1 className="text-xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight mb-6">
            Uma agência especializada em eventos
            <br />
            <span className="text-gold-gradient">e experiências esportivas premium.</span>
          </h1>
          <p className="text-white/60 text-lg font-serif italic leading-relaxed">
            Somos a curadoria que transforma o acesso a grandes eventos esportivos em memória definitiva.
            <br />
            Cuidamos de cada detalhe para que você só precise viver o momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

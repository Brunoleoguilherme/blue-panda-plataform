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
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6">
            Não somos uma agência
            <br />
            <span className="text-gold-gradient">de viagens.</span>
          </h1>
          <p className="text-white/60 text-xl font-serif italic leading-relaxed">
            Somos uma plataforma de experiências esportivas premium.
            Cada decisão que tomamos reforça essa percepção.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

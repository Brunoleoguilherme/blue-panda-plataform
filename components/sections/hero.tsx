"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcoming = [
  { label: "NFL Brasil", local: "Rio de Janeiro" },
  { label: "F1 Monaco", local: "Monte Carlo" },
  { label: "Champions Final", local: "Budapeste" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Overlay: forte à esquerda, quase transparente à direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-midnight/50" />
      </div>

      {/* Content — full width grid */}
      <div className="w-full relative z-10 pt-28 pb-16">
        <div className="container-bp">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — copy */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-badge px-4 py-2 mb-10 mt-6"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-xs font-semibold text-gold tracking-widest uppercase">
                  Especialistas em experiências premium
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl xl:text-[64px] font-bold leading-[1.08] text-white mb-5"
              >
                Experiências que vão além
                <br />
                <span className="text-gold-gradient">do seu destino!</span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-white/60 leading-relaxed mb-9 max-w-lg"
              >
                Acesso aos maiores palcos do esporte mundial, com serviços personalizados de curadoria, hospitality e especialistas bilíngues que conduzem cada detalhe da sua viagem.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <Link href="/contato">
                  <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                    Planejar Minha Experiência
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/eventos">
                  <Button variant="ghost" size="lg" className="group w-full sm:w-auto">
                    <span className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 transition-colors flex-shrink-0">
                        <Play size={13} className="ml-0.5" />
                      </span>
                      Explorar Eventos
                    </span>
                  </Button>
                </Link>
              </motion.div>

            </div>

            {/* RIGHT — upcoming events float card (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex flex-col justify-end items-end h-full pb-4"
            >
              <div className="w-72 rounded-2xl border border-white/10 bg-midnight/60 backdrop-blur-xl p-5 space-y-3">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">
                  Próximas experiências
                </p>
                {upcoming.map((ev, i) => (
                  <motion.div
                    key={ev.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-gold/20 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-white">{ev.label}</span>
                    <span className="flex items-center gap-1 text-xs text-gold/70">
                      <MapPin size={11} /> {ev.local}
                    </span>
                  </motion.div>
                ))}
                <Link href="/eventos">
                  <div className="flex items-center justify-center gap-1.5 mt-2 pt-3 border-t border-white/5 text-xs font-semibold text-gold hover:gap-3 transition-all">
                    Ver todos os eventos <ArrowRight size={12} />
                  </div>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
      </motion.div>
    </section>
  );
}

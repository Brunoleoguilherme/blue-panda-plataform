"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Zap, Star } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Hospitalidade",
    description:
      "Nosso atendimento começa antes da compra e continua após a viagem. O cliente nunca se sente sozinho.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description:
      "Contratos claros, equipe especializada, parceiros homologados e total organização documental.",
  },
  {
    icon: Star,
    title: "Exclusividade",
    description:
      "Produtos cuidadosamente selecionados. Cada cliente recebe uma experiência personalizada.",
  },
  {
    icon: Zap,
    title: "Tecnologia",
    description:
      "Portal moderno com atualizações em tempo real, documentos digitais e notificações automáticas.",
  },
];

export function WhyUs() {
  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Nossa proposta
          </p>
          <h2 className="text-4xl lg:text-[40px] font-bold text-white mb-4">
            Por que a Blue Panda?
          </h2>
          <p className="text-white/50 leading-relaxed">
            Enquanto outras empresas organizam logística, nós organizamos
            memórias. Cada detalhe é pensado para que você cuide apenas de
            viver o momento.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group p-8 rounded-xl border border-white/5 bg-navy/40 hover:border-gold/20 hover:bg-navy/60 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors">
                <pillar.icon size={22} className="text-gold" />
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Central quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block border-l-2 border-gold/50 pl-6 text-left max-w-xl">
            <p className="text-xl font-serif italic text-white/80 leading-relaxed">
              "Nós cuidamos da experiência para que o cliente cuide apenas de
              viver o momento."
            </p>
            <p className="text-xs text-gold/60 mt-3 font-semibold tracking-widest uppercase">
              Manifesto Blue Panda
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

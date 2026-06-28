"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Eye, Heart, Shield, Zap, Trophy } from "lucide-react";

const valores = [
  {
    icon: Award,
    titulo: "Excelência",
    descricao:
      "Cada detalhe importa. Não existem pequenos detalhes. Tudo influencia a experiência do cliente.",
  },
  {
    icon: Eye,
    titulo: "Transparência",
    descricao:
      "Toda comunicação deve ser clara. Sem letras pequenas. Sem promessas irreais.",
  },
  {
    icon: Heart,
    titulo: "Hospitalidade",
    descricao:
      "Nosso atendimento começa antes da compra e continua após a viagem. O cliente nunca se sente sozinho.",
  },
  {
    icon: Shield,
    titulo: "Segurança",
    descricao:
      "Viajar para outro país exige confiança. Todo o sistema transmite organização e credibilidade.",
  },
  {
    icon: Zap,
    titulo: "Exclusividade",
    descricao:
      "Cada cliente deve sentir que recebeu uma experiência única, personalizada e especial.",
  },
  {
    icon: Trophy,
    titulo: "Paixão pelo esporte",
    descricao:
      "O esporte é nosso principal elo emocional. É ele que conecta pessoas, famílias e culturas.",
  },
];

export function SobreValores() {
  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            O que nos guia
          </p>
          <h2 className="text-4xl font-bold text-white">Nossos valores</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valores.map((v, i) => (
            <motion.div
              key={v.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex gap-5 p-6 rounded-xl border border-white/5 bg-navy/30 hover:border-gold/15 hover:bg-navy/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                <v.icon size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  {v.titulo}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {v.descricao}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

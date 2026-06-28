"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Carlos Menezes",
    role: "Médico · Belo Horizonte",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    content:
      "A Blue Panda cuidou de absolutamente tudo. Ingressos, hotel, transfer, roteiro... Só precisei aparecer e aproveitar. A NFL Brasil foi inesquecível.",
    event: "NFL Brasil 2025",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcelo Oliveira",
    role: "Diretor Comercial · Rio de Janeiro",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200",
    content:
      "Nunca imaginei que assistir a uma final da Champions seria tão organizado. A equipe da Blue Panda estava disponível em todos os momentos. Recomendo demais.",
    event: "Champions League 2025",
    rating: 5,
  },
  {
    id: "3",
    name: "Mariana Albuquerque",
    role: "Empresária · São Paulo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    content:
      "Levei minha equipe comercial para a Fórmula 1 em Mônaco. A experiência foi impecável. Documentação, suporte, hospitalidade. Superou todas as expectativas.",
    event: "F1 Mônaco 2025",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section">
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
            Experiências reais
          </p>
          <h2 className="text-4xl lg:text-[40px] font-bold text-white mb-4">
            O que nossos clientes dizem
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-8 rounded-xl border border-white/5 bg-navy/40 hover:border-gold/15 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-gold/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6 font-serif italic">
                "{t.content}"
              </p>

              {/* Footer */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
                <span className="inline-block text-xs text-gold/60 bg-gold/10 rounded-badge px-2 py-1 mt-1">
                  {t.event}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

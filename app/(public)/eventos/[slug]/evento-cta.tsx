"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types";

interface Props {
  event: Event;
}

export function EventoCta({ event }: Props) {
  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-gold fill-gold" />
            ))}
          </div>

          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
            Vagas limitadas
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Garanta sua vaga no
            <br />
            <span className="text-gold-gradient">{event.title}</span>
          </h2>

          <p className="text-white/55 text-lg leading-relaxed mb-10">
            Nossa equipe está pronta para criar um pacote exclusivo para você.
            Entre em contato agora e receba uma proposta personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/contato?evento=${event.slug}`}>
              <Button variant="primary" size="xl" className="group">
                Quero essa experiência
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="xl">
                <MessageCircle size={18} />
                Falar pelo WhatsApp
              </Button>
            </a>
          </div>

          <p className="text-xs text-white/25 mt-8">
            Sem compromisso. Nossa equipe responde em até 2 horas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

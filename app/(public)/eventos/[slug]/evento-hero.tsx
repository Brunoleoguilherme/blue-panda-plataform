"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { statusConfig } from "@/lib/events-data";
import type { Event } from "@/types";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Props {
  event: Event;
}

export function EventoHero({ event }: Props) {
  const status = statusConfig[event.status];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-midnight/40 to-transparent" />
      </div>

      <div className="container-bp relative z-10 pb-20 pt-40 w-full">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Todos os eventos
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left — Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-badge px-3 py-1.5 text-xs font-semibold border",
                  status.bg,
                  status.color
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    event.status === "open" ? "bg-green-400 animate-pulse" : "bg-white/30"
                  )}
                />
                {status.label}
              </span>
              <span className="text-xs font-semibold text-gold/70 bg-gold/10 border border-gold/20 rounded-badge px-3 py-1.5 uppercase tracking-widest">
                {event.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
            >
              {event.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gold/80 font-semibold mb-6"
            >
              {event.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/60 leading-relaxed max-w-lg mb-8"
            >
              {event.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/50 mb-8"
            >
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-gold/60" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-gold/60" />
                {event.location}, {event.country}
              </span>
              <span className="flex items-center gap-2">
                <Users size={15} className="text-gold/60" />
                Vagas limitadas
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/contato">
                <Button variant="primary" size="lg">
                  Quero essa experiência
                </Button>
              </Link>
              <a
                href="https://wa.me/5511940440078"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <MessageCircle size={16} />
                  Falar com consultor
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right — Summary card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass rounded-xl p-6 max-w-sm ml-auto hidden lg:block"
          >
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-5">
              Resumo da experiência
            </p>
            {[
              { label: "Ingresso", value: "Incluso" },
              { label: "Hotel premium", value: "Incluso" },
              { label: "Transfer aeroporto", value: "Incluso" },
              { label: "Suporte 24h", value: "Incluso" },
              { label: "Documentação", value: "Incluso" },
              { label: "Concierge", value: "Incluso" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-white/60">{item.label}</span>
                <span className="text-sm font-semibold text-green-400">
                  ✓ {item.value}
                </span>
              </div>
            ))}
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-xs text-white/30 text-center">
                Consulte disponibilidade e valores com nossa equipe
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

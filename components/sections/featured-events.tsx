"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: "1",
    slug: "nfl-brasil-2026",
    title: "NFL Brasil 2026",
    subtitle: "Philadelphia Eagles vs Green Bay Packers",
    date: "Set 2026",
    location: "São Paulo, Brasil",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    status: "open" as const,
    category: "NFL",
  },
  {
    id: "2",
    slug: "formula1-monaco-2026",
    title: "F1 Mônaco 2026",
    subtitle: "Grand Prix de Monaco",
    date: "Mai 2026",
    location: "Monte Carlo, Monaco",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    status: "open" as const,
    category: "F1",
  },
  {
    id: "3",
    slug: "champions-league-final-2026",
    title: "Champions League Final",
    subtitle: "Final UEFA Champions League",
    date: "Jun 2026",
    location: "Wembley, Inglaterra",
    image:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200",
    status: "soon" as const,
    category: "Futebol",
  },
  {
    id: "4",
    slug: "super-bowl-2027",
    title: "Super Bowl LXI",
    subtitle: "The Big Game",
    date: "Fev 2027",
    location: "Los Angeles, EUA",
    image:
      "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=1200",
    status: "soon" as const,
    category: "NFL",
  },
];

const statusConfig = {
  open: { label: "Vagas abertas", variant: "gold" as const },
  sold: { label: "Esgotado", variant: "sold" as const },
  soon: { label: "Em breve", variant: "navy" as const },
};

export function FeaturedEvents() {
  return (
    <section className="section">
      <div className="container-bp">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
              Próximas experiências
            </p>
            <h2 className="text-4xl lg:text-[40px] font-bold text-white">
              Eventos em destaque
            </h2>
          </div>
          <Link href="/eventos">
            <Button variant="secondary" size="sm" className="group">
              Ver todos
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/eventos/${event.slug}`}>
                <article className="group relative overflow-hidden rounded-xl bg-navy border border-white/5 hover:border-gold/20 transition-all duration-300 hover:shadow-card-hover cursor-pointer">
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant={statusConfig[event.status].variant}>
                        {statusConfig[event.status].label}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="navy">{event.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-4">
                      {event.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

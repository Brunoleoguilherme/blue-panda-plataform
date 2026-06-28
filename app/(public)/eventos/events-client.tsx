"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, categories, statusConfig } from "@/lib/events-data";
import type { EventCategory } from "@/types";
import { cn } from "@/lib/utils";

type FilterCategory = EventCategory | "todos";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

export function EventsClient() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = activeCategory === "todos" || e.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase()) ||
        e.country.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Buscar evento ou destino..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 bg-navy/50 border border-white/10 rounded-btn pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-nowrap sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as FilterCategory)}
                className={cn(
                  "h-10 px-4 rounded-badge text-xs font-semibold transition-all duration-200",
                  activeCategory === cat.value
                    ? "bg-gold text-midnight"
                    : "bg-navy/50 border border-white/10 text-white/60 hover:border-gold/30 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-white/30 mb-6">
          {filtered.length} {filtered.length === 1 ? "experiência encontrada" : "experiências encontradas"}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-white/50 text-lg">Nenhum evento encontrado.</p>
              <p className="text-white/30 text-sm mt-2">
                Tente outros filtros ou entre em contato para consultar
                disponibilidade.
              </p>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setActiveCategory("todos");
                    setSearch("");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((event, i) => {
                const status = statusConfig[event.status];
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link href={`/eventos/${event.slug}`}>
                      <article className="group overflow-hidden rounded-xl bg-navy border border-white/5 hover:border-gold/20 transition-all duration-300 hover:shadow-card-hover cursor-pointer h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden flex-shrink-0">
                          <Image
                            src={event.coverImage}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />

                          {/* Status badge */}
                          <div className="absolute top-3 left-3">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-badge px-3 py-1 text-xs font-semibold border",
                                status.bg,
                                status.color
                              )}
                            >
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  event.status === "open"
                                    ? "bg-green-400"
                                    : event.status === "soldout"
                                    ? "bg-red-400"
                                    : "bg-white/30"
                                )}
                              />
                              {status.label}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <p className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-2">
                            {event.category.toUpperCase()}
                          </p>
                          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                            {event.title}
                          </h2>
                          <p className="text-sm text-white/40 mb-4">
                            {event.subtitle}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-white/30 mt-auto mb-5">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} />
                              {event.location}, {event.country}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-xs text-white/30">
                              Pacote completo incluído
                            </span>
                            <span className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                              Saiba mais
                              <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>

                        {/* Bottom accent */}
                        <div className="h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA bottom */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-4">
            Não encontrou o que procura?
          </p>
          <Link href="/contato">
            <Button variant="secondary" size="md">
              Consultar disponibilidade
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { destinos, continentes } from "@/lib/destinos-data";
import type { Continente } from "@/lib/destinos-data";
import { cn } from "@/lib/utils";

type FilterContinente = Continente | "todos";

export function DestinosClient() {
  const [ativo, setAtivo] = useState<FilterContinente>("todos");

  const filtrados = useMemo(() => {
    if (ativo === "todos") return destinos;
    return destinos.filter((d) => d.continente === ativo);
  }, [ativo]);

  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        {/* Filtros */}
        <div className="flex items-center gap-3 flex-wrap mb-10">
          {continentes.map((c) => (
            <button
              key={c.value}
              onClick={() => setAtivo(c.value as FilterContinente)}
              className={cn(
                "h-10 px-5 rounded-badge text-xs font-semibold transition-all duration-200",
                ativo === c.value
                  ? "bg-gold text-midnight"
                  : "bg-navy/50 border border-white/10 text-white/60 hover:border-gold/30 hover:text-white"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ativo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtrados.map((destino, i) => (
              <motion.div
                key={destino.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link href="/contato">
                  <article className="group overflow-hidden rounded-xl bg-navy border border-white/5 hover:border-gold/20 transition-all duration-300 hover:shadow-card-hover cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={destino.imagem}
                        alt={destino.cidade}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                      {/* Flag + events count */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-xl">{destino.bandeira}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-semibold text-gold bg-midnight/80 border border-gold/20 rounded-badge px-2 py-1">
                          {destino.eventos} evento{destino.eventos > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h2 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                            {destino.cidade}
                          </h2>
                          <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />
                            {destino.pais}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
                        {destino.descricao}
                      </p>

                      {/* Destaques */}
                      <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                        {destino.destaques.slice(0, 3).map((d) => (
                          <span
                            key={d}
                            className="text-[10px] text-white/40 bg-white/5 border border-white/8 rounded-badge px-2 py-0.5"
                          >
                            {d}
                          </span>
                        ))}
                        {destino.destaques.length > 3 && (
                          <span className="text-[10px] text-white/30 px-1">
                            +{destino.destaques.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-end pt-3 border-t border-white/5">
                        <span className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                          Ver experiências <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>

                    <div className="h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mapa CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-xl border border-white/5 bg-navy/30 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Não encontrou seu destino?
            </p>
            <p className="text-white/40 text-sm">
              A Blue Panda opera em mais de 15 países. Entre em contato e
              planejamos a sua experiência.
            </p>
          </div>
          <Link href="/contato">
            <button className="flex-shrink-0 h-12 px-6 rounded-btn bg-gradient-gold text-midnight text-sm font-bold hover:brightness-110 transition-all">
              Consultar destino
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

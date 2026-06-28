"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { posts, categoriasBlog, formatarData } from "@/lib/blog-data";
import type { PostCategoria } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

type FilterCat = PostCategoria | "todos";

export function BlogClient() {
  const [ativo, setAtivo] = useState<FilterCat>("todos");

  const destaque = posts.find((p) => p.destaque);
  const filtrados = useMemo(() => {
    const lista = posts.filter((p) => !p.destaque);
    if (ativo === "todos") return lista;
    return lista.filter((p) => p.categoria === ativo);
  }, [ativo]);

  return (
    <section className="section bg-midnight">
      <div className="container-bp">

        {/* Post destaque */}
        {destaque && ativo === "todos" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <Link href={`/blog/${destaque.slug}`}>
              <article className="group grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-300 hover:shadow-card-hover cursor-pointer">
                {/* Image */}
                <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  <Image
                    src={destaque.imagem}
                    alt={destaque.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="bg-navy p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold text-gold bg-gold/10 border border-gold/20 rounded-badge px-3 py-1 uppercase tracking-widest">
                      Destaque
                    </span>
                    <span className="text-xs text-white/30 capitalize">
                      {destaque.categoria}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug">
                    {destaque.titulo}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-6">
                    {destaque.resumo}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatarData(destaque.publicadoEm)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {destaque.tempoLeitura} min de leitura
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                      Ler artigo <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        )}

        {/* Filtros */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categoriasBlog.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setAtivo(cat.value as FilterCat)}
              className={cn(
                "h-9 px-4 rounded-badge text-xs font-semibold transition-all duration-200",
                ativo === cat.value
                  ? "bg-gold text-midnight"
                  : "bg-navy/50 border border-white/10 text-white/60 hover:border-gold/30 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtrados.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-white/30 text-lg">
                Nenhum artigo nessa categoria ainda.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={ativo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtrados.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group overflow-hidden rounded-xl bg-navy border border-white/5 hover:border-gold/20 transition-all duration-300 hover:shadow-card cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <Image
                          src={post.imagem}
                          alt={post.titulo}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-semibold text-white/70 bg-midnight/70 rounded-badge px-2.5 py-1 capitalize">
                            {post.categoria}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug">
                          {post.titulo}
                        </h2>
                        <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4 line-clamp-3">
                          {post.resumo}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3 text-xs text-white/30">
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {post.tempoLeitura} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {formatarData(post.publicadoEm)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                            Ler <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>

                      <div className="h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

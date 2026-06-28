"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const experiencias = [
  {
    slug: "como-e-viver-um-super-bowl",
    categoria: "NFL",
    titulo: "Como é viver um Super Bowl",
    descricao:
      "O maior espetáculo do entretenimento mundial. Não é apenas um jogo — é uma semana inteira de emoções, shows, festas e cultura americana na sua forma mais intensa.",
    imagem:
      "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=1200",
    destaque: "Experiência completa de 7 dias",
    cor: "from-blue-900/80",
  },
  {
    slug: "como-e-assistir-formula1-monaco",
    categoria: "Fórmula 1",
    titulo: "Como é a F1 em Mônaco",
    descricao:
      "Ruas estreitas, iate no porto, o ronco dos motores a centímetros de você. Mônaco transforma o esporte em arte — e você estará dentro dessa obra.",
    imagem:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    destaque: "O circuito mais glamouroso da história",
    cor: "from-red-900/80",
  },
  {
    slug: "como-e-uma-final-da-champions",
    categoria: "Futebol",
    titulo: "Uma final da Champions League",
    descricao:
      "Hinos europeus, torcedores de todo o mundo, a tensão dos pênaltis. Estar em um estádio em uma final da Champions é uma experiência que define gerações.",
    imagem:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200",
    destaque: "O maior palco do futebol mundial",
    cor: "from-green-900/80",
  },
  {
    slug: "como-e-a-nfl-no-brasil",
    categoria: "NFL",
    titulo: "A NFL no Brasil",
    descricao:
      "O futebol americano chegou ao Brasil — e com ele a maior festa esportiva que São Paulo já recebeu. Ingresso, pacote premium e a melhor localização no estádio.",
    imagem:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    destaque: "O maior evento esportivo do país",
    cor: "from-indigo-900/80",
  },
  {
    slug: "como-e-o-us-open-de-tenis",
    categoria: "Tênis",
    titulo: "O US Open em Nova York",
    descricao:
      "Nova York em agosto é pura energia. O US Open combina o melhor do tênis mundial com a cidade mais vibrante do planeta. Uma semana inesquecível.",
    imagem:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200",
    destaque: "Grand Slam + Manhattan",
    cor: "from-yellow-900/80",
  },
  {
    slug: "como-e-as-finais-da-nba",
    categoria: "NBA",
    titulo: "As Finais da NBA",
    descricao:
      "A quadra mais famosa do mundo, os maiores atletas do planeta, a emoção dos últimos segundos. Estar em uma final da NBA é entrar para a história.",
    imagem:
      "https://images.unsplash.com/photo-1546519638405-a1d748e3f3b1?q=80&w=1200",
    destaque: "A maior liga de basquete do mundo",
    cor: "from-purple-900/80",
  },
];

export function ExperienciasGrid() {
  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        {/* Featured — first item large */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {experiencias.slice(0, 2).map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/experiencias/${exp.slug}`}>
                <article className="group relative overflow-hidden rounded-xl h-[420px] cursor-pointer">
                  <Image
                    src={exp.imagem}
                    alt={exp.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${exp.cor} via-transparent to-transparent`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block text-xs font-semibold text-gold/80 uppercase tracking-widest mb-3 bg-gold/10 border border-gold/20 rounded-badge px-3 py-1">
                      {exp.categoria}
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                      {exp.titulo}
                    </h2>
                    <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
                      {exp.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{exp.destaque}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                        Descobrir <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Remaining — 4 smaller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiencias.slice(2).map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/experiencias/${exp.slug}`}>
                <article className="group relative overflow-hidden rounded-xl h-72 cursor-pointer">
                  <Image
                    src={exp.imagem}
                    alt={exp.titulo}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-semibold text-gold/70 uppercase tracking-widest block mb-2">
                      {exp.categoria}
                    </span>
                    <h2 className="text-base font-bold text-white group-hover:text-gold transition-colors leading-snug mb-1">
                      {exp.titulo}
                    </h2>
                    <span className="text-xs text-white/30">{exp.destaque}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const equipe = [
  {
    nome: "Curadoria Esportiva",
    cargo: "Especialistas em Eventos",
    bio: "Time dedicado a selecionar e curar os melhores eventos esportivos do mundo, garantindo experiências únicas e inesquecíveis para cada cliente.",
    foto: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Equipe Comercial",
    cargo: "Consultores de Experiência",
    bio: "Especialistas em eventos esportivos internacionais, prontos para criar o pacote perfeito para você.",
    foto: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400",
    linkedin: "#",
    instagram: "#",
  },
  {
    nome: "Equipe de Operações",
    cargo: "Logística & Suporte",
    bio: "Garantimos que cada detalhe da sua viagem esteja perfeito, do embarque ao retorno.",
    foto: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=400",
    linkedin: "#",
    instagram: "#",
  },
];

export function SobreEquipe() {
  return (
    <section className="section bg-midnight">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            As pessoas por trás
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Nossa equipe
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            Pessoas apaixonadas por esportes e comprometidas em entregar
            a melhor experiência possível para cada cliente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {equipe.map((membro, i) => (
            <motion.div
              key={membro.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group text-center"
            >
              {/* Foto */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 group-hover:opacity-40 transition-opacity blur-md" />
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20 group-hover:border-gold/50 transition-colors">
                  <Image
                    src={membro.foto}
                    alt={membro.nome}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {membro.nome}
              </h3>
              <p className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-3">
                {membro.cargo}
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                {membro.bio}
              </p>

              {/* Social */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href={membro.linkedin}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={membro.instagram}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

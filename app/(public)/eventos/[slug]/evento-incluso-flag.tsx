"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Hotel,
  Car,
  Headphones,
  FileText,
  Utensils,
  Camera,
  Trophy,
  Heart,
} from "lucide-react";

const inclusos = [
  {
    icon: Hotel,
    titulo: "Hospedagem para o time",
    descricao: "Pacotes de hospedagem coletiva ou individual para delegações, com localização estratégica.",
  },
  {
    icon: Car,
    titulo: "Transfer para o campo",
    descricao: "Transporte organizado entre hotel e campos de jogo durante todos os dias do campeonato.",
  },
  {
    icon: Users,
    titulo: "Estrutura para delegações",
    descricao: "Apoio logístico completo para times: alimentação, vestiário, materiais e orientação no evento.",
  },
  {
    icon: FileText,
    titulo: "Documentação e credenciamento",
    descricao: "Orientação completa para inscrição, documentos, uniformes e regras do campeonato.",
  },
  {
    icon: Utensils,
    titulo: "Alimentação e refeições",
    descricao: "Pacotes de refeições disponíveis para atletas e comissão técnica durante o evento.",
  },
  {
    icon: Camera,
    titulo: "Experiência e cobertura",
    descricao: "Registro fotográfico e de vídeo dos jogos. Memórias que durarão para sempre.",
  },
  {
    icon: Headphones,
    titulo: "Suporte Blue Panda 24h",
    descricao: "Nossa equipe dedicada ao seu time em todos os dias do campeonato.",
  },
  {
    icon: Trophy,
    titulo: "Cerimônias e premiações",
    descricao: "Acesso a todas as cerimônias oficiais, incluindo abertura, encerramento e premiação.",
  },
  {
    icon: Heart,
    titulo: "Experiência premium",
    descricao: "A Blue Panda é patrocinadora oficial. Seu time terá acesso a benefícios exclusivos.",
  },
];

export function EventoInclusoFlag() {
  return (
    <section className="section bg-[#060f22]">
      <div className="container-bp">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            Experiência para times
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            O que a Blue Panda oferece
          </h2>
          <p className="text-white/50 leading-relaxed">
            O evento é gratuito para torcedores. A Blue Panda cuida de tudo o que envolve a experiência do seu time — hospedagem, transfers, alimentação e suporte dedicado antes, durante e depois do campeonato.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {inclusos.map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-6 rounded-xl border border-white/5 bg-navy/30 hover:border-gold/20 hover:bg-navy/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                <item.icon size={18} className="text-gold" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{item.titulo}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{item.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

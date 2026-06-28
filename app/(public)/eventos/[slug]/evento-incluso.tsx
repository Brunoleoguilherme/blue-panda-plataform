"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Hotel,
  Car,
  Headphones,
  FileText,
  Utensils,
  Camera,
  Shield,
} from "lucide-react";

const inclusos = [
  {
    icon: Ticket,
    titulo: "Ingresso oficial",
    descricao: "Ingressos 100% autênticos nas melhores categorias disponíveis.",
  },
  {
    icon: Hotel,
    titulo: "Hotel premium",
    descricao: "Hospedagem selecionada próxima ao evento com café da manhã incluso.",
  },
  {
    icon: Car,
    titulo: "Transfer completo",
    descricao: "Transporte aeroporto → hotel → evento → hotel → aeroporto.",
  },
  {
    icon: Headphones,
    titulo: "Suporte 24 horas",
    descricao: "Equipe disponível em todo momento durante a sua viagem.",
  },
  {
    icon: FileText,
    titulo: "Documentação",
    descricao: "Organização completa de documentos, vouchers e roteiros no portal.",
  },
  {
    icon: Utensils,
    titulo: "Experiência gastronômica",
    descricao: "Indicações e reservas nos melhores restaurantes do destino.",
  },
  {
    icon: Camera,
    titulo: "Experiências exclusivas",
    descricao: "Acesso a áreas especiais, hospitality e bastidores quando disponível.",
  },
  {
    icon: Shield,
    titulo: "Segurança total",
    descricao: "Contratos claros, parceiros homologados e total proteção ao cliente.",
  },
];

export function EventoIncluso() {
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
            Pacote completo
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            O que está incluso
          </h2>
          <p className="text-white/50 leading-relaxed">
            Cuidamos de cada detalhe para que você cuide apenas de viver o
            momento. Nada de surpresas. Nada de improviso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inclusos.map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
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

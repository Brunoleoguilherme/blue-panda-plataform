"use client";

import React from "react";
import { motion } from "framer-motion";

const numeros = [
  { valor: "500+", label: "Clientes atendidos", desc: "Em todo o Brasil" },
  { valor: "30+", label: "Eventos realizados", desc: "Em 4 continentes" },
  { valor: "15+", label: "Países visitados", desc: "E crescendo" },
  { valor: "4.9★", label: "Avaliação média", desc: "No Google Reviews" },
  { valor: "5 anos", label: "De mercado", desc: "Experiência comprovada" },
  { valor: "100%", label: "Satisfação", desc: "Garantida" },
];

export function SobreNumeros() {
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
            Em números
          </p>
          <h2 className="text-4xl font-bold text-white">
            Resultados que falam por si
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {numeros.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-6 rounded-xl border border-white/5 bg-navy/30 hover:border-gold/15 transition-colors"
            >
              <p className="text-3xl font-bold text-gold mb-1">{n.valor}</p>
              <p className="text-sm font-semibold text-white mb-1">{n.label}</p>
              <p className="text-xs text-white/30">{n.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

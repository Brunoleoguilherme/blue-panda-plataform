"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "500+", label: "Experiências entregues" },
  { value: "5 anos", label: "De mercado" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "100%", label: "Satisfação garantida" },
];

const partners = [
  "UEFA",
  "NFL Brasil",
  "Formula 1",
  "NBA",
  "US Open",
  "Copa do Mundo",
];

export function SocialProof() {
  return (
    <section className="section bg-navy/30">
      <div className="container-bp">
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-8">
            Vivências esportivas que clientes Blue Panda vivenciaram
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-white/25 font-bold text-sm tracking-wider uppercase hover:text-gold/60 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-16" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold text-gold mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, CheckCircle, Clock } from "lucide-react";

const items = [
  { label: "Ingresso", status: "done" },
  { label: "Hotel", status: "done" },
  { label: "Transfer", status: "done" },
  { label: "Voo", status: "pending" },
  { label: "Check-in", status: "pending" },
];

export function DashboardHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/5"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200"
          alt="NFL Brasil 2026"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/80 to-midnight/40" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Info */}
          <div>
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">
              Sua próxima experiência
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              NFL Brasil 2026
            </h2>
            <p className="text-white/50 text-sm mb-4">
              Philadelphia Eagles vs Green Bay Packers
            </p>
            <div className="flex items-center gap-5 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-gold/60" />
                05 de Setembro de 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gold/60" />
                São Paulo, Brasil
              </span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex-shrink-0 text-center lg:text-right">
            <div className="inline-flex items-center gap-1 bg-gold/10 border border-gold/20 rounded-xl px-5 py-3">
              <span className="text-4xl font-bold text-gold">35</span>
              <span className="text-sm text-gold/60 ml-1">dias</span>
            </div>
            <p className="text-xs text-white/25 mt-2">para o grande dia</p>
          </div>
        </div>

        {/* Progress items */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-badge border text-xs font-semibold ${
                item.status === "done"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-white/5 border-white/10 text-white/30"
              }`}
            >
              {item.status === "done" ? (
                <CheckCircle size={11} />
              ) : (
                <Clock size={11} />
              )}
              {item.label}
            </div>
          ))}

          <Link
            href="/cliente/experiencias"
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gold hover:gap-2.5 transition-all"
          >
            Ver detalhes <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

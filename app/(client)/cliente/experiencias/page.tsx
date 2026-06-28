"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const experiencias = [
  {
    id: 1,
    evento: "NFL Brasil 2026",
    subtitulo: "Philadelphia Eagles vs Green Bay Packers",
    local: "São Paulo, Brasil",
    data: "05–07 Set 2026",
    imagem:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800",
    status: "confirmado" as const,
    avaliacao: null,
    itens: [
      { label: "Ingresso VIP", ok: true },
      { label: "Hotel 5★", ok: true },
      { label: "Transfer", ok: true },
      { label: "Voo", ok: false },
      { label: "Check-in", ok: false },
    ],
  },
  {
    id: 2,
    evento: "F1 Monaco GP 2025",
    subtitulo: "Grand Prix de Monaco",
    local: "Monte Carlo, Mônaco",
    data: "23–26 Mai 2025",
    imagem:
      "https://images.unsplash.com/photo-1541889413457-4aec9de0f929?q=80&w=800",
    status: "concluido" as const,
    avaliacao: 5,
    itens: [],
  },
];

const statusConfig = {
  confirmado: {
    label: "Confirmado",
    cls: "bg-gold/10 border-gold/20 text-gold",
  },
  concluido: {
    label: "Concluído",
    cls: "bg-green-500/10 border-green-500/20 text-green-400",
  },
};

export default function ExperienciasClientePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Minhas Experiências</h1>
        <p className="text-white/40 text-sm">
          Todas as suas aventuras passadas e futuras.
        </p>
      </div>

      <div className="space-y-4">
        {experiencias.map((exp) => {
          const cfg = statusConfig[exp.status];
          return (
            <div
              key={exp.id}
              className="rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-40 sm:h-auto sm:w-48 flex-shrink-0">
                  <Image
                    src={exp.imagem}
                    alt={exp.evento}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-midnight/40" />
                </div>

                {/* Info */}
                <div className="flex-1 p-5 bg-navy/20">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-badge border mb-2 ${cfg.cls}`}
                      >
                        {cfg.label}
                      </span>
                      <h2 className="text-base font-bold text-white leading-tight">
                        {exp.evento}
                      </h2>
                      <p className="text-sm text-white/40">{exp.subtitulo}</p>
                    </div>

                    {exp.avaliacao && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {Array.from({ length: exp.avaliacao }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-gold fill-gold"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-5 text-xs text-white/35 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-gold/50" />
                      {exp.data}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-gold/50" />
                      {exp.local}
                    </span>
                  </div>

                  {exp.itens.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.itens.map((item) => (
                        <span
                          key={item.label}
                          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-badge border font-medium ${
                            item.ok
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : "bg-white/5 border-white/10 text-white/30"
                          }`}
                        >
                          {item.ok ? (
                            <CheckCircle size={10} />
                          ) : (
                            <Clock size={10} />
                          )}
                          {item.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="p-6 rounded-xl border border-gold/10 bg-gold/5 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white text-sm">
            Quer viver mais uma experiência?
          </p>
          <p className="text-xs text-white/40 mt-0.5">
            Explore nossos próximos eventos e destinos.
          </p>
        </div>
        <Link
          href="/eventos"
          className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:gap-2.5 transition-all flex-shrink-0"
        >
          Ver eventos <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

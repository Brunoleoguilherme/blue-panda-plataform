"use client";

import React from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";

const etapas = [
  { label: "Reserva confirmada", data: "10 Jan 2026", status: "done" },
  { label: "Pagamento — Parcela 1", data: "10 Fev 2026", status: "done" },
  { label: "Pagamento — Parcela 2", data: "10 Mar 2026", status: "done" },
  { label: "Documentação entregue", data: "15 Abr 2026", status: "done" },
  { label: "Ingressos emitidos", data: "01 Jun 2026", status: "done" },
  { label: "Voos confirmados", data: "01 Jul 2026", status: "pending" },
  { label: "Check-in online", data: "03 Set 2026", status: "pending" },
  { label: "Viagem — NFL Brasil 2026", data: "05 Set 2026", status: "upcoming" },
  { label: "Retorno para casa", data: "07 Set 2026", status: "upcoming" },
];

export function DashboardTimeline() {
  return (
    <div className="rounded-xl border border-white/5 bg-navy/20 p-6">
      <h3 className="text-sm font-bold text-white mb-6">Linha do tempo</h3>

      <div className="space-y-1">
        {etapas.map((etapa, i) => (
          <div key={etapa.label} className="relative flex gap-4">
            {/* Line */}
            {i < etapas.length - 1 && (
              <div className="absolute left-[10px] top-6 bottom-0 w-px bg-white/5" />
            )}

            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5 z-10">
              {etapa.status === "done" ? (
                <CheckCircle size={20} className="text-green-400" />
              ) : etapa.status === "pending" ? (
                <Clock size={20} className="text-gold/60" />
              ) : (
                <Circle size={20} className="text-white/15" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <span
                className={`text-sm font-medium ${
                  etapa.status === "done"
                    ? "text-white/70"
                    : etapa.status === "pending"
                    ? "text-white"
                    : "text-white/25"
                }`}
              >
                {etapa.label}
              </span>
              <span className="text-xs text-white/25 flex-shrink-0 ml-4">
                {etapa.data}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

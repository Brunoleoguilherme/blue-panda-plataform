"use client";

import React from "react";
import { CheckCircle, Clock, CreditCard, Download } from "lucide-react";

const parcelas = [
  { numero: 1, valor: "R$ 5.000", vencimento: "10/02/2026", status: "pago" },
  { numero: 2, valor: "R$ 5.000", vencimento: "10/03/2026", status: "pago" },
  { numero: 3, valor: "R$ 5.000", vencimento: "10/04/2026", status: "pago" },
  { numero: 4, valor: "R$ 5.000", vencimento: "10/05/2026", status: "pendente" },
];

const total = 20000;
const pago = 15000;
const percentual = Math.round((pago / total) * 100);

export default function PagamentosPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Pagamentos</h1>
        <p className="text-white/40 text-sm">Acompanhe suas parcelas e comprovantes.</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total do pacote", value: "R$ 20.000", color: "text-white" },
          { label: "Valor pago", value: "R$ 15.000", color: "text-green-400" },
          { label: "Saldo restante", value: "R$ 5.000", color: "text-gold" },
        ].map((item) => (
          <div key={item.label} className="p-5 rounded-xl border border-white/5 bg-navy/30">
            <p className="text-xs text-white/40 mb-2">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="p-6 rounded-xl border border-white/5 bg-navy/30">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-white">Progresso do pagamento</p>
          <p className="text-sm font-bold text-gold">{percentual}%</p>
        </div>
        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-gold rounded-full transition-all duration-700"
            style={{ width: `${percentual}%` }}
          />
        </div>
        <p className="text-xs text-white/30 mt-2">3 de 4 parcelas pagas</p>
      </div>

      {/* Parcelas */}
      <div className="rounded-xl border border-white/5 bg-navy/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Parcelas</h2>
        </div>
        <div className="divide-y divide-white/5">
          {parcelas.map((p) => (
            <div key={p.numero} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center border border-white/5">
                  <CreditCard size={16} className="text-white/30" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Parcela {p.numero}</p>
                  <p className="text-xs text-white/35">Vencimento: {p.vencimento}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-white">{p.valor}</p>
                {p.status === "pago" ? (
                  <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-badge px-3 py-1">
                    <CheckCircle size={11} /> Pago
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-gold bg-gold/10 border border-gold/20 rounded-badge px-3 py-1">
                    <Clock size={11} /> Pendente
                  </span>
                )}
                {p.status === "pago" && (
                  <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 transition-colors">
                    <Download size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

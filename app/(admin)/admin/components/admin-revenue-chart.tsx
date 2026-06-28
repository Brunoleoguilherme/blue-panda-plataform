"use client";

import React from "react";

const data = [
  { mes: "Jan", valor: 180000 },
  { mes: "Fev", valor: 210000 },
  { mes: "Mar", valor: 195000 },
  { mes: "Abr", valor: 240000 },
  { mes: "Mai", valor: 220000 },
  { mes: "Jun", valor: 284000 },
];

const max = Math.max(...data.map((d) => d.valor));

function fmt(v: number) {
  return `R$ ${(v / 1000).toFixed(0)}k`;
}

export function AdminRevenueChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-white">Receita mensal</h2>
        <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-badge px-2 py-0.5">
          +12% vs mai
        </span>
      </div>

      <div className="flex items-end gap-3 h-40">
        {data.map((d, i) => {
          const height = (d.valor / max) * 100;
          const isLast = i === data.length - 1;
          return (
            <div key={d.mes} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-white/30">{fmt(d.valor)}</span>
              <div className="w-full relative group">
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isLast
                      ? "bg-gradient-to-t from-gold to-gold-light"
                      : "bg-white/10 group-hover:bg-white/15"
                  }`}
                  style={{ height: `${height * 0.9}px` }}
                />
              </div>
              <span className="text-[10px] text-white/30">{d.mes}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

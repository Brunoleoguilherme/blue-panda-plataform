"use client";

import React, { useState, useMemo } from "react";
import { Search, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

const reservas = [
  { id: "R-001", cliente: "João Silva", email: "joao@email.com", evento: "NFL Brasil 2026", pacote: "VIP", valor: "R$ 20.000", pago: "R$ 15.000", status: "confirmado", data: "28/06/2026" },
  { id: "R-002", cliente: "Maria Oliveira", email: "maria@email.com", evento: "Champions Final", pacote: "Premium", valor: "R$ 18.500", pago: "R$ 9.250", status: "aguardando", data: "27/06/2026" },
  { id: "R-003", cliente: "Carlos Mendes", email: "carlos@email.com", evento: "US Open 2026", pacote: "Standard", valor: "R$ 15.000", pago: "R$ 15.000", status: "confirmado", data: "26/06/2026" },
  { id: "R-004", cliente: "Ana Costa", email: "ana@email.com", evento: "NFL Brasil 2026", pacote: "Standard", valor: "R$ 20.000", pago: "R$ 5.000", status: "pendente", data: "25/06/2026" },
  { id: "R-005", cliente: "Pedro Santos", email: "pedro@email.com", evento: "Super Bowl LXI", pacote: "VIP", valor: "R$ 28.000", pago: "R$ 28.000", status: "confirmado", data: "24/06/2026" },
  { id: "R-006", cliente: "Fernanda Lima", email: "fernanda@email.com", evento: "F1 Monaco 2026", pacote: "Premium", valor: "R$ 22.000", pago: "R$ 0", status: "cancelado", data: "23/06/2026" },
];

const statusCfg = {
  confirmado: { cls: "text-green-400 bg-green-500/10 border-green-500/20", icon: CheckCircle },
  aguardando: { cls: "text-gold bg-gold/10 border-gold/20", icon: Clock },
  pendente: { cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Clock },
  cancelado: { cls: "text-red-400 bg-red-500/10 border-red-500/20", icon: XCircle },
};

export default function ReservasPage() {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const filtradas = useMemo(
    () =>
      reservas.filter((r) => {
        const matchSearch =
          r.cliente.toLowerCase().includes(search.toLowerCase()) ||
          r.evento.toLowerCase().includes(search.toLowerCase()) ||
          r.id.toLowerCase().includes(search.toLowerCase());
        const matchFiltro = filtro === "todos" || r.status === filtro;
        return matchSearch && matchFiltro;
      }),
    [search, filtro]
  );

  const totalReceita = reservas
    .filter((r) => r.status !== "cancelado")
    .reduce((acc) => acc, 0);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Reservas</h1>
        <p className="text-white/35 text-sm">{reservas.length} reservas no total</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Confirmadas", count: reservas.filter((r) => r.status === "confirmado").length, cls: "text-green-400" },
          { label: "Aguardando", count: reservas.filter((r) => r.status === "aguardando").length, cls: "text-gold" },
          { label: "Pendentes", count: reservas.filter((r) => r.status === "pendente").length, cls: "text-blue-400" },
          { label: "Canceladas", count: reservas.filter((r) => r.status === "cancelado").length, cls: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-white/5 bg-[#080d1a]">
            <p className={`text-2xl font-bold ${s.cls}`}>{s.count}</p>
            <p className="text-xs text-white/35 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, evento ou ID..."
            className="w-full h-10 bg-[#080d1a] border border-white/10 rounded-btn pl-9 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["todos", "confirmado", "aguardando", "pendente", "cancelado"].map((s) => (
            <button
              key={s}
              onClick={() => setFiltro(s)}
              className={`h-10 px-3 rounded-btn text-xs font-semibold capitalize transition-all ${
                filtro === s ? "bg-gold text-midnight" : "border border-white/10 text-white/40 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["ID", "Cliente", "Evento", "Pacote", "Valor", "Pago", "Status", "Data", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtradas.map((r) => {
              const cfg = statusCfg[r.status as keyof typeof statusCfg];
              return (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-xs font-mono text-white/30">{r.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-white">{r.cliente}</p>
                    <p className="text-xs text-white/25">{r.email}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-white/50">{r.evento}</td>
                  <td className="px-5 py-3 text-xs text-white/40">{r.pacote}</td>
                  <td className="px-5 py-3 text-sm font-bold text-white">{r.valor}</td>
                  <td className="px-5 py-3 text-sm font-bold text-gold">{r.pago}</td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1.5 w-fit text-xs font-semibold rounded-badge border px-2.5 py-1 capitalize ${cfg.cls}`}>
                      <cfg.icon size={11} /> {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-white/25">{r.data}</td>
                  <td className="px-5 py-3">
                    <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 transition-colors">
                      <Eye size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

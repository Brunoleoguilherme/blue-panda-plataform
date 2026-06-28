"use client";

import React, { useState, useMemo } from "react";
import { Search, Download, MessageCircle, Eye, UserPlus } from "lucide-react";

const clientes = [
  { id: 1, nome: "João Silva", email: "joao@email.com", whatsapp: "+5511999990001", eventos: 3, gasto: "R$ 60.000", status: "ativo", ultimo: "28/06/2026" },
  { id: 2, nome: "Maria Oliveira", email: "maria@email.com", whatsapp: "+5511999990002", eventos: 1, gasto: "R$ 18.500", status: "ativo", ultimo: "27/06/2026" },
  { id: 3, nome: "Carlos Mendes", email: "carlos@email.com", whatsapp: "+5511999990003", eventos: 2, gasto: "R$ 35.000", status: "ativo", ultimo: "26/06/2026" },
  { id: 4, nome: "Ana Costa", email: "ana@email.com", whatsapp: "+5511999990004", eventos: 1, gasto: "R$ 20.000", status: "pendente", ultimo: "25/06/2026" },
  { id: 5, nome: "Pedro Santos", email: "pedro@email.com", whatsapp: "+5511999990005", eventos: 4, gasto: "R$ 92.000", status: "ativo", ultimo: "24/06/2026" },
  { id: 6, nome: "Fernanda Lima", email: "fernanda@email.com", whatsapp: "+5511999990006", eventos: 2, gasto: "R$ 41.000", status: "ativo", ultimo: "23/06/2026" },
  { id: 7, nome: "Rafael Torres", email: "rafael@email.com", whatsapp: "+5511999990007", eventos: 1, gasto: "R$ 28.000", status: "inativo", ultimo: "01/01/2026" },
];

const statusCfg = {
  ativo: "text-green-400 bg-green-500/10 border-green-500/20",
  pendente: "text-gold bg-gold/10 border-gold/20",
  inativo: "text-white/30 bg-white/5 border-white/10",
};

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const filtrados = useMemo(
    () =>
      clientes.filter((c) => {
        const matchSearch =
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
          filtroStatus === "todos" || c.status === filtroStatus;
        return matchSearch && matchStatus;
      }),
    [search, filtroStatus]
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Clientes</h1>
          <p className="text-white/35 text-sm">{clientes.length} clientes cadastrados</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-9 px-3 rounded-btn border border-white/10 text-white/40 text-xs hover:text-white transition-colors">
            <Download size={13} /> Exportar
          </button>
          <button className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors">
            <UserPlus size={13} /> Novo cliente
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full h-10 bg-[#080d1a] border border-white/10 rounded-btn pl-9 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {["todos", "ativo", "pendente", "inativo"].map((s) => (
            <button
              key={s}
              onClick={() => setFiltroStatus(s)}
              className={`h-10 px-4 rounded-btn text-xs font-semibold capitalize transition-all ${
                filtroStatus === s
                  ? "bg-gold text-midnight"
                  : "border border-white/10 text-white/40 hover:text-white"
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
              {["Nome", "Contato", "Eventos", "Total gasto", "Status", "Último acesso", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtrados.map((c) => {
              const cls = statusCfg[c.status as keyof typeof statusCfg];
              return (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xs font-bold">{c.nome[0]}</span>
                      </div>
                      <span className="text-sm font-semibold text-white">{c.nome}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-xs text-white/50">{c.email}</p>
                    <p className="text-xs text-white/25">{c.whatsapp}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-white/50 text-center">{c.eventos}</td>
                  <td className="px-5 py-3 text-sm font-bold text-gold">{c.gasto}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold rounded-badge border px-2.5 py-1 capitalize ${cls}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-white/25">{c.ultimo}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-green-400 hover:border-green-500/30 transition-colors"
                      >
                        <MessageCircle size={12} />
                      </a>
                      <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 transition-colors">
                        <Eye size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-white/25 text-sm">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

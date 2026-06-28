"use client";

import React, { useState } from "react";
import { Send, Mail, Users, BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const campanhas = [
  { nome: "Lançamento NFL Brasil 2026", tipo: "email", enviados: 312, abertos: 198, cliques: 87, data: "15/06/2026", status: "enviado" },
  { nome: "Oferta exclusiva F1 Monaco", tipo: "email", enviados: 150, abertos: 102, cliques: 45, data: "10/06/2026", status: "enviado" },
  { nome: "Boas-vindas Champions Final", tipo: "email", enviados: 67, abertos: 67, cliques: 32, data: "05/06/2026", status: "enviado" },
  { nome: "Newsletter Julho 2026", tipo: "email", enviados: 0, abertos: 0, cliques: 0, data: "—", status: "rascunho" },
];

const statusCfg = {
  enviado: "text-green-400 bg-green-500/10 border-green-500/20",
  rascunho: "text-white/30 bg-white/5 border-white/10",
  agendado: "text-gold bg-gold/10 border-gold/20",
};

export default function MarketingPage() {
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleEnviar() {
    if (!assunto || !corpo) return;
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1500));
    setEnviando(false);
    setEnviado(true);
    setAssunto("");
    setCorpo("");
    setTimeout(() => setEnviado(false), 3000);
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Marketing</h1>
          <p className="text-white/35 text-sm">Campanhas de e-mail via Resend</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors">
          <Plus size={13} /> Nova campanha
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "E-mails enviados (mês)", value: "529", icon: Mail, color: "text-blue-400" },
          { label: "Taxa de abertura", value: "63%", icon: BarChart3, color: "text-gold" },
          { label: "Assinantes ativos", value: "312", icon: Users, color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-white/5 bg-[#080d1a]">
            <s.icon size={16} className={`${s.color} mb-3`} />
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/35 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick send */}
      <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
        <h2 className="text-sm font-bold text-white mb-5">Envio rápido — todos os clientes</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Assunto</label>
            <input
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Ex: Novidade exclusiva Blue Panda"
              className="w-full h-11 bg-navy/50 border border-white/10 rounded-btn px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Mensagem</label>
            <textarea
              value={corpo}
              onChange={(e) => setCorpo(e.target.value)}
              rows={4}
              placeholder="Escreva a mensagem para seus clientes..."
              className="w-full bg-navy/50 border border-white/10 rounded-btn px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="md"
              loading={enviando}
              onClick={handleEnviar}
              className="flex items-center gap-2"
            >
              <Send size={14} />
              {enviando ? "Enviando..." : "Enviar para todos"}
            </Button>
            {enviado && (
              <span className="text-xs text-green-400 font-semibold">✓ E-mail enviado com sucesso!</span>
            )}
          </div>
        </div>
      </div>

      {/* Campaigns */}
      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Campanhas recentes</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Campanha", "Enviados", "Abertos", "Cliques", "Taxa", "Data", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campanhas.map((c) => {
              const taxa = c.enviados > 0 ? Math.round((c.abertos / c.enviados) * 100) : 0;
              const cls = statusCfg[c.status as keyof typeof statusCfg];
              return (
                <tr key={c.nome} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm font-semibold text-white">{c.nome}</td>
                  <td className="px-5 py-3 text-sm text-white/50">{c.enviados || "—"}</td>
                  <td className="px-5 py-3 text-sm text-white/50">{c.abertos || "—"}</td>
                  <td className="px-5 py-3 text-sm text-white/50">{c.cliques || "—"}</td>
                  <td className="px-5 py-3 text-sm font-bold text-gold">{c.enviados ? `${taxa}%` : "—"}</td>
                  <td className="px-5 py-3 text-xs text-white/30">{c.data}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold rounded-badge border px-2.5 py-1 capitalize ${cls}`}>
                      {c.status}
                    </span>
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

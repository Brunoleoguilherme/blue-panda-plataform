"use client";

import React from "react";
import { FileText, Download, CheckCircle, Clock, Eye } from "lucide-react";

const documentos = [
  {
    nome: "Passaporte",
    descricao: "Verificação realizada pela equipe",
    status: "ok",
    data: "15 Abr 2026",
    tipo: "ID",
  },
  {
    nome: "Seguro Viagem",
    descricao: "Apólice — válida até 07/09/2026",
    status: "ok",
    data: "20 Abr 2026",
    tipo: "PDF",
    download: true,
  },
  {
    nome: "Ingresso NFL",
    descricao: "Philadelphia Eagles vs Green Bay Packers",
    status: "ok",
    data: "01 Jun 2026",
    tipo: "PDF",
    download: true,
  },
  {
    nome: "Voucher Hotel",
    descricao: "Hotel Unique — São Paulo, 5 a 7 Set",
    status: "ok",
    data: "10 Jun 2026",
    tipo: "PDF",
    download: true,
  },
  {
    nome: "Voucher Transfer",
    descricao: "Aeroporto → Hotel (ida e volta)",
    status: "ok",
    data: "10 Jun 2026",
    tipo: "PDF",
    download: true,
  },
  {
    nome: "Confirmação de Voo",
    descricao: "Aguardando emissão pela companhia",
    status: "pendente",
    data: "—",
    tipo: "PDF",
  },
  {
    nome: "Roteiro Completo",
    descricao: "Cronograma detalhado da experiência",
    status: "pendente",
    data: "Disponível em breve",
    tipo: "PDF",
  },
];

export default function DocumentosPage() {
  const okCount = documentos.filter((d) => d.status === "ok").length;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Documentos</h1>
        <p className="text-white/40 text-sm">
          Todos os seus documentos e vouchers em um só lugar.
        </p>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
        <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
        <p className="text-sm text-white/70">
          <span className="text-white font-semibold">{okCount} de {documentos.length} documentos</span> confirmados e prontos.
        </p>
      </div>

      {/* Documents list */}
      <div className="rounded-xl border border-white/5 bg-navy/20 overflow-hidden">
        <div className="divide-y divide-white/5">
          {documentos.map((doc) => (
            <div
              key={doc.nome}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-navy border border-white/5 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-white/30" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{doc.nome}</p>
                  <p className="text-xs text-white/35">{doc.descricao}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-xs text-white/25 hidden sm:block">{doc.data}</span>
                {doc.status === "ok" ? (
                  <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-badge px-2.5 py-1">
                    <CheckCircle size={11} /> Disponível
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-white/30 bg-white/5 border border-white/10 rounded-badge px-2.5 py-1">
                    <Clock size={11} /> Pendente
                  </span>
                )}
                {doc.download && (
                  <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 transition-colors">
                    <Download size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-white/25 text-center">
        Documentos são enviados pela equipe Blue Panda conforme sua experiência se aproxima.
        Em caso de dúvidas, acesse o{" "}
        <a href="/cliente/suporte" className="text-gold hover:text-gold-light transition-colors">
          Suporte
        </a>.
      </p>
    </div>
  );
}

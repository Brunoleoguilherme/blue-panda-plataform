"use client";

import React, { useState } from "react";
import { events } from "@/lib/events-data";
import { Edit3, Eye, Plus, Users } from "lucide-react";
import Link from "next/link";

const statusCfg = {
  open: { label: "Aberto", cls: "text-green-400 bg-green-500/10 border-green-500/20" },
  soldout: { label: "Esgotado", cls: "text-red-400 bg-red-500/10 border-red-500/20" },
  soon: { label: "Em breve", cls: "text-gold bg-gold/10 border-gold/20" },
};

export default function EventosAdminPage() {
  const [search, setSearch] = useState("");

  const filtrados = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Eventos</h1>
          <p className="text-white/35 text-sm">{events.length} eventos cadastrados</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors">
          <Plus size={13} /> Novo evento
        </button>
      </div>

      <div className="relative max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar eventos..."
          className="w-full h-10 bg-[#080d1a] border border-white/10 rounded-btn px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all"
        />
      </div>

      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Evento", "Categoria", "Data", "Local", "Status", "Vagas", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtrados.map((ev) => {
              const cfg = statusCfg[ev.status as keyof typeof statusCfg];
              return (
                <tr key={ev.slug} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-white">{ev.title}</p>
                    <p className="text-xs text-white/30 line-clamp-1 mt-0.5">{ev.subtitle}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-badge px-2.5 py-1 uppercase">
                      {ev.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-white/40">{ev.date}</td>
                  <td className="px-5 py-3 text-xs text-white/40">{ev.location}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold rounded-badge border px-2.5 py-1 ${cfg.cls}`}>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Users size={11} /> —
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/eventos/${ev.slug}`}
                        target="_blank"
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                      >
                        <Eye size={12} />
                      </Link>
                      <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 transition-colors">
                        <Edit3 size={12} />
                      </button>
                    </div>
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

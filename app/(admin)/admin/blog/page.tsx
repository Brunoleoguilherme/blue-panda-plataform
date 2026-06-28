"use client";

import React, { useState } from "react";
import { posts as blogPosts } from "@/lib/blog-data";
import { Eye, Edit3, Trash2, Plus, Star } from "lucide-react";
import Link from "next/link";

export default function BlogAdminPage() {
  const [search, setSearch] = useState("");

  const filtrados = blogPosts.filter(
    (p) =>
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Blog / CMS</h1>
          <p className="text-white/35 text-sm">{blogPosts.length} posts publicados</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors">
          <Plus size={13} /> Novo post
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar posts..."
          className="w-full h-10 bg-[#080d1a] border border-white/10 rounded-btn px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-all"
        />
      </div>

      {/* Posts */}
      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Título", "Categoria", "Autor", "Data", "Destaque", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold text-white/20 uppercase tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtrados.map((p) => (
              <tr key={p.slug} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3">
                  <p className="text-sm font-semibold text-white line-clamp-1">{p.titulo}</p>
                  <p className="text-xs text-white/30 line-clamp-1 mt-0.5">{p.resumo}</p>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs font-semibold text-gold bg-gold/10 border border-gold/20 rounded-badge px-2.5 py-1">
                    {p.categoria}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-white/50">{p.autor}</td>
                <td className="px-5 py-3 text-xs text-white/30">{p.publicadoEm}</td>
                <td className="px-5 py-3 text-center">
                  {p.destaque && <Star size={14} className="text-gold fill-gold mx-auto" />}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                    >
                      <Eye size={12} />
                    </Link>
                    <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 transition-colors">
                      <Edit3 size={12} />
                    </button>
                    <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-500/30 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

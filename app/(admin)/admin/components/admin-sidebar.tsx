"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  TrendingUp,
  FileText,
  Megaphone,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Principal",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Clientes", href: "/admin/clientes", icon: Users },
      { label: "Eventos", href: "/admin/eventos", icon: CalendarDays },
      { label: "Reservas", href: "/admin/reservas", icon: BookOpen },
      { label: "Financeiro", href: "/admin/financeiro", icon: TrendingUp },
    ],
  },
  {
    label: "Conteúdo",
    items: [
      { label: "Blog / CMS", href: "/admin/blog", icon: FileText },
      { label: "Marketing", href: "/admin/marketing", icon: Megaphone },
    ],
  },
  {
    label: "Sistema",
    items: [
      { label: "Usuários", href: "/admin/usuarios", icon: ShieldCheck },
      { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-[#080d1a] border-r border-white/5 transition-all duration-300 relative flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo + badge */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 gap-3">
        {!collapsed ? (
          <>
            <Image
              src="/images/logo.png"
              alt="Blue Panda"
              width={100}
              height={35}
              className="h-7 w-auto object-contain"
            />
            <span className="text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 rounded-badge px-1.5 py-0.5 uppercase tracking-widest">
              Admin
            </span>
          </>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <span className="text-red-400 text-xs font-bold">A</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mb-1">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150",
                      active
                        ? "bg-gold/10 text-gold border border-gold/20"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon size={17} className="flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#080d1a] border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div className="p-4 border-t border-white/5">
        {!collapsed && (
          <p className="text-[10px] text-white/15 text-center uppercase tracking-widest">
            Portal Administrativo
          </p>
        )}
      </div>
    </aside>
  );
}

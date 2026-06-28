"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  CreditCard,
  FileText,
  HeadphonesIcon,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/cliente", icon: LayoutDashboard },
  { label: "Minhas Experiências", href: "/cliente/experiencias", icon: Star },
  { label: "Pagamentos", href: "/cliente/pagamentos", icon: CreditCard },
  { label: "Documentos", href: "/cliente/documentos", icon: FileText },
  { label: "Suporte", href: "/cliente/suporte", icon: HeadphonesIcon },
  { label: "Perfil", href: "/cliente/perfil", icon: User },
];

export function ClienteSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-midnight border-r border-white/5 transition-all duration-300 relative flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        {!collapsed && (
          <Image
            src="/images/logo.png"
            alt="Blue Panda"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto">
            <span className="text-gold text-xs font-bold">BP</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const active =
            item.href === "/cliente"
              ? pathname === "/cliente"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5">
        {!collapsed && (
          <div className="text-xs text-white/20 text-center">
            Portal do Cliente
          </div>
        )}
      </div>
    </aside>
  );
}

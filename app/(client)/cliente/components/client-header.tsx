"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Bell, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

export function ClienteHeader({ user }: Props) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const firstName = user.user_metadata?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "Cliente";

  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-white/5 bg-midnight flex-shrink-0">
      <p className="text-sm text-white/50">
        Olá, <span className="text-white font-semibold">{firstName}</span> 👋
      </p>

      <div className="flex items-center gap-2">
        {/* WhatsApp concierge */}
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 h-9 px-3 rounded-btn bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors"
        >
          <MessageCircle size={14} />
          <span className="hidden sm:inline">Concierge</span>
        </a>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-btn border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-btn border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/20 transition-colors"
          title="Sair"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}

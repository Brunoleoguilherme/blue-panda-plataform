"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Bell, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function AdminHeader({ user }: { user: User }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const name =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "Admin";

  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-white/5 bg-[#080d1a] flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-badge px-2 py-0.5 uppercase tracking-widest">
          Admin
        </span>
        <p className="text-sm text-white/30 hidden sm:block">
          Bem-vindo,{" "}
          <span className="text-white font-semibold">{name}</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 h-9 px-3 rounded-btn border border-white/10 text-white/40 text-xs hover:text-white hover:border-white/20 transition-colors"
        >
          <ExternalLink size={13} />
          <span className="hidden sm:inline">Ver site</span>
        </a>
        <button className="relative w-9 h-9 rounded-btn border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
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

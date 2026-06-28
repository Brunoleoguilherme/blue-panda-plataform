"use client";

import React, { useState } from "react";
import { CheckCircle, Globe, Mail, MessageCircle, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Configurações</h1>
        <p className="text-white/35 text-sm">Configurações gerais da plataforma</p>
      </div>

      {/* Geral */}
      <Section title="Geral" icon={Globe}>
        <Field label="Nome da empresa" defaultValue="Blue Panda Travel" />
        <Field label="E-mail de contato" defaultValue="contato@bluepandatravel.com" />
        <Field label="WhatsApp principal" defaultValue="+55 (11) 99999-9999" />
        <Field label="Site público" defaultValue="https://bluepandatravel.com" />
      </Section>

      {/* Email */}
      <Section title="E-mail (Resend)" icon={Mail}>
        <Field label="E-mail remetente" defaultValue="no-reply@bluepandatravel.com" />
        <Field label="Nome remetente" defaultValue="Blue Panda Travel" />
        <Field label="Resend API Key" defaultValue="re_••••••••••••••••" type="password" />
      </Section>

      {/* WhatsApp */}
      <Section title="WhatsApp Concierge" icon={MessageCircle}>
        <Field label="Número concierge" defaultValue="+55 (11) 99999-9999" />
        <Field label="Mensagem padrão" defaultValue="Olá! Gostaria de saber mais sobre as experiências." />
      </Section>

      {/* Integrações */}
      <Section title="Integrações" icon={Key}>
        <div className="space-y-3">
          {[
            { nome: "Supabase", status: "conectado" },
            { nome: "Resend", status: "conectado" },
            { nome: "Vercel", status: "conectado" },
            { nome: "Google Analytics", status: "desconectado" },
          ].map((i) => (
            <div key={i.nome} className="flex items-center justify-between p-3 rounded-lg bg-navy/30 border border-white/5">
              <span className="text-sm font-semibold text-white">{i.nome}</span>
              <span className={`text-xs font-bold rounded-badge border px-2.5 py-1 ${
                i.status === "conectado"
                  ? "text-green-400 bg-green-500/10 border-green-500/20"
                  : "text-white/30 bg-white/5 border-white/10"
              }`}>
                {i.status}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex items-center gap-4">
        <Button variant="primary" size="md" onClick={handleSave}>
          Salvar configurações
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-xs text-green-400">
            <CheckCircle size={14} /> Salvo!
          </span>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={15} className="text-gold" />
        <h2 className="text-sm font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-white/30 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full h-11 bg-navy/50 border border-white/10 rounded-btn px-4 text-sm text-white focus:outline-none focus:border-gold/40 transition-all"
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

const schema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  telefone: z.string().optional(),
  passaporte: z.string().optional(),
  dataNascimento: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function PerfilForm({ user }: { user: User | null }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: user?.user_metadata?.full_name ?? "",
      telefone: user?.user_metadata?.phone ?? "",
      passaporte: user?.user_metadata?.passaporte ?? "",
      dataNascimento: user?.user_metadata?.data_nascimento ?? "",
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        full_name: data.nome,
        phone: data.telefone,
        passaporte: data.passaporte,
        data_nascimento: data.dataNascimento,
      },
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const fields: { label: string; key: keyof FormData; placeholder: string; type?: string }[] = [
    { label: "Nome completo", key: "nome", placeholder: "Seu nome completo" },
    { label: "WhatsApp", key: "telefone", placeholder: "+55 (11) 99999-9999" },
    { label: "Número do passaporte", key: "passaporte", placeholder: "BR123456789" },
    { label: "Data de nascimento", key: "dataNascimento", placeholder: "DD/MM/AAAA", type: "date" },
  ];

  return (
    <div className="rounded-xl border border-white/5 bg-navy/20 p-6 space-y-6">
      {/* Avatar area */}
      <div className="flex items-center gap-4 pb-6 border-b border-white/5">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="text-gold text-xl font-bold">
            {(user?.user_metadata?.full_name?.[0] ?? user?.email?.[0] ?? "U").toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-bold text-white">{user?.user_metadata?.full_name ?? "Cliente Blue Panda"}</p>
          <p className="text-sm text-white/35">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                {field.label}
              </label>
              <input
                {...register(field.key)}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                className={cn(
                  "w-full h-12 bg-navy/50 border rounded-btn px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all",
                  errors[field.key] ? "border-red-500/50" : "border-white/10"
                )}
              />
              {errors[field.key] && (
                <p className="text-xs text-red-400">{errors[field.key]?.message}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>

          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <CheckCircle size={14} /> Salvo com sucesso
            </span>
          )}
        </div>
      </form>

      {/* Security */}
      <div className="pt-6 border-t border-white/5">
        <h3 className="text-sm font-bold text-white mb-4">Segurança</h3>
        <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-navy/30">
          <div>
            <p className="text-sm font-semibold text-white">Alterar senha</p>
            <p className="text-xs text-white/35">Enviaremos um link para seu e-mail</p>
          </div>
          <button
            type="button"
            className="text-xs font-semibold text-gold hover:text-gold-light transition-colors"
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.resetPasswordForEmail(user?.email ?? "");
              alert("Link enviado para " + user?.email);
            }}
          >
            Enviar link →
          </button>
        </div>
      </div>
    </div>
  );
}

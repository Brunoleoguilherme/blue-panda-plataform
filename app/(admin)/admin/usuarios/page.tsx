import { ShieldCheck, Shield, UserCheck, Clock, Check, Ban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { approveUser, deactivateUser } from "./actions";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  phone: string | null;
  active: boolean;
  created_at: string;
};

const roleCfg: Record<string, { label: string; cls: string; icon: typeof Shield }> = {
  admin: { label: "Admin", cls: "text-red-400 bg-red-500/10 border-red-500/20", icon: ShieldCheck },
  comercial: { label: "Comercial", cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Shield },
  staff: { label: "Staff", cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Shield },
  consulta: { label: "Cliente", cls: "text-white/60 bg-white/5 border-white/10", icon: UserCheck },
};

function badge(role: string) {
  return roleCfg[role] ?? { label: role, cls: "text-white/60 bg-white/5 border-white/10", icon: UserCheck };
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default async function UsuariosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone, active, created_at")
    .order("created_at", { ascending: false });

  const profiles = (data ?? []) as Profile[];
  const pendentes = profiles.filter((p) => !p.active);
  const ativos = profiles.filter((p) => p.active);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Usuários do sistema</h1>
        <p className="text-white/35 text-sm">
          Aprove novos cadastros e gerencie o acesso à plataforma.
        </p>
      </div>

      {/* Pendentes de aprovação */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-gold" />
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            Aguardando aprovação
          </h2>
          {pendentes.length > 0 && (
            <span className="text-xs font-bold text-midnight bg-gold rounded-full px-2 py-0.5">
              {pendentes.length}
            </span>
          )}
        </div>

        {pendentes.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#080d1a] px-6 py-8 text-center">
            <p className="text-sm text-white/30">
              Nenhum cadastro aguardando aprovação.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gold/20 bg-gold/[0.03] overflow-hidden divide-y divide-white/5">
            {pendentes.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between px-6 py-4 gap-4 flex-wrap"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-sm font-bold">
                      {(u.full_name || u.email)[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {u.full_name || "—"}
                    </p>
                    <p className="text-xs text-white/30 truncate">{u.email}</p>
                    {u.phone && (
                      <p className="text-xs text-white/25">{u.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/25 hidden sm:block mr-1">
                    {fmtDate(u.created_at)}
                  </span>
                  <form action={approveUser}>
                    <input type="hidden" name="id" value={u.id} />
                    <button className="flex items-center gap-1.5 h-9 px-4 rounded-btn bg-green-500/90 text-white text-xs font-bold hover:bg-green-500 transition-colors">
                      <Check size={13} /> Aprovar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Usuários ativos */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <UserCheck size={15} className="text-white/50" />
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            Ativos
          </h2>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden divide-y divide-white/5">
          {ativos.map((u) => {
            const cfg = badge(u.role);
            return (
              <div
                key={u.id}
                className="flex items-center justify-between px-6 py-4 gap-4 flex-wrap hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-sm font-bold">
                      {(u.full_name || u.email)[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {u.full_name || "—"}
                    </p>
                    <p className="text-xs text-white/30 truncate">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-bold rounded-badge border px-2.5 py-1 ${cfg.cls}`}
                  >
                    <cfg.icon size={11} /> {cfg.label}
                  </span>
                  {u.role !== "admin" && (
                    <form action={deactivateUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button className="flex items-center gap-1.5 h-9 px-3 rounded-btn border border-white/10 text-white/50 text-xs font-semibold hover:border-red-500/40 hover:text-red-400 transition-colors">
                        <Ban size={13} /> Desativar
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="p-5 rounded-xl border border-yellow-500/15 bg-yellow-500/5">
        <p className="text-xs text-yellow-400/80 leading-relaxed">
          <span className="font-bold text-yellow-400">Como funciona:</span> cadastros de clientes já entram liberados — o cliente acessa a Área do Cliente assim que confirma o e-mail, sem precisar de aprovação. Já os pedidos de acesso da <span className="font-semibold text-yellow-300">equipe</span> aparecem acima, na seção Aguardando aprovação, e só liberam o painel depois que você aprova aqui. Para tornar alguém <span className="font-semibold text-yellow-300">administrador</span>, ajuste o campo <code className="bg-white/5 px-1.5 py-0.5 rounded text-yellow-300">app_metadata.role</code> no Supabase.
        </p>
      </div>
    </div>
  );
}

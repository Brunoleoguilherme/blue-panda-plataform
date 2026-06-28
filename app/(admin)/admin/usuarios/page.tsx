import { ShieldCheck, Shield, UserPlus } from "lucide-react";

const usuarios = [
  { nome: "Bruno Guilherme", email: "brunoleoguilherme@gmail.com", role: "admin", ultimo: "Agora", ativo: true },
  { nome: "Ana Consultora", email: "ana@bluepandatravel.com", role: "staff", ultimo: "27/06/2026", ativo: true },
  { nome: "Carlos Suporte", email: "carlos@bluepandatravel.com", role: "staff", ultimo: "20/06/2026", ativo: true },
];

const roleCfg = {
  admin: { label: "Admin", cls: "text-red-400 bg-red-500/10 border-red-500/20", icon: ShieldCheck },
  staff: { label: "Staff", cls: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Shield },
};

export default function UsuariosPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Usuários do sistema</h1>
          <p className="text-white/35 text-sm">Gerencie o acesso à plataforma</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors">
          <UserPlus size={13} /> Convidar usuário
        </button>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
        <div className="divide-y divide-white/5">
          {usuarios.map((u) => {
            const cfg = roleCfg[u.role as keyof typeof roleCfg];
            return (
              <div key={u.email} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-sm font-bold">{u.nome[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{u.nome}</p>
                    <p className="text-xs text-white/30">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold rounded-badge border px-2.5 py-1 ${cfg.cls}`}>
                    <cfg.icon size={11} /> {cfg.label}
                  </span>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-white/20">Último acesso</p>
                    <p className="text-xs text-white/40">{u.ultimo}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${u.ativo ? "bg-green-400" : "bg-white/15"}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5 rounded-xl border border-yellow-500/15 bg-yellow-500/5">
        <p className="text-xs text-yellow-400/80 leading-relaxed">
          <span className="font-bold text-yellow-400">Permissões:</span> Usuários Admin têm acesso total ao sistema. Staff têm acesso a Clientes, Reservas e Blog. Para alterar permissões, atualize o campo{" "}
          <code className="bg-white/5 px-1.5 py-0.5 rounded text-yellow-300">app_metadata.role</code> no Supabase.
        </p>
      </div>
    </div>
  );
}

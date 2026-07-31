import Link from "next/link";
import { Users, Phone, Mail, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getClientesComStats } from "@/lib/clientes";
import { formatBRL } from "@/lib/reservas";

export const dynamic = "force-dynamic";

function roleMeta(role: string) {
  switch (role) {
    case "admin":
      return { label: "Administrador", cls: "text-gold border-gold/30 bg-gold/10" };
    case "equipe":
      return { label: "Equipe", cls: "text-blue-300 border-blue-400/30 bg-blue-500/10" };
    default:
      return { label: "Cliente", cls: "text-white/60 border-white/15 bg-white/5" };
  }
}

export default async function ClientesPage() {
  const clientes = await getClientesComStats();

  const totalGasto = clientes.reduce((s, c) => s + c.totalGasto, 0);
  const ativos = clientes.filter((c) => c.reservasCount > 0).length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Clientes</h1>
        <p className="text-white/35 text-sm">
          Todas as pessoas com cadastro ou reserva na Blue Panda. Clique para ver
          o histórico completo.
        </p>
      </div>

      {clientes.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum cliente ainda"
          description="Os clientes aparecem aqui assim que criam conta ou recebem uma reserva."
        />
      ) : (
        <>
          {/* Resumo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Clientes</p>
              <p className="text-xl font-bold text-white mt-1">{clientes.length}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Com reserva</p>
              <p className="text-xl font-bold text-green-400 mt-1">{ativos}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#080d1a] p-4">
              <p className="text-xs text-white/35">Total vendido</p>
              <p className="text-xl font-bold text-gold mt-1">
                {formatBRL(totalGasto)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden divide-y divide-white/5">
            {clientes.map((c) => {
              const rm = roleMeta(c.role);
              return (
                <Link
                  key={c.id}
                  href={`/admin/clientes/${c.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-white truncate">
                        {c.fullName || "—"}
                      </p>
                      <span
                        className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${rm.cls}`}
                      >
                        {rm.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-white/30 flex-wrap">
                      <span className="flex items-center gap-1 truncate">
                        <Mail size={11} /> {c.email}
                      </span>
                      {c.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={11} /> {c.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {formatBRL(c.totalGasto)}
                      </p>
                      <p className="text-[11px] text-white/30">
                        {c.reservasCount}{" "}
                        {c.reservasCount === 1 ? "reserva" : "reservas"}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-white/20 group-hover:text-gold transition-colors"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

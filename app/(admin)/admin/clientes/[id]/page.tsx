import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Wallet,
  Clock,
} from "lucide-react";
import { getClienteById } from "@/lib/clientes";
import { statusMeta, formatBRL } from "@/lib/reservas";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
  } catch {
    return iso;
  }
}

export default async function ClienteDetalhePage({ params }: Props) {
  const { id } = await params;
  const cliente = await getClienteById(id);
  if (!cliente) notFound();

  const ativas = cliente.reservas.filter((r) => r.status !== "cancelada");
  const totalGasto = ativas.reduce((s, r) => s + r.totalAmount, 0);
  const totalPago = cliente.reservas.reduce((s, r) => s + r.paidAmount, 0);
  const aReceber = Math.max(0, totalGasto - totalPago);

  const cards = [
    {
      icon: BookOpen,
      label: "Reservas",
      value: String(cliente.reservas.length),
      color: "text-white",
    },
    {
      icon: Wallet,
      label: "Total vendido",
      value: formatBRL(totalGasto),
      color: "text-gold",
    },
    {
      icon: Wallet,
      label: "Recebido",
      value: formatBRL(totalPago),
      color: "text-green-400",
    },
    {
      icon: Clock,
      label: "A receber",
      value: formatBRL(aReceber),
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link
          href="/admin/clientes"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft size={13} /> Voltar para Clientes
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {cliente.fullName || "—"}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-white/40 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Mail size={13} /> {cliente.email}
          </span>
          {cliente.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> {cliente.phone}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={13} /> Cliente desde {fmtDate(cliente.createdAt.slice(0, 10))}
          </span>
        </div>
      </div>

      {/* Resumo financeiro */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-white/5 bg-[#080d1a] p-5"
          >
            <c.icon size={16} className={`${c.color} mb-3`} />
            <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Reservas do cliente */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3">
          Histórico de reservas
        </h2>
        {cliente.reservas.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-[#080d1a] px-5 py-8 text-center">
            <p className="text-sm text-white/40">
              Este cliente ainda não possui reservas.
            </p>
            <Link
              href="/admin/reservas/nova"
              className="inline-block mt-3 text-xs font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Criar reserva →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden divide-y divide-white/5">
            {cliente.reservas.map((r) => {
              const st = statusMeta[r.status as keyof typeof statusMeta];
              return (
                <Link
                  key={r.id}
                  href={`/admin/reservas/${r.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-white/30">
                        {r.code}
                      </span>
                      <p className="text-sm font-semibold text-white truncate">
                        {r.eventTitle ?? "Sem evento"}
                      </p>
                      {st && (
                        <span
                          className={`text-[10px] font-bold rounded border px-1.5 py-0.5 uppercase tracking-wider ${st.cls}`}
                        >
                          {st.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 mt-0.5">
                      {fmtDate(r.travelDate)} · {r.pax} pax
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {formatBRL(r.totalAmount)}
                    </p>
                    <p className="text-[11px] text-white/30">
                      pago {formatBRL(r.paidAmount)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

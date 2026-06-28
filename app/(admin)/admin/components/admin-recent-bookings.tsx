import { Eye } from "lucide-react";
import Link from "next/link";

const reservas = [
  { id: "R-001", cliente: "João Silva", evento: "NFL Brasil 2026", valor: "R$ 20.000", status: "confirmado", data: "28/06/2026" },
  { id: "R-002", cliente: "Maria Oliveira", evento: "Champions Final", valor: "R$ 18.500", status: "aguardando", data: "27/06/2026" },
  { id: "R-003", cliente: "Carlos Mendes", evento: "US Open 2026", valor: "R$ 15.000", status: "confirmado", data: "26/06/2026" },
  { id: "R-004", cliente: "Ana Costa", evento: "NFL Brasil 2026", valor: "R$ 20.000", status: "pendente", data: "25/06/2026" },
  { id: "R-005", cliente: "Pedro Santos", evento: "Super Bowl LXI", valor: "R$ 28.000", status: "confirmado", data: "24/06/2026" },
];

const statusCfg = {
  confirmado: "text-green-400 bg-green-500/10 border-green-500/20",
  aguardando: "text-gold bg-gold/10 border-gold/20",
  pendente: "text-white/40 bg-white/5 border-white/10",
};

export function AdminRecentBookings() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h2 className="text-sm font-bold text-white">Reservas recentes</h2>
        <Link
          href="/admin/reservas"
          className="text-xs text-gold hover:text-gold-light transition-colors font-semibold"
        >
          Ver todas →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["ID", "Cliente", "Evento", "Valor", "Status", "Data", ""].map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] font-bold text-white/25 uppercase tracking-widest px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reservas.map((r) => {
              const cls = statusCfg[r.status as keyof typeof statusCfg];
              return (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-3 text-xs font-mono text-white/30">{r.id}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-white">{r.cliente}</td>
                  <td className="px-6 py-3 text-sm text-white/50">{r.evento}</td>
                  <td className="px-6 py-3 text-sm font-bold text-gold">{r.valor}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold rounded-badge border px-2.5 py-1 capitalize ${cls}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-white/30">{r.data}</td>
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/reservas/${r.id}`}
                      className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 transition-colors"
                    >
                      <Eye size={13} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

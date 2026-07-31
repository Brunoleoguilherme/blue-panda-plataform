import { AdminKpis } from "./components/admin-kpis";
import { AdminRecentBookings } from "./components/admin-recent-bookings";
import { AdminEventosStatus } from "./components/admin-eventos-status";
import { AdminRevenueChart } from "./components/admin-revenue-chart";
import { getAllReservasAdmin } from "@/lib/reservas";
import { getAllEventsAdmin } from "@/lib/events-admin";
import {
  computeTotals,
  reservasAbertas as countAbertas,
  revenueByMonth,
  getClientesCount,
} from "@/lib/finance";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [reservas, events, clientes] = await Promise.all([
    getAllReservasAdmin(),
    getAllEventsAdmin(),
    getClientesCount(),
  ]);

  const totals = computeTotals(reservas);
  const eventosAtivos = events.filter((e) => e.published).length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/35 text-sm">Visão geral da operação Blue Panda.</p>
      </div>

      <AdminKpis
        clientes={clientes}
        eventosAtivos={eventosAtivos}
        reservasAbertas={countAbertas(reservas)}
        recebido={totals.recebido}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminRevenueChart data={revenueByMonth(reservas)} />
        </div>
        <AdminEventosStatus events={events} />
      </div>

      <AdminRecentBookings reservas={reservas} />
    </div>
  );
}

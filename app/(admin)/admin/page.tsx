import { AdminKpis } from "./components/admin-kpis";
import { AdminRecentBookings } from "./components/admin-recent-bookings";
import { AdminEventosStatus } from "./components/admin-eventos-status";
import { AdminRevenueChart } from "./components/admin-revenue-chart";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-white/35 text-sm">Visão geral da operação Blue Panda.</p>
      </div>

      <AdminKpis />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminRevenueChart />
        </div>
        <AdminEventosStatus />
      </div>

      <AdminRecentBookings />
    </div>
  );
}

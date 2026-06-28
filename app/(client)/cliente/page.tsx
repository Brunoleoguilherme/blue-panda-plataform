import { createClient } from "@/lib/supabase/server";
import { DashboardHero } from "./components/dashboard-hero";
import { DashboardTimeline } from "./components/dashboard-timeline";
import { DashboardKpis } from "./components/dashboard-kpis";

export default async function ClienteDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "Cliente";

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">
          Olá, {firstName}
        </h1>
        <p className="text-white/40 text-sm">
          Acompanhe sua experiência em tempo real.
        </p>
      </div>

      {/* KPIs */}
      <DashboardKpis />

      {/* Next experience hero card */}
      <DashboardHero />

      {/* Timeline */}
      <DashboardTimeline />
    </div>
  );
}

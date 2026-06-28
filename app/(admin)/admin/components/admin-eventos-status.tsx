const eventos = [
  { nome: "NFL Brasil 2026", vagas: 8, total: 20, status: "open" },
  { nome: "F1 Monaco 2026", vagas: 0, total: 12, status: "soldout" },
  { nome: "Champions Final", vagas: 3, total: 15, status: "open" },
  { nome: "Super Bowl LXI", vagas: 12, total: 25, status: "soon" },
  { nome: "US Open 2026", vagas: 5, total: 10, status: "open" },
];

const statusCfg = {
  open: { label: "Aberto", cls: "text-green-400 bg-green-500/10 border-green-500/20" },
  soldout: { label: "Esgotado", cls: "text-red-400 bg-red-500/10 border-red-500/20" },
  soon: { label: "Em breve", cls: "text-gold bg-gold/10 border-gold/20" },
};

export function AdminEventosStatus() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#080d1a] p-6">
      <h2 className="text-sm font-bold text-white mb-5">Eventos — Vagas</h2>
      <div className="space-y-3">
        {eventos.map((ev) => {
          const cfg = statusCfg[ev.status as keyof typeof statusCfg];
          const pct = ((ev.total - ev.vagas) / ev.total) * 100;
          return (
            <div key={ev.nome}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-white/70 truncate pr-2">{ev.nome}</p>
                <span className={`text-[10px] font-bold rounded-badge border px-2 py-0.5 flex-shrink-0 ${cfg.cls}`}>
                  {cfg.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold/60 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/25 flex-shrink-0">
                  {ev.total - ev.vagas}/{ev.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

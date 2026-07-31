import Link from "next/link";
import { CalendarDays, Plus, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { getAllEventsAdmin } from "@/lib/events-admin";
import { deleteEvent, togglePublished } from "./actions";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  open: "Vagas abertas",
  soon: "Em breve",
  soldout: "Esgotado",
};

function fmtDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function EventosAdminPage() {
  const events = await getAllEventsAdmin();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Eventos</h1>
          <p className="text-white/35 text-sm">
            Gerencie os eventos e experiências oferecidos. Alterações vão ao ar
            automaticamente.
          </p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="flex items-center gap-2 h-9 px-4 rounded-btn bg-gold text-midnight text-xs font-bold hover:bg-gold-light transition-colors"
        >
          <Plus size={13} /> Novo evento
        </Link>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Nenhum evento cadastrado"
          description="Clique em “Novo evento” para criar o primeiro."
        />
      ) : (
        <div className="rounded-xl border border-white/5 bg-[#080d1a] overflow-hidden divide-y divide-white/5">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white truncate">
                    {ev.title}
                  </p>
                  {ev.featured && (
                    <span className="text-[10px] font-bold text-gold bg-gold/10 border border-gold/20 rounded px-1.5 py-0.5 uppercase tracking-wider">
                      Destaque
                    </span>
                  )}
                  {!ev.published && (
                    <span className="text-[10px] font-bold text-white/40 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 uppercase tracking-wider">
                      Rascunho
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/30 mt-0.5 truncate">
                  {statusLabel[ev.status] ?? ev.status} · {fmtDate(ev.date)} ·{" "}
                  {ev.location || "—"}
                  {ev.country ? `, ${ev.country}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={ev.id} />
                  <input type="hidden" name="current" value={String(ev.published)} />
                  <button
                    title={ev.published ? "Despublicar" : "Publicar"}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-btn border border-white/10 text-white/50 text-xs font-semibold hover:text-white transition-colors"
                  >
                    {ev.published ? <EyeOff size={13} /> : <Eye size={13} />}
                    {ev.published ? "Despublicar" : "Publicar"}
                  </button>
                </form>
                <Link
                  href={`/admin/eventos/${ev.id}`}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-btn border border-white/10 text-white/60 text-xs font-semibold hover:text-gold hover:border-gold/30 transition-colors"
                >
                  <Pencil size={13} /> Editar
                </Link>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={ev.id} />
                  <button
                    title="Excluir"
                    className="flex items-center justify-center h-8 w-8 rounded-btn border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/40 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

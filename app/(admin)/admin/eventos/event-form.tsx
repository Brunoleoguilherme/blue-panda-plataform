import Link from "next/link";
import { saveEvent } from "./actions";
import type { AdminEvent } from "@/lib/events-admin";

const categoryOptions = [
  { value: "futebol", label: "Futebol" },
  { value: "formula1", label: "Fórmula 1" },
  { value: "nfl", label: "NFL" },
  { value: "nba", label: "NBA" },
  { value: "tenis", label: "Tênis" },
  { value: "flag", label: "Flag Football" },
  { value: "outros", label: "Outros" },
];

const statusOptions = [
  { value: "open", label: "Vagas abertas" },
  { value: "soon", label: "Em breve" },
  { value: "soldout", label: "Esgotado" },
];

const inputCls =
  "w-full h-11 bg-[#0b1220] border border-white/10 rounded-lg px-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors";
const labelCls =
  "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5";

export function EventForm({ event }: { event?: AdminEvent }) {
  const isEdit = !!event;

  return (
    <form action={saveEvent} className="space-y-5 max-w-2xl">
      {isEdit && <input type="hidden" name="id" value={event.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelCls}>Título *</label>
          <input
            name="title"
            required
            defaultValue={event?.title ?? ""}
            placeholder="Ex.: NFL Brasil 2026"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Slug (URL) *</label>
          <input
            name="slug"
            required
            defaultValue={event?.slug ?? ""}
            placeholder="nfl-brasil-2026"
            pattern="[a-z0-9-]+"
            title="Apenas letras minúsculas, números e hífens"
            className={inputCls}
          />
          <p className="text-[11px] text-white/25 mt-1">
            Vira o link: /eventos/<span className="text-white/40">seu-slug</span>
          </p>
        </div>

        <div>
          <label className={labelCls}>Categoria *</label>
          <select
            name="category"
            defaultValue={event?.category ?? "outros"}
            className={inputCls}
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Subtítulo</label>
          <input
            name="subtitle"
            defaultValue={event?.subtitle ?? ""}
            placeholder="Ex.: Baltimore Ravens vs Dallas Cowboys"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Data</label>
          <input
            type="date"
            name="event_date"
            defaultValue={event?.date ?? ""}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Status *</label>
          <select
            name="status"
            defaultValue={event?.status ?? "open"}
            className={inputCls}
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Cidade</label>
          <input
            name="location"
            defaultValue={event?.location ?? ""}
            placeholder="Rio de Janeiro"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>País</label>
          <input
            name="country"
            defaultValue={event?.country ?? ""}
            placeholder="Brasil"
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Imagem de capa (URL ou /images/...)</label>
          <input
            name="cover_image"
            defaultValue={event?.coverImage ?? ""}
            placeholder="/images/hero-nfl.jpg"
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Descrição</label>
          <textarea
            name="description"
            defaultValue={event?.description ?? ""}
            rows={4}
            placeholder="Descreva a experiência..."
            className={`${inputCls} h-auto py-2.5 resize-y`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-1">
        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={event?.featured ?? false}
            className="w-4 h-4 accent-gold"
          />
          Destaque na home
        </label>
        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
          <input
            type="checkbox"
            name="published"
            defaultChecked={event?.published ?? true}
            className="w-4 h-4 accent-gold"
          />
          Publicado (visível no site)
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          className="h-10 px-6 rounded-lg bg-gold text-midnight text-sm font-bold hover:bg-gold-light transition-colors"
        >
          {isEdit ? "Salvar alterações" : "Criar evento"}
        </button>
        <Link
          href="/admin/eventos"
          className="h-10 px-5 flex items-center rounded-lg border border-white/10 text-white/50 text-sm font-semibold hover:text-white transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

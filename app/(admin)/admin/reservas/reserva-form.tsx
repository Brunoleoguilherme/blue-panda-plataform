import Link from "next/link";
import { saveReserva } from "./actions";
import {
  getClientsForSelect,
  getEventsForSelect,
  type Reserva,
} from "@/lib/reservas";

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "confirmada", label: "Confirmada" },
  { value: "paga", label: "Paga" },
  { value: "concluida", label: "Concluída" },
  { value: "cancelada", label: "Cancelada" },
];

const inputCls =
  "w-full h-11 bg-[#0b1220] border border-white/10 rounded-lg px-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors";
const labelCls =
  "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-1.5";

export async function ReservaForm({ reserva }: { reserva?: Reserva }) {
  const [clients, events] = await Promise.all([
    getClientsForSelect(),
    getEventsForSelect(),
  ]);
  const isEdit = !!reserva;

  return (
    <form action={saveReserva} className="space-y-5 max-w-2xl">
      {isEdit && <input type="hidden" name="id" value={reserva.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Cliente</label>
          <select
            name="profile_id"
            defaultValue={reserva?.profileId ?? ""}
            className={inputCls}
          >
            <option value="">— Selecione o cliente —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name ? `${c.full_name} (${c.email})` : c.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Evento</label>
          <select
            name="event_id"
            defaultValue={reserva?.eventId ?? ""}
            className={inputCls}
          >
            <option value="">— Selecione o evento —</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Status *</label>
          <select
            name="status"
            defaultValue={reserva?.status ?? "pendente"}
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
          <label className={labelCls}>Pessoas (pax)</label>
          <input
            type="number"
            name="pax"
            min={1}
            defaultValue={reserva?.pax ?? 1}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Valor total (R$)</label>
          <input
            type="number"
            name="total_amount"
            min={0}
            step="0.01"
            defaultValue={reserva?.totalAmount ?? 0}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Valor pago (R$)</label>
          <input
            type="number"
            name="paid_amount"
            min={0}
            step="0.01"
            defaultValue={reserva?.paidAmount ?? 0}
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Data da viagem</label>
          <input
            type="date"
            name="travel_date"
            defaultValue={reserva?.travelDate ?? ""}
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls}>Observações internas</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={reserva?.notes ?? ""}
            placeholder="Anotações da equipe (não aparece para o cliente)."
            className={`${inputCls} h-auto py-2.5 resize-y`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          className="h-10 px-6 rounded-lg bg-gold text-midnight text-sm font-bold hover:bg-gold-light transition-colors"
        >
          {isEdit ? "Salvar alterações" : "Criar reserva"}
        </button>
        <Link
          href="/admin/reservas"
          className="h-10 px-5 flex items-center rounded-lg border border-white/10 text-white/50 text-sm font-semibold hover:text-white transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function ExperienciasPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Minhas experiências</h1>
        <p className="text-white/40 text-sm">
          Acompanhe as viagens e eventos que você contratou.
        </p>
      </div>

      <EmptyState
        icon={Sparkles}
        title="Você ainda não tem experiências"
        description="Quando você fechar uma experiência com a Blue Panda, ela aparecerá aqui com todos os detalhes."
        action={
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-btn bg-gradient-gold text-midnight text-sm font-bold hover:brightness-110 transition-all"
          >
            Explorar eventos
          </Link>
        }
      />
    </div>
  );
}

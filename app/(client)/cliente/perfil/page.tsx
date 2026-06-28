import { createClient } from "@/lib/supabase/server";
import { PerfilForm } from "./perfil-form";

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Meu Perfil</h1>
        <p className="text-white/40 text-sm">Gerencie seus dados pessoais e preferências.</p>
      </div>

      <PerfilForm user={user} />
    </div>
  );
}

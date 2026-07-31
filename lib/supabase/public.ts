import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase sem cookies, para leitura pública (páginas do site).
 * Usa a chave anon; a RLS libera apenas o que é público (ex.: events.published = true).
 * Por não depender de cookies, permite renderização estática/ISR e melhor SEO.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const FROM =
  process.env.EMAIL_FROM ?? "Blue Panda <contato@bluepandatravel.com.br>";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bluepandatravel.com.br";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role =
    (user?.app_metadata as { role?: string } | undefined)?.role ??
    (user?.user_metadata as { role?: string } | undefined)?.role;

  if (!user || role !== "admin") {
    return { supabase: null };
  }
  return { supabase };
}

// Avisa a pessoa que o acesso foi liberado. Nunca bloqueia a aprovação:
// se o e-mail falhar, apenas registra no log.
async function sendApprovalEmail(fullName: string, email: string) {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const primeiroNome = (fullName || "").trim().split(/\s+/)[0] || "";
    const saudacao = primeiroNome ? `Olá, ${primeiroNome}` : "Olá";

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Seu acesso à Blue Panda está liberado",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #081A3A; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(200,165,77,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #C8A54D; font-size: 22px; margin: 0;">Acesso liberado</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px;">Blue Panda Experience Platform</p>
          </div>
          <p style="color: #fff; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">${saudacao},</p>
          <p style="color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.7; margin: 0 0 28px;">
            Sua conta foi aprovada e o acesso à plataforma já está ativo. Basta entrar com o seu e-mail e a senha que você cadastrou.
          </p>
          <div style="text-align: center; margin-bottom: 8px;">
            <a href="${SITE}/login" style="display: inline-block; background: linear-gradient(135deg, #C8A54D, #DDBB67); color: #081A3A; font-weight: 700; padding: 14px 32px; border-radius: 14px; text-decoration: none; font-size: 14px;">
              Acessar a plataforma
            </a>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; line-height: 1.6; margin: 24px 0 0; text-align: center;">
            Se o botão não funcionar, acesse: ${SITE}/login
          </p>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(200,165,77,0.2); text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Blue Panda Experience Platform · bluepandatravel.com.br</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("[approve] Resend error:", error);
  }
}

export async function approveUser(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireAdmin();
  if (!supabase) return;

  // Ativa e recupera nome/e-mail em uma única chamada para notificar a pessoa.
  const { data } = await supabase
    .from("profiles")
    .update({ active: true })
    .eq("id", id)
    .select("email, full_name")
    .single();

  if (data?.email) {
    await sendApprovalEmail(data.full_name ?? "", data.email);
  }

  revalidatePath("/admin/usuarios");
}

export async function deactivateUser(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireAdmin();
  if (!supabase) return;

  await supabase.from("profiles").update({ active: false }).eq("id", id);
  revalidatePath("/admin/usuarios");
}

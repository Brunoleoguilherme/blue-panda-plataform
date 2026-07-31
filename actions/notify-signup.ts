"use server";

import { z } from "zod";

const schema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().min(1),
  tipo: z.enum(["cliente", "equipe"]).optional(),
});

type Payload = z.infer<typeof schema>;

// Remetente: reutiliza um domínio verificado no Resend.
const FROM =
  process.env.EMAIL_FROM ?? "Blue Panda <contato@bluepandatravel.com.br>";

// Quem recebe o aviso de novo cadastro (aceita vários separados por vírgula).
const TO = (process.env.SIGNUP_NOTIFY_TO ?? "brunoleoguilherme@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bluepandatravel.com.br";

export async function notifyNewSignup(payload: Payload) {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return { success: false };

  const { nome, email, telefone, tipo } = parsed.data;
  const isEquipe = tipo === "equipe";

  // O texto muda conforme o tipo de cadastro:
  // - equipe: precisa de aprovação de um admin;
  // - cliente: já tem acesso ao confirmar o e-mail (só um aviso informativo).
  const subject = isEquipe
    ? `Novo acesso de equipe aguardando aprovação — ${nome}`
    : `Novo cliente cadastrado — ${nome}`;

  const titulo = isEquipe
    ? "Novo acesso de equipe aguardando aprovação"
    : "Novo cliente cadastrado";

  const intro = isEquipe
    ? "Uma pessoa solicitou acesso à equipe. Revise e libere o acesso ao painel."
    : "Um novo cliente criou conta. O acesso é liberado assim que ele confirmar o e-mail — nenhuma ação necessária.";

  const ctaHref = isEquipe ? `${SITE}/admin/usuarios` : `${SITE}/admin/clientes`;
  const ctaLabel = isEquipe ? "Revisar e aprovar" : "Ver clientes";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #081A3A; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(200,165,77,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #C8A54D; font-size: 22px; margin: 0;">${titulo}</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px; line-height: 1.5;">${intro}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); width: 120px; font-size: 13px;">Nome</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 14px; font-weight: 600;">${nome}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 13px;">E-mail</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Telefone</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${telefone}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; text-align: center;">
            <a href="${ctaHref}" style="display: inline-block; background: linear-gradient(135deg, #C8A54D, #DDBB67); color: #081A3A; font-weight: 700; padding: 14px 28px; border-radius: 14px; text-decoration: none; font-size: 14px;">
              ${ctaLabel}
            </a>
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(200,165,77,0.2); text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Blue Panda Experience Platform · bluepandatravel.com.br</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("[notify-signup] Resend error:", error);
    return { success: false };
  }
}

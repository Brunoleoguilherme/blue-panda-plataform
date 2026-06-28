"use server";

import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(10),
  evento: z.string().optional(),
  mensagem: z.string().min(10),
});

type ContactData = z.infer<typeof schema>;

export async function sendContactEmail(data: ContactData) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." };
  }

  const { nome, email, telefone, evento, mensagem } = parsed.data;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Blue Panda <contato@bluepandatravel.com.br>",
      to: ["contato@bluepandatravel.com.br"],
      replyTo: email,
      subject: `Novo contato — ${evento ?? "Geral"} — ${nome}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #081A3A; color: #fff; padding: 40px; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(200,165,77,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #C8A54D; font-size: 24px; margin: 0;">Novo contato recebido</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0;">Blue Panda Experience Platform</p>
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
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 13px;">Telefone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #fff; font-size: 14px;">${telefone}</td>
            </tr>
            ${
              evento
                ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-size: 13px;">Evento</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #C8A54D; font-size: 14px; font-weight: 600;">${evento}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top;">Mensagem</td>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6;">${mensagem}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(200,165,77,0.2); text-align: center;">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Blue Panda Experience Platform · bluepandatravel.com.br</p>
          </div>
        </div>
      `,
    });

    // Auto-reply ao cliente
    await resend.emails.send({
      from: "Blue Panda <contato@bluepandatravel.com.br>",
      to: [email],
      subject: "Recebemos seu contato — Blue Panda Travel",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #081A3A; color: #fff; padding: 40px; border-radius: 12px;">
          <h1 style="color: #C8A54D; font-size: 22px; margin: 0 0 16px;">Olá, ${nome}!</h1>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 16px;">
            Recebemos sua mensagem e nossa equipe entrará em contato em até 2 horas.
          </p>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 32px;">
            Enquanto isso, você pode nos chamar diretamente pelo WhatsApp para uma resposta ainda mais rápida.
          </p>
          <a href="https://wa.me/5511999999999" style="display: inline-block; background: linear-gradient(135deg, #C8A54D, #DDBB67); color: #081A3A; font-weight: 700; padding: 14px 28px; border-radius: 14px; text-decoration: none; font-size: 14px;">
            Falar pelo WhatsApp
          </a>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(200,165,77,0.2);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Blue Panda Experience Platform · bluepandatravel.com.br</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Erro ao enviar e-mail." };
  }
}

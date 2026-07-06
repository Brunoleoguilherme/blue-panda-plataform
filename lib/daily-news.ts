// Utilitários do envio diário do Banco de Notícias

/** Data de hoje (AAAA-MM-DD) no fuso America/Sao_Paulo */
export function todayInSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Converte inline markdown: links, negrito, itálico. Escapa HTML antes. */
function inlineMdToHtml(text: string): string {
  let html = escapeHtml(text);
  // [texto](url)
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" style="color:#C8A54D;text-decoration:underline;">$1</a>'
  );
  // URLs soltas
  html = html.replace(
    /(?<!["'>=])(https?:\/\/[^\s<]+)/g,
    '<a href="$1" style="color:#C8A54D;text-decoration:underline;">$1</a>'
  );
  // **negrito** e *itálico*
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html;
}

/**
 * Converte o bloco do dia (markdown com ### e listas -) em HTML de e-mail
 * no padrão visual Blue Panda (fundo navy, dourado).
 */
export function dailyNewsToEmailHtml(dateStr: string, contentMd: string): string {
  const lines = contentMd.split("\n");
  const parts: string[] = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      parts.push("</ul>");
      listOpen = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "---" || /^##\s+\d{4}-\d{2}-\d{2}/.test(line)) {
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      parts.push(
        `<h2 style="color:#C8A54D;font-size:18px;margin:28px 0 12px;border-bottom:1px solid rgba(200,165,77,0.3);padding-bottom:8px;">${inlineMdToHtml(line.slice(4))}</h2>`
      );
    } else if (line.startsWith("- ")) {
      if (!listOpen) {
        parts.push('<ul style="margin:0 0 8px;padding-left:20px;">');
        listOpen = true;
      }
      parts.push(
        `<li style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7;margin-bottom:6px;">${inlineMdToHtml(line.slice(2))}</li>`
      );
    } else {
      closeList();
      parts.push(
        `<p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7;margin:0 0 12px;">${inlineMdToHtml(line)}</p>`
      );
    }
  }
  closeList();

  return `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#081A3A;color:#fff;padding:40px;border-radius:12px;">
      <div style="border-bottom:1px solid rgba(200,165,77,0.3);padding-bottom:24px;margin-bottom:8px;">
        <h1 style="color:#C8A54D;font-size:24px;margin:0;">Banco de Notícias Premium</h1>
        <p style="color:rgba(255,255,255,0.5);margin:8px 0 0;">Experiências Esportivas Premium · ${dateStr}</p>
      </div>
      ${parts.join("\n")}
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(200,165,77,0.2);text-align:center;">
        <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">Blue Panda Experience Platform · bluepandatravel.com.br</p>
      </div>
    </div>
  `;
}

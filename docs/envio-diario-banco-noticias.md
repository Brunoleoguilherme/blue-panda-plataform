# Envio diário do Banco de Notícias — Setup

Fluxo 100% na nuvem (Vercel + Supabase + Resend) — **não depende do computador ligado nem de API do Claude**:

1. **07:15 BRT (10:15 UTC) — Cron da Vercel** chama `/api/fetch-daily-news`: busca notícias das últimas 48h no **Google News RSS** (grátis, sem IA) por 4 seções de palavras-chave, monta o bloco markdown do dia e faz upsert na tabela `daily_news` do Supabase.
2. **08:00 BRT (11:00 UTC) — Cron da Vercel** chama `/api/send-daily-news`: busca o bloco de hoje no Supabase, converte em HTML e envia via Resend para **agenciazebrapubli@gmail.com**. Sem conteúdo do dia = e-mail de alerta, nunca vazio.

O banco de notícias oficial é a tabela `daily_news` (histórico completo, um registro por dia). O arquivo local `Banco de Notícias - ....md` foi descontinuado.

## Seções e buscas

Definidas em `SECTIONS` no `app/api/fetch-daily-news/route.ts` — edite as queries livremente (sintaxe do Google News, `when:2d` = últimas 48h):

- Camarotes e hospitality
- Grandes eventos e ingressos
- Experiências premium e turismo esportivo
- Mercado, marcas e patrocínios

Máximo de 5 itens por seção, com deduplicação de títulos entre seções.

## Status do setup

- [x] Tabela `daily_news` criada (com RLS, acesso só via service role)
- [x] Rota `/api/fetch-daily-news` (coleta) e `/api/send-daily-news` (envio), ambas protegidas por `CRON_SECRET`
- [x] `vercel.json` com os 2 crons (limite do plano Hobby da Vercel = 2 crons diários, exatamente o que usamos)
- [x] Tarefa Claude `banco-noticias-diario` desativada (substituída pela coleta na nuvem)
- [ ] Remover a tarefa do Windows, se registrada: `schtasks /Delete /TN BluePanda-UploadDailyNews /F`
- [ ] DNS do `bluepandatravel.com.br` no Resend (DKIM/SPF/MX); enquanto não verificar, o remetente é `news@brasilsportsbusiness.com` (`EMAIL_FROM`); depois trocar para `contato@bluepandatravel.com.br`.
- [ ] Env vars na Vercel: `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `EMAIL_FROM`, `DAILY_NEWS_TO` (opcional).

## Teste manual (após deploy)

```
curl -H "Authorization: Bearer $CRON_SECRET" https://<deploy>/api/fetch-daily-news
curl -H "Authorization: Bearer $CRON_SECRET" https://<deploy>/api/send-daily-news
```

Conferir a linha na tabela `daily_news` (Supabase → Table Editor) e o e-mail em agenciazebrapubli@gmail.com (checar spam na primeira vez).

## Arquivos

- `app/api/fetch-daily-news/route.ts` — coleta via Google News RSS (cron 10:15 UTC)
- `app/api/send-daily-news/route.ts` — envio do e-mail (cron 11:00 UTC)
- `lib/daily-news.ts` — fuso de São Paulo + conversão markdown→HTML
- `supabase/migrations/20260706120000_create_daily_news.sql` — tabela (já aplicada)
- `vercel.json` — crons da Vercel
- `scripts/upload-daily-news.*` — **obsoletos** (fluxo antigo dependente do Windows); podem ser removidos

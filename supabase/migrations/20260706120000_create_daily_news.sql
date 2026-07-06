-- Banco de Notícias — conteúdo diário enviado por e-mail via cron
create table if not exists public.daily_news (
  id uuid primary key default gen_random_uuid(),
  news_date date not null unique,
  content_md text not null,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.daily_news is
  'Bloco diário do Banco de Notícias - Experiências Esportivas Premium. Inserido pela automação de geração; lido pelo cron /api/send-daily-news.';

-- RLS ativado, sem policies públicas: apenas a service role key acessa (leitura pelo cron, escrita pela automação).
alter table public.daily_news enable row level security;

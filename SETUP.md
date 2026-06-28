# Blue Panda Platform — Setup

## 1. Instalar dependências

```bash
cd blue-panda-platform
npm install
```

## 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas chaves:

```bash
cp .env.local.example .env.local
```

Preencha:
- `NEXT_PUBLIC_SUPABASE_URL` — URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Chave anon do Supabase
- `RESEND_API_KEY` — API key do Resend

## 3. Adicionar a logo

Copie o arquivo `blue panda.png` da pasta raiz para:
```
public/images/logo.png
```

## 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 5. Build de produção

```bash
npm run build
npm start
```

## 6. Deploy na Vercel

- Conectar o repositório GitHub na Vercel
- Adicionar as variáveis de ambiente no painel da Vercel
- Deploy automático a cada push na branch `main`

## Stack

- Next.js 15 (App Router)
- TypeScript Strict
- Tailwind CSS
- Framer Motion
- Supabase
- Resend
- shadcn/ui components

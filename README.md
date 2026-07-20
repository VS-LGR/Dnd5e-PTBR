# Grimório do Aventureiro

Ferramenta de criação e gestão de fichas **D&D 5e PT-BR**.

## Stack

- Next.js (App Router) + TypeScript + TailwindCSS
- Supabase (Auth + Postgres) — opcional em modo local
- Deploy: Vercel

## Desenvolvimento

```bash
npm install
cp .env.example .env.local   # opcional — sem isso usa localStorage
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Documentação

Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

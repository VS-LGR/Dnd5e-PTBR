# Grimório do Aventureiro

Ferramenta de RPG **compatível com DnD 5e** — criação e gestão de fichas em português.

## Stack

- Next.js (App Router) + TypeScript + TailwindCSS
- Supabase (Auth + Postgres) — opcional em modo local
- Google AdSense (espaços reservados; slots via env)
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

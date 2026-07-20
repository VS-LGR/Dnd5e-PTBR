# Grimório do Aventureiro — Arquitetura

Ferramenta de fichas D&D 5e PT-BR (Next.js App Router + TypeScript + Tailwind + Supabase).

## Estrutura do projeto

```
/src
  /app                 # Rotas (App Router)
  /components
    /layout            # Header, Footer, AppShell (sem lógica de regras)
    /sections          # Composição de páginas (props + orquestração)
    /ui                # Button, Input, Panel, Tabs, Badge (puros)
  /lib
    /rules             # Motor DnD (mods, PB, HP, CA, slots, multiclasse)
    /spells            # Resolução de listas / preparação
    /character         # Tipos, level-up, repositório (Supabase ou localStorage)
    /supabase          # Clients browser/server + tipos DB
  /config              # Dados estáticos PHB (raças, classes, magias, regras…)
  /styles              # Tokens tema livro (pergaminho / carmim)
  /assets              # Assets estáticos
/supabase/migrations   # SQL: profiles, characters, RLS
/scripts               # Extração offline de PDFs (opcional)
/docs                  # Documentação
```

## Mapa de componentes

| Área | Componentes |
|------|-------------|
| Layout | `AppShell`, `Header`, `Footer` |
| Home | `HomeHeroSection`, `HomeFeaturesSection` |
| Personagens | `CharacterListSection`, `CharacterWizardSection`, `CharacterSheetSection`, `LevelUpSection` |
| Magias | `SpellsCatalogSection`, `SpellDetailSection` |
| Regras | `RulesIndexSection`, `RuleArticleSection` |
| Auth | `AuthSection` |
| UI | `Button`, `Input`, `Select`, `Textarea`, `Panel`, `Badge`, `Tabs` |

## Localização das lógicas

| Domínio | Onde |
|---------|------|
| Modificadores, PB, perícias, HP, CA, slots, DC | `src/lib/rules/index.ts` |
| Subir de nível / ASI / talento | `src/lib/character/levelUp.ts` |
| Persistência | `src/lib/character/repository.ts` |
| Dados PHB | `src/config/**` |
| Artigos de regras | `src/config/rules/articles.ts` |
| Magias | `src/config/spells/**` |

## Rotas

- `/` — entrada da ferramenta
- `/auth` — login/registro Supabase (ou instruções modo local)
- `/characters` — lista
- `/characters/new` — wizard Cap. 1
- `/characters/[id]` — ficha (Combate / Narrativa / Magias)
- `/characters/[id]/level-up` — evolução
- `/spells`, `/spells/[slug]` — catálogo
- `/rules`, `/rules/[slug]` — consulta

## Supabase

1. Crie um projeto no Supabase.
2. Copie `.env.example` → `.env.local` e preencha URL + anon key.
3. Execute `supabase/migrations/001_init.sql` no SQL Editor.
4. Sem env válido, a app usa **localStorage** (desenvolvimento offline).

## Deploy (Vercel)

1. Importe o repositório na Vercel.
2. Defina `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy (`vercel.json` incluso). Framework: Next.js.

## Metadata

Metadata básica por página (`title` / `description` no root). Sem funil comercial.

## Expansão futura

- Livros adicionais (Xanathar, Tasha) como packs em `/config`
- Import/export JSON da ficha
- Homebrew com `schemaVersion`
- Multiclasse com validação completa de pré-requisitos na UI
- Sincronizar texto das magias a partir dos PDFs via `scripts/extract-spell-pdfs.ts`

## Observações técnicas

- Dependências extras: apenas `@supabase/supabase-js` e `@supabase/ssr`.
- Sections não calculam regras — chamam `/lib`.
- `CharacterState` em JSONB permite evolução sem migrações destrutivas.
- Conteúdo WotC: em produção pública, publique apenas o permitido pela licença/SRD.

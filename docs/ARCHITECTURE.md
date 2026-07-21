# Grimório do Aventureiro — Arquitetura

Ferramenta de fichas D&D 5e PT-BR (Next.js App Router + TypeScript + Tailwind + Supabase).

## Fontes de conteúdo

| Tag | Livro | No app |
|-----|-------|--------|
| `phb` | Livro do Jogador | Raças core, 12 classes, talentos PHB |
| `motm` | Monstros do Multiverso (OCR BR) | 33 raças com ASI flutuante |
| `tcoe` | Caldeirão de Tasha | Artífice, subclasses, opcionais, 15 talentos, linhagem customizada |

PDFs de estudo ficam fora do Git (`*.pdf` no `.gitignore`).

## Estrutura do projeto

```
/src
  /app
  /components/layout|sections|ui
  /lib/rules|spells|character|supabase
  /config/races (phb + motm) | classes (+ tashaExtras) | feats | spells | …
```

## MotM

- `abilityScoreModel: "motm-floating"` → picker +2/+1 ou +1/+1/+1 em `motmAbilityBonuses`
- `countsAs`, `sizeOptions`, `choices` (revelação, morfismo, legado, estação)
- Motor: [`src/lib/rules/index.ts`](../src/lib/rules/index.ts) aplica MotM / origem Tasha / feat picks

## Tasha (escopo C)

- Artífice half-caster + 4 especializações
- Subclasses novas em todas as classes PHB (`src/config/classes/tashaExtras.ts`)
- `optionalFeatures` selecionáveis → `optionalFeatureIds`
- FeatPicker com descrição completa
- Customizar origem + Linhagem Customizada

## Wizard

- Nível inicial 1–20, point buy validado (27 pts), MotM ASI, ASI/talentos em lote, opcionais

## Persistência

- `schemaVersion: 2` + `migrateCharacterState`
- Sem Supabase: localStorage

## Deploy

Vercel + env Supabase; SQL em `supabase/migrations/001_init.sql`.

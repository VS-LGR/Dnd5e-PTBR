# Grimório do Aventureiro — Arquitetura

Ferramenta de fichas D&D 5e PT-BR (Next.js App Router + TypeScript + Tailwind + Supabase).

## Fontes de conteúdo

| Tag | Livro | No app |
|-----|-------|--------|
| `phb` | Livro do Jogador | Raças core, 12 classes, talentos PHB |
| `motm` | Monstros do Multiverso (OCR BR) | 33 raças com ASI flutuante |
| `tcoe` | Caldeirão de Tasha | Artífice, subclasses, opcionais, 15 talentos, linhagem customizada |
| `basic-rules` | Magic Items A–Z (D&D Beyond Basic Rules) | Itens mágicos traduzidos PT-BR |

PDFs de estudo ficam fora do Git (`*.pdf` no `.gitignore`).

## Estrutura do projeto

```
/src
  /app
  /components/layout|sections|ui
  /lib/rules|spells|items|character|supabase
  /config/races|classes|feats|spells|equipment|items|…
/content/items
  magic-items-basic-rules.en.json / .pt.json
```

## Itens (`/items`)

- Mundanos: armas e armaduras PHB (com bloco de combate) + equipamento de aventureiro
- Mágicos: Basic Rules A–Z (~248), glossário PT-BR
- Filtros: Poções, Itens mágicos, Armas, Armaduras, Gear, **Criados (Forja)**
- Ficha: adicionar do catálogo, equipar arma → `Ataque +N · Dano XdY+M tipo` (`src/lib/items/combat.ts`)

## Forja de Itens (`/items/forja`)

Assistente próprio (4 passos: Identidade → Base → Poderes → Revisão) para montar itens mágicos customizados.

| Peça | Arquivo |
|------|---------|
| Tipos / poderes | `src/lib/items/forgeTypes.ts` |
| Orçamento por raridade | `src/lib/items/forgeBalance.ts` |
| Descrição PT-BR | `src/lib/items/forgeGenerate.ts` |
| Persistência localStorage (`dnd5e-ptbr-forge-items`) | `src/lib/items/forgeRepository.ts` |
| Merge no catálogo | `getItem` / `filterItems` / `listEffectiveItems` |
| UI | `src/components/sections/forge/*` |

Na ficha (`InventoryItem`): `attuned`, `chargesUsed`; poderes de atributo/perícia/CA/combate via `forgeModifiers`; painel **Magias de itens** separado das preparadas.

## Forma Selvagem (`WildShapePanel`)

Painel na ficha (aba Combate) para druidas nível ≥ 2.

| Peça | Arquivo |
|------|---------|
| Catálogo (PDF → PT-BR, gates) | `src/config/wildShape/forms.ts` |
| Fichas SRD 5.1 PT-BR | `src/config/wildShape/statBlocksData.json` + `statBlocks.ts` |
| Motor CR / usos / Lua | `src/lib/wildShape/rules.ts` |
| UI | `src/components/sections/WildShapePanel.tsx` |
| Estado | `CharacterState.wildShape` (`usesRemaining`, `activeFormId`) |

Híbrido: formas do PDF filtradas por nível/subclasse; ficha completa se existir no SRD; senão resumo (HP, tags, movimento). Usos 2/descanso (ilimitado no 20º); elementais Lua custam 2.

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

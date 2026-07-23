"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  filterItems,
  type ItemFilterPreset,
} from "@/config/items";
import type { ItemRarity } from "@/config/types";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { DiceChip } from "@/components/ui/DiceChip";
import {
  extractDiceFormulas,
  descriptionHasTable,
} from "@/lib/items/parseDescription";

const RARITY_LABEL: Record<string, string> = {
  mundane: "Mundano",
  common: "Comum",
  uncommon: "Incomum",
  rare: "Rara",
  "very-rare": "Muito rara",
  legendary: "Lendária",
  artifact: "Artefato",
  varies: "Variável",
};

const CATEGORY_LABEL: Record<string, string> = {
  weapon: "Arma",
  armor: "Armadura",
  shield: "Escudo",
  potion: "Poção",
  ring: "Anel",
  rod: "Bastão",
  staff: "Cajado",
  wand: "Varinha",
  wondrous: "Maravilhoso",
  scroll: "Pergaminho",
  ammunition: "Munição",
  gear: "Equipamento",
  tool: "Ferramenta",
  other: "Outro",
};

export function ItemsCatalogSection() {
  const [query, setQuery] = useState("");
  const [preset, setPreset] = useState<ItemFilterPreset>("all");
  const [rarity, setRarity] = useState<ItemRarity | "all">("all");
  const [attunement, setAttunement] = useState<"all" | "yes" | "no">("all");
  const [kind, setKind] = useState<"all" | "mundane" | "magic">("all");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
  }, []);

  const results = useMemo(
    () =>
      filterItems({
        query,
        preset,
        rarity,
        attunement,
        kind,
      }),
    [query, preset, rarity, attunement, kind, tick],
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Itens"
        description="Catálogo de itens mundanos (PHB), mágicos (Basic Rules) e comuns do Guia de Xanathar, em português."
        actions={
          <Link href="/items/forja">
            <Button type="button" className="w-full sm:w-auto">
              Forja de Itens
            </Button>
          </Link>
        }
      />

      <Panel title="Filtros">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <Input
            label="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome do item…"
          />
          <Select
            label="Categoria"
            value={preset}
            onChange={(e) => setPreset(e.target.value as ItemFilterPreset)}
            options={[
              { value: "all", label: "Todos" },
              { value: "potions", label: "Poções" },
              { value: "magic", label: "Itens mágicos" },
              { value: "weapons", label: "Armas / munição" },
              { value: "armor", label: "Armaduras / escudos" },
              { value: "gear", label: "Equipamento / ferramentas" },
              { value: "xgte", label: "Comuns (Xanathar)" },
              { value: "created", label: "Criados (Forja)" },
            ]}
          />
          <Select
            label="Tipo"
            value={kind}
            onChange={(e) => setKind(e.target.value as "all" | "mundane" | "magic")}
            options={[
              { value: "all", label: "Mundanos e mágicos" },
              { value: "mundane", label: "Só mundanos" },
              { value: "magic", label: "Só mágicos" },
            ]}
          />
          <Select
            label="Raridade"
            value={rarity}
            onChange={(e) => setRarity(e.target.value as ItemRarity | "all")}
            options={[
              { value: "all", label: "Todas" },
              ...Object.entries(RARITY_LABEL).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
          />
          <Select
            label="Sintonização"
            value={attunement}
            onChange={(e) => setAttunement(e.target.value as "all" | "yes" | "no")}
            options={[
              { value: "all", label: "Todas" },
              { value: "yes", label: "Requer sintonização" },
              { value: "no", label: "Sem sintonização" },
            ]}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          {results.length} item{results.length === 1 ? "" : "s"} encontrado
          {results.length === 1 ? "" : "s"}.
        </p>
      </Panel>

      <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {results.map((item) => (
          <li key={item.id} className="min-w-0">
            <Link
              href={`/items/${item.id}`}
              className="block h-full rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-3.5 shadow-[0_1px_4px_var(--phb-shadow)] transition hover:border-crimson hover:shadow-[0_3px_10px_var(--phb-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-base text-crimson sm:text-lg">{item.name}</span>
                <Badge>{CATEGORY_LABEL[item.category] ?? item.category}</Badge>
                <Badge tone={item.kind === "magic" ? "gold" : undefined}>
                  {RARITY_LABEL[item.rarity] ?? item.rarity}
                </Badge>
                {item.requiresAttunement && (
                  <Badge tone="crimson">Sintonização</Badge>
                )}
                {(item.source === "forja" || item.id.startsWith("forge-")) && (
                  <Badge tone="gold">Criado</Badge>
                )}
                {item.source === "xgte" && <Badge tone="gold">Xanathar</Badge>}
                {descriptionHasTable(item.description) && (
                  <Badge tone="crimson">Tabela</Badge>
                )}
              </div>
              {(item.weaponStats || extractDiceFormulas(item.description, 3).length > 0) && (
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-ink">
                  {item.weaponStats && item.weaponStats.damage !== "—" && (
                    <>
                      <DiceChip formula={item.weaponStats.damage} />
                      <span className="text-ink-muted">{item.weaponStats.damageType}</span>
                    </>
                  )}
                  {extractDiceFormulas(item.description, 3).map((f) => (
                    <DiceChip key={f} formula={f} />
                  ))}
                </p>
              )}
              {item.armorStats && (
                <p className="mt-2 text-sm text-ink">
                  CA {item.armorStats.baseAc}
                  {item.armorStats.dexCap != null
                    ? ` (DES máx. +${item.armorStats.dexCap})`
                    : item.armorStats.category !== "shield"
                      ? " + DES"
                      : ""}
                </p>
              )}
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

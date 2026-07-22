"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getItem } from "@/config/items";
import type { ItemDefinition } from "@/config/types";
import { Panel, Badge } from "@/components/ui/Panel";
import { ItemRichDescription } from "@/components/ui/ItemRichDescription";
import { DiceChip, EffectTable } from "@/components/ui/DiceChip";
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

/** Tabelas curadas quando a extração do PDF perdeu a estrutura. */
const CURATED_TABLES: Record<
  string,
  Array<{ die?: string; title?: string; headers: string[]; rows: string[][] }>
> = {
  "potions-of-healing": [
    {
      title: "Poção de Cura",
      headers: ["Poção", "PV recuperados", "Raridade"],
      rows: [
        ["Cura", "2d4 + 2", "Comum"],
        ["Cura Maior", "4d4 + 4", "Incomum"],
        ["Cura Superior", "8d4 + 8", "Rara"],
        ["Cura Suprema", "10d4 + 20", "Muito rara"],
      ],
    },
  ],
  "armor-+1-+2-or-+3": [
    {
      title: "Bônus de armadura",
      headers: ["Bônus", "Raridade"],
      rows: [
        ["+1", "Rara"],
        ["+2", "Muito rara"],
        ["+3", "Lendária"],
      ],
    },
  ],
  "weapon-+1-+2-or-+3": [
    {
      title: "Bônus de arma",
      headers: ["Bônus", "Raridade"],
      rows: [
        ["+1", "Incomum"],
        ["+2", "Rara"],
        ["+3", "Muito rara"],
      ],
    },
  ],
};

export function ItemDetailSection({ itemId }: { itemId: string }) {
  const [item, setItem] = useState<ItemDefinition | null | undefined>(undefined);

  useEffect(() => {
    setItem(getItem(itemId) ?? null);
  }, [itemId]);

  if (item === undefined) {
    return <p className="text-ink-muted">Carregando…</p>;
  }

  if (!item) {
    return (
      <div>
        <p>Item não encontrado.</p>
        <Link href="/items" className="text-crimson underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const dice = extractDiceFormulas(item.description, 6);
  const hasTable =
    descriptionHasTable(item.description) || Boolean(CURATED_TABLES[item.id]);
  const curated = CURATED_TABLES[item.id];

  return (
    <div className="space-y-4">
      <Link href="/items" className="text-sm text-ink-muted underline">
        ← Catálogo de itens
      </Link>
      {(item.source === "forja" || item.id.startsWith("forge-")) && (
        <p className="text-sm">
          <Link href="/items/forja" className="text-crimson underline">
            Forja de Itens
          </Link>
          {" · "}
          <Link
            href={`/items/forja/nova?edit=${item.id}`}
            className="text-ink-muted underline"
          >
            Editar
          </Link>
        </p>
      )}
      <Panel title={item.name}>
        <div className="flex flex-wrap gap-2">
          <Badge>{item.kind === "magic" ? "Mágico" : "Mundano"}</Badge>
          <Badge tone="gold">{RARITY_LABEL[item.rarity] ?? item.rarity}</Badge>
          <Badge>{item.category}</Badge>
          {item.requiresAttunement && <Badge tone="crimson">Sintonização</Badge>}
          {(item.source === "forja" || item.id.startsWith("forge-")) && (
            <Badge tone="gold">Criado</Badge>
          )}
          {hasTable && <Badge tone="crimson">Tabela</Badge>}
          {dice.length > 0 && <Badge>Rolagens</Badge>}
        </div>
        {item.typeLine && (
          <p className="mt-2 text-sm italic text-ink-muted">{item.typeLine}</p>
        )}
        {item.nameEn && (
          <p className="mt-1 text-xs text-ink-muted">EN: {item.nameEn}</p>
        )}

        {(dice.length > 0 ||
          (item.weaponStats?.damage && item.weaponStats.damage !== "—")) && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-sm border border-frame/50 bg-parchment px-3 py-2">
            <span className="font-display text-xs uppercase tracking-wide text-crimson">
              Dados
            </span>
            {item.weaponStats?.damage && item.weaponStats.damage !== "—" && (
              <DiceChip
                formula={item.weaponStats.damage}
                title={`Dano: ${item.weaponStats.damage} ${item.weaponStats.damageType}`}
              />
            )}
            {item.weaponStats?.versatile && (
              <DiceChip
                formula={item.weaponStats.versatile}
                title="Dano versátil (duas mãos)"
              />
            )}
            {dice.map((f) => (
              <DiceChip key={f} formula={f} />
            ))}
          </div>
        )}

        {item.weaponStats && (
          <div className="mt-4 rounded-sm border border-frame/50 bg-parchment p-3">
            <p className="font-display text-sm uppercase text-crimson">Combate</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li className="flex flex-wrap items-center gap-2">
                Dano: <DiceChip formula={item.weaponStats.damage} />{" "}
                {item.weaponStats.damageType}
              </li>
              <li>
                Tipo:{" "}
                {item.weaponStats.category === "simple" ? "simples" : "marcial"} /{" "}
                {item.weaponStats.range === "melee" ? "corpo a corpo" : "à distância"}
              </li>
              {item.weaponStats.properties.length > 0 && (
                <li>Propriedades: {item.weaponStats.properties.join(", ")}</li>
              )}
              {item.weaponStats.normalRangeM != null && (
                <li>
                  Alcance: {item.weaponStats.normalRangeM}/
                  {item.weaponStats.longRangeM} m
                </li>
              )}
              {item.weaponStats.versatile && (
                <li className="flex flex-wrap items-center gap-2">
                  Versátil: <DiceChip formula={item.weaponStats.versatile} />
                </li>
              )}
            </ul>
          </div>
        )}

        {item.armorStats && (
          <div className="mt-4 rounded-sm border border-frame/50 bg-parchment p-3">
            <p className="font-display text-sm uppercase text-crimson">Proteção</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                CA: <strong>{item.armorStats.baseAc}</strong>
                {item.armorStats.category !== "shield" &&
                  (item.armorStats.dexCap == null
                    ? " + modificador de Destreza"
                    : ` + DES (máx. +${item.armorStats.dexCap})`)}
              </li>
              {item.armorStats.stealthDisadvantage && (
                <li>Desvantagem em Furtividade</li>
              )}
              {item.armorStats.strengthRequirement != null && (
                <li>Requisito de Força: {item.armorStats.strengthRequirement}</li>
              )}
            </ul>
          </div>
        )}

        {item.variants && item.variants.length > 0 && (
          <div className="mt-4">
            <EffectTable
              title="Variantes"
              headers={["Bônus", "Raridade"]}
              rows={item.variants.map((v) => [
                `+${v.magicBonus}`,
                RARITY_LABEL[v.rarity] ?? v.rarity,
              ])}
            />
          </div>
        )}

        <div className="mt-4">
          <p className="mb-2 font-display text-sm uppercase tracking-wide text-crimson">
            Descrição e efeitos
          </p>
          <ItemRichDescription
            description={item.description}
            extraTables={curated}
          />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {item.costGp != null && (
            <div>
              <dt className="text-ink-muted">Custo</dt>
              <dd>{item.costGp} PO</dd>
            </div>
          )}
          {item.weight != null && (
            <div>
              <dt className="text-ink-muted">Peso</dt>
              <dd>{item.weight} lb</dd>
            </div>
          )}
          {item.source && (
            <div>
              <dt className="text-ink-muted">Fonte</dt>
              <dd>{item.source === "forja" ? "Forja" : item.source}</dd>
            </div>
          )}
        </dl>
      </Panel>
    </div>
  );
}

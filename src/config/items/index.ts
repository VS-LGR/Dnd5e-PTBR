import type { ItemCategory, ItemDefinition, ItemRarity } from "@/config/types";
import { ARMORS, WEAPONS } from "@/config/equipment";
import {
  getForgeAsDefinition,
  listForgeAsDefinitions,
} from "@/lib/items/forgeRepository";
import { ADVENTURING_GEAR } from "./gear";
import magicRaw from "./magicItemsData.json";
import xgteCommonRaw from "./xgteCommonData.json";

type MagicRaw = {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  typeLine?: string;
  rarity: string;
  requiresAttunement: boolean;
  description: string;
  source?: string;
  variants?: Array<{ idSuffix: string; magicBonus: number; rarity: string }>;
};

function asRarity(r: string): ItemRarity {
  const allowed: ItemRarity[] = [
    "mundane",
    "common",
    "uncommon",
    "rare",
    "very-rare",
    "legendary",
    "artifact",
    "varies",
  ];
  return (allowed.includes(r as ItemRarity) ? r : "varies") as ItemRarity;
}

function asCategory(c: string): ItemCategory {
  const allowed: ItemCategory[] = [
    "weapon",
    "armor",
    "shield",
    "potion",
    "ring",
    "rod",
    "staff",
    "wand",
    "wondrous",
    "scroll",
    "ammunition",
    "gear",
    "tool",
    "other",
  ];
  return (allowed.includes(c as ItemCategory) ? c : "other") as ItemCategory;
}

function mundaneFromEquipment(): ItemDefinition[] {
  const weapons: ItemDefinition[] = WEAPONS.map((w) => ({
    id: `weapon-${w.id}`,
    name: w.name,
    kind: "mundane",
    category: "weapon",
    rarity: "mundane",
    description: `Arma ${w.category === "simple" ? "simples" : "marcial"} (${w.range === "melee" ? "corpo a corpo" : "à distância"}). Dano ${w.damage} ${w.damageType}.`,
    costGp: w.costGp,
    weight: w.weight,
    source: "phb",
    equipmentId: w.id,
    weaponStats: {
      damage: w.damage,
      damageType: w.damageType,
      properties: w.properties,
      category: w.category,
      range: w.range,
      finesse: w.finesse,
      versatile: w.versatile,
      normalRangeM: w.normalRangeM,
      longRangeM: w.longRangeM,
    },
  }));

  const armors: ItemDefinition[] = ARMORS.filter((a) => a.category !== "none").map((a) => ({
    id: a.category === "shield" ? `shield-${a.id}` : `armor-${a.id}`,
    name: a.name,
    kind: "mundane",
    category: a.category === "shield" ? "shield" : "armor",
    rarity: "mundane",
    description:
      a.category === "shield"
        ? `Escudo. +${a.baseAc} CA enquanto empunhado.`
        : `Armadura ${a.category}. CA base ${a.baseAc}${a.dexCap != null ? ` (DES máx. +${a.dexCap})` : ""}.`,
    costGp: a.costGp,
    weight: a.weight,
    source: "phb",
    equipmentId: a.id,
    armorStats: {
      category: a.category,
      baseAc: a.baseAc,
      dexCap: a.dexCap,
      stealthDisadvantage: a.stealthDisadvantage,
      strengthRequirement: a.strengthRequirement,
    },
  }));

  return [...weapons, ...armors];
}

function magicFromJson(): ItemDefinition[] {
  const fromBasic = (magicRaw as MagicRaw[]).map((m) => mapMagicRow(m));
  const fromXgte = (xgteCommonRaw as MagicRaw[]).map((m) => mapMagicRow(m));
  return [...fromBasic, ...fromXgte];
}

function mapMagicRow(m: MagicRaw): ItemDefinition {
  let category = asCategory(m.category);
  if (category === "armor" && /escudo|shield/i.test(m.name + (m.typeLine ?? ""))) {
    category = "shield";
  }
  return {
    id: m.id,
    name: m.name,
    nameEn: m.nameEn,
    kind: "magic" as const,
    category,
    rarity: asRarity(m.rarity),
    requiresAttunement: m.requiresAttunement,
    description: m.description,
    typeLine: m.typeLine,
    source: m.source ?? "basic-rules",
    variants: m.variants?.map((v) => ({
      idSuffix: v.idSuffix,
      magicBonus: v.magicBonus,
      rarity: asRarity(v.rarity),
    })),
    magicBonus:
      m.variants?.length === 1 ? m.variants[0]?.magicBonus : undefined,
  };
}

export const ITEMS: ItemDefinition[] = [
  ...mundaneFromEquipment(),
  ...ADVENTURING_GEAR,
  ...magicFromJson(),
];

/** Merge catálogo estático + itens da Forja (localStorage, só no cliente). */
export function listEffectiveItems(): ItemDefinition[] {
  if (typeof window === "undefined") return [...ITEMS];
  const forge = listForgeAsDefinitions();
  if (!forge.length) return [...ITEMS];
  const ids = new Set(forge.map((i) => i.id));
  return [...ITEMS.filter((i) => !ids.has(i.id)), ...forge];
}

export function getItem(id: string): ItemDefinition | undefined {
  const staticItem = ITEMS.find((i) => i.id === id);
  if (staticItem) return staticItem;
  if (typeof window === "undefined") return undefined;
  return getForgeAsDefinition(id);
}

export function searchItems(query: string): ItemDefinition[] {
  const pool = listEffectiveItems();
  const q = query.trim().toLocaleLowerCase("pt-BR");
  if (!q) return pool;
  return pool.filter((item) =>
    [item.id, item.name, item.nameEn ?? "", item.description, item.category]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(q),
  );
}

export type ItemFilterPreset =
  | "all"
  | "potions"
  | "magic"
  | "weapons"
  | "armor"
  | "gear"
  | "created"
  | "xgte";

export function filterItems(
  options: {
    query?: string;
    preset?: ItemFilterPreset;
    rarity?: ItemRarity | "all";
    attunement?: "all" | "yes" | "no";
    kind?: "all" | "mundane" | "magic";
  } = {},
): ItemDefinition[] {
  const {
    query = "",
    preset = "all",
    rarity = "all",
    attunement = "all",
    kind = "all",
  } = options;

  let list = query ? searchItems(query) : listEffectiveItems();

  if (kind !== "all") {
    list = list.filter((i) => i.kind === kind);
  }

  if (preset === "potions") {
    list = list.filter((i) => i.category === "potion");
  } else if (preset === "magic") {
    list = list.filter((i) => i.kind === "magic");
  } else if (preset === "weapons") {
    list = list.filter(
      (i) => i.category === "weapon" || i.category === "ammunition",
    );
  } else if (preset === "armor") {
    list = list.filter((i) => i.category === "armor" || i.category === "shield");
  } else if (preset === "gear") {
    list = list.filter((i) => i.category === "gear" || i.category === "tool");
  } else if (preset === "created") {
    list = list.filter((i) => i.source === "forja" || i.id.startsWith("forge-"));
  } else if (preset === "xgte") {
    list = list.filter((i) => i.source === "xgte");
  }

  if (rarity !== "all") {
    list = list.filter((i) => i.rarity === rarity);
  }

  if (attunement === "yes") {
    list = list.filter((i) => i.requiresAttunement);
  } else if (attunement === "no") {
    list = list.filter((i) => !i.requiresAttunement);
  }

  return list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export { ADVENTURING_GEAR } from "./gear";

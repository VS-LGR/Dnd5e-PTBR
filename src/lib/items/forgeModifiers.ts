import type {
  AbilityKey,
  AbilityScores,
  CharacterState,
  InventoryItem,
  SkillKey,
} from "@/lib/character/types";
import { getItem } from "@/config/items";
import { getForgeItem } from "./forgeRepository";
import type { CustomMagicItem, ForgePower } from "./forgeTypes";

const MAX_ATTUNED = 3;

export function isForgeInventoryItem(item: InventoryItem): boolean {
  return Boolean(item.itemId?.startsWith("forge-"));
}

export function resolveCustomMagic(
  item: InventoryItem,
): CustomMagicItem | undefined {
  if (!item.itemId?.startsWith("forge-")) return undefined;
  return getForgeItem(item.itemId);
}

/** Poderes ativos: equipado e, se exigir sintonização, sintonizado. */
export function itemPowersActive(
  inv: InventoryItem,
  custom: CustomMagicItem,
): boolean {
  if (!inv.equipped) return false;
  if (custom.requiresAttunement && !inv.attuned) return false;
  return true;
}

export function countAttuned(state: CharacterState): number {
  return state.inventory.filter((i) => i.attuned).length;
}

export function canAttune(state: CharacterState, invId: string): boolean {
  const item = state.inventory.find((i) => i.id === invId);
  if (!item) return false;
  if (item.attuned) return true;
  return countAttuned(state) < MAX_ATTUNED;
}

export function forgeAbilityBonuses(state: CharacterState): Partial<AbilityScores> {
  const bonuses: Partial<AbilityScores> = {};
  for (const inv of state.inventory) {
    const custom = resolveCustomMagic(inv);
    if (!custom || !itemPowersActive(inv, custom)) continue;
    for (const power of custom.powers) {
      if (power.type !== "bonus-atributo") continue;
      bonuses[power.ability] =
        (bonuses[power.ability] ?? 0) + power.value;
    }
  }
  return bonuses;
}

export function forgeSkillProficiencies(state: CharacterState): SkillKey[] {
  const skills = new Set<SkillKey>();
  for (const inv of state.inventory) {
    const custom = resolveCustomMagic(inv);
    if (!custom || !itemPowersActive(inv, custom)) continue;
    for (const power of custom.powers) {
      if (power.type === "pericia") skills.add(power.skill);
    }
  }
  return [...skills];
}

export function forgeMagicBonusFromPowers(powers: ForgePower[]): number {
  const p = powers.find((x) => x.type === "bonus-ataque-dano");
  return p && p.type === "bonus-ataque-dano" ? p.value : 0;
}

export function forgeExtraDamageLabel(powers: ForgePower[]): string | null {
  const parts: string[] = [];
  for (const p of powers) {
    if (p.type !== "dano-extra") continue;
    const vs = p.versus?.trim() ? ` (${p.versus})` : "";
    parts.push(`+${p.diceCount}${p.die} ${p.damageType}${vs}`);
  }
  return parts.length ? parts.join(", ") : null;
}

export interface ItemSpellEntry {
  inventoryId: string;
  itemName: string;
  spellId: string;
  mode: "a-vontade" | "cargas";
  chargesMin?: number;
  chargesMax?: number;
  castAtLevel?: number;
  chargesMaxItem?: number;
  chargesUsed?: number;
}

export function listItemSpells(state: CharacterState): ItemSpellEntry[] {
  const out: ItemSpellEntry[] = [];
  for (const inv of state.inventory) {
    const custom = resolveCustomMagic(inv);
    if (!custom || !itemPowersActive(inv, custom)) continue;
    for (const power of custom.powers) {
      if (power.type !== "magia") continue;
      out.push({
        inventoryId: inv.id,
        itemName: inv.name,
        spellId: power.spellId,
        mode: power.mode,
        chargesMin: power.chargesMin,
        chargesMax: power.chargesMax,
        castAtLevel: power.castAtLevel,
        chargesMaxItem: custom.charges?.max,
        chargesUsed: inv.chargesUsed ?? 0,
      });
    }
  }
  return out;
}

export function inventoryMagicBonus(inv: InventoryItem): number {
  if (inv.magicBonus != null) return inv.magicBonus;
  const custom = resolveCustomMagic(inv);
  if (custom) return forgeMagicBonusFromPowers(custom.powers);
  if (inv.itemId) {
    const def = getItem(inv.itemId);
    return def?.magicBonus ?? 0;
  }
  return 0;
}

export function inventoryArmorMagicBonus(state: CharacterState): number {
  let bonus = 0;
  for (const inv of state.inventory) {
    if (!inv.equipped) continue;
    const custom = resolveCustomMagic(inv);
    if (custom) {
      if (!itemPowersActive(inv, custom)) continue;
      if (custom.baseKind !== "armor") continue;
      bonus += forgeMagicBonusFromPowers(custom.powers);
      continue;
    }
    if (!inv.itemId) continue;
    const def = getItem(inv.itemId);
    if (!def) continue;
    if (def.category !== "armor" && def.category !== "shield") continue;
    if (def.requiresAttunement && !inv.attuned) continue;
    bonus += def.magicBonus ?? inv.magicBonus ?? 0;
  }
  return bonus;
}

export type { AbilityKey };

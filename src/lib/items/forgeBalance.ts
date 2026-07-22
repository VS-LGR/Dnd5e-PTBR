import type { ItemRarity } from "@/config/types";
import type { CustomMagicItem, ForgePower } from "./forgeTypes";

/** Pontos de orçamento sugeridos por raridade. */
export const FORGE_BUDGET: Partial<Record<ItemRarity, number>> = {
  common: 1,
  uncommon: 2,
  rare: 4,
  "very-rare": 6,
  legendary: 8,
  artifact: 12,
  varies: 4,
  mundane: 0,
};

export function powerCost(power: ForgePower): number {
  switch (power.type) {
    case "bonus-ataque-dano":
      return power.value; // +1=1, +2=2, +3=3
    case "dano-extra": {
      const dice = power.diceCount;
      if (dice <= 1) return 1;
      if (dice === 2) return 2;
      return 3;
    }
    case "bonus-atributo":
      return Math.max(1, power.value);
    case "pericia":
      return 1;
    case "magia":
      if (power.mode === "a-vontade") return 3;
      return Math.max(1, power.chargesMin ?? 1);
    case "texto-livre":
      return 0;
    default:
      return 0;
  }
}

export function forgeBudgetUsed(item: CustomMagicItem): number {
  return item.powers.reduce((sum, p) => sum + powerCost(p), 0);
}

export function forgeBudgetMax(rarity: ItemRarity): number {
  return FORGE_BUDGET[rarity] ?? 2;
}

export function forgeBudgetStatus(item: CustomMagicItem): {
  used: number;
  max: number;
  over: boolean;
} {
  const used = forgeBudgetUsed(item);
  const max = forgeBudgetMax(item.rarity);
  return { used, max, over: used > max };
}

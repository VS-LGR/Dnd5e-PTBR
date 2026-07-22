import type { AbilityKey, SkillKey } from "@/lib/character/types";
import type { ItemCategory, ItemRarity } from "@/config/types";

export type ForgeBaseKind = "wonder" | "weapon" | "armor";

export type ForgeChargeReset =
  | "amanhecer"
  | "descanso-curto"
  | "descanso-longo"
  | "custom";

export type ForgePower =
  | {
      id: string;
      type: "bonus-ataque-dano";
      value: 1 | 2 | 3;
    }
  | {
      id: string;
      type: "dano-extra";
      diceCount: number;
      die: "d4" | "d6" | "d8" | "d10" | "d12";
      damageType: string;
      versus?: string;
    }
  | {
      id: string;
      type: "bonus-atributo";
      ability: AbilityKey;
      value: number;
    }
  | {
      id: string;
      type: "pericia";
      skill: SkillKey;
    }
  | {
      id: string;
      type: "magia";
      spellId: string;
      mode: "a-vontade" | "cargas";
      chargesMin?: number;
      chargesMax?: number;
      castAtLevel?: number;
    }
  | {
      id: string;
      type: "texto-livre";
      text: string;
    };

export interface CustomMagicItem {
  id: string;
  schemaVersion: 1;
  name: string;
  rarity: ItemRarity;
  baseKind: ForgeBaseKind;
  wonderCategory?: ItemCategory;
  baseWeaponId?: string;
  baseArmorId?: string;
  requiresAttunement: boolean;
  attunementBy?: string;
  charges?: {
    max: number;
    reset: ForgeChargeReset;
    resetText?: string;
  };
  powers: ForgePower[];
  descriptionManual?: string;
  descriptionGenerated: string;
  weight?: number;
  createdAt: string;
  updatedAt: string;
}

export function createEmptyForgeDraft(
  partial?: Partial<CustomMagicItem>,
): CustomMagicItem {
  const now = new Date().toISOString();
  return {
    id: `forge-${crypto.randomUUID()}`,
    schemaVersion: 1,
    name: "",
    rarity: "uncommon",
    baseKind: "wonder",
    wonderCategory: "wondrous",
    requiresAttunement: false,
    powers: [],
    descriptionGenerated: "",
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

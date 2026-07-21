import type { CharacterState, Currency, InventoryItem } from "@/lib/character/types";
import { getArmor, getWeapon, ARMORS, WEAPONS } from "@/config/equipment";
import { getClass, getBackground } from "@/config";

/** Parse notations like "5d4×10", "5d4x10", "2d4*10", "5d4" */
export function parseGoldDice(notation: string): {
  count: number;
  sides: number;
  multiplier: number;
} | null {
  const normalized = notation.replace(/\s/g, "").replace(/[×xX]/g, "*");
  const match = normalized.match(/^(\d+)d(\d+)(?:\*(\d+))?$/i);
  if (!match) return null;
  return {
    count: Number(match[1]),
    sides: Number(match[2]),
    multiplier: match[3] ? Number(match[3]) : 1,
  };
}

export function rollDice(count: number, sides: number): { total: number; rolls: number[] } {
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
  return { total: rolls.reduce((a, b) => a + b, 0), rolls };
}

export function rollStartingGold(notation: string): {
  gp: number;
  rolls: number[];
  multiplier: number;
} | null {
  const parsed = parseGoldDice(notation);
  if (!parsed) return null;
  const { total, rolls } = rollDice(parsed.count, parsed.sides);
  return { gp: total * parsed.multiplier, rolls, multiplier: parsed.multiplier };
}

export function emptyCurrency(): Currency {
  return { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
}

export function currencyToGpApprox(c: Currency): number {
  return c.pp * 10 + c.gp + c.ep * 0.5 + c.sp * 0.1 + c.cp * 0.01;
}

function newItem(name: string, equipmentId?: string): InventoryItem {
  return {
    id: crypto.randomUUID(),
    name,
    quantity: 1,
    equipmentId,
    equipped: Boolean(equipmentId),
  };
}

/** Best-effort match of Portuguese equipment strings to armor/weapon ids */
export function matchEquipmentId(name: string): { armorId?: string; weaponId?: string; shield?: boolean } {
  const n = name.toLocaleLowerCase("pt-BR");
  if (/escudo/.test(n)) return { shield: true };

  const armorHints: { id: string; keys: string[] }[] = [
    { id: "padded", keys: ["acolchoada"] },
    { id: "leather", keys: ["couro"] },
    { id: "studded-leather", keys: ["couro batido", "couro cravejado"] },
    { id: "hide", keys: ["pele"] },
    { id: "chain-shirt", keys: ["camisão", "camisao"] },
    { id: "scale-mail", keys: ["escamas"] },
    { id: "breastplate", keys: ["peitoral"] },
    { id: "half-plate", keys: ["meia-armadura", "meia armadura"] },
    { id: "ring-mail", keys: ["anéis", "aneis"] },
    { id: "chain-mail", keys: ["cota de malha", "malha"] },
    { id: "splint", keys: ["talas"] },
    { id: "plate", keys: ["placas"] },
  ];
  for (const hint of armorHints) {
    if (hint.keys.some((k) => n.includes(k)) && /armadura|cota|couro|pele|peitoral|camisão|camisao|acolchoada|talas|placas|escamas|malha/.test(n)) {
      return { armorId: hint.id };
    }
    // shorter: "armadura de couro"
    if (hint.keys.some((k) => n.includes(k))) {
      const armor = getArmor(hint.id);
      if (armor && armor.category !== "shield") return { armorId: hint.id };
    }
  }

  for (const w of WEAPONS) {
    if (n.includes(w.name.toLocaleLowerCase("pt-BR"))) {
      return { weaponId: w.id };
    }
  }
  return {};
}

export function extractGpFromEquipmentLines(lines: string[]): number {
  let gp = 0;
  for (const line of lines) {
    const m = line.match(/(\d+)\s*p\.?\s*o\.?/i) || line.match(/(\d+)\s*po\b/i);
    if (m) gp += Number(m[1]);
  }
  return gp;
}

export type EquipmentGrantMode = "package" | "gold";

export function applyStartingPackage(state: CharacterState): CharacterState {
  const cls = getClass(state.classes[0]?.classId ?? "");
  const bg = getBackground(state.backgroundId);
  const lines = [...(cls?.startingEquipment ?? []), ...(bg?.equipment ?? [])];
  const items: InventoryItem[] = [];
  let armorId: string | null = state.armorId;
  let shieldEquipped = state.shieldEquipped;
  let gpFromPack = 0;

  for (const line of lines) {
    const match = matchEquipmentId(line);
    if (match.armorId) armorId = match.armorId;
    if (match.shield) shieldEquipped = true;
    const gp = extractGpFromEquipmentLines([line]);
    if (gp > 0) {
      gpFromPack += gp;
      // still list the pouch as item without duplicating if only coins
      if (!/^bolsa/i.test(line.trim())) {
        items.push(newItem(line, match.weaponId ?? match.armorId));
      }
    } else {
      items.push(newItem(line, match.weaponId ?? match.armorId));
    }
  }

  return {
    ...state,
    armorId,
    shieldEquipped,
    inventory: items,
    currency: { ...emptyCurrency(), gp: gpFromPack },
  };
}

export function applyGoldBuyMode(
  state: CharacterState,
  rolledGp: number,
): CharacterState {
  return {
    ...state,
    inventory: [],
    armorId: null,
    shieldEquipped: false,
    currency: { ...emptyCurrency(), gp: Math.max(0, rolledGp) },
  };
}

export function buyArmor(
  state: CharacterState,
  armorId: string | null,
): CharacterState {
  const next = { ...state, currency: { ...state.currency } };
  const current = state.armorId ? getArmor(state.armorId) : null;
  if (current) {
    next.currency.gp += current.costGp;
  }
  if (!armorId) {
    return { ...next, armorId: null };
  }
  const armor = getArmor(armorId);
  if (!armor) return { ...next, armorId };
  if (next.currency.gp < armor.costGp) {
    return state; // cannot afford
  }
  next.currency.gp -= armor.costGp;
  return { ...next, armorId };
}

export function toggleShieldPurchase(state: CharacterState, equip: boolean): CharacterState {
  const shield = getArmor("shield");
  const cost = shield?.costGp ?? 10;
  if (equip === state.shieldEquipped) return state;
  if (equip) {
    if (state.currency.gp < cost) return state;
    return {
      ...state,
      shieldEquipped: true,
      currency: { ...state.currency, gp: state.currency.gp - cost },
    };
  }
  return {
    ...state,
    shieldEquipped: false,
    currency: { ...state.currency, gp: state.currency.gp + cost },
  };
}

export function buyWeapon(state: CharacterState, weaponId: string): CharacterState {
  const weapon = getWeapon(weaponId);
  if (!weapon) return state;
  if (state.currency.gp < weapon.costGp) return state;
  return {
    ...state,
    currency: { ...state.currency, gp: state.currency.gp - weapon.costGp },
    inventory: [...state.inventory, newItem(weapon.name, weapon.id)],
  };
}

export function armorOptionsForClass(classId: string) {
  const cls = getClass(classId);
  const profs = (cls?.armorProficiencies ?? []).join(" ").toLocaleLowerCase("pt-BR");
  return ARMORS.filter((a) => {
    if (a.category === "shield") return false;
    if (a.category === "light") return /leve/.test(profs) || /todas|tod/.test(profs) || profs.includes("leve");
    if (a.category === "medium") return /m[eé]dia/.test(profs);
    if (a.category === "heavy") return /pesada/.test(profs);
    return true;
  });
}

export function canUseShield(classId: string): boolean {
  const cls = getClass(classId);
  const profs = (cls?.armorProficiencies ?? []).join(" ").toLocaleLowerCase("pt-BR");
  return /escudo/.test(profs);
}

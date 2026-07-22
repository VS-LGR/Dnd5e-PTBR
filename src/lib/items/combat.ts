import type { AbilityKey, CharacterState } from "@/lib/character/types";
import type { WeaponDefinition } from "@/config/types";
import { getClass, getWeapon } from "@/config";
import { getItem } from "@/config/items";
import {
  abilityModifier,
  finalAbilityScores,
  proficiencyBonus,
  characterLevel,
} from "@/lib/rules";

export interface WeaponAttackSummary {
  weaponId: string;
  weaponName: string;
  ability: AbilityKey;
  proficient: boolean;
  attackBonus: number;
  damageDice: string;
  damageModifier: number;
  damageType: string;
  magicBonus: number;
  label: string;
}

export function characterWeaponProficient(
  state: CharacterState,
  weapon: WeaponDefinition,
): boolean {
  const weaponName = weapon.name.toLocaleLowerCase("pt-BR");
  for (const cls of state.classes) {
    const def = getClass(cls.classId);
    if (!def) continue;
    const text = def.weaponProficiencies.join(" ").toLocaleLowerCase("pt-BR");
    if (text.includes("marciais") && weapon.category === "martial") return true;
    if (text.includes("simples") && weapon.category === "simple") return true;
    if (text.includes(weaponName)) return true;
    // partial matches: "espadas longas" vs "Espada Longa"
    const tokens = weaponName.split(/\s+/);
    if (tokens.length >= 2 && text.includes(tokens[tokens.length - 1]!)) {
      // e.g. longswords listed as "espadas longas"
      if (text.includes(tokens.join(" ")) || text.includes(`${tokens[1]}s`)) return true;
    }
  }
  return false;
}

export function attackAbilityForWeapon(
  weapon: WeaponDefinition,
  state: CharacterState,
): AbilityKey {
  const scores = finalAbilityScores(state);
  if (weapon.range === "ranged") return "dexterity";
  if (weapon.finesse) {
    return abilityModifier(scores.dexterity) >= abilityModifier(scores.strength)
      ? "dexterity"
      : "strength";
  }
  return "strength";
}

export function summarizeWeaponAttack(
  state: CharacterState,
  options: {
    weaponEquipmentId: string;
    magicBonus?: number;
    versatileTwoHanded?: boolean;
    itemName?: string;
  },
): WeaponAttackSummary | null {
  const weapon = getWeapon(options.weaponEquipmentId);
  if (!weapon) return null;

  const magicBonus = options.magicBonus ?? 0;
  const ability = attackAbilityForWeapon(weapon, state);
  const scores = finalAbilityScores(state);
  const mod = abilityModifier(scores[ability]);
  const pb = proficiencyBonus(characterLevel(state));
  const proficient = characterWeaponProficient(state, weapon);
  const attackBonus = mod + (proficient ? pb : 0) + magicBonus;
  const damageDice =
    options.versatileTwoHanded && weapon.versatile ? weapon.versatile : weapon.damage;
  const damageModifier = mod + magicBonus;
  const attackStr = `${attackBonus >= 0 ? "+" : ""}${attackBonus}`;
  const dmgModStr =
    damageModifier === 0
      ? ""
      : damageModifier > 0
        ? `+${damageModifier}`
        : `${damageModifier}`;
  const label = `Ataque ${attackStr} · Dano ${damageDice}${dmgModStr} ${weapon.damageType}`;

  return {
    weaponId: weapon.id,
    weaponName: options.itemName ?? weapon.name,
    ability,
    proficient,
    attackBonus,
    damageDice,
    damageModifier,
    damageType: weapon.damageType,
    magicBonus,
    label,
  };
}

export function summarizeInventoryWeapon(
  state: CharacterState,
  catalogItemId: string,
  magicBonus = 0,
): WeaponAttackSummary | null {
  const item = getItem(catalogItemId);
  if (!item?.equipmentId) return null;
  if (item.category !== "weapon" && item.category !== "ammunition") return null;
  return summarizeWeaponAttack(state, {
    weaponEquipmentId: item.equipmentId,
    magicBonus: magicBonus || item.magicBonus || 0,
    itemName: item.name,
  });
}

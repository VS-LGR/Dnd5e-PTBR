import type { ItemCategory, ItemDefinition } from "@/config/types";
import { getWeapon, getArmor } from "@/config/equipment";
import type { CustomMagicItem } from "./forgeTypes";
import { resolveForgeDescription } from "./forgeGenerate";

export function customItemToDefinition(item: CustomMagicItem): ItemDefinition {
  const description = resolveForgeDescription(item);
  let category: ItemCategory = "wondrous";
  let equipmentId: string | undefined;
  let magicBonus: number | undefined;
  let weaponStats: ItemDefinition["weaponStats"];
  let armorStats: ItemDefinition["armorStats"];

  const attackPower = item.powers.find((p) => p.type === "bonus-ataque-dano");
  if (attackPower && attackPower.type === "bonus-ataque-dano") {
    magicBonus = attackPower.value;
  }

  if (item.baseKind === "weapon" && item.baseWeaponId) {
    const w = getWeapon(item.baseWeaponId);
    category = "weapon";
    equipmentId = item.baseWeaponId;
    if (w) {
      weaponStats = {
        damage: w.damage,
        damageType: w.damageType,
        properties: w.properties,
        category: w.category,
        range: w.range,
        finesse: w.finesse,
        versatile: w.versatile,
        normalRangeM: w.normalRangeM,
        longRangeM: w.longRangeM,
      };
    }
  } else if (item.baseKind === "armor" && item.baseArmorId) {
    const a = getArmor(item.baseArmorId);
    equipmentId = item.baseArmorId;
    category = a?.category === "shield" ? "shield" : "armor";
    if (a) {
      armorStats = {
        category: a.category,
        baseAc: a.baseAc,
        dexCap: a.dexCap,
        stealthDisadvantage: a.stealthDisadvantage,
        strengthRequirement: a.strengthRequirement,
      };
    }
  } else if (item.wonderCategory) {
    category = item.wonderCategory;
  }

  const typeParts = ["Item da Forja"];
  if (item.requiresAttunement) {
    typeParts.push(
      item.attunementBy?.trim()
        ? `Requer sintonização por um(a) ${item.attunementBy.trim()}`
        : "Requer sintonização",
    );
  }

  return {
    id: item.id,
    name: item.name || "Item sem nome",
    kind: "magic",
    category,
    rarity: item.rarity,
    requiresAttunement: item.requiresAttunement,
    description,
    typeLine: typeParts.join(" · "),
    weight: item.weight,
    source: "forja",
    equipmentId,
    magicBonus,
    baseWeaponId: item.baseWeaponId,
    weaponStats,
    armorStats,
  };
}

import { getSpell } from "@/config/spells";
import { getWeapon, getArmor } from "@/config/equipment";
import { ABILITY_LABELS, SKILL_META } from "@/config/tables/labels";
import type { CustomMagicItem, ForgePower } from "./forgeTypes";

const RARITY_PT: Record<string, string> = {
  common: "comum",
  uncommon: "incomum",
  rare: "rara",
  "very-rare": "muito rara",
  legendary: "lendária",
  artifact: "artefato",
  varies: "variável",
};

function describePower(power: ForgePower): string {
  switch (power.type) {
    case "bonus-ataque-dano":
      return `Você tem um bônus de +${power.value} nas rolagens de ataque e de dano feitas com esta arma.`;
    case "dano-extra": {
      const dice = `${power.diceCount}${power.die}`;
      const versus = power.versus?.trim()
        ? ` contra ${power.versus.trim()}`
        : "";
      return `Quando você acerta com esta arma${versus}, o alvo sofre ${dice} de dano ${power.damageType} adicional.`;
    }
    case "bonus-atributo":
      return `Seu valor de ${ABILITY_LABELS[power.ability]} aumenta em ${power.value} enquanto você estiver sintonizado com este item (se exigir sintonização) ou enquanto o usar.`;
    case "pericia":
      return `Você tem proficiência em ${SKILL_META[power.skill].label} enquanto usar este item.`;
    case "magia": {
      const spell = getSpell(power.spellId);
      const name = spell?.name ?? power.spellId;
      if (power.mode === "a-vontade") {
        const lvl =
          power.castAtLevel != null
            ? ` (no ${power.castAtLevel}º círculo)`
            : "";
        return `Você pode conjurar ${name}${lvl} à vontade a partir deste item.`;
      }
      const min = power.chargesMin ?? 1;
      const max = power.chargesMax ?? min;
      const lvl =
        power.castAtLevel != null ? ` no ${power.castAtLevel}º círculo` : "";
      if (min === max) {
        return `Você pode gastar ${min} carga${min > 1 ? "s" : ""} para conjurar ${name}${lvl}.`;
      }
      return `Você pode gastar de ${min} a ${max} cargas para conjurar ${name}${lvl} (cada carga além do mínimo eleva o círculo em 1).`;
    }
    case "texto-livre":
      return power.text.trim();
    default:
      return "";
  }
}

export function generateForgeDescription(item: CustomMagicItem): string {
  const parts: string[] = [];

  if (item.baseKind === "weapon" && item.baseWeaponId) {
    const w = getWeapon(item.baseWeaponId);
    if (w) {
      parts.push(
        `Arma mágica (${w.name}). Raridade ${RARITY_PT[item.rarity] ?? item.rarity}.`,
      );
    }
  } else if (item.baseKind === "armor" && item.baseArmorId) {
    const a = getArmor(item.baseArmorId);
    if (a) {
      parts.push(
        `Armadura mágica (${a.name}). Raridade ${RARITY_PT[item.rarity] ?? item.rarity}.`,
      );
    }
  } else {
    parts.push(
      `Item mágico. Raridade ${RARITY_PT[item.rarity] ?? item.rarity}.`,
    );
  }

  if (item.requiresAttunement) {
    const by = item.attunementBy?.trim();
    parts.push(
      by
        ? `Requer sintonização por um(a) ${by}.`
        : "Requer sintonização.",
    );
  }

  if (item.charges && item.charges.max > 0) {
    const resetLabel: Record<string, string> = {
      amanhecer: "ao amanhecer",
      "descanso-curto": "após um descanso curto",
      "descanso-longo": "após um descanso longo",
      custom: item.charges.resetText?.trim() || "conforme a descrição",
    };
    parts.push(
      `Este item tem ${item.charges.max} cargas. As cargas se recuperam ${resetLabel[item.charges.reset] ?? "periodicamente"}.`,
    );
  }

  for (const power of item.powers) {
    const line = describePower(power);
    if (line) parts.push(line);
  }

  return parts.filter(Boolean).join(" ");
}

export function resolveForgeDescription(item: CustomMagicItem): string {
  const manual = item.descriptionManual?.trim();
  if (manual) return manual;
  return generateForgeDescription(item);
}

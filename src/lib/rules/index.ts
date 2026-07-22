import type { AbilityKey, AbilityScores, CharacterState, SkillKey } from "@/lib/character/types";
import { SKILL_META } from "@/config/tables/labels";
import {
  FULL_CASTER_SLOTS,
  HALF_CASTER_SLOTS,
  ARTIFICER_SLOTS,
  MULTICLASS_SLOT_TABLE,
  PACT_MAGIC_BY_LEVEL,
  PROFICIENCY_BONUS_BY_LEVEL,
  XP_BY_LEVEL,
} from "@/config/tables/progression";
import { getArmor } from "@/config/equipment";
import { getClass, getRace, getSubrace } from "@/config";
import type { CastingType } from "@/lib/character/types";
import {
  forgeAbilityBonuses,
  forgeSkillProficiencies,
  inventoryArmorMagicBonus,
} from "@/lib/items/forgeModifiers";

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function characterLevel(state: CharacterState): number {
  return state.classes.reduce((sum, c) => sum + c.level, 0);
}

export function proficiencyBonus(level: number): number {
  const clamped = Math.min(20, Math.max(1, level));
  return PROFICIENCY_BONUS_BY_LEVEL[clamped] ?? 2;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  for (let i = 1; i <= 20; i++) {
    if (xp >= (XP_BY_LEVEL[i] ?? Infinity)) level = i;
  }
  return level;
}

export function finalAbilityScores(state: CharacterState): AbilityScores {
  const race = getRace(state.raceId);
  const subrace = state.subraceId ? getSubrace(state.raceId, state.subraceId) : null;
  const keys: AbilityKey[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];
  const useMotm = race?.abilityScoreModel === "motm-floating";
  const useOriginRemap = Boolean(state.originCustomization?.remappedAbilityBonuses);
  const itemBonuses = forgeAbilityBonuses(state);
  const result = { ...state.baseAbilities };
  for (const key of keys) {
    let score = state.baseAbilities[key];
    if (useMotm) {
      score += state.motmAbilityBonuses[key] ?? 0;
    } else if (useOriginRemap && state.originCustomization) {
      score += state.originCustomization.remappedAbilityBonuses[key] ?? 0;
    } else {
      score += race?.abilityBonuses[key] ?? 0;
      score += subrace?.abilityBonuses[key] ?? 0;
    }
    score += state.abilityOverrides[key] ?? 0;
    for (const pick of Object.values(state.featAbilityPicks ?? {})) {
      score += pick[key] ?? 0;
    }
    score += itemBonuses[key] ?? 0;
    result[key] = Math.min(30, Math.max(1, score));
  }
  return result;
}

export function skillBonus(
  state: CharacterState,
  skill: SkillKey,
  scores?: AbilityScores,
): number {
  const final = scores ?? finalAbilityScores(state);
  const meta = SKILL_META[skill];
  const mod = abilityModifier(final[meta.ability]);
  const level = characterLevel(state);
  const pb = proficiencyBonus(level);
  if (state.skillExpertise.includes(skill)) return mod + pb * 2;
  const fromItem = forgeSkillProficiencies(state).includes(skill);
  if (state.skillProficiencies.includes(skill) || fromItem) return mod + pb;
  return mod;
}

export function saveBonus(
  state: CharacterState,
  ability: AbilityKey,
  scores?: AbilityScores,
): number {
  const final = scores ?? finalAbilityScores(state);
  const mod = abilityModifier(final[ability]);
  const pb = proficiencyBonus(characterLevel(state));
  return state.saveProficiencies.includes(ability) ? mod + pb : mod;
}

export function passivePerception(state: CharacterState): number {
  return 10 + skillBonus(state, "perception");
}

export function averageHitDie(hitDie: number): number {
  return Math.floor(hitDie / 2) + 1;
}

export function computeMaxHp(state: CharacterState, useAverage = true): number {
  const scores = finalAbilityScores(state);
  const conMod = abilityModifier(scores.constitution);
  let hp = 0;
  let first = true;
  for (const cls of state.classes) {
    const def = getClass(cls.classId);
    const hitDie = def?.hitDie ?? 8;
    for (let i = 0; i < cls.level; i++) {
      if (first) {
        hp += hitDie + conMod;
        first = false;
      } else {
        const rolled = cls.hitDiceRolled[i];
        if (typeof rolled === "number") {
          hp += rolled + conMod;
        } else if (useAverage) {
          hp += averageHitDie(hitDie) + conMod;
        } else {
          hp += averageHitDie(hitDie) + conMod;
        }
      }
    }
  }
  if (state.feats.includes("tough")) {
    hp += characterLevel(state) * 2;
  }
  // Hill dwarf Dwarven Toughness
  if (state.subraceId === "hill-dwarf") {
    hp += characterLevel(state);
  }
  return Math.max(1, hp);
}

export function computeArmorClass(state: CharacterState): number {
  const scores = finalAbilityScores(state);
  const dexMod = abilityModifier(scores.dexterity);
  const armor = state.armorId ? getArmor(state.armorId) : null;
  let ac: number;

  if (!armor || armor.category === "none") {
    // Unarmored defaults; class features
    const barb = state.classes.find((c) => c.classId === "barbarian");
    const monk = state.classes.find((c) => c.classId === "monk");
    if (barb && barb.level >= 1) {
      ac = 10 + dexMod + abilityModifier(scores.constitution);
    } else if (monk && monk.level >= 1) {
      ac = 10 + dexMod + abilityModifier(scores.wisdom);
    } else {
      ac = 10 + dexMod;
    }
  } else if (armor.category === "shield") {
    ac = 10 + dexMod;
  } else {
    const dexBonus =
      armor.dexCap === null ? dexMod : Math.min(dexMod, armor.dexCap);
    ac = armor.baseAc + dexBonus;
  }

  if (state.shieldEquipped) {
    ac += 2;
  }
  ac += inventoryArmorMagicBonus(state);
  return ac;
}

export function initiativeBonus(state: CharacterState): number {
  return abilityModifier(finalAbilityScores(state).dexterity);
}

export function speed(state: CharacterState): number {
  const race = getRace(state.raceId);
  const subrace = state.subraceId ? getSubrace(state.raceId, state.subraceId) : null;
  return subrace?.speedOverride ?? race?.speed ?? 30;
}

export type MulticlassCasterContribution = {
  full: number;
  half: number;
  third: number;
  pact: number;
};

export function multiclassCasterLevels(state: CharacterState): MulticlassCasterContribution {
  const result = { full: 0, half: 0, third: 0, pact: 0 };
  for (const cls of state.classes) {
    const def = getClass(cls.classId);
    if (!def) continue;
    const t: CastingType = def.spellcasting.type;
    if (t === "full") result.full += cls.level;
    else if (t === "half") result.half += cls.level;
    else if (t === "third") result.third += cls.level;
    else if (t === "pact") result.pact += cls.level;
  }
  return result;
}

/** Multiclass spellcaster level for shared slot table (excludes pact) */
export function multiclassSpellcasterLevel(state: CharacterState): number {
  const c = multiclassCasterLevels(state);
  return Math.floor(c.full + c.half / 2 + c.third / 3);
}

export function spellSlots(state: CharacterState): number[] {
  const c = multiclassCasterLevels(state);
  const onlyPact = c.pact > 0 && c.full === 0 && c.half === 0 && c.third === 0;
  if (onlyPact) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  // Single-class Artificer uses Tasha slot table (slots from level 1)
  if (
    state.classes.length === 1 &&
    state.classes[0]?.classId === "artificer"
  ) {
    const row = ARTIFICER_SLOTS[state.classes[0].level] ?? [0, 0, 0, 0, 0];
    return [...row, 0, 0, 0, 0].slice(0, 9);
  }

  // Single half-caster (Paladin/Ranger)
  if (c.half > 0 && c.full === 0 && c.third === 0 && state.classes.length === 1) {
    const row = HALF_CASTER_SLOTS[c.half] ?? [0, 0, 0, 0, 0];
    return [...row, 0, 0, 0, 0].slice(0, 9);
  }
  // Single full caster
  if (c.full > 0 && c.half === 0 && c.third === 0 && state.classes.length === 1) {
    return [...(FULL_CASTER_SLOTS[c.full] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0])];
  }
  const mcl = multiclassSpellcasterLevel(state);
  return [...(MULTICLASS_SLOT_TABLE[mcl] ?? [0, 0, 0, 0, 0, 0, 0, 0, 0])];
}

/** Highest spell level the character can cast (0 = cantrips only / none) */
export function maxSpellLevelAvailable(state: CharacterState): number {
  const slots = spellSlots(state);
  let max = 0;
  for (let i = 0; i < slots.length; i++) {
    if ((slots[i] ?? 0) > 0) max = i + 1;
  }
  // Pact Magic slots are separate from the shared slot table
  const pact = pactMagic(state);
  if (pact.slotLevel > max) max = pact.slotLevel;
  return max;
}

export function pactMagic(state: CharacterState): { slotLevel: number; slotCount: number } {
  const warlock = state.classes.find((c) => c.classId === "warlock");
  if (!warlock) return { slotLevel: 0, slotCount: 0 };
  return PACT_MAGIC_BY_LEVEL[warlock.level] ?? { slotLevel: 0, slotCount: 0 };
}

export function primarySpellcastingAbility(state: CharacterState): AbilityKey | null {
  const caster = state.classes
    .map((c) => getClass(c.classId))
    .find((d) => d && d.spellcasting.type !== "none");
  return caster?.spellcasting.ability ?? null;
}

export function spellSaveDc(state: CharacterState): number | null {
  const ability = primarySpellcastingAbility(state);
  if (!ability) return null;
  const scores = finalAbilityScores(state);
  const pb = proficiencyBonus(characterLevel(state));
  return 8 + pb + abilityModifier(scores[ability]);
}

export function spellAttackBonus(state: CharacterState): number | null {
  const ability = primarySpellcastingAbility(state);
  if (!ability) return null;
  const scores = finalAbilityScores(state);
  const pb = proficiencyBonus(characterLevel(state));
  return pb + abilityModifier(scores[ability]);
}

export function derivedSheet(state: CharacterState) {
  const scores = finalAbilityScores(state);
  const level = characterLevel(state);
  const pb = proficiencyBonus(level);
  const maxHp = computeMaxHp(state);
  return {
    level,
    proficiencyBonus: pb,
    scores,
    modifiers: {
      strength: abilityModifier(scores.strength),
      dexterity: abilityModifier(scores.dexterity),
      constitution: abilityModifier(scores.constitution),
      intelligence: abilityModifier(scores.intelligence),
      wisdom: abilityModifier(scores.wisdom),
      charisma: abilityModifier(scores.charisma),
    },
    armorClass: computeArmorClass(state),
    initiative: initiativeBonus(state),
    speed: speed(state),
    maxHp,
    passivePerception: passivePerception(state),
    spellSlots: spellSlots(state),
    pactMagic: pactMagic(state),
    spellSaveDc: spellSaveDc(state),
    spellAttackBonus: spellAttackBonus(state),
  };
}

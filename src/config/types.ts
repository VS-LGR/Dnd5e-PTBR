import type { AbilityKey, AbilityScores, CastingType, SizeCategory, SkillKey } from "@/lib/character/types";

export interface RacialTrait {
  id: string;
  name: string;
  description: string;
}

export interface SubraceDefinition {
  id: string;
  name: string;
  abilityBonuses: Partial<AbilityScores>;
  traits: RacialTrait[];
  extraLanguages?: string[];
  speedOverride?: number;
}

export interface RaceDefinition {
  id: string;
  name: string;
  size: SizeCategory;
  speed: number;
  abilityBonuses: Partial<AbilityScores>;
  languages: string[];
  traits: RacialTrait[];
  subraces: SubraceDefinition[];
  darkvision?: number;
}

export interface ClassFeature {
  level: number;
  name: string;
  description: string;
}

export interface SubclassDefinition {
  id: string;
  name: string;
  description: string;
  features: ClassFeature[];
  /** Always-prepared or expanded spell list IDs by level */
  expandedSpells?: Record<number, string[]>;
}

export interface SpellcastingInfo {
  type: CastingType;
  ability: AbilityKey;
  preparation: "prepared" | "known" | "none";
  /** Class level when spellcasting begins */
  startsAtLevel: number;
  ritualCasting?: boolean;
}

export interface ClassDefinition {
  id: string;
  name: string;
  hitDie: number;
  primaryAbilities: AbilityKey[];
  savingThrows: AbilityKey[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoices: { choose: number; from: SkillKey[] };
  features: ClassFeature[];
  subclasses: SubclassDefinition[];
  subclassLevel: number;
  spellcasting: SpellcastingInfo;
  startingEquipment: string[];
  startingGoldDice?: string;
}

export interface BackgroundDefinition {
  id: string;
  name: string;
  description: string;
  skillProficiencies: SkillKey[];
  toolProficiencies: string[];
  languages: number;
  equipment: string[];
  feature: { name: string; description: string };
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export interface FeatDefinition {
  id: string;
  name: string;
  description: string;
  prerequisites?: string;
  abilityBonus?: Partial<AbilityScores>;
}

export type ArmorCategory = "light" | "medium" | "heavy" | "shield" | "none";

export interface ArmorDefinition {
  id: string;
  name: string;
  category: ArmorCategory;
  baseAc: number;
  dexCap: number | null;
  stealthDisadvantage: boolean;
  strengthRequirement?: number;
  costGp: number;
  weight: number;
}

export interface WeaponDefinition {
  id: string;
  name: string;
  category: "simple" | "martial";
  range: "melee" | "ranged";
  damage: string;
  damageType: string;
  properties: string[];
  costGp: number;
  weight: number;
  finesse?: boolean;
  versatile?: string;
}

export type SpellSchool =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

export interface SpellDefinition {
  id: string;
  name: string;
  level: number;
  school: SpellSchool;
  ritual: boolean;
  castingTime: string;
  range: string;
  components: { v: boolean; s: boolean; m: string | null };
  duration: string;
  concentration: boolean;
  description: string;
  higherLevels?: string;
}

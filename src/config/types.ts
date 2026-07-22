import type { AbilityKey, AbilityScores, CastingType, SizeCategory, SkillKey } from "@/lib/character/types";

export type ContentSource = "phb" | "motm" | "tcoe" | "xgte";

export type AbilityScoreModel = "fixed" | "motm-floating";

export type CreatureType = "humanoid" | "fey" | "monstrosity" | "undead" | "construct";

export interface RacialTrait {
  id: string;
  name: string;
  description: string;
}

export interface RaceChoiceOption {
  id: string;
  name: string;
  description: string;
}

export interface RaceChoiceDefinition {
  id: string;
  name: string;
  /** When the choice becomes relevant (display only if character level >= this) */
  minLevel?: number;
  options: RaceChoiceOption[];
}

export interface SubraceDefinition {
  id: string;
  name: string;
  abilityBonuses: Partial<AbilityScores>;
  traits: RacialTrait[];
  extraLanguages?: string[];
  speedOverride?: number;
  source?: ContentSource;
}

export interface SpeedDetail {
  walk: number;
  fly?: number;
  swim?: number;
  climb?: number;
}

export interface RaceDefinition {
  id: string;
  name: string;
  source: ContentSource;
  size: SizeCategory;
  /** When race may choose Medium or Small */
  sizeOptions?: SizeCategory[];
  speed: number;
  speedDetail?: SpeedDetail;
  abilityScoreModel: AbilityScoreModel;
  /** Used when abilityScoreModel === "fixed" */
  abilityBonuses: Partial<AbilityScores>;
  languages: string[];
  traits: RacialTrait[];
  subraces: SubraceDefinition[];
  darkvision?: number;
  countsAs?: string[];
  creatureType?: CreatureType;
  choices?: RaceChoiceDefinition[];
}

export interface ClassFeature {
  id?: string;
  level: number;
  name: string;
  description: string;
  /** Feature name this optional feature replaces */
  replaces?: string;
  source?: ContentSource;
}

export interface SubclassDefinition {
  id: string;
  name: string;
  description: string;
  features: ClassFeature[];
  expandedSpells?: Record<number, string[]>;
  source?: ContentSource;
}

export interface SpellcastingInfo {
  type: CastingType;
  ability: AbilityKey;
  preparation: "prepared" | "known" | "none";
  startsAtLevel: number;
  ritualCasting?: boolean;
}

export interface ClassDefinition {
  id: string;
  name: string;
  source: ContentSource;
  hitDie: number;
  primaryAbilities: AbilityKey[];
  savingThrows: AbilityKey[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoices: { choose: number; from: SkillKey[] };
  features: ClassFeature[];
  optionalFeatures?: ClassFeature[];
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
  source?: ContentSource;
}

export interface FeatDefinition {
  id: string;
  name: string;
  description: string;
  prerequisites?: string;
  abilityBonus?: Partial<AbilityScores>;
  /** Player picks one (or more) abilities to raise by 1 */
  abilityBonusChoices?: AbilityKey[];
  abilityBonusChoiceCount?: number;
  source?: ContentSource;
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
  /** Alcance normal em metros (munição / arremesso) */
  normalRangeM?: number;
  /** Alcance longo em metros */
  longRangeM?: number;
  ammunition?: boolean;
  loading?: boolean;
  heavy?: boolean;
  light?: boolean;
  reach?: boolean;
  thrown?: boolean;
  twoHanded?: boolean;
}

export type ItemKind = "mundane" | "magic";

export type ItemCategory =
  | "weapon"
  | "armor"
  | "shield"
  | "potion"
  | "ring"
  | "rod"
  | "staff"
  | "wand"
  | "wondrous"
  | "scroll"
  | "ammunition"
  | "gear"
  | "tool"
  | "other";

export type ItemRarity =
  | "mundane"
  | "common"
  | "uncommon"
  | "rare"
  | "very-rare"
  | "legendary"
  | "artifact"
  | "varies";

export interface ItemDefinition {
  id: string;
  name: string;
  nameEn?: string;
  kind: ItemKind;
  category: ItemCategory;
  rarity: ItemRarity;
  requiresAttunement?: boolean;
  description: string;
  typeLine?: string;
  costGp?: number;
  weight?: number;
  source?: string;
  /** Link to ARMORS / WEAPONS id for combat/AC stats */
  equipmentId?: string;
  magicBonus?: number;
  baseWeaponId?: string;
  variants?: Array<{ idSuffix: string; magicBonus: number; rarity: ItemRarity }>;
  /** Weapon combat snapshot for catalog display */
  weaponStats?: Pick<
    WeaponDefinition,
    | "damage"
    | "damageType"
    | "properties"
    | "category"
    | "range"
    | "finesse"
    | "versatile"
    | "normalRangeM"
    | "longRangeM"
  >;
  /** Armor combat snapshot */
  armorStats?: Pick<
    ArmorDefinition,
    "category" | "baseAc" | "dexCap" | "stealthDisadvantage" | "strengthRequirement"
  >;
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
  source?: ContentSource;
}

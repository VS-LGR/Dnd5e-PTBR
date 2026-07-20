export type AbilityKey =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type SkillKey =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export type Alignment =
  | "lg"
  | "ng"
  | "cg"
  | "ln"
  | "n"
  | "cn"
  | "le"
  | "ne"
  | "ce"
  | "unaligned";

export type AbilityMethod = "standardArray" | "pointBuy" | "roll4d6";

export type CastingType = "full" | "half" | "pact" | "third" | "none";

export type SizeCategory = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface ClassLevel {
  classId: string;
  subclassId: string | null;
  level: number;
  hitDiceRolled: number[];
}

export interface Currency {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  equipped?: boolean;
  equipmentId?: string;
  notes?: string;
}

export interface Personality {
  traits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export interface Appearance {
  age: string;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  description: string;
}

export interface SpellSlotsState {
  /** Index 0 unused; 1-9 = slots used at that level */
  used: number[];
  pactUsed: number;
}

export interface CharacterSpells {
  known: string[];
  prepared: string[];
  cantrips: string[];
  slots: SpellSlotsState;
}

export interface CharacterHp {
  max: number;
  current: number;
  temporary: number;
  hitDiceRemaining: number;
}

export interface CharacterState {
  schemaVersion: 1;
  name: string;
  playerName: string;
  raceId: string;
  subraceId: string | null;
  classes: ClassLevel[];
  backgroundId: string;
  alignment: Alignment;
  experiencePoints: number;
  abilityMethod: AbilityMethod;
  baseAbilities: AbilityScores;
  /** ASI / feat permanent bonuses applied after race */
  abilityOverrides: Partial<AbilityScores>;
  skillProficiencies: SkillKey[];
  skillExpertise: SkillKey[];
  saveProficiencies: AbilityKey[];
  toolProficiencies: string[];
  languages: string[];
  feats: string[];
  personality: Personality;
  appearance: Appearance;
  backstory: string;
  allies: string;
  treasure: string;
  inspiration: boolean;
  currency: Currency;
  inventory: InventoryItem[];
  armorId: string | null;
  shieldEquipped: boolean;
  hp: CharacterHp;
  spells: CharacterSpells;
  deathSaves: { successes: number; failures: number };
  notes: string;
}

export const SCHEMA_VERSION = 1 as const;

export function createEmptyCharacterState(partial?: Partial<CharacterState>): CharacterState {
  return {
    schemaVersion: SCHEMA_VERSION,
    name: "",
    playerName: "",
    raceId: "human",
    subraceId: null,
    classes: [{ classId: "fighter", subclassId: null, level: 1, hitDiceRolled: [] }],
    backgroundId: "folk-hero",
    alignment: "n",
    experiencePoints: 0,
    abilityMethod: "standardArray",
    baseAbilities: {
      strength: 15,
      dexterity: 14,
      constitution: 13,
      intelligence: 12,
      wisdom: 10,
      charisma: 8,
    },
    abilityOverrides: {},
    skillProficiencies: [],
    skillExpertise: [],
    saveProficiencies: [],
    toolProficiencies: [],
    languages: ["Comum"],
    feats: [],
    personality: { traits: [], ideals: [], bonds: [], flaws: [] },
    appearance: {
      age: "",
      height: "",
      weight: "",
      eyes: "",
      skin: "",
      hair: "",
      description: "",
    },
    backstory: "",
    allies: "",
    treasure: "",
    inspiration: false,
    currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    inventory: [],
    armorId: null,
    shieldEquipped: false,
    hp: { max: 10, current: 10, temporary: 0, hitDiceRemaining: 1 },
    spells: {
      known: [],
      prepared: [],
      cantrips: [],
      slots: { used: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], pactUsed: 0 },
    },
    deathSaves: { successes: 0, failures: 0 },
    notes: "",
    ...partial,
  };
}

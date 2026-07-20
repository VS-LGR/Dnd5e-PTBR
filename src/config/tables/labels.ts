import type { AbilityKey, SkillKey } from "@/lib/character/types";

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  strength: "Força",
  dexterity: "Destreza",
  constitution: "Constituição",
  intelligence: "Inteligência",
  wisdom: "Sabedoria",
  charisma: "Carisma",
};

export const ABILITY_SHORT: Record<AbilityKey, string> = {
  strength: "For",
  dexterity: "Des",
  constitution: "Con",
  intelligence: "Int",
  wisdom: "Sab",
  charisma: "Car",
};

export const SKILL_META: Record<
  SkillKey,
  { label: string; ability: AbilityKey }
> = {
  acrobatics: { label: "Acrobacia", ability: "dexterity" },
  animalHandling: { label: "Adestrar Animais", ability: "wisdom" },
  arcana: { label: "Arcanismo", ability: "intelligence" },
  athletics: { label: "Atletismo", ability: "strength" },
  deception: { label: "Enganação", ability: "charisma" },
  history: { label: "História", ability: "intelligence" },
  insight: { label: "Intuição", ability: "wisdom" },
  intimidation: { label: "Intimidação", ability: "charisma" },
  investigation: { label: "Investigação", ability: "intelligence" },
  medicine: { label: "Medicina", ability: "wisdom" },
  nature: { label: "Natureza", ability: "intelligence" },
  perception: { label: "Percepção", ability: "wisdom" },
  performance: { label: "Performance", ability: "charisma" },
  persuasion: { label: "Persuasão", ability: "charisma" },
  religion: { label: "Religião", ability: "intelligence" },
  sleightOfHand: { label: "Prestidigitação", ability: "dexterity" },
  stealth: { label: "Furtividade", ability: "dexterity" },
  survival: { label: "Sobrevivência", ability: "wisdom" },
};

export const ALIGNMENT_LABELS: Record<string, string> = {
  lg: "Leal e Bom",
  ng: "Neutro e Bom",
  cg: "Caótico e Bom",
  ln: "Leal e Neutro",
  n: "Neutro",
  cn: "Caótico e Neutro",
  le: "Leal e Mau",
  ne: "Neutro e Mau",
  ce: "Caótico e Mau",
  unaligned: "Sem tendência",
};

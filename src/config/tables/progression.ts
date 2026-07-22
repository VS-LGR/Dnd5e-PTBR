/** XP thresholds by character level (PHB Cap. 1) */
export const XP_BY_LEVEL: readonly number[] = [
  0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
] as const;

/** Proficiency bonus by character level */
export const PROFICIENCY_BONUS_BY_LEVEL: readonly number[] = [
  0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
] as const;

/** Full caster spell slots by caster level → [L1..L9] */
export const FULL_CASTER_SLOTS: readonly (readonly number[])[] = [
  [],
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  [4, 3, 3, 3, 2, 0, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 0, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 0, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 0],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1],
] as const;

/** Half caster slots by half-caster level (Paladin/Ranger class level) */
export const HALF_CASTER_SLOTS: readonly (readonly number[])[] = [
  [],
  [0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0],
  [3, 0, 0, 0, 0],
  [3, 0, 0, 0, 0],
  [4, 2, 0, 0, 0],
  [4, 2, 0, 0, 0],
  [4, 3, 0, 0, 0],
  [4, 3, 0, 0, 0],
  [4, 3, 2, 0, 0],
  [4, 3, 2, 0, 0],
  [4, 3, 3, 0, 0],
  [4, 3, 3, 0, 0],
  [4, 3, 3, 1, 0],
  [4, 3, 3, 1, 0],
  [4, 3, 3, 2, 0],
  [4, 3, 3, 2, 0],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2],
] as const;

/** Artificer (Tasha): half-caster that gains slots at level 1 */
export const ARTIFICER_SLOTS: readonly (readonly number[])[] = [
  [],
  [2, 0, 0, 0, 0],
  [2, 0, 0, 0, 0],
  [3, 0, 0, 0, 0],
  [3, 0, 0, 0, 0],
  [4, 2, 0, 0, 0],
  [4, 2, 0, 0, 0],
  [4, 3, 0, 0, 0],
  [4, 3, 0, 0, 0],
  [4, 3, 2, 0, 0],
  [4, 3, 2, 0, 0],
  [4, 3, 3, 0, 0],
  [4, 3, 3, 0, 0],
  [4, 3, 3, 1, 0],
  [4, 3, 3, 1, 0],
  [4, 3, 3, 2, 0],
  [4, 3, 3, 2, 0],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2],
] as const;

/** Warlock pact slots: [slotLevel, slotCount] by warlock level */
export const PACT_MAGIC_BY_LEVEL: readonly { slotLevel: number; slotCount: number }[] = [
  { slotLevel: 0, slotCount: 0 },
  { slotLevel: 1, slotCount: 1 },
  { slotLevel: 1, slotCount: 2 },
  { slotLevel: 2, slotCount: 2 },
  { slotLevel: 2, slotCount: 2 },
  { slotLevel: 3, slotCount: 2 },
  { slotLevel: 3, slotCount: 2 },
  { slotLevel: 4, slotCount: 2 },
  { slotLevel: 4, slotCount: 2 },
  { slotLevel: 5, slotCount: 2 },
  { slotLevel: 5, slotCount: 2 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 3 },
  { slotLevel: 5, slotCount: 4 },
  { slotLevel: 5, slotCount: 4 },
  { slotLevel: 5, slotCount: 4 },
  { slotLevel: 5, slotCount: 4 },
] as const;

/**
 * Multiclass spellcaster level → full caster equivalent for slot table.
 * Contributors: full=1, half=0.5 (floor after sum), third=1/3 (floor after sum), pact excluded.
 */
export const MULTICLASS_SLOT_TABLE = FULL_CASTER_SLOTS;

export const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8] as const;

export const POINT_BUY_BUDGET = 27;

/**
 * Truques conhecidos por nível de classe (índice 0 = unused; 1–20).
 * Fonte: PHB / Tasha (Artífice).
 */
export const CANTRIPS_KNOWN_BY_CLASS: Record<string, readonly number[]> = {
  artificer: [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
  bard: [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  cleric: [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  druid: [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  sorcerer: [0, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  warlock: [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  wizard: [0, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
};

/**
 * Magias de 1º+ conhecidas (classes "known"). Índice 0 unused; 1–20.
 * Patrulheiro começa em 0 no 1º nível.
 */
export const SPELLS_KNOWN_BY_CLASS: Record<string, readonly number[]> = {
  bard: [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  sorcerer: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  warlock: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  ranger: [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
};

/** Livro de magias do mago: 6 no 1º nível + 2 por nível seguinte. */
export function wizardSpellbookCapacity(wizardLevel: number): number {
  if (wizardLevel < 1) return 0;
  return 6 + 2 * (wizardLevel - 1);
}

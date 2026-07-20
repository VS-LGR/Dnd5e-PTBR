import type { CharacterState } from "@/lib/character/types";
import { getClass } from "@/config";
import { getSpell, getSpellsByClass } from "@/config/spells";

export function availableSpellsForCharacter(state: CharacterState) {
  const ids = new Set<string>();
  for (const cls of state.classes) {
    const list = getSpellsByClass(cls.classId);
    for (const spell of list) ids.add(spell.id);
  }
  return [...ids].map((id) => getSpell(id)).filter(Boolean);
}

export function isPreparedCaster(state: CharacterState): boolean {
  return state.classes.some((c) => {
    const def = getClass(c.classId);
    return def?.spellcasting.preparation === "prepared";
  });
}

export function maxPreparedSpells(state: CharacterState): number | null {
  const preparedClass = state.classes
    .map((c) => ({ c, def: getClass(c.classId) }))
    .find(({ def }) => def?.spellcasting.preparation === "prepared");
  if (!preparedClass?.def) return null;
  const ability = preparedClass.def.spellcasting.ability;
  const scores = state.baseAbilities;
  // Approximate: uses base + will be refined by sheet via derived
  const mod = Math.floor(((scores[ability] ?? 10) - 10) / 2);
  return Math.max(1, preparedClass.c.level + mod);
}

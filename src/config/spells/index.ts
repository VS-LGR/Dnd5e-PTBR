import type { SpellDefinition } from "@/config/types";
import { SPELLS as BASE_SPELLS } from "./catalog";
import { ARTIFICER_EXTRA_SPELLS } from "./artificerExtras";
import { CLASS_SPELL_LISTS } from "./classLists";

/** Catálogo completo: SRD/PHB base + magias extras do Artífice (Tasha). */
export const SPELLS: SpellDefinition[] = [...BASE_SPELLS, ...ARTIFICER_EXTRA_SPELLS];

export { CLASS_SPELL_LISTS } from "./classLists";

export function getSpell(id: string): SpellDefinition | undefined {
  return SPELLS.find((spell) => spell.id === id);
}

export function getSpellsByClass(classId: string): SpellDefinition[] {
  const ids = CLASS_SPELL_LISTS[classId] ?? [];
  return ids
    .map((id) => getSpell(id))
    .filter((spell): spell is SpellDefinition => spell !== undefined);
}

export function getSpellsByLevel(level: number): SpellDefinition[] {
  return SPELLS.filter((spell) => spell.level === level);
}

export function searchSpells(query: string): SpellDefinition[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  if (!normalizedQuery) return SPELLS;

  return SPELLS.filter((spell) =>
    [spell.id, spell.name, spell.school, spell.description]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(normalizedQuery),
  );
}

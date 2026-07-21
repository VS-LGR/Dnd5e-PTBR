import type { CharacterState } from "@/lib/character/types";
import type { SpellDefinition } from "@/config/types";
import { getClass } from "@/config";
import { getSpell, getSpellsByClass, CLASS_SPELL_LISTS } from "@/config/spells";
import { maxSpellLevelAvailable, finalAbilityScores, abilityModifier } from "@/lib/rules";

export function characterOwnsSpell(state: CharacterState, spellId: string): boolean {
  return (
    state.spells.cantrips.includes(spellId) ||
    state.spells.known.includes(spellId) ||
    state.spells.prepared.includes(spellId)
  );
}

export function availableSpellsForCharacter(state: CharacterState): SpellDefinition[] {
  const ids = new Set<string>();
  for (const cls of state.classes) {
    const list = getSpellsByClass(cls.classId);
    for (const spell of list) ids.add(spell.id);
    // Also include expanded subclass spells if present
    const def = getClass(cls.classId);
    const sub = def?.subclasses.find((s) => s.id === cls.subclassId);
    if (sub?.expandedSpells) {
      for (const levelSpells of Object.values(sub.expandedSpells)) {
        for (const id of levelSpells) ids.add(id);
      }
    }
  }
  return [...ids]
    .map((id) => getSpell(id))
    .filter((s): s is SpellDefinition => Boolean(s));
}

export function filterSpellsForSheet(
  state: CharacterState,
  options: {
    query?: string;
    levelFilter?: "all" | number;
    hideOwned?: boolean;
    onlyCastable?: boolean;
  } = {},
): SpellDefinition[] {
  const {
    query = "",
    levelFilter = "all",
    hideOwned = false,
    onlyCastable = false,
  } = options;

  const maxLevel = maxSpellLevelAvailable(state);
  const q = query.trim().toLocaleLowerCase("pt-BR");

  return availableSpellsForCharacter(state)
    .filter((spell) => {
      if (hideOwned && characterOwnsSpell(state, spell.id)) return false;
      if (levelFilter !== "all" && spell.level !== levelFilter) return false;
      // Cantrips always castable for casters; leveled spells need slots
      if (onlyCastable) {
        const isCaster = state.classes.some((c) => {
          const d = getClass(c.classId);
          return d && d.spellcasting.type !== "none";
        });
        if (!isCaster) return false;
        if (spell.level > 0 && spell.level > maxLevel) return false;
      }
      if (!q) return true;
      return (
        spell.name.toLocaleLowerCase("pt-BR").includes(q) ||
        spell.id.includes(q) ||
        spell.school.includes(q)
      );
    })
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "pt-BR"));
}

export function addSpellToCharacter(
  state: CharacterState,
  spellId: string,
): CharacterState {
  const spell = getSpell(spellId);
  if (!spell) return state;
  if (characterOwnsSpell(state, spellId)) return state;

  if (spell.level === 0) {
    return {
      ...state,
      spells: {
        ...state.spells,
        cantrips: [...state.spells.cantrips, spellId],
      },
    };
  }

  const preparedCaster = isPreparedCaster(state);
  return {
    ...state,
    spells: {
      ...state.spells,
      known: [...state.spells.known, spellId],
      // Prepared casters (Artificer, Cleric, etc.) also mark as prepared by default
      prepared: preparedCaster
        ? [...new Set([...state.spells.prepared, spellId])]
        : state.spells.prepared,
    },
  };
}

export function removeSpellFromCharacter(
  state: CharacterState,
  spellId: string,
): CharacterState {
  return {
    ...state,
    spells: {
      ...state.spells,
      cantrips: state.spells.cantrips.filter((id) => id !== spellId),
      known: state.spells.known.filter((id) => id !== spellId),
      prepared: state.spells.prepared.filter((id) => id !== spellId),
    },
  };
}

export function isPreparedCaster(state: CharacterState): boolean {
  return state.classes.some((c) => {
    const def = getClass(c.classId);
    return def?.spellcasting.preparation === "prepared";
  });
}

export function castingClassIds(state: CharacterState): string[] {
  return state.classes
    .map((c) => c.classId)
    .filter((id) => {
      const def = getClass(id);
      return def && def.spellcasting.type !== "none" && Boolean(CLASS_SPELL_LISTS[id]);
    });
}

export function maxPreparedSpells(state: CharacterState): number | null {
  const preparedClass = state.classes
    .map((c) => ({ c, def: getClass(c.classId) }))
    .find(({ def }) => def?.spellcasting.preparation === "prepared");
  if (!preparedClass?.def) return null;
  const ability = preparedClass.def.spellcasting.ability;
  const scores = finalAbilityScores(state);
  const mod = abilityModifier(scores[ability]);
  return Math.max(1, preparedClass.c.level + mod);
}

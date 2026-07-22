import type { CharacterState } from "@/lib/character/types";
import type { SpellDefinition } from "@/config/types";
import { getClass } from "@/config";
import { getSpell, getSpellsByClass, CLASS_SPELL_LISTS } from "@/config/spells";
import {
  CANTRIPS_KNOWN_BY_CLASS,
  SPELLS_KNOWN_BY_CLASS,
  wizardSpellbookCapacity,
} from "@/config/tables/progression";
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

/**
 * Classes that learn cantrips.
 * Paladino/Patrulheiro são half-casters sem truques; Artífice é half-caster COM truques (Tasha).
 */
export function characterCanLearnCantrips(state: CharacterState): boolean {
  return maxCantripsKnown(state) > 0;
}

/** Whether the spell may be chosen for this character at current level (círculo). */
export function canChooseSpellAtLevel(
  state: CharacterState,
  spell: SpellDefinition,
): boolean {
  if (spell.level === 0) return characterCanLearnCantrips(state);
  return spell.level <= maxSpellLevelAvailable(state);
}

export function maxCantripsKnown(state: CharacterState): number {
  let total = 0;
  for (const cls of state.classes) {
    const table = CANTRIPS_KNOWN_BY_CLASS[cls.classId];
    if (!table) continue;
    total += table[cls.level] ?? 0;
  }
  return total;
}

export function ownedLeveledSpellIds(state: CharacterState): string[] {
  return [...new Set([...state.spells.known, ...state.spells.prepared])];
}

/**
 * Limite de magias de 1º+ na ficha:
 * - known (bardo, feiticeiro, bruxo, patrulheiro): tabela de conhecidas
 * - mago: capacidade do livro de magias
 * - prepared da lista (clérigo, druida, paladino, artífice): máx. preparadas
 */
export function maxLeveledSpellsKnown(state: CharacterState): number | null {
  let knownCap = 0;
  let hasKnownClass = false;
  let hasPrepareFromList = false;
  let hasWizard = false;
  let wizardLevel = 0;

  for (const cls of state.classes) {
    const def = getClass(cls.classId);
    if (!def || def.spellcasting.type === "none") continue;

    if (cls.classId === "wizard") {
      hasWizard = true;
      wizardLevel += cls.level;
      continue;
    }

    if (def.spellcasting.preparation === "known") {
      const table = SPELLS_KNOWN_BY_CLASS[cls.classId];
      if (table) {
        hasKnownClass = true;
        knownCap += table[cls.level] ?? 0;
      }
      continue;
    }

    if (def.spellcasting.preparation === "prepared") {
      hasPrepareFromList = true;
    }
  }

  if (hasWizard) {
    return wizardSpellbookCapacity(wizardLevel) + (hasKnownClass ? knownCap : 0);
  }
  if (hasKnownClass) return knownCap;
  if (hasPrepareFromList) return maxPreparedSpells(state);
  return null;
}

export function maxPreparedSpells(state: CharacterState): number | null {
  const preparedClass = state.classes
    .map((c) => ({ c, def: getClass(c.classId) }))
    .find(({ def }) => def?.spellcasting.preparation === "prepared");
  if (!preparedClass?.def) return null;
  const ability = preparedClass.def.spellcasting.ability;
  const scores = finalAbilityScores(state);
  const mod = abilityModifier(scores[ability]);
  const level = preparedClass.c.level;
  // Artífice / Paladino: mod + metade do nível (mín. 1)
  if (
    preparedClass.c.classId === "artificer" ||
    preparedClass.c.classId === "paladin"
  ) {
    return Math.max(1, Math.floor(level / 2) + mod);
  }
  // Clérigo, druida, mago: mod + nível
  return Math.max(1, level + mod);
}

export type SpellAddBlockReason =
  | "missing"
  | "owned"
  | "level"
  | "cantrips"
  | "known"
  | "prepared";

export function reasonCannotAddSpell(
  state: CharacterState,
  spellId: string,
): SpellAddBlockReason | null {
  const spell = getSpell(spellId);
  if (!spell) return "missing";
  if (characterOwnsSpell(state, spellId)) return "owned";
  if (!canChooseSpellAtLevel(state, spell)) return "level";

  if (spell.level === 0) {
    const max = maxCantripsKnown(state);
    if (state.spells.cantrips.length >= max) return "cantrips";
    return null;
  }

  const prepared = isPreparedCaster(state);
  const isWizard = state.classes.some((c) => c.classId === "wizard");
  const isKnownCaster = state.classes.some((c) => {
    const d = getClass(c.classId);
    return d?.spellcasting.preparation === "known";
  });

  if (isWizard || isKnownCaster) {
    const maxKnown = maxLeveledSpellsKnown(state);
    if (maxKnown != null && ownedLeveledSpellIds(state).length >= maxKnown) {
      return "known";
    }
    return null;
  }

  if (prepared) {
    const prepMax = maxPreparedSpells(state);
    if (
      prepMax != null &&
      (state.spells.prepared.length >= prepMax ||
        ownedLeveledSpellIds(state).length >= prepMax)
    ) {
      return "prepared";
    }
  }

  return null;
}

export function canAddSpellToCharacter(
  state: CharacterState,
  spellId: string,
): boolean {
  return reasonCannotAddSpell(state, spellId) === null;
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
    onlyCastable = true,
  } = options;

  const q = query.trim().toLocaleLowerCase("pt-BR");

  return availableSpellsForCharacter(state)
    .filter((spell) => {
      if (hideOwned && characterOwnsSpell(state, spell.id)) return false;
      if (levelFilter !== "all" && spell.level !== levelFilter) return false;
      if (onlyCastable && !canChooseSpellAtLevel(state, spell)) return false;
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
  if (reasonCannotAddSpell(state, spellId)) return state;

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
  const prepMax = maxPreparedSpells(state);
  const canAutoPrepare =
    preparedCaster &&
    (prepMax == null || state.spells.prepared.length < prepMax);

  return {
    ...state,
    spells: {
      ...state.spells,
      known: [...state.spells.known, spellId],
      prepared: canAutoPrepare
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

export function isKnownCaster(state: CharacterState): boolean {
  return state.classes.some((c) => {
    const def = getClass(c.classId);
    return def?.spellcasting.preparation === "known";
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

/** Toggle prepared flag; returns null state change blocked with reason. */
export function togglePreparedSpell(
  state: CharacterState,
  spellId: string,
): { state: CharacterState; blocked?: "prepared" } {
  const isPrepared = state.spells.prepared.includes(spellId);
  if (isPrepared) {
    return {
      state: {
        ...state,
        spells: {
          ...state.spells,
          prepared: state.spells.prepared.filter((id) => id !== spellId),
        },
      },
    };
  }
  const prepMax = maxPreparedSpells(state);
  if (prepMax != null && state.spells.prepared.length >= prepMax) {
    return { state, blocked: "prepared" };
  }
  return {
    state: {
      ...state,
      spells: {
        ...state.spells,
        prepared: [...state.spells.prepared, spellId],
      },
    },
  };
}

export function spellLimitLabels(state: CharacterState): {
  cantrips: string;
  leveled: string;
} {
  const cantripMax = maxCantripsKnown(state);
  const cantrips = `Truques: ${state.spells.cantrips.length} / ${cantripMax}`;

  const prepMax = maxPreparedSpells(state);
  const knownMax = maxLeveledSpellsKnown(state);
  const owned = ownedLeveledSpellIds(state).length;
  const prepared = isPreparedCaster(state);
  const known = isKnownCaster(state);
  const wizard = state.classes.some((c) => c.classId === "wizard");

  let leveled: string;
  if (wizard) {
    leveled = `Livro: ${owned} / ${knownMax ?? "—"} · Preparadas: ${state.spells.prepared.length} / ${prepMax ?? "—"}`;
  } else if (known && !prepared) {
    leveled = `Conhecidas: ${owned} / ${knownMax ?? "—"}`;
  } else if (prepared) {
    leveled = `Preparadas: ${state.spells.prepared.length} / ${prepMax ?? "—"}`;
  } else {
    leveled = `Magias: ${owned}`;
  }

  return { cantrips, leveled };
}

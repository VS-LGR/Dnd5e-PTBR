import { getRace, getSubrace, getSpell } from "@/config";
import { characterLevel } from "@/lib/rules";
import type {
  CharacterState,
  OriginSpellEntry,
} from "@/lib/character/types";
import type { InnateSpellGrant } from "@/config/types";

function grantsForCharacter(state: CharacterState): InnateSpellGrant[] {
  const race = getRace(state.raceId);
  if (!race) return [];
  const level = characterLevel(state);
  const grants: InnateSpellGrant[] = [...(race.innateSpells ?? [])];

  if (state.subraceId) {
    const sub = getSubrace(state.raceId, state.subraceId);
    if (sub?.innateSpells) grants.push(...sub.innateSpells);
  }

  for (const choice of race.choices ?? []) {
    const selected = state.raceChoices[choice.id];
    if (!selected) continue;
    const opt = choice.options.find((o) => o.id === selected);
    if (opt?.innateSpells) grants.push(...opt.innateSpells);
  }

  return grants.filter((g) => level >= (g.minCharacterLevel ?? 1));
}

/**
 * Rebuilds race-sourced origin spells from race/subrace/choices,
 * preserving custom origin spells the player added manually.
 */
export function syncOriginSpellsForCharacter(state: CharacterState): CharacterState {
  const custom = (state.originSpells ?? []).filter((e) => e.source === "custom");
  const raceEntries: OriginSpellEntry[] = [];
  const seen = new Set<string>();

  for (const g of grantsForCharacter(state)) {
    if (seen.has(g.spellId)) continue;
    if (!getSpell(g.spellId)) continue;
    seen.add(g.spellId);
    raceEntries.push({
      spellId: g.spellId,
      source: "race",
      note: g.note,
    });
  }

  // Drop custom entries that duplicate race grants
  const customKept = custom.filter((c) => !seen.has(c.spellId));

  return {
    ...state,
    originSpells: [...raceEntries, ...customKept],
  };
}

export function addCustomOriginSpell(
  state: CharacterState,
  spellId: string,
  note?: string,
): CharacterState {
  if (!getSpell(spellId)) return state;
  const existing = state.originSpells ?? [];
  if (existing.some((e) => e.spellId === spellId)) return state;
  if (
    state.spells.cantrips.includes(spellId) ||
    state.spells.known.includes(spellId) ||
    state.spells.prepared.includes(spellId)
  ) {
    return state;
  }
  return {
    ...state,
    originSpells: [...existing, { spellId, source: "custom", note }],
  };
}

export function removeOriginSpell(
  state: CharacterState,
  spellId: string,
): CharacterState {
  const entry = (state.originSpells ?? []).find((e) => e.spellId === spellId);
  if (!entry) return state;
  // Race-granted can be removed from list but will return on next sync —
  // allow temporary hide only for custom; for race, user must change race/choice.
  if (entry.source === "race") {
    return state;
  }
  return {
    ...state,
    originSpells: (state.originSpells ?? []).filter((e) => e.spellId !== spellId),
  };
}

export function originSpellIds(state: CharacterState): string[] {
  return (state.originSpells ?? []).map((e) => e.spellId);
}

import { getRace, getSubrace, getSpell, getSpellsByClass } from "@/config";
import { characterLevel } from "@/lib/rules";
import type {
  CharacterState,
  OriginSpellEntry,
} from "@/lib/character/types";
import type { InnateSpellGrant, InnateSpellPick } from "@/config/types";

function collectRaceNodes(state: CharacterState) {
  const race = getRace(state.raceId);
  if (!race) return null;
  const sub = state.subraceId ? getSubrace(state.raceId, state.subraceId) : undefined;
  const choiceOpts = (race.choices ?? [])
    .map((choice) => {
      const selected = state.raceChoices[choice.id];
      if (!selected) return null;
      return choice.options.find((o) => o.id === selected) ?? null;
    })
    .filter((o): o is NonNullable<typeof o> => Boolean(o));
  return { race, sub, choiceOpts };
}

/** Magias fixas concedidas pela raça/sub-raça/escolha no nível atual. */
export function fixedOriginGrantsForCharacter(state: CharacterState): InnateSpellGrant[] {
  const nodes = collectRaceNodes(state);
  if (!nodes) return [];
  const level = characterLevel(state);
  const grants: InnateSpellGrant[] = [...(nodes.race.innateSpells ?? [])];
  if (nodes.sub?.innateSpells) grants.push(...nodes.sub.innateSpells);
  for (const opt of nodes.choiceOpts) {
    if (opt.innateSpells) grants.push(...opt.innateSpells);
  }
  return grants.filter((g) => level >= (g.minCharacterLevel ?? 1));
}

/** Pacotes de escolha de magia de origem elegíveis no nível atual. */
export function originSpellPicksForCharacter(state: CharacterState): InnateSpellPick[] {
  const nodes = collectRaceNodes(state);
  if (!nodes) return [];
  const level = characterLevel(state);
  const picks: InnateSpellPick[] = [...(nodes.race.innateSpellPicks ?? [])];
  if (nodes.sub?.innateSpellPicks) picks.push(...nodes.sub.innateSpellPicks);
  for (const opt of nodes.choiceOpts) {
    if (opt.innateSpellPicks) picks.push(...opt.innateSpellPicks);
  }
  return picks.filter((p) => level >= (p.minCharacterLevel ?? 1));
}

export function characterHasOriginMagic(state: CharacterState): boolean {
  return (
    fixedOriginGrantsForCharacter(state).length > 0 ||
    originSpellPicksForCharacter(state).length > 0
  );
}

export function maxOriginPickSlots(state: CharacterState): number {
  return originSpellPicksForCharacter(state).reduce((n, p) => n + p.count, 0);
}

export function allowedOriginPickSpellIds(state: CharacterState): Set<string> {
  const allowed = new Set<string>();
  for (const pick of originSpellPicksForCharacter(state)) {
    if (pick.spellIds) {
      for (const id of pick.spellIds) {
        if (getSpell(id)) allowed.add(id);
      }
    }
    if (pick.fromClassList) {
      for (const spell of getSpellsByClass(pick.fromClassList)) {
        if (pick.onlyLevel != null && spell.level !== pick.onlyLevel) continue;
        allowed.add(spell.id);
      }
    }
  }
  return allowed;
}

export function customOriginEntries(state: CharacterState): OriginSpellEntry[] {
  return (state.originSpells ?? []).filter((e) => e.source === "custom");
}

export function remainingOriginPickSlots(state: CharacterState): number {
  return Math.max(0, maxOriginPickSlots(state) - customOriginEntries(state).length);
}

/**
 * Rebuilds race-sourced origin spells from race/subrace/choices.
 * Custom picks are kept only if still allowed by the current race pick packages.
 */
export function syncOriginSpellsForCharacter(state: CharacterState): CharacterState {
  const custom = customOriginEntries(state);
  const raceEntries: OriginSpellEntry[] = [];
  const seen = new Set<string>();

  for (const g of fixedOriginGrantsForCharacter(state)) {
    if (seen.has(g.spellId)) continue;
    if (!getSpell(g.spellId)) continue;
    seen.add(g.spellId);
    raceEntries.push({
      spellId: g.spellId,
      source: "race",
      note: g.note,
    });
  }

  const allowed = allowedOriginPickSpellIds(state);
  const maxSlots = maxOriginPickSlots(state);
  const customKept: OriginSpellEntry[] = [];
  for (const c of custom) {
    if (customKept.length >= maxSlots) break;
    if (seen.has(c.spellId)) continue;
    if (!allowed.has(c.spellId)) continue;
    if (!getSpell(c.spellId)) continue;
    seen.add(c.spellId);
    customKept.push(c);
  }

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
  const allowed = allowedOriginPickSpellIds(state);
  if (!allowed.has(spellId)) return state;
  if (remainingOriginPickSlots(state) <= 0) return state;

  const existing = state.originSpells ?? [];
  if (existing.some((e) => e.spellId === spellId)) return state;
  if (
    state.spells.cantrips.includes(spellId) ||
    state.spells.known.includes(spellId) ||
    state.spells.prepared.includes(spellId)
  ) {
    return state;
  }

  const pickNote =
    note ??
    originSpellPicksForCharacter(state).find((p) => {
      if (p.spellIds?.includes(spellId)) return true;
      if (!p.fromClassList) return false;
      return getSpellsByClass(p.fromClassList).some(
        (s) => s.id === spellId && (p.onlyLevel == null || s.level === p.onlyLevel),
      );
    })?.note;

  return {
    ...state,
    originSpells: [
      ...existing,
      { spellId, source: "custom", note: pickNote },
    ],
  };
}

export function removeOriginSpell(
  state: CharacterState,
  spellId: string,
): CharacterState {
  const entry = (state.originSpells ?? []).find((e) => e.spellId === spellId);
  if (!entry) return state;
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

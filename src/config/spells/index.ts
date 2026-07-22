import type { SpellDefinition } from "@/config/types";
import { SPELLS as BASE_SPELLS } from "./catalog";
import { ARTIFICER_EXTRA_SPELLS } from "./artificerExtras";
import { XANATHAR_EXTRA_SPELLS } from "./xanatharExtras";
import { CLASS_SPELL_LISTS as BASE_CLASS_LISTS } from "./classLists";

/** Catálogo: SRD/PHB + Artífice (Tasha) + Xanathar (sem IDs duplicados). */
function mergeSpells(...lists: SpellDefinition[][]): SpellDefinition[] {
  const byId = new Map<string, SpellDefinition>();
  for (const list of lists) {
    for (const spell of list) {
      if (!byId.has(spell.id)) byId.set(spell.id, spell);
    }
  }
  return [...byId.values()];
}

export const SPELLS: SpellDefinition[] = mergeSpells(
  BASE_SPELLS,
  ARTIFICER_EXTRA_SPELLS,
  XANATHAR_EXTRA_SPELLS,
);

/** Magias XGtE a acrescentar às listas de classe (IDs podem já existir no catálogo). */
const XGTE_CLASS_ADDITIONS: Record<string, string[]> = {
  bard: [
    "thunderclap",
    "earth-tremor",
    "catnap",
    "enemies-abound",
    "charm-monster",
    "synaptic-static",
    "skill-empowerment",
    "scatter",
    "power-word-pain",
    "psychic-scream",
  ],
  warlock: [
    "toll-the-dead",
    "mind-sliver",
    "cause-fear",
    "chaos-bolt",
    "shadow-blade",
    "mind-spike",
    "thunder-step",
    "summon-lesser-demons",
    "charm-monster",
    "shadow-of-moil",
    "synaptic-static",
    "enervation",
    "far-step",
    "infernal-calling",
    "scatter",
    "mental-prison",
    "crown-of-stars",
    "power-word-pain",
    "maddening-darkness",
    "psychic-scream",
  ],
  cleric: [
    "toll-the-dead",
    "word-of-radiance",
    "ceremony",
    "life-transference",
    "holy-weapon",
    "temple-of-the-gods",
  ],
  druid: [
    "control-flames",
    "gust",
    "mold-earth",
    "shape-water",
    "create-bonfire",
    "frostbite",
    "infestation",
    "magic-stone",
    "primal-savagery",
    "thunderclap",
    "absorb-elements",
    "beast-bond",
    "earth-tremor",
    "ice-knife",
    "dust-devil",
    "earthbind",
    "healing-spirit",
    "warding-wind",
    "erupting-earth",
    "flame-arrows",
    "tidal-wave",
    "wall-of-water",
    "thunder-step",
    "elemental-bane",
    "wrath-of-nature",
    "bones-of-the-earth",
    "druid-grove",
    "investiture-of-flame",
    "investiture-of-ice",
    "investiture-of-stone",
    "investiture-of-wind",
    "primordial-ward",
    "whirlwind",
  ],
  sorcerer: [
    "control-flames",
    "gust",
    "mold-earth",
    "shape-water",
    "create-bonfire",
    "frostbite",
    "infestation",
    "mind-sliver",
    "thunderclap",
    "chaos-bolt",
    "catapult",
    "earth-tremor",
    "ice-knife",
    "absorb-elements",
    "dragon-breath",
    "dust-devil",
    "earthbind",
    "mind-spike",
    "shadow-blade",
    "snillocs-snowball-swarm",
    "aganazzars-scorcher",
    "warding-wind",
    "catnap",
    "enemies-abound",
    "erupting-earth",
    "thunder-step",
    "tidal-wave",
    "charm-monster",
    "storm-sphere",
    "vitriolic-sphere",
    "watery-sphere",
    "far-step",
    "immolation",
    "synaptic-static",
    "skill-empowerment",
    "investiture-of-flame",
    "investiture-of-ice",
    "investiture-of-stone",
    "investiture-of-wind",
    "scatter",
    "crown-of-stars",
    "power-word-pain",
    "whirlwind",
    "abi-dalzims-horrid-wilting",
    "psychic-scream",
  ],
  wizard: [
    "control-flames",
    "gust",
    "mold-earth",
    "shape-water",
    "create-bonfire",
    "frostbite",
    "infestation",
    "mind-sliver",
    "toll-the-dead",
    "thunderclap",
    "absorb-elements",
    "catapult",
    "cause-fear",
    "ice-knife",
    "earth-tremor",
    "snare",
    "dragon-breath",
    "dust-devil",
    "earthbind",
    "mind-spike",
    "pyrotechnics",
    "shadow-blade",
    "skywrite",
    "snillocs-snowball-swarm",
    "aganazzars-scorcher",
    "warding-wind",
    "catnap",
    "enemies-abound",
    "erupting-earth",
    "life-transference",
    "tiny-servant",
    "thunder-step",
    "tidal-wave",
    "wall-of-water",
    "charm-monster",
    "elemental-bane",
    "sickening-radiance",
    "storm-sphere",
    "vitriolic-sphere",
    "watery-sphere",
    "danse-macabre",
    "enervation",
    "far-step",
    "immolation",
    "infernal-calling",
    "negative-energy-flood",
    "skill-empowerment",
    "steel-wind-strike",
    "synaptic-static",
    "wall-of-light",
    "create-homunculus",
    "bones-of-the-earth",
    "investiture-of-flame",
    "investiture-of-ice",
    "investiture-of-stone",
    "investiture-of-wind",
    "mental-prison",
    "scatter",
    "tensers-transformation",
    "crown-of-stars",
    "power-word-pain",
    "whirlwind",
    "illusory-dragon",
    "maddening-darkness",
    "abi-dalzims-horrid-wilting",
    "mighty-fortress",
    "invulnerability",
    "mass-polymorph",
    "psychic-scream",
  ],
  paladin: ["ceremony", "find-greater-steed", "holy-weapon"],
  ranger: [
    "absorb-elements",
    "beast-bond",
    "snare",
    "zephyr-strike",
    "healing-spirit",
    "flame-arrows",
    "steel-wind-strike",
    "wrath-of-nature",
  ],
};

function mergeClassLists(
  base: Record<string, string[]>,
  additions: Record<string, string[]>,
): Record<string, string[]> {
  const out: Record<string, string[]> = { ...base };
  for (const [classId, ids] of Object.entries(additions)) {
    const set = new Set(out[classId] ?? []);
    for (const id of ids) set.add(id);
    out[classId] = [...set];
  }
  return out;
}

export const CLASS_SPELL_LISTS = mergeClassLists(BASE_CLASS_LISTS, XGTE_CLASS_ADDITIONS);

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

/**
 * Tabelas de bioma do Guia de Xanathar (Learning Beast Shapes).
 * IDs alinhados ao catálogo em forms.ts.
 */

export type WildShapeBiome =
  | "arctic"
  | "coast"
  | "desert"
  | "forest"
  | "grassland"
  | "hill"
  | "mountain"
  | "swamp"
  | "underdark"
  | "underwater";

export const WILD_SHAPE_BIOME_LABELS: Record<WildShapeBiome, string> = {
  arctic: "Ártico",
  coast: "Costa",
  desert: "Deserto",
  forest: "Floresta",
  grassland: "Campo / pradaria",
  hill: "Colina",
  mountain: "Montanha",
  swamp: "Pântano",
  underdark: "Subterrâneo",
  underwater: "Subaquático",
};

export const WILD_SHAPE_BIOMES = Object.keys(WILD_SHAPE_BIOME_LABELS) as WildShapeBiome[];

/** Formas típicas por bioma (XGtE). */
export const BIOME_FORM_IDS: Record<WildShapeBiome, readonly string[]> = {
  arctic: [
    "owl",
    "blood-hawk",
    "giant-owl",
    "brown-bear",
    "polar-bear",
    "saber-toothed-tiger",
    "mammoth",
  ],
  coast: [
    "crab",
    "eagle",
    "blood-hawk",
    "giant-crab",
    "poisonous-snake",
    "stirge",
    "giant-lizard",
    "giant-wolf-spider",
    "pteranodon",
    "giant-eagle",
    "giant-toad",
    "plesiosaurus",
  ],
  desert: [
    "cat",
    "hyena",
    "jackal",
    "scorpion",
    "vulture",
    "camel",
    "flying-snake",
    "mule",
    "poisonous-snake",
    "stirge",
    "constrictor-snake",
    "giant-lizard",
    "giant-poisonous-snake",
    "giant-wolf-spider",
    "giant-hyena",
    "giant-spider",
    "giant-toad",
    "giant-vulture",
    "lion",
    "giant-constrictor-snake",
    "giant-scorpion",
  ],
  forest: [
    "baboon",
    "badger",
    "cat",
    "deer",
    "hyena",
    "owl",
    "blood-hawk",
    "flying-snake",
    "giant-rat",
    "giant-weasel",
    "poisonous-snake",
    "mastiff",
    "stirge",
    "boar",
    "constrictor-snake",
    "elk",
    "giant-badger",
    "giant-bat",
    "giant-frog",
    "giant-lizard",
    "giant-owl",
    "giant-poisonous-snake",
    "giant-wolf-spider",
    "panther",
    "wolf",
    "ape",
    "black-bear",
    "giant-wasp",
    "brown-bear",
    "dire-wolf",
    "giant-hyena",
    "giant-spider",
    "giant-toad",
    "tiger",
    "giant-boar",
    "giant-constrictor-snake",
    "giant-elk",
  ],
  grassland: [
    "cat",
    "deer",
    "eagle",
    "goat",
    "hyena",
    "jackal",
    "vulture",
    "blood-hawk",
    "flying-snake",
    "giant-weasel",
    "poisonous-snake",
    "stirge",
    "axe-beak",
    "boar",
    "elk",
    "giant-poisonous-snake",
    "giant-wolf-spider",
    "panther",
    "pteranodon",
    "riding-horse",
    "wolf",
    "giant-goat",
    "giant-wasp",
    "giant-eagle",
    "giant-hyena",
    "giant-vulture",
    "lion",
    "tiger",
    "allosaurus",
    "giant-boar",
    "giant-elk",
    "rhinoceros",
    "ankylosaurus",
    "elephant",
    "triceratops",
  ],
  hill: [
    "baboon",
    "eagle",
    "goat",
    "hyena",
    "raven",
    "vulture",
    "blood-hawk",
    "giant-weasel",
    "mastiff",
    "mule",
    "poisonous-snake",
    "stirge",
    "axe-beak",
    "boar",
    "elk",
    "giant-owl",
    "giant-wolf-spider",
    "panther",
    "wolf",
    "giant-goat",
    "brown-bear",
    "dire-wolf",
    "giant-eagle",
    "giant-hyena",
    "lion",
    "giant-boar",
    "giant-elk",
  ],
  mountain: [
    "eagle",
    "goat",
    "blood-hawk",
    "stirge",
    "pteranodon",
    "giant-goat",
    "giant-eagle",
    "lion",
    "giant-elk",
    "saber-toothed-tiger",
  ],
  swamp: [
    "rat",
    "raven",
    "giant-rat",
    "poisonous-snake",
    "stirge",
    "constrictor-snake",
    "giant-frog",
    "giant-lizard",
    "giant-poisonous-snake",
    "crocodile",
    "giant-spider",
    "giant-toad",
    "giant-constrictor-snake",
    "giant-crocodile",
  ],
  underdark: [
    "giant-fire-beetle",
    "giant-rat",
    "stirge",
    "giant-bat",
    "giant-centipede",
    "giant-lizard",
    "giant-poisonous-snake",
    "giant-spider",
    "giant-toad",
    "giant-constrictor-snake",
    "cave-bear",
  ],
  underwater: [
    "quipper",
    "constrictor-snake",
    "giant-sea-horse",
    "reef-shark",
    "giant-octopus",
    "giant-constrictor-snake",
    "hunter-shark",
    "plesiosaurus",
    "killer-whale",
    "giant-shark",
  ],
};

const LOOKUP: Map<string, WildShapeBiome[]> = (() => {
  const map = new Map<string, WildShapeBiome[]>();
  for (const biome of WILD_SHAPE_BIOMES) {
    for (const id of BIOME_FORM_IDS[biome]) {
      const cur = map.get(id) ?? [];
      if (!cur.includes(biome)) cur.push(biome);
      map.set(id, cur);
    }
  }
  return map;
})();

export function biomesForForm(formId: string): WildShapeBiome[] {
  return LOOKUP.get(formId) ?? [];
}

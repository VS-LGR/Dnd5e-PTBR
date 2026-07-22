import type { WildShapeBiome } from "./biomes";

export type WildShapeMovement = "climb" | "burrow" | "swim" | "fly";

export type WildShapeCreatureType = "beast" | "elemental";

export type { WildShapeBiome };

export interface WildShapeGates {
  /** Nível mínimo para qualquer círculo (tabelas All Circles do PDF). */
  allCirclesMinLevel?: 2 | 4 | 8;
  /** Nível mínimo só Círculo da Lua (tabelas Moon). */
  moonMinLevel?: number;
}

export interface WildShapeForm {
  id: string;
  name: string;
  nameEn: string;
  cr: number;
  type: WildShapeCreatureType;
  hpSummary: number;
  movement: WildShapeMovement[];
  traitTags: string[];
  gates: WildShapeGates;
  wildShapeCost: 1 | 2;
  /** Biomas XGtE em que a besta é comum (Learning Beast Shapes). */
  biomes: WildShapeBiome[];
  /** Id em WILD_SHAPE_STAT_BLOCKS se houver ficha SRD. */
  statBlockId?: string;
}

export interface WildShapeStatBlock {
  id: string;
  name: string;
  size: string;
  typeLine: string;
  armorClass: number;
  armorNotes?: string;
  hitPoints: string;
  speed: string;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills?: string;
  senses?: string;
  languages?: string;
  challenge: string;
  traits: Array<{ name: string; description: string }>;
  actions: Array<{ name: string; description: string }>;
}

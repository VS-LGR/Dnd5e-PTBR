import type { ContentSource } from "@/config/types";
import { XGTE_WARLOCK_INVOCATIONS } from "@/config/classes/xgteExtras";

export interface EldritchInvocationDef {
  id: string;
  name: string;
  description: string;
  source: ContentSource;
  /** Minimum warlock level */
  minWarlockLevel: number;
  /** Required pact boon feature id fragment, if any */
  requiresPact?: "blade" | "chain" | "tome" | "talisman";
  /** Required known spell id, if any */
  requiresSpellId?: string;
}

/** Quantidade de invocações conhecidas por nível de bruxo (PHB). */
export const INVOCATIONS_KNOWN_BY_WARLOCK_LEVEL: readonly number[] = [
  0, // 0 unused
  0, // 1
  2, // 2
  2,
  2,
  3, // 5
  3,
  4, // 7
  4,
  5, // 9
  5,
  5, // 11
  6, // 12
  6,
  6,
  7, // 15
  7,
  7,
  8, // 18
  8,
  8, // 20
];

export function maxInvocationsForWarlockLevel(level: number): number {
  if (level < 1) return 0;
  return INVOCATIONS_KNOWN_BY_WARLOCK_LEVEL[Math.min(20, level)] ?? 0;
}

const PHB_INVOCATIONS: EldritchInvocationDef[] = [
  {
    id: "agonizing-blast",
    name: "Rajada Agonizante",
    description:
      "Pré-requisito: rajada mística. Quando acerta uma criatura com rajada mística, adiciona seu modificador de Carisma ao dano.",
    source: "phb",
    minWarlockLevel: 2,
    requiresSpellId: "eldritch-blast",
  },
  {
    id: "armor-of-shadows",
    name: "Armadura das Sombras",
    description:
      "Você pode conjurar armadura arcana em si mesmo à vontade, sem gastar espaço de magia nem material.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "beast-speech",
    name: "Fala Bestial",
    description: "Você pode conjurar falar com animais à vontade, sem gastar espaço de magia.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "beguiling-influence",
    name: "Influência Sedutora",
    description: "Você ganha proficiência nas perícias Enganação e Persuasão.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "book-of-ancient-secrets",
    name: "Livro dos Segredos Ancestrais",
    description:
      "Pré-requisito: Pacto do Tomo. Você pode inscrever rituais no Livro das Sombras e conjurá-los como rituais.",
    source: "phb",
    minWarlockLevel: 2,
    requiresPact: "tome",
  },
  {
    id: "devils-sight",
    name: "Visão do Diabo",
    description:
      "Você enxerga normalmente na escuridão mágica e não mágica até 36 m.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "eldritch-sight",
    name: "Visão Sobrenatural",
    description: "Você pode conjurar detectar magia à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "eldritch-spear",
    name: "Lança Sobrenatural",
    description:
      "Pré-requisito: rajada mística. O alcance de rajada mística torna-se 90 m.",
    source: "phb",
    minWarlockLevel: 2,
    requiresSpellId: "eldritch-blast",
  },
  {
    id: "eyes-of-the-rune-keeper",
    name: "Olhos do Guardião de Runas",
    description: "Você pode ler todas as formas de escrita.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "fiendish-vigor",
    name: "Vigor Diaboico",
    description:
      "Você pode conjurar falso amigo em si mesmo à vontade como magia de 1º nível, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "gaze-of-two-minds",
    name: "Olhar de Duas Mentes",
    description:
      "Você pode usar uma ação para tocar um humanóide voluntário e perceber através dos sentidos dele.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "mask-of-many-faces",
    name: "Máscara de Muitos Rostos",
    description: "Você pode conjurar disfarçar-se à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "master-of-myriad-forms",
    name: "Mestre de Miríades Formas",
    description:
      "Pré-requisito: 15º nível. Você pode conjurar alterar-se à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 15,
  },
  {
    id: "misty-visions",
    name: "Visões Nebulosas",
    description: "Você pode conjurar imagem silenciosa à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "one-with-shadows",
    name: "Um com as Sombras",
    description:
      "Pré-requisito: 5º nível. Quando você está em área de penumbra ou escuridão, pode usar uma ação para ficar invisível até se mover ou agir.",
    source: "phb",
    minWarlockLevel: 5,
  },
  {
    id: "repelling-blast",
    name: "Rajada Repelente",
    description:
      "Pré-requisito: rajada mística. Quando acerta com rajada mística, pode empurrar a criatura 3 m para longe.",
    source: "phb",
    minWarlockLevel: 2,
    requiresSpellId: "eldritch-blast",
  },
  {
    id: "thief-of-five-fates",
    name: "Ladrão dos Cinco Destinos",
    description:
      "Você pode conjurar azar uma vez usando um espaço de pacto. Não pode fazê-lo de novo até terminar um descanso longo.",
    source: "phb",
    minWarlockLevel: 2,
  },
  {
    id: "visions-of-distant-realms",
    name: "Visões de Reinos Distantes",
    description:
      "Pré-requisito: 15º nível. Você pode conjurar ver o invisível à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 15,
  },
  {
    id: "voice-of-the-chain-master",
    name: "Voz do Mestre da Corrente",
    description:
      "Pré-requisito: Pacto da Corrente. Você pode comunicar telepaticamente com seu familiar e perceber através dos sentidos dele.",
    source: "phb",
    minWarlockLevel: 2,
    requiresPact: "chain",
  },
  {
    id: "whispers-of-the-grave",
    name: "Sussurros da Sepultura",
    description:
      "Pré-requisito: 9º nível. Você pode conjurar falar com os mortos à vontade, sem gastar espaço.",
    source: "phb",
    minWarlockLevel: 9,
  },
  {
    id: "witch-sight",
    name: "Visão da Bruxa",
    description:
      "Pré-requisito: 15º nível. Você vê a forma verdadeira de qualquer metamorfo ou criatura oculta por magia de ilusão ou transmutação a até 9 m.",
    source: "phb",
    minWarlockLevel: 15,
  },
];

function fromXgteFeature(f: {
  id?: string;
  name: string;
  description: string;
  level: number;
}): EldritchInvocationDef {
  return {
    id: f.id ?? f.name.toLowerCase().replace(/\s+/g, "-"),
    name: f.name,
    description: f.description,
    source: "xgte",
    minWarlockLevel: Math.max(2, f.level),
  };
}

export const ELDRITCH_INVOCATIONS: EldritchInvocationDef[] = [
  ...PHB_INVOCATIONS,
  ...XGTE_WARLOCK_INVOCATIONS.map(fromXgteFeature),
];

export function getEldritchInvocation(id: string): EldritchInvocationDef | undefined {
  return ELDRITCH_INVOCATIONS.find((i) => i.id === id);
}

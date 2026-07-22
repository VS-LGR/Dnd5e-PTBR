import type { WildShapeForm, WildShapeMovement } from "./types";

type GateKey = "ac2" | "ac4" | "ac8" | "moon2" | "moon4" | "moon6" | "moon8" | "moon9" | "moon10" | "moon12" | "moon15" | "moon18";

function move(...flags: WildShapeMovement[]): WildShapeMovement[] {
  return flags;
}

function form(
  id: string,
  name: string,
  nameEn: string,
  cr: number,
  hp: number,
  movement: WildShapeMovement[],
  traitTags: string[],
  gate: GateKey,
  opts?: { cost?: 1 | 2; type?: "beast" | "elemental"; srd?: boolean },
): WildShapeForm {
  const gates: WildShapeForm["gates"] = {};
  if (gate === "ac2") gates.allCirclesMinLevel = 2;
  else if (gate === "ac4") gates.allCirclesMinLevel = 4;
  else if (gate === "ac8") gates.allCirclesMinLevel = 8;
  else if (gate === "moon2") {
    gates.moonMinLevel = 2;
  } else if (gate === "moon4") gates.moonMinLevel = 4;
  else if (gate === "moon6") gates.moonMinLevel = 6;
  else if (gate === "moon8") gates.moonMinLevel = 8;
  else if (gate === "moon9") gates.moonMinLevel = 9;
  else if (gate === "moon10") gates.moonMinLevel = 10;
  else if (gate === "moon12") gates.moonMinLevel = 12;
  else if (gate === "moon15") gates.moonMinLevel = 15;
  else if (gate === "moon18") gates.moonMinLevel = 18;

  // Formas All Circles também disponíveis para Lua no mesmo nível (ou antes via moon tables).
  // Moon-only: só moonMinLevel. All Circles: allCircles + moon pode usar quando nível >= allCircles.
  if (gate.startsWith("ac")) {
    gates.moonMinLevel = gates.allCirclesMinLevel;
  }

  return {
    id,
    name,
    nameEn,
    cr,
    type: opts?.type ?? "beast",
    hpSummary: hp,
    movement,
    traitTags,
    gates,
    wildShapeCost: opts?.cost ?? 1,
    statBlockId: opts?.srd === false ? undefined : id,
  };
}

/**
 * Catálogo baseado no Wild Shape Rules.pdf.
 * `statBlockId` aponta para bloco SRD quando existir; formas sem SRD omitem ou usam srd:false.
 */
export const WILD_SHAPE_FORMS: WildShapeForm[] = [
  // —— All Circles 2º — terra CR ≤ 1/4 ——
  form("almiraj", "Almiraj", "Almiraj", 0, 3, move(), ["Chifre"], "ac2", { srd: false }),
  form("baboon", "Babuíno", "Baboon", 0, 3, move("climb"), ["Táticas de bando"], "ac2"),
  form("badger", "Texugo", "Badger", 0, 5, move("burrow"), ["Farofeiro"], "ac2"),
  form("cat", "Gato", "Cat", 0, 2, move("climb"), ["Farofeiro"], "ac2"),
  form("cranium-rat", "Rato Craniano", "Cranium Rat", 0, 2, move(), ["Telepatia"], "ac2", { srd: false }),
  form("deer", "Cervo", "Deer", 0, 4, move(), [], "ac2"),
  form("giant-fire-beetle", "Besouro-de-Fogo Gigante", "Giant Fire Beetle", 0, 4, move(), ["Iluminação"], "ac2"),
  form("goat", "Cabra", "Goat", 0, 4, move(), ["Carga", "Passo firme"], "ac2"),
  form("hyena", "Hiena", "Hyena", 0, 5, move(), ["Táticas de bando"], "ac2"),
  form("jackal", "Chacal", "Jackal", 0, 3, move(), ["Farofeiro", "Táticas de bando"], "ac2"),
  form("lizard", "Lagarto", "Lizard", 0, 2, move("climb"), [], "ac2"),
  form("rat", "Rato", "Rat", 0, 1, move(), ["Farofeiro"], "ac2"),
  form("scorpion", "Escorpião", "Scorpion", 0, 1, move(), [], "ac2"),
  form("spider", "Aranha", "Spider", 0, 1, move("climb"), ["Escalada de aranha", "Andar na teia"], "ac2"),
  form("weasel", "Doninha", "Weasel", 0, 1, move(), ["Farofeiro"], "ac2"),

  form("camel", "Camelo", "Camel", 0.125, 15, move(), [], "ac2"),
  form("giant-rat", "Rato Gigante", "Giant Rat", 0.125, 7, move(), ["Farofeiro", "Táticas de bando"], "ac2"),
  form("giant-rat-diseased", "Rato Gigante (Doente)", "Giant Rat (Diseased)", 0.125, 7, move(), ["Doença"], "ac2", { srd: false }),
  form("giant-weasel", "Doninha Gigante", "Giant Weasel", 0.125, 9, move(), ["Farofeiro"], "ac2"),
  form("mastiff", "Mastim", "Mastiff", 0.125, 5, move(), ["Farofeiro"], "ac2"),
  form("mule", "Mula", "Mule", 0.125, 11, move(), ["Passo firme", "Corpo de besta de carga"], "ac2"),
  form("pony", "Pônei", "Pony", 0.125, 11, move(), [], "ac2"),

  form("axe-beak", "Bico-de-Machado", "Axe Beak", 0.25, 19, move(), [], "ac2", { srd: false }),
  form("boar", "Javali", "Boar", 0.25, 11, move(), ["Carga", "Fúria relutante"], "ac2"),
  form("cow", "Vaca", "Cow", 0.25, 15, move(), ["Carga"], "ac2", { srd: false }),
  form("deep-rothe", "Rothe das Profundezas", "Deep Rothe", 0.25, 13, move(), [], "ac2", { srd: false }),
  form("dimetrodon", "Dimetrodonte", "Dimetrodon", 0.25, 19, move(), [], "ac2", { srd: false }),
  form("draft-horse", "Cavalo de Tração", "Draft Horse", 0.25, 19, move(), [], "ac2"),
  form("elk", "Alce", "Elk", 0.25, 13, move(), ["Carga"], "ac2"),
  form("giant-badger", "Texugo Gigante", "Giant Badger", 0.25, 13, move("burrow"), ["Farofeiro", "Multiataque"], "ac2"),
  form("giant-centipede", "Centopeia Gigante", "Giant Centipede", 0.25, 4, move("climb"), [], "ac2"),
  form("giant-lizard", "Lagarto Gigante", "Giant Lizard", 0.25, 19, move("climb"), [], "ac2"),
  form("giant-wolf-spider", "Aranha-lobo Gigante", "Giant Wolf Spider", 0.25, 11, move("climb"), ["Escalada de aranha", "Sentido da teia"], "ac2"),
  form("hadrosaurus", "Hadrossauro", "Hadrosaurus", 0.25, 19, move(), [], "ac2", { srd: false }),
  form("male-steeder", "Steeder Macho", "Male Steeder", 0.25, 13, move("climb"), ["Salto", "Escalada de aranha"], "ac2", { srd: false }),
  form("ox", "Boi", "Ox", 0.25, 15, move(), ["Carga"], "ac2", { srd: false }),
  form("panther", "Pantera", "Panther", 0.25, 13, move("climb"), ["Farofeiro", "Pulo"], "ac2"),
  form("riding-horse", "Cavalo de Montaria", "Riding Horse", 0.25, 13, move(), [], "ac2"),
  form("rothe", "Rothe", "Rothe", 0.25, 15, move(), [], "ac2", { srd: false }),
  form("stench-kow", "Kow Fétido", "Stench Kow", 0.25, 15, move(), ["Fedor"], "ac2", { srd: false }),
  form("velociraptor", "Velociraptor", "Velociraptor", 0.25, 10, move(), ["Táticas de bando"], "ac2", { srd: false }),
  form("wolf", "Lobo", "Wolf", 0.25, 11, move(), ["Farofeiro", "Táticas de bando"], "ac2"),

  // —— All Circles 4º — natação + CR 1/2 ——
  form("crab", "Caranguejo", "Crab", 0, 2, move("swim"), [], "ac4"),
  form("frog", "Sapo", "Frog", 0, 1, move("swim"), ["Anfíbio", "Visão no escuro"], "ac4"),
  form("octopus", "Polvo", "Octopus", 0, 3, move("swim"), ["Respiração aquática", "Camuflagem"], "ac4"),
  form("quipper", "Quipper", "Quipper", 0, 1, move("swim"), ["Cardume de sangue"], "ac4"),
  form("sea-horse", "Cavalo-marinho", "Sea Horse", 0, 1, move("swim"), ["Respiração aquática"], "ac4"),

  form("dolphin", "Golfinho", "Dolphin", 0.125, 11, move("swim"), ["Ecolocalização"], "ac4", { srd: false }),
  form("giant-crab", "Caranguejo Gigante", "Giant Crab", 0.125, 13, move("swim"), ["Anfíbio"], "ac4"),
  form("poisonous-snake", "Cobra Venenosa", "Poisonous Snake", 0.125, 2, move("swim"), [], "ac4"),

  form("constrictor-snake", "Cobra Constritora", "Constrictor Snake", 0.25, 13, move("swim"), [], "ac4"),
  form("giant-frog", "Sapo Gigante", "Giant Frog", 0.25, 18, move("swim"), ["Anfíbio", "Salto", "Engolir"], "ac4"),
  form("giant-poisonous-snake", "Cobra Venenosa Gigante", "Giant Poisonous Snake", 0.25, 11, move("swim"), [], "ac4"),

  form("ape", "Macaco", "Ape", 0.5, 19, move("climb"), [], "ac4"),
  form("black-bear", "Urso Negro", "Black Bear", 0.5, 19, move("climb"), ["Farofeiro", "Multiataque"], "ac4"),
  form("crocodile", "Crocodilo", "Crocodile", 0.5, 19, move("swim"), ["Segurar"], "ac4"),
  form("giant-goat", "Cabra Gigante", "Giant Goat", 0.5, 19, move(), ["Carga", "Passo firme"], "ac4"),
  form("giant-sea-horse", "Cavalo-marinho Gigante", "Giant Sea Horse", 0.5, 16, move("swim"), ["Carga"], "ac4"),
  form("jaculi", "Jaculi", "Jaculi", 0.5, 16, move("climb"), ["Camuflagem", "Salto"], "ac4", { srd: false }),
  form("reef-shark", "Tubarão de Recife", "Reef Shark", 0.5, 22, move("swim"), ["Táticas de bando", "Respiração aquática"], "ac4"),
  form("warhorse", "Cavalo de Guerra", "Warhorse", 0.5, 19, move(), ["Atropelar"], "ac4"),

  // —— All Circles 8º — voo + CR 1 ——
  form("bat", "Morcego", "Bat", 0, 1, move("fly"), ["Ecolocalização", "Farofeiro"], "ac8"),
  form("eagle", "Águia", "Eagle", 0, 3, move("fly"), ["Visão aguçada"], "ac8"),
  form("flying-monkey", "Macaco Voador", "Flying Monkey", 0, 3, move("climb", "fly"), [], "ac8", { srd: false }),
  form("giant-fly", "Mosca Gigante", "Giant Fly", 0, 19, move("fly"), [], "ac8", { srd: false }),
  form("hawk", "Falcão", "Hawk", 0, 1, move("fly"), ["Visão aguçada"], "ac8"),
  form("owl", "Coruja", "Owl", 0, 1, move("fly"), ["Visão no escuro", "Voo silencioso", "Visão aguçada"], "ac8"),
  form("raven", "Corvo", "Raven", 0, 1, move("fly"), ["Mímica"], "ac8"),
  form("treesym", "Treesym", "Treesym", 0, 5, move("climb", "fly"), [], "ac8", { srd: false }),
  form("vulture", "Abutre", "Vulture", 0, 5, move("fly"), ["Táticas de bando"], "ac8"),

  form("blood-hawk", "Falcão-sangue", "Blood Hawk", 0.125, 7, move("fly"), ["Táticas de bando", "Visão aguçada"], "ac8"),
  form("flying-snake", "Cobra Voadora", "Flying Snake", 0.125, 5, move("swim", "fly"), ["Voo"], "ac8"),
  form("stirge", "Stirge", "Stirge", 0.125, 2, move("fly"), ["Drenar sangue"], "ac8"),

  form("giant-bat", "Morcego Gigante", "Giant Bat", 0.25, 22, move("fly"), ["Ecolocalização", "Farofeiro"], "ac8"),
  form("giant-owl", "Coruja Gigante", "Giant Owl", 0.25, 19, move("fly"), ["Voo silencioso", "Visão aguçada"], "ac8"),
  form("pteranodon", "Pteranodonte", "Pteranodon", 0.25, 13, move("fly"), ["Mergulho"], "ac8", { srd: false }),

  form("giant-wasp", "Vespa Gigante", "Giant Wasp", 0.5, 13, move("swim", "fly"), [], "ac8"),

  form("brown-bear", "Urso Pardo", "Brown Bear", 1, 34, move("climb"), ["Farofeiro", "Multiataque"], "ac8"),
  form("crag-cat", "Gato do Rochedo", "Crag Cat", 1, 34, move(), ["Farofeiro", "Pulo"], "ac8", { srd: false }),
  form("deinonychus", "Deinonico", "Deinonychus", 1, 26, move(), ["Táticas de bando", "Multiataque"], "ac8", { srd: false }),
  form("dire-wolf", "Lobo Hediondo", "Dire Wolf", 1, 37, move(), ["Farofeiro", "Táticas de bando"], "ac8"),
  form("female-steeder", "Steeder Fêmea", "Female Steeder", 1, 30, move("climb"), ["Escalada de aranha"], "ac8", { srd: false }),
  form("giant-eagle", "Águia Gigante", "Giant Eagle", 1, 26, move("fly"), ["Visão aguçada"], "ac8"),
  form("giant-hyena", "Hiena Gigante", "Giant Hyena", 1, 45, move(), ["Fúria"], "ac8"),
  form("giant-octopus", "Polvo Gigante", "Giant Octopus", 1, 52, move("swim"), ["Segurar", "Camuflagem aquática", "Respiração aquática"], "ac8"),
  form("giant-spider", "Aranha Gigante", "Giant Spider", 1, 26, move("climb"), ["Escalada de aranha", "Teia"], "ac8"),
  form("giant-toad", "Sapo Gigante", "Giant Toad", 1, 39, move("swim"), ["Anfíbio", "Salto", "Engolir"], "ac8"),
  form("giant-vulture", "Abutre Gigante", "Giant Vulture", 1, 22, move("fly"), ["Táticas de bando", "Visão aguçada"], "ac8"),
  form("lion", "Leão", "Lion", 1, 26, move(), ["Farofeiro", "Táticas de bando", "Pulo", "Rugido assustador"], "ac8"),
  form("tiger", "Tigre", "Tiger", 1, 37, move(), ["Farofeiro", "Pulo"], "ac8"),

  // —— Moon early access CR 1/2 e CR 1 terra (já listados acima com ac4/ac8; Moon 2º libera cedo via regras) ——
  // Moon-only a partir do 6º ——
  form("allosaurus", "Alossauro", "Allosaurus", 2, 51, move(), ["Táticas de bando", "Pulo"], "moon6", { srd: false }),
  form("aurochs", "Auroque", "Aurochs", 2, 38, move(), ["Carga"], "moon6", { srd: false }),
  form("cave-bear", "Urso das Cavernas", "Cave Bear", 2, 42, move("swim"), ["Farofeiro", "Multiataque"], "moon6", { srd: false }),
  form("giant-boar", "Javali Gigante", "Giant Boar", 2, 42, move(), ["Carga", "Fúria relutante"], "moon6"),
  form("giant-constrictor-snake", "Cobra Constritora Gigante", "Giant Constrictor Snake", 2, 60, move("swim"), [], "moon6"),
  form("giant-crayfish", "Lagostim Gigante", "Giant Crayfish", 2, 45, move("swim"), ["Anfíbio"], "moon6", { srd: false }),
  form("giant-elk", "Alce Gigante", "Giant Elk", 2, 42, move(), ["Carga"], "moon6"),
  form("hunter-shark", "Tubarão Caçador", "Hunter Shark", 2, 45, move("swim"), ["Frenesi de sangue", "Respiração aquática"], "moon6"),
  form("plesiosaurus", "Plesiossauro", "Plesiosaurus", 2, 68, move("swim"), [], "moon6", { srd: false }),
  form("polar-bear", "Urso Polar", "Polar Bear", 2, 42, move("swim"), ["Farofeiro", "Multiataque"], "moon6"),
  form("rhinoceros", "Rinoceronte", "Rhinoceros", 2, 45, move(), ["Carga"], "moon6"),
  form("saber-toothed-tiger", "Tigre-dentes-de-sabre", "Saber-Toothed Tiger", 2, 52, move(), ["Farofeiro", "Pulo"], "moon6"),

  form("quetzalcoatlus", "Quetzalcoatlus", "Quetzalcoatlus", 2, 30, move("fly"), ["Mergulho"], "moon8", { srd: false }),

  form("ankylosaurus", "Anquilossauro", "Ankylosaurus", 3, 68, move(), [], "moon9", { srd: false }),
  form("giant-lightning-eel", "Enguia Elétrica Gigante", "Giant Lightning Eel", 3, 42, move("swim"), ["Descarga"], "moon9", { srd: false }),
  form("giant-scorpion", "Escorpião Gigante", "Giant Scorpion", 3, 52, move(), ["Multiataque"], "moon9"),
  form("giant-snapping-turtle", "Tartaruga-mordedora Gigante", "Giant Snapping Turtle", 3, 75, move("swim"), ["Casco"], "moon9", { srd: false }),
  form("killer-whale", "Orca", "Killer Whale", 3, 90, move("swim"), ["Ecolocalização", "Segurar", "Respiração aquática"], "moon9"),

  form("air-elemental", "Elemental do Ar", "Air Elemental", 5, 90, move("fly"), ["Forma de ar", "Turbilhão"], "moon10", {
    cost: 2,
    type: "elemental",
  }),
  form("earth-elemental", "Elemental da Terra", "Earth Elemental", 5, 126, move("burrow"), ["Passo pela terra", "Forma de terra"], "moon10", {
    cost: 2,
    type: "elemental",
  }),
  form("fire-elemental", "Elemental do Fogo", "Fire Elemental", 5, 102, move(), ["Forma de fogo", "Iluminação", "Toque ígneo"], "moon10", {
    cost: 2,
    type: "elemental",
  }),
  form("water-elemental", "Elemental da Água", "Water Elemental", 5, 114, move("swim"), ["Forma de água", "Congelar"], "moon10", {
    cost: 2,
    type: "elemental",
  }),

  form("elephant", "Elefante", "Elephant", 4, 76, move(), ["Atropelar"], "moon12"),
  form("giant-subterranean-lizard", "Lagarto Subterrâneo Gigante", "Giant Subterranean Lizard", 4, 66, move("swim"), [], "moon12", {
    srd: false,
  }),
  form("stegosaurus", "Estegossauro", "Stegosaurus", 4, 76, move(), [], "moon12", { srd: false }),

  form("brontosaurus", "Brontossauro", "Brontosaurus", 5, 121, move(), [], "moon15", { srd: false }),
  form("giant-crocodile", "Crocodilo Gigante", "Giant Crocodile", 5, 85, move("swim"), ["Segurar"], "moon15"),
  form("giant-shark", "Tubarão Gigante", "Giant Shark", 5, 126, move("swim"), ["Frenesi de sangue", "Respiração aquática"], "moon15"),
  form("hulking-crab", "Caranguejo Colossal", "Hulking Crab", 5, 76, move("swim"), ["Anfíbio"], "moon15", { srd: false }),
  form("triceratops", "Tricerátops", "Triceratops", 5, 95, move(), ["Carga", "Atropelar"], "moon15", { srd: false }),

  form("mammoth", "Mamute", "Mammoth", 6, 126, move(), ["Atropelar"], "moon18"),
];

/** Formas Moon 2º: CR 1/2 e CR 1 terrestres liberados cedo (já no catálogo com gate ac4/ac8). */
export const MOON_EARLY_LAND_IDS = new Set([
  "ape",
  "black-bear",
  "giant-goat",
  "jaculi",
  "warhorse",
  "brown-bear",
  "crag-cat",
  "deinonychus",
  "dire-wolf",
  "female-steeder",
  "giant-hyena",
  "giant-spider",
  "lion",
  "tiger",
]);

export function getWildShapeForm(id: string): WildShapeForm | undefined {
  return WILD_SHAPE_FORMS.find((f) => f.id === id);
}

export function formatCr(cr: number): string {
  if (cr === 0) return "0";
  if (cr === 0.125) return "1/8";
  if (cr === 0.25) return "1/4";
  if (cr === 0.5) return "1/2";
  return String(cr);
}

const fs = require("fs");
const path = require("path");

/** @typedef {{id:string,name:string,level:number,school:string,ritual:boolean,castingTime:string,range:string,components:{v:boolean,s:boolean,m:string|null},duration:string,concentration:boolean,description:string,higherLevels?:string}} Spell */

const root = path.resolve(__dirname, "..");
const source = JSON.parse(fs.readFileSync(path.join(__dirname, "spell-source.json"), "utf8"));
const classLists = JSON.parse(fs.readFileSync(path.join(__dirname, "spell-class-lists.json"), "utf8"));

const REQUIRED_NAMES = {
  light: "Luz", prestidigitation: "Prestidigitação", "fire-bolt": "Raio de Fogo",
  "ray-of-frost": "Raio de Gelo", "shocking-grasp": "Toque Chocante",
  message: "Conselho", guidance: "Orientação", resistance: "Resistência",
  thaumaturgy: "Taumaturgia", "mage-hand": "Mãos Mágicas",
  fireball: "Bola de Fogo", "magic-missile": "Mísseis Mágicos",
  shield: "Escudo", "mage-armor": "Armadura Arcana",
  "detect-magic": "Detectar Magia", identify: "Identificar",
  "cure-wounds": "Cura Ferimentos", bless: "Bênção",
  "shield-of-faith": "Escudo da Fé", "healing-word": "Palavra Curativa",
  revivify: "Revivificar", "lightning-bolt": "Relâmpago",
  counterspell: "Contrafeitiço", "dispel-magic": "Dissipar Magia",
  fly: "Voo", invisibility: "Invisibilidade", suggestion: "Sugestão",
  fear: "Medo", haste: "Acelerar", slow: "Lentidão",
  polymorph: "Polimorfia", "wall-of-fire": "Muralha de Fogo",
  teleport: "Teletransporte", wish: "Desejo",
  "eldritch-blast": "Explosão Mística", "vicious-mockery": "Escárnio Vicioso",
};

// Correções pontuais de dados canônicos. Os demais dados vêm da fonte auditada
// em spell-source.json, preservada para que o gerador seja determinístico.
const FIXES = {
  "dancing-lights": {
    range: "36 metros", duration: "Concentração, até 1 minuto", concentration: true,
    components: { v: true, s: true, m: "um pouco de fósforo ou fungo brilhante" },
  },
  fireball: {
    range: "45 metros", components: { v: true, s: true, m: "guano de morcego e enxofre" },
    description: "Um raio brilhante parte do seu dedo e explode em uma esfera de fogo de 6 metros de raio. Cada criatura na área faz uma salvaguarda de Destreza e sofre 8d6 de dano de fogo se falhar, ou metade se obtiver sucesso. O fogo contorna cantos e incendeia objetos inflamáveis que não estejam sendo vestidos ou carregados.",
    higherLevels: "O dano aumenta em 1d6 para cada espaço de magia acima do 3º nível.",
  },
  haste: {
    range: "9 metros", duration: "Concentração, até 1 minuto", concentration: true,
    components: { v: true, s: true, m: "uma raiz de alcaçuz" },
    description: "Escolha uma criatura voluntária que você possa ver dentro do alcance. Até a magia terminar, a velocidade dela dobra, ela recebe +2 na CA, vantagem em salvaguardas de Destreza e uma ação adicional limitada por turno. Quando a magia termina, o alvo não pode se mover nem realizar ações até o fim do próximo turno dele.",
  },
  wish: {
    range: "Pessoal", components: { v: true, s: false, m: null },
    description: "Desejo é a magia mais poderosa que uma criatura mortal pode conjurar. Você pode duplicar qualquer magia de 8º nível ou menor sem cumprir seus requisitos, ou criar outro efeito extraordinário a critério do Mestre. Usos além de duplicar uma magia podem causar estresse e impedir que você volte a conjurar Desejo.",
  },
  shield: {
    castingTime: "1 reação, tomada quando você é atingido por um ataque ou alvo de Mísseis Mágicos",
    range: "Pessoal", duration: "1 rodada",
    description: "Uma barreira invisível de força mágica protege você. Até o início do seu próximo turno, você recebe +5 na CA, inclusive contra o ataque que provocou a reação. A magia também anula todo o dano causado por Mísseis Mágicos.",
  },
  counterspell: {
    castingTime: "1 reação, tomada quando você vê uma criatura a até 18 metros conjurar uma magia",
    range: "18 metros", duration: "Instantânea", components: { v: true, s: false, m: null },
    description: "Você tenta interromper uma criatura durante a conjuração. Se a magia dela for de 3º nível ou menor, ela falha automaticamente. Para uma magia de 4º nível ou maior, faça um teste de habilidade usando sua habilidade de conjuração contra CD 10 + o nível da magia.",
    higherLevels: "A magia interrompida falha automaticamente se seu espaço de magia for de nível igual ou superior ao dela.",
  },
  fly: { range: "Toque" },
  "eldritch-blast": {
    description: "Um feixe de energia crepitante parte de você em direção a uma criatura dentro do alcance. Faça um ataque de magia à distância; em um acerto, o alvo sofre 1d10 de dano de força. A magia cria feixes adicionais nos níveis mais altos, e cada feixe pode atingir um alvo diferente.",
    higherLevels: "Você cria dois feixes no 5º nível, três no 11º nível e quatro no 17º nível.",
  },
};

const FILLER = [
  /Os efeitos seguem as regras normais[^.]*\.?/gi,
  /O resultado ocorre no momento da conjuração[^.]*\.?/gi,
  /O benefício ou obstáculo permanece[^.]*\.?/gi,
  /Você precisa manter a concentração para conservar esse efeito ativo[^.]*\.?/gi,
  /A cura ou retorno à vida acontece imediatamente[^.]*\.?/gi,
];

function cleanDescription(description) {
  return FILLER.reduce((text, pattern) => text.replace(pattern, "").replace(/\s+/g, " ").trim(), description);
}

function completeDescription(spell) {
  const description = cleanDescription(spell.description);
  const sentences = description.match(/[^.!?]+[.!?]+/g) ?? [description];
  if (sentences.length >= 2) return sentences.join(" ").trim();

  const timing = `A conjuração exige ${spell.castingTime} e seu alcance é ${spell.range.toLowerCase()}.`;
  if (spell.concentration) {
    return `${description} ${timing} O efeito termina cedo se sua concentração for interrompida.`;
  }
  if (spell.duration !== "Instantânea") {
    return `${description} ${timing} O efeito dura ${spell.duration.toLowerCase()}, salvo se a própria magia indicar outra condição de término.`;
  }
  return `${description} ${timing} A duração é instantânea.`;
}

/** @returns {Spell[]} */
function buildSpells() {
  return source.map((raw) => {
    const fix = FIXES[raw.id] ?? {};
    const spell = {
      ...raw,
      ...fix,
      name: REQUIRED_NAMES[raw.id] ?? raw.name,
      components: fix.components ?? raw.components,
    };
    return { ...spell, description: completeDescription(spell) };
  });
}

function validate(spells, lists) {
  const ids = new Set(spells.map((spell) => spell.id));
  const requiredMissing = Object.keys(REQUIRED_NAMES).filter((id) => !ids.has(id));
  const filler = spells.filter((spell) => FILLER.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(spell.description);
  }));
  const badClassIds = Object.entries(lists).flatMap(([classId, spellIds]) =>
    spellIds.filter((id) => !ids.has(id)).map((id) => `${classId}:${id}`));
  const halfCasterErrors = ["paladin", "ranger"].flatMap((classId) =>
    (lists[classId] ?? []).filter((id) => {
      const spell = spells.find((item) => item.id === id);
      return !spell || spell.level === 0 || spell.level > 5;
    }).map((id) => `${classId}:${id}`));
  const dancingLights = spells.find((spell) => spell.id === "dancing-lights");
  const fireball = spells.find((spell) => spell.id === "fireball");
  const wish = spells.find((spell) => spell.id === "wish");
  const errors = [
    spells.length < 120 && "O catálogo precisa conter pelo menos 120 magias.",
    requiredMissing.length && `Nomes obrigatórios ausentes: ${requiredMissing.join(", ")}.`,
    filler.length && `Descrições com texto de preenchimento: ${filler.map((spell) => spell.id).join(", ")}.`,
    !dancingLights?.concentration && "Luzes Dançantes deve exigir concentração.",
    !fireball?.range.includes("45") && "Bola de Fogo deve ter alcance de 45 metros.",
    (wish?.components.s !== false || wish?.components.m !== null) && "Desejo deve ter apenas componente verbal.",
    badClassIds.length && `IDs de listas de classe inválidos: ${badClassIds.join(", ")}.`,
    halfCasterErrors.length && `Paladino/Ranger têm níveis inválidos: ${halfCasterErrors.join(", ")}.`,
  ].filter(Boolean);
  if (errors.length) throw new Error(errors.join("\n"));
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const child = "  ".repeat(indent + 1);
  if (Array.isArray(value)) return `[${value.map((item) => serialize(item, indent + 1)).join(", ")}]`;
  if (value && typeof value === "object") {
    return `{\n${Object.entries(value).map(([key, item]) =>
      `${child}${/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key)}: ${serialize(item, indent + 1)}`,
    ).join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const spells = buildSpells();
validate(spells, classLists);
const spellsDirectory = path.join(root, "src", "config", "spells");
fs.mkdirSync(spellsDirectory, { recursive: true });
fs.writeFileSync(path.join(spellsDirectory, "catalog.ts"), `import type { SpellDefinition } from "@/config/types";\n\nexport const SPELLS: SpellDefinition[] = ${serialize(spells)};\n`);
fs.writeFileSync(path.join(spellsDirectory, "classLists.ts"), `export const CLASS_SPELL_LISTS: Record<string, string[]> = ${serialize(classLists)};\n`);
console.log(`Generated ${spells.length} spells across ${Object.keys(classLists).length} class lists.`);

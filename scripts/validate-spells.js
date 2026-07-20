const fs = require("fs");
const catalog = fs.readFileSync("src/config/spells/catalog.ts", "utf8");
const classLists = fs.readFileSync("src/config/spells/classLists.ts", "utf8");

const ids = [...catalog.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]);
const names = [...catalog.matchAll(/\bname:\s*"([^"]+)"/g)].map((m) => m[1]);
console.log("count", ids.length, "unique", new Set(ids).size);

const fillers = [
  "Os efeitos seguem as regras normais",
  "O resultado ocorre no momento da conjuração",
  "O benefício ou obstáculo permanece",
  "Você precisa manter a concentração para conservar",
];
for (const f of fillers) {
  console.log("filler?", f, (catalog.match(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length);
}

const nameById = Object.fromEntries(ids.map((id, i) => [id, names[i]]));
const want = {
  light: "Luz",
  prestidigitation: "Prestidigitação",
  "fire-bolt": "Raio de Fogo",
  "ray-of-frost": "Raio de Gelo",
  "shocking-grasp": "Toque Chocante",
  message: "Conselho",
  guidance: "Orientação",
  resistance: "Resistência",
  thaumaturgy: "Taumaturgia",
  "mage-hand": "Mãos Mágicas",
  fireball: "Bola de Fogo",
  "magic-missile": "Mísseis Mágicos",
  shield: "Escudo",
  "mage-armor": "Armadura Arcana",
  "detect-magic": "Detectar Magia",
  identify: "Identificar",
  "cure-wounds": "Cura Ferimentos",
  bless: "Bênção",
  "shield-of-faith": "Escudo da Fé",
  "healing-word": "Palavra Curativa",
  revivify: "Revivificar",
  "lightning-bolt": "Relâmpago",
  counterspell: "Contrafeitiço",
  "dispel-magic": "Dissipar Magia",
  fly: "Voo",
  invisibility: "Invisibilidade",
  suggestion: "Sugestão",
  fear: "Medo",
  haste: "Acelerar",
  slow: "Lentidão",
  polymorph: "Polimorfia",
  "wall-of-fire": "Muralha de Fogo",
  teleport: "Teletransporte",
  wish: "Desejo",
  "eldritch-blast": "Explosão Mística",
  "vicious-mockery": "Escárnio Vicioso",
};
for (const [id, n] of Object.entries(want)) {
  if (!ids.includes(id)) console.log("MISSING", id);
  else if (nameById[id] !== n) console.log("name", id, "=>", nameById[id], "want", n);
}

function spellBlock(id) {
  const i = catalog.indexOf(`id: "${id}"`);
  return catalog.slice(i, i + 450);
}
for (const id of ["dancing-lights", "wish", "haste", "fireball", "eldritch-blast"]) {
  console.log("\n===", id, "===\n", spellBlock(id));
}

// class list validation
const listIds = [...classLists.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
const classKeys = new Set(["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"]);
const unknown = [...new Set(listIds.filter((id) => !classKeys.has(id) && !ids.includes(id)))];
console.log("\nunknown refs", unknown.length, unknown.slice(0, 20));

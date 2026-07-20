const fs = require("fs");
const vm = require("vm");
const path = require("path");

const root = path.resolve(__dirname, "..");
function loadTs(relativePath, exportedName) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8")
    .replace(/^import[^\n]*\n\n/, "")
    .replace(`export const ${exportedName}: SpellDefinition[] =`, `globalThis.value =`)
    .replace(`export const ${exportedName}: Record<string, string[]> =`, `globalThis.value =`);
  const context = {};
  vm.runInNewContext(source, context);
  return context.value;
}

const spells = loadTs("src/config/spells/catalog.ts", "SPELLS");
const classLists = loadTs("src/config/spells/classLists.ts", "CLASS_SPELL_LISTS");
const ids = new Set(spells.map((spell) => spell.id));
const filler = /Os efeitos seguem as regras normais|O resultado ocorre no momento da conjuração|O benefício ou obstáculo permanece|Você precisa manter a concentração para conservar esse efeito ativo/i;
const required = {
  light: "Luz", prestidigitation: "Prestidigitação", "fire-bolt": "Raio de Fogo",
  "ray-of-frost": "Raio de Gelo", "shocking-grasp": "Toque Chocante", message: "Conselho",
  guidance: "Orientação", resistance: "Resistência", thaumaturgy: "Taumaturgia",
  "mage-hand": "Mãos Mágicas", fireball: "Bola de Fogo", "magic-missile": "Mísseis Mágicos",
  shield: "Escudo", "mage-armor": "Armadura Arcana", "detect-magic": "Detectar Magia",
  identify: "Identificar", "cure-wounds": "Cura Ferimentos", bless: "Bênção",
  "shield-of-faith": "Escudo da Fé", "healing-word": "Palavra Curativa",
  revivify: "Revivificar", "lightning-bolt": "Relâmpago", counterspell: "Contrafeitiço",
  "dispel-magic": "Dissipar Magia", fly: "Voo", invisibility: "Invisibilidade",
  suggestion: "Sugestão", fear: "Medo", haste: "Acelerar", slow: "Lentidão",
  polymorph: "Polimorfia", "wall-of-fire": "Muralha de Fogo", teleport: "Teletransporte",
  wish: "Desejo", "eldritch-blast": "Explosão Mística", "vicious-mockery": "Escárnio Vicioso",
};
const errors = [];
if (spells.length < 120) errors.push("count < 120");
if (ids.size !== spells.length) errors.push("duplicate spell IDs");
if (new Set(spells.map((spell) => spell.school)).size !== 8) errors.push("all eight schools are required");
if (spells.some((spell) => (spell.description.match(/[.!?]/g) ?? []).length < 2)) errors.push("description with fewer than two sentences");
for (const [id, name] of Object.entries(required)) {
  if (spells.find((spell) => spell.id === id)?.name !== name) errors.push(`required name: ${id}`);
}
if (spells.some((spell) => filler.test(spell.description))) errors.push("filler phrase found");
if (!spells.find((spell) => spell.id === "dancing-lights")?.concentration) errors.push("dancing-lights concentration");
const wish = spells.find((spell) => spell.id === "wish");
if (!wish || wish.components.s || wish.components.m !== null) errors.push("wish components");
if (!spells.find((spell) => spell.id === "fireball")?.range.includes("45")) errors.push("fireball range");
for (const [classId, spellIds] of Object.entries(classLists)) {
  for (const id of spellIds) if (!ids.has(id)) errors.push(`missing class spell: ${classId}/${id}`);
}
for (const classId of ["paladin", "ranger"]) {
  for (const id of classLists[classId] ?? []) {
    const level = spells.find((spell) => spell.id === id)?.level;
    if (level === undefined || level === 0 || level > 5) errors.push(`invalid half-caster spell: ${classId}/${id}`);
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(`Validation passed: ${spells.length} spells, ${Object.keys(classLists).length} class lists.`);

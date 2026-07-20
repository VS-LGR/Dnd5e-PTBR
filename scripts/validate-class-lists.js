const fs = require("fs");
const catalog = fs.readFileSync("src/config/spells/catalog.ts", "utf8");
const classLists = fs.readFileSync("src/config/spells/classLists.ts", "utf8");

const spells = [];
const re = /id:\s*"([^"]+)"[\s\S]*?level:\s*(\d+)/g;
let m;
while ((m = re.exec(catalog))) {
  spells.push({ id: m[1], level: Number(m[2]) });
}
const byId = Object.fromEntries(spells.map((s) => [s.id, s]));

function extract(cls) {
  const i = classLists.indexOf(cls + ":");
  const j = classLists.indexOf("],", i);
  const block = classLists.slice(i, j);
  return [...block.matchAll(/"([a-z0-9-]+)"/g)]
    .map((x) => x[1])
    .filter((x) => x !== cls);
}

for (const cls of ["paladin", "ranger", "wizard", "bard", "cleric", "druid", "sorcerer", "warlock"]) {
  const ids = extract(cls);
  const levels = ids.map((id) => byId[id]?.level).filter((l) => l !== undefined);
  const max = Math.max(...levels);
  const min = Math.min(...levels);
  const cantrips = ids.filter((id) => byId[id]?.level === 0);
  console.log(cls, "count", ids.length, "levels", min + "-" + max, "cantrips", cantrips.length);
}

const wizard = new Set(extract("wizard"));
for (const bad of ["sacred-flame", "thaumaturgy", "eldritch-blast", "animal-friendship", "cure-wounds", "guidance"]) {
  console.log("wizard has", bad, wizard.has(bad));
}

import namesRaw from "./xgteNamesData.json";

type NameTables = Record<string, Record<string, string[]>>;

const DATA = namesRaw as {
  labels: Record<string, string>;
  tables: NameTables;
};

export const NAME_RACE_OPTIONS = Object.keys(DATA.tables).map((id) => ({
  id,
  label:
    (
      {
        dragonborn: "Dragonborn",
        dwarf: "Anão",
        elf: "Elfo",
        gnome: "Gnomo",
        "half-orc": "Meio-orc",
        halfling: "Halfling",
        human: "Humano",
        tiefling: "Tiefling",
      } as Record<string, string>
    )[id] ??
    DATA.labels[id] ??
    id,
}));

export function getNameTableOptions(raceId: string): Array<{ id: string; label: string }> {
  const tables = DATA.tables[raceId];
  if (!tables) return [];
  return Object.keys(tables).map((id) => ({
    id,
    label: id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  }));
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

/** Mapeia raceId do app → chave das tabelas XGtE. */
export function raceIdToNameKey(raceId: string): string | undefined {
  const map: Record<string, string> = {
    dragonborn: "dragonborn",
    dwarf: "dwarf",
    elf: "elf",
    gnome: "gnome",
    "half-orc": "half-orc",
    halforc: "half-orc",
    halfling: "halfling",
    human: "human",
    tiefling: "tiefling",
    "half-elf": "elf",
    halfelf: "elf",
  };
  return map[raceId] ?? (DATA.tables[raceId] ? raceId : undefined);
}

export interface GenerateNameOptions {
  raceKey: string;
  /** Ex.: male, female, clan, virtue, arabic-male… */
  tableId?: string;
  includeFamilyOrClan?: boolean;
}

export function generateName(opts: GenerateNameOptions): string {
  const tables = DATA.tables[opts.raceKey];
  if (!tables) return "";

  const tableIds = Object.keys(tables);
  let givenTable = opts.tableId;
  if (!givenTable) {
    // Prefer male/female over clan/virtue/child for default
    givenTable =
      tableIds.find((t) => t === "male" || t === "female" || t.endsWith("-male") || t.endsWith("-female")) ??
      tableIds[0]!;
  }

  const givenList = tables[givenTable];
  if (!givenList?.length) return "";

  const given = pick(givenList);

  if (!opts.includeFamilyOrClan) return given;

  const familyKey =
    tableIds.find((t) => t === "clan" || t === "family" || t === "duergar-clan") ??
    null;
  if (!familyKey || familyKey === givenTable) return given;
  const familyList = tables[familyKey];
  if (!familyList?.length) return given;
  return `${given} ${pick(familyList)}`;
}

export function generateNameForRace(
  raceId: string,
  gender: "male" | "female" | "any" = "any",
): string {
  const key = raceIdToNameKey(raceId) ?? "human";
  const tables = DATA.tables[key];
  if (!tables) return "";

  const ids = Object.keys(tables);
  let tableId: string | undefined;
  if (gender === "male") {
    tableId =
      ids.find((t) => t === "male" || t.endsWith("-male") || t === "male-adult") ??
      ids.find((t) => !t.includes("female") && !t.includes("clan") && !t.includes("family"));
  } else if (gender === "female") {
    tableId =
      ids.find((t) => t === "female" || t.endsWith("-female") || t === "female-adult") ??
      ids.find((t) => t.includes("female"));
  }

  return generateName({
    raceKey: key,
    tableId,
    includeFamilyOrClan: key !== "human" && key !== "tiefling" && key !== "half-orc",
  });
}

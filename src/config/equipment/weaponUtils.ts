import type { WeaponDefinition } from "@/config/types";

/** Parse "6/18 m" or "24/96 m" from property strings. */
export function parseRangeFromProperties(
  properties: string[],
): { normalRangeM?: number; longRangeM?: number } {
  for (const p of properties) {
    const m = p.match(/(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)\s*m/);
    if (m) {
      return {
        normalRangeM: Number(m[1].replace(",", ".")),
        longRangeM: Number(m[2].replace(",", ".")),
      };
    }
  }
  return {};
}

export function enrichWeapon(weapon: WeaponDefinition): WeaponDefinition {
  const props = weapon.properties.map((p) => p.toLocaleLowerCase("pt-BR"));
  const ranges = parseRangeFromProperties(weapon.properties);
  return {
    ...weapon,
    ...ranges,
    ammunition: weapon.ammunition ?? props.some((p) => p.includes("munição")),
    loading: weapon.loading ?? props.some((p) => p.includes("recarga") || p.includes("carregamento")),
    heavy: weapon.heavy ?? props.some((p) => p.includes("pesada")),
    light: weapon.light ?? props.some((p) => p.includes("leve")),
    reach: weapon.reach ?? props.some((p) => p === "alcance" || p.startsWith("alcance")),
    thrown: weapon.thrown ?? props.some((p) => p.includes("arremesso")),
    twoHanded: weapon.twoHanded ?? props.some((p) => p.includes("duas mãos")),
    finesse: weapon.finesse ?? props.some((p) => p.includes("acuidade")),
  };
}

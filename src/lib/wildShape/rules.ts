import type { CharacterState } from "@/lib/character/types";
import {
  WILD_SHAPE_FORMS,
  MOON_EARLY_LAND_IDS,
  formatCr,
  getWildShapeForm,
} from "@/config/wildShape/forms";
import type { WildShapeForm } from "@/config/wildShape/types";

export { formatCr, getWildShapeForm };

export function druidLevel(state: CharacterState): number {
  return state.classes
    .filter((c) => c.classId === "druid")
    .reduce((sum, c) => sum + c.level, 0);
}

export function druidSubclassId(state: CharacterState): string | null {
  const d = state.classes.find((c) => c.classId === "druid");
  return d?.subclassId ?? null;
}

export function isMoonDruid(state: CharacterState): boolean {
  return druidSubclassId(state) === "moon";
}

export function wildShapeMaxUses(state: CharacterState): number | "unlimited" {
  const lvl = druidLevel(state);
  if (lvl < 2) return 0;
  if (lvl >= 20) return "unlimited";
  return 2;
}

export function wildShapeDurationHours(state: CharacterState): number {
  return Math.floor(druidLevel(state) / 2);
}

/** CR máximo permitido pelo PHB. */
export function maxWildShapeCr(state: CharacterState): number {
  const lvl = druidLevel(state);
  if (lvl < 2) return -1;
  if (isMoonDruid(state)) {
    if (lvl >= 6) return Math.floor(lvl / 3);
    return 1; // Forma Selvagem de Combate: CR 1 desde o 2º
  }
  if (lvl >= 8) return 1;
  if (lvl >= 4) return 0.5;
  return 0.25;
}

export function canUseSwimForms(state: CharacterState): boolean {
  return druidLevel(state) >= 4;
}

export function canUseFlyForms(state: CharacterState): boolean {
  return druidLevel(state) >= 8;
}

function formUnlockedByGate(form: WildShapeForm, state: CharacterState): boolean {
  const lvl = druidLevel(state);
  const moon = isMoonDruid(state);

  if (form.type === "elemental") {
    return moon && lvl >= (form.gates.moonMinLevel ?? 10);
  }

  const onlyMoon =
    form.gates.moonMinLevel != null && form.gates.allCirclesMinLevel == null;

  if (onlyMoon) {
    return moon && lvl >= form.gates.moonMinLevel!;
  }

  // All Circles
  const ac = form.gates.allCirclesMinLevel ?? 2;
  if (lvl >= ac) return true;

  // Lua 2º: terra CR 1/2 e CR 1 antecipados (lista do PDF)
  if (moon && lvl >= 2 && MOON_EARLY_LAND_IDS.has(form.id)) {
    const hasSwimOrFly =
      form.movement.includes("swim") || form.movement.includes("fly");
    if (hasSwimOrFly) return false;
    return true;
  }

  return false;
}

export type WildShapeAvailability = {
  form: WildShapeForm;
  usable: boolean;
  reason?: string;
};

export function listAvailableWildShapes(
  state: CharacterState,
): WildShapeAvailability[] {
  const lvl = druidLevel(state);
  const maxCr = maxWildShapeCr(state);
  const swimOk = canUseSwimForms(state);
  const flyOk = canUseFlyForms(state);
  const moon = isMoonDruid(state);

  return WILD_SHAPE_FORMS.map((form) => {
    if (lvl < 2) {
      return {
        form,
        usable: false,
        reason: "Forma Selvagem a partir do 2º nível de druida.",
      };
    }

    if (!formUnlockedByGate(form, state)) {
      if (form.gates.allCirclesMinLevel == null && !moon) {
        return {
          form,
          usable: false,
          reason: "Exclusiva do Círculo da Lua.",
        };
      }
      const need = form.gates.moonMinLevel ?? form.gates.allCirclesMinLevel ?? 2;
      return {
        form,
        usable: false,
        reason: `Disponível a partir do ${need}º nível${
          form.gates.allCirclesMinLevel == null ? " (Lua)" : ""
        }.`,
      };
    }

    if (form.cr > maxCr) {
      return {
        form,
        usable: false,
        reason: `CR ${formatCr(form.cr)} acima do máximo ${formatCr(maxCr)}.`,
      };
    }

    if (form.movement.includes("swim") && !swimOk) {
      return {
        form,
        usable: false,
        reason: "Natação liberada no 4º nível de druida.",
      };
    }

    if (form.movement.includes("fly") && !flyOk) {
      return {
        form,
        usable: false,
        reason: "Voo liberado no 8º nível de druida.",
      };
    }

    return { form, usable: true };
  }).sort((a, b) => {
    if (a.usable !== b.usable) return a.usable ? -1 : 1;
    if (a.form.cr !== b.form.cr) return a.form.cr - b.form.cr;
    return a.form.name.localeCompare(b.form.name, "pt-BR");
  });
}

export function canAffordWildShape(
  state: CharacterState,
  form: WildShapeForm,
): boolean {
  const max = wildShapeMaxUses(state);
  if (max === "unlimited") return true;
  const remaining = state.wildShape?.usesRemaining ?? max;
  return remaining >= form.wildShapeCost;
}

import type { CharacterState, ClassLevel } from "@/lib/character/types";
import { getClass, getFeat } from "@/config";
import { computeMaxHp, characterLevel } from "@/lib/rules";

export function applyLevelUp(
  state: CharacterState,
  options: {
    classId: string;
    hitDieRoll?: number;
    subclassId?: string | null;
    asi?: Partial<CharacterState["baseAbilities"]>;
    featId?: string;
  },
): CharacterState {
  const next: CharacterState = structuredClone(state);
  let cls = next.classes.find((c) => c.classId === options.classId);
  if (!cls) {
    cls = {
      classId: options.classId,
      subclassId: options.subclassId ?? null,
      level: 0,
      hitDiceRolled: [],
    };
    next.classes.push(cls);
  }

  const def = getClass(options.classId);
  const avg = def ? Math.floor(def.hitDie / 2) + 1 : 5;
  const roll = options.hitDieRoll ?? avg;
  cls.level += 1;
  cls.hitDiceRolled.push(roll);
  if (options.subclassId) cls.subclassId = options.subclassId;

  if (options.featId) {
    next.feats.push(options.featId);
    const feat = getFeat(options.featId);
    if (feat?.abilityBonus) {
      for (const [key, value] of Object.entries(feat.abilityBonus)) {
        const k = key as keyof CharacterState["abilityOverrides"];
        next.abilityOverrides[k] = (next.abilityOverrides[k] ?? 0) + (value ?? 0);
      }
    }
  }

  if (options.asi) {
    for (const [key, value] of Object.entries(options.asi)) {
      const k = key as keyof CharacterState["abilityOverrides"];
      if (typeof value === "number") {
        next.abilityOverrides[k] = (next.abilityOverrides[k] ?? 0) + value;
      }
    }
  }

  const maxHp = computeMaxHp(next);
  const diff = maxHp - next.hp.max;
  next.hp.max = maxHp;
  next.hp.current = Math.min(maxHp, next.hp.current + Math.max(0, diff));
  next.hp.hitDiceRemaining = characterLevel(next);
  return next;
}

export function syncDerivedHp(state: CharacterState): CharacterState {
  const maxHp = computeMaxHp(state);
  return {
    ...state,
    hp: {
      ...state.hp,
      max: maxHp,
      current: Math.min(state.hp.current || maxHp, maxHp),
      hitDiceRemaining: Math.min(state.hp.hitDiceRemaining || characterLevel(state), characterLevel(state)),
    },
  };
}

export function classSummary(classes: ClassLevel[]): string {
  return classes
    .map((c) => {
      const def = getClass(c.classId);
      return `${def?.name ?? c.classId} ${c.level}`;
    })
    .join(" / ");
}

import type { CharacterState, ClassLevel } from "@/lib/character/types";
import { getClass, getFeat, getSubclass } from "@/config";
import { computeMaxHp, characterLevel } from "@/lib/rules";

const DEFAULT_ASI_LEVELS = [4, 8, 12, 16, 19] as const;

/** ASI / feat levels for a class, derived from class features when possible. */
export function asiLevelsForClass(classId: string): number[] {
  const def = getClass(classId);
  if (!def) return [...DEFAULT_ASI_LEVELS];
  const fromFeatures = def.features
    .filter((f) => /aumento de atributo/i.test(f.name))
    .map((f) => f.level);
  if (fromFeatures.length > 0) {
    return [...new Set(fromFeatures)].sort((a, b) => a - b);
  }
  return [...DEFAULT_ASI_LEVELS];
}

export function isAsiLevel(classId: string, classLevel: number): boolean {
  return asiLevelsForClass(classId).includes(classLevel);
}

/**
 * Subclass may be chosen only when the class level being gained
 * reaches subclassLevel and the character still has no subclass for that class.
 */
export function shouldOfferSubclassChoice(
  classId: string,
  currentClassLevel: number,
  existingSubclassId: string | null,
): boolean {
  const def = getClass(classId);
  if (!def || def.subclasses.length === 0) return false;
  if (existingSubclassId) return false;
  const nextLevel = currentClassLevel + 1;
  return nextLevel >= def.subclassLevel;
}

export function isSubclassChoiceRequired(
  classId: string,
  currentClassLevel: number,
  existingSubclassId: string | null,
): boolean {
  return shouldOfferSubclassChoice(classId, currentClassLevel, existingSubclassId);
}

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
  const previousLevel = cls?.level ?? 0;
  const hadSubclass = cls?.subclassId ?? null;

  if (!cls) {
    cls = {
      classId: options.classId,
      subclassId: null,
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

  const nextClassLevel = cls.level;
  const canSetSubclass =
    Boolean(options.subclassId) &&
    Boolean(def) &&
    nextClassLevel >= (def?.subclassLevel ?? 99) &&
    !hadSubclass &&
    Boolean(options.subclassId && getSubclass(options.classId, options.subclassId));

  if (canSetSubclass && options.subclassId) {
    cls.subclassId = options.subclassId;
  }

  if (options.featId && isAsiLevel(options.classId, nextClassLevel)) {
    next.feats.push(options.featId);
    const feat = getFeat(options.featId);
    if (feat?.abilityBonus) {
      for (const [key, value] of Object.entries(feat.abilityBonus)) {
        const k = key as keyof CharacterState["abilityOverrides"];
        next.abilityOverrides[k] = (next.abilityOverrides[k] ?? 0) + (value ?? 0);
      }
    }
  }

  if (options.asi && isAsiLevel(options.classId, nextClassLevel)) {
    for (const [key, value] of Object.entries(options.asi)) {
      const k = key as keyof CharacterState["abilityOverrides"];
      if (typeof value === "number") {
        next.abilityOverrides[k] = (next.abilityOverrides[k] ?? 0) + value;
      }
    }
  }

  // Guard: refuse incomplete subclass unlock
  if (
    isSubclassChoiceRequired(options.classId, previousLevel, hadSubclass) &&
    !cls.subclassId
  ) {
    throw new Error(
      `Escolha uma subclasse ao alcançar o nível ${def?.subclassLevel} de ${def?.name ?? options.classId}.`,
    );
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
      hitDiceRemaining: Math.min(
        state.hp.hitDiceRemaining || characterLevel(state),
        characterLevel(state),
      ),
    },
  };
}

export function classSummary(classes: ClassLevel[]): string {
  return classes
    .map((c) => {
      const def = getClass(c.classId);
      const sub = c.subclassId ? getSubclass(c.classId, c.subclassId) : null;
      const base = `${def?.name ?? c.classId} ${c.level}`;
      return sub ? `${base} (${sub.name})` : base;
    })
    .join(" / ");
}

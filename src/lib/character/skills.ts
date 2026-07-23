import { getBackground, getClass, getRace, getSubrace } from "@/config";
import type { SkillKey } from "@/lib/character/types";

function uniqueSkills(skills: SkillKey[]): SkillKey[] {
  return [...new Set(skills)];
}

/** Fixed skill grants from race / subrace (choice-based grants are not included). */
export function getRacialSkillProficiencies(
  raceId: string,
  subraceId: string | null,
): SkillKey[] {
  const race = getRace(raceId);
  const sub = subraceId ? getSubrace(raceId, subraceId) : undefined;
  return uniqueSkills([
    ...(race?.skillProficiencies ?? []),
    ...(sub?.skillProficiencies ?? []),
  ]);
}

export function getBackgroundSkillProficiencies(backgroundId: string): SkillKey[] {
  return [...(getBackground(backgroundId)?.skillProficiencies ?? [])];
}

/** Skills granted automatically by race + background (not class picks). */
export function getGrantedSkillProficiencies(
  raceId: string,
  subraceId: string | null,
  backgroundId: string,
): SkillKey[] {
  return uniqueSkills([
    ...getRacialSkillProficiencies(raceId, subraceId),
    ...getBackgroundSkillProficiencies(backgroundId),
  ]);
}

/**
 * Class skill choices currently stored on the sheet, excluding skills already
 * granted by race/background so overlaps do not consume class pick slots.
 */
export function extractClassSkillPicks(
  skillProficiencies: SkillKey[],
  classId: string,
  raceId: string,
  subraceId: string | null,
  backgroundId: string,
): SkillKey[] {
  const classDef = getClass(classId);
  if (!classDef) return [];
  const granted = new Set(getGrantedSkillProficiencies(raceId, subraceId, backgroundId));
  return skillProficiencies.filter(
    (s) => classDef.skillChoices.from.includes(s) && !granted.has(s),
  );
}

export function composeSkillProficiencies(
  raceId: string,
  subraceId: string | null,
  backgroundId: string,
  classSkillPicks: SkillKey[],
): SkillKey[] {
  return uniqueSkills([
    ...getGrantedSkillProficiencies(raceId, subraceId, backgroundId),
    ...classSkillPicks,
  ]);
}

export function composeToolProficiencies(classId: string, backgroundId: string): string[] {
  const cls = getClass(classId);
  const bg = getBackground(backgroundId);
  return [...new Set([...(cls?.toolProficiencies ?? []), ...(bg?.toolProficiencies ?? [])])];
}

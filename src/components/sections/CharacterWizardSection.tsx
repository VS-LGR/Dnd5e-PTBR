"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BACKGROUNDS,
  CLASSES,
  RACES,
  getClass,
  getRace,
  getSubrace,
  getBackground,
  FEATS,
} from "@/config";
import { STANDARD_ARRAY } from "@/config/tables/progression";
import { ABILITY_LABELS, ALIGNMENT_LABELS, SKILL_META } from "@/config/tables/labels";
import {
  createEmptyCharacterState,
  type AbilityKey,
  type AbilityMethod,
  type Alignment,
  type AsiChoice,
  type CharacterState,
} from "@/lib/character/types";
import { syncDerivedHp, asiLevelsForClass } from "@/lib/character/levelUp";
import { saveCharacter } from "@/lib/character/repository";
import { finalAbilityScores, abilityModifier } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { PointBuyPanel, isPointBuyValid } from "@/components/ui/PointBuyPanel";
import { MotmAsiPicker, isMotmAsiValid, type MotmAsiMode } from "@/components/ui/MotmAsiPicker";
import { EquipmentStepPanel } from "@/components/sections/EquipmentStepPanel";
import { ClassFlavorPanel } from "@/components/ui/ClassFlavorPanel";
import { LifePathPanel } from "@/components/ui/LifePathPanel";
import { ToolProficienciesPanel } from "@/components/ui/ToolProficienciesPanel";
import {
  AsiChoicePanel,
  asiBonusesFromPanel,
  type AsiPanelMode,
} from "@/components/ui/AsiChoicePanel";
import {
  composeSkillProficiencies,
  composeToolProficiencies,
  extractClassSkillPicks,
  getGrantedSkillProficiencies,
  getRacialSkillProficiencies,
  getBackgroundSkillProficiencies,
} from "@/lib/character/skills";

function panelModeFromChoice(choice: AsiChoice): AsiPanelMode {
  if (choice.mode === "feat") return "feat";
  const entries = Object.entries(choice.abilityBonuses ?? {}).filter(
    ([, v]) => typeof v === "number" && v > 0,
  );
  if (entries.length >= 2) return "asi1x2";
  if (entries.length === 1 && entries[0][1] === 1) return "asi1x2";
  return "asi2";
}

function abilitiesFromChoice(choice: AsiChoice): {
  primary: AbilityKey;
  secondary: AbilityKey;
} {
  const entries = Object.entries(choice.abilityBonuses ?? {}).filter(
    ([, v]) => typeof v === "number" && v > 0,
  ) as [AbilityKey, number][];
  if (entries.length >= 2) {
    return { primary: entries[0][0], secondary: entries[1][0] };
  }
  if (entries.length === 1) {
    const primary = entries[0][0];
    const secondary = primary === "strength" ? "constitution" : "strength";
    return { primary, secondary };
  }
  return { primary: "strength", secondary: "constitution" };
}

const STEPS = [
  "Identidade",
  "Raça",
  "Classe",
  "Atributos",
  "Antecedente",
  "Progressão",
  "Equipamento",
  "Revisão",
] as const;

const ABILITY_KEYS: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

function roll4d6DropLowest(): number {
  const rolls = [1, 2, 3, 4].map(() => 1 + Math.floor(Math.random() * 6));
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function asiLevelsUpTo(classId: string, level: number): number[] {
  return asiLevelsForClass(classId).filter((l) => l <= level);
}

export function CharacterWizardSection() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CharacterState>(() => {
    const base = createEmptyCharacterState();
    const classId = base.classes[0].classId;
    return {
      ...base,
      skillProficiencies: composeSkillProficiencies(
        base.raceId,
        base.subraceId,
        base.backgroundId,
        [],
      ),
      toolProficiencies: composeToolProficiencies(classId, base.backgroundId),
      saveProficiencies: getClass(classId)?.savingThrows ?? [],
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motmMode, setMotmMode] = useState<MotmAsiMode>("plus2plus1");
  const [asiDraft, setAsiDraft] = useState<AsiChoice[]>([]);
  const [featPicks, setFeatPicks] = useState<Record<string, Partial<Record<AbilityKey, number>>>>({});

  const race = getRace(state.raceId);
  const classDef = getClass(state.classes[0]?.classId ?? "fighter");
  const startingLevel = state.startingLevel;
  const scores = useMemo(() => finalAbilityScores(state), [state]);
  const grantedSkills = useMemo(
    () =>
      getGrantedSkillProficiencies(state.raceId, state.subraceId, state.backgroundId),
    [state.raceId, state.subraceId, state.backgroundId],
  );
  const grantedSkillSet = useMemo(() => new Set(grantedSkills), [grantedSkills]);
  const classSkillPicks = useMemo(
    () =>
      extractClassSkillPicks(
        state.skillProficiencies,
        state.classes[0]?.classId ?? "fighter",
        state.raceId,
        state.subraceId,
        state.backgroundId,
      ),
    [
      state.skillProficiencies,
      state.classes,
      state.raceId,
      state.subraceId,
      state.backgroundId,
    ],
  );

  useEffect(() => {
    if (!classDef) return;
    setState((prev) => ({
      ...prev,
      saveProficiencies: [...classDef.savingThrows],
    }));
  }, [classDef]);

  useEffect(() => {
    const classId = state.classes[0]?.classId ?? "fighter";
    const levels = asiLevelsUpTo(classId, startingLevel);
    setAsiDraft((prev) =>
      levels.map((level) => {
        const existing = prev.find((a) => a.level === level);
        return existing ?? { level, mode: "asi", abilityBonuses: { strength: 2 } };
      }),
    );
  }, [startingLevel, state.classes[0]?.classId]);

  function update(partial: Partial<CharacterState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function setStartingLevel(level: number) {
    const clamped = Math.min(20, Math.max(1, level));
    update({
      startingLevel: clamped,
      classes: [{ ...state.classes[0], level: clamped, hitDiceRolled: [] }],
    });
  }

  function canAdvanceFromStep(): boolean {
    if (step === 1 && race?.abilityScoreModel === "motm-floating") {
      return isMotmAsiValid(motmMode, state.motmAbilityBonuses);
    }
    if (step === 2 && classDef && startingLevel >= classDef.subclassLevel) {
      return Boolean(state.classes[0].subclassId);
    }
    if (step === 3 && state.abilityMethod === "pointBuy") {
      return isPointBuyValid(state.baseAbilities);
    }
    return true;
  }

  async function finish() {
    setSaving(true);
    setError(null);
    try {
      let next: CharacterState = {
        ...state,
        name: state.name.trim() || "Aventureiro",
        classes: [{ ...state.classes[0], level: startingLevel }],
        startingLevel,
        asiChoices: asiDraft,
        feats: [
          ...state.feats,
          ...asiDraft.filter((a) => a.mode === "feat" && a.featId).map((a) => a.featId!),
        ],
        featAbilityPicks: {
          ...state.featAbilityPicks,
          ...Object.fromEntries(
            asiDraft
              .filter((a) => a.mode === "feat" && a.featId)
              .map((a) => [a.featId!, a.featAbilityChoices ?? featPicks[a.featId!] ?? {}]),
          ),
        },
        abilityOverrides: { ...state.abilityOverrides },
      };

      for (const choice of asiDraft) {
        if (choice.mode === "asi" && choice.abilityBonuses) {
          for (const [k, v] of Object.entries(choice.abilityBonuses)) {
            const key = k as AbilityKey;
            next.abilityOverrides[key] = (next.abilityOverrides[key] ?? 0) + (v ?? 0);
          }
        }
      }

      next = syncDerivedHp(next);
      const classId = next.classes[0]?.classId ?? "fighter";
      const classPicks = extractClassSkillPicks(
        next.skillProficiencies,
        classId,
        next.raceId,
        next.subraceId,
        next.backgroundId,
      );
      next.skillProficiencies = composeSkillProficiencies(
        next.raceId,
        next.subraceId,
        next.backgroundId,
        classPicks,
      );
      next.toolProficiencies = composeToolProficiencies(classId, next.backgroundId);
      const record = await saveCharacter(next);
      router.push(`/characters/${record.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-crimson">Criar personagem</h1>
        <p className="mt-1 text-ink-muted">
          Assistente Cap. 1 + MotM/Tasha. Nível inicial e point buy validados.
        </p>
      </div>

      <ol className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`rounded-sm border px-2 py-1 font-display text-xs uppercase tracking-wide ${
                i === step
                  ? "border-crimson bg-crimson text-parchment"
                  : i < step
                    ? "border-gold text-gold"
                    : "border-frame text-ink-muted"
              }`}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <Panel title="Identidade e nível">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nome do personagem" value={state.name} onChange={(e) => update({ name: e.target.value })} />
            <Input
              label="Nome do jogador"
              value={state.playerName}
              onChange={(e) => update({ playerName: e.target.value })}
            />
            <Select
              label="Tendência"
              value={state.alignment}
              onChange={(e) => update({ alignment: e.target.value as Alignment })}
              options={Object.entries(ALIGNMENT_LABELS).map(([value, label]) => ({ value, label }))}
            />
            <Input
              label="Nível inicial (1–20)"
              type="number"
              min={1}
              max={20}
              value={startingLevel}
              onChange={(e) => setStartingLevel(Number(e.target.value))}
            />
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            PV acima do 1º nível usam a média do dado de vida. ASI/talentos dos níveis alcançados
            são escolhidos no passo Progressão.
          </p>
        </Panel>
      )}

      {step === 1 && (
        <Panel title="Raça">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Raça"
              value={state.raceId}
              onChange={(e) => {
                const raceId = e.target.value;
                const r = getRace(raceId);
                const subraceId = r?.subraces[0]?.id ?? null;
                const classId = state.classes[0]?.classId ?? "fighter";
                const classPicks = extractClassSkillPicks(
                  state.skillProficiencies,
                  classId,
                  state.raceId,
                  state.subraceId,
                  state.backgroundId,
                );
                update({
                  raceId,
                  subraceId,
                  languages: r?.languages ?? ["Comum"],
                  motmAbilityBonuses: {},
                  raceChoices: {},
                  chosenSize: r?.sizeOptions?.[0] ?? null,
                  customLineage: raceId === "custom-lineage",
                  skillProficiencies: composeSkillProficiencies(
                    raceId,
                    subraceId,
                    state.backgroundId,
                    classPicks,
                  ),
                });
              }}
              options={RACES.map((r) => ({
                value: r.id,
                label: `${r.name}${r.source === "motm" ? " (MotM)" : r.source === "tcoe" ? " (Tasha)" : ""}`,
              }))}
            />
            {race && race.subraces.length > 0 && (
              <Select
                label="Sub-raça"
                value={state.subraceId ?? ""}
                onChange={(e) => {
                  const subraceId = e.target.value || null;
                  const classId = state.classes[0]?.classId ?? "fighter";
                  const classPicks = extractClassSkillPicks(
                    state.skillProficiencies,
                    classId,
                    state.raceId,
                    state.subraceId,
                    state.backgroundId,
                  );
                  update({
                    subraceId,
                    skillProficiencies: composeSkillProficiencies(
                      state.raceId,
                      subraceId,
                      state.backgroundId,
                      classPicks,
                    ),
                  });
                }}
                options={race.subraces.map((s) => ({ value: s.id, label: s.name }))}
              />
            )}
            {race?.sizeOptions && race.sizeOptions.length > 1 && (
              <Select
                label="Tamanho"
                value={state.chosenSize ?? race.size}
                onChange={(e) =>
                  update({ chosenSize: e.target.value as CharacterState["chosenSize"] })
                }
                options={race.sizeOptions.map((s) => ({
                  value: s,
                  label: s === "small" ? "Pequeno" : "Médio",
                }))}
              />
            )}
          </div>
          {race && (
            <div className="mt-4 space-y-2 text-sm text-ink-muted">
              <p className="flex flex-wrap gap-2">
                <Badge tone="crimson">{race.source.toUpperCase()}</Badge>
                <Badge>
                  {state.chosenSize ?? race.size} · {race.speed} ft
                </Badge>
                {race.darkvision ? <Badge tone="gold">Visão no escuro {race.darkvision} ft</Badge> : null}
                {race.countsAs?.map((c) => (
                  <Badge key={c}>Conta como {c}</Badge>
                ))}
              </p>
              <ul className="list-disc pl-5">
                {race.traits.map((t) => (
                  <li key={t.id}>
                    <strong>{t.name}:</strong> {t.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {race?.choices?.map((choice) => (
            <Select
              key={choice.id}
              className="mt-3"
              label={choice.name}
              value={state.raceChoices[choice.id] ?? ""}
              onChange={(e) =>
                update({
                  raceChoices: { ...state.raceChoices, [choice.id]: e.target.value },
                })
              }
              options={[
                { value: "", label: "Escolher…" },
                ...choice.options.map((o) => ({ value: o.id, label: o.name })),
              ]}
            />
          ))}
          {race?.abilityScoreModel === "motm-floating" && (
            <MotmAsiPicker
              mode={motmMode}
              onModeChange={setMotmMode}
              bonuses={state.motmAbilityBonuses}
              onChange={(motmAbilityBonuses) => update({ motmAbilityBonuses })}
            />
          )}
          {race?.abilityScoreModel === "fixed" && (
            <label className="mt-4 flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(state.originCustomization)}
                onChange={(e) => {
                  if (!e.target.checked) {
                    update({ originCustomization: null });
                    return;
                  }
                  update({
                    originCustomization: {
                      remappedAbilityBonuses: { ...(race.abilityBonuses ?? {}) },
                    },
                  });
                }}
              />
              <span>
                Customizar origem (Tasha): redistribuir os mesmos bônus raciais entre atributos
                (edite após marcar — por padrão copia os bônus originais).
              </span>
            </label>
          )}
        </Panel>
      )}

      {step === 2 && classDef && (
        <Panel title="Classe">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Classe"
              value={state.classes[0].classId}
              onChange={(e) => {
                const classId = e.target.value;
                const def = getClass(classId);
                update({
                  classes: [
                    {
                      classId,
                      subclassId: null,
                      level: startingLevel,
                      hitDiceRolled: [],
                    },
                  ],
                  saveProficiencies: def?.savingThrows ?? [],
                  skillProficiencies: composeSkillProficiencies(
                    state.raceId,
                    state.subraceId,
                    state.backgroundId,
                    [],
                  ),
                  optionalFeatureIds: [],
                  toolProficiencies: composeToolProficiencies(classId, state.backgroundId),
                });
              }}
              options={CLASSES.map((c) => ({
                value: c.id,
                label: `${c.name}${c.source === "tcoe" ? " (Tasha)" : ""}`,
              }))}
            />
            {startingLevel >= classDef.subclassLevel && (
              <Select
                label={`Subclasse${startingLevel >= classDef.subclassLevel ? " (obrigatória)" : ""}`}
                value={state.classes[0].subclassId ?? ""}
                onChange={(e) =>
                  update({
                    classes: [{ ...state.classes[0], subclassId: e.target.value || null }],
                  })
                }
                options={[
                  { value: "", label: "Escolher…" },
                  ...classDef.subclasses.map((s) => ({
                    value: s.id,
                    label: `${s.name}${
                      s.source === "tcoe"
                        ? " (Tasha)"
                        : s.source === "xgte"
                          ? " (Xanathar)"
                          : ""
                    }`,
                  })),
                ]}
              />
            )}
          </div>
          {(() => {
            const sub = classDef.subclasses.find(
              (s) => s.id === state.classes[0].subclassId,
            );
            return sub?.description ? (
              <p className="mt-2 text-sm text-ink-muted">{sub.description}</p>
            ) : null;
          })()}
          <p className="mt-3 text-sm text-ink-muted">
            d{classDef.hitDie} · Nível {startingLevel} · Salvaguardas:{" "}
            {classDef.savingThrows.map((s) => ABILITY_LABELS[s]).join(", ")}.
          </p>
          <div className="mt-4">
            <p className="font-display text-xs uppercase tracking-widest text-crimson">
              Perícias (escolha {classDef.skillChoices.choose})
            </p>
            {grantedSkills.length > 0 && (
              <p className="mt-2 text-xs text-ink-muted">
                Já concedidas por raça/antecedente:{" "}
                {grantedSkills.map((s) => SKILL_META[s].label).join(", ")}.
              </p>
            )}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {classDef.skillChoices.from.map((skill) => {
                const locked = grantedSkillSet.has(skill);
                const checked = state.skillProficiencies.includes(skill);
                const atCap = classSkillPicks.length >= classDef.skillChoices.choose;
                return (
                  <label key={skill} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={locked || (!checked && atCap)}
                      onChange={() => {
                        if (locked) return;
                        const nextPicks = checked
                          ? classSkillPicks.filter((s) => s !== skill)
                          : [...classSkillPicks, skill];
                        update({
                          skillProficiencies: composeSkillProficiencies(
                            state.raceId,
                            state.subraceId,
                            state.backgroundId,
                            nextPicks,
                          ),
                        });
                      }}
                    />
                    {SKILL_META[skill].label}
                    {locked ? (
                      <span className="text-xs text-ink-muted">(raça/antecedente)</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>
          {classDef.optionalFeatures && classDef.optionalFeatures.length > 0 && (
            <div className="mt-4">
              <p className="font-display text-xs uppercase tracking-widest text-crimson">
                Características opcionais (Tasha)
              </p>
              <div className="mt-2 space-y-2">
                {classDef.optionalFeatures
                  .filter((f) => f.level <= startingLevel)
                  .map((f) => {
                    const id = f.id ?? f.name;
                    const checked = state.optionalFeatureIds.includes(id);
                    return (
                      <label key={id} className="flex items-start gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={checked}
                          onChange={() =>
                            update({
                              optionalFeatureIds: checked
                                ? state.optionalFeatureIds.filter((x) => x !== id)
                                : [...state.optionalFeatureIds, id],
                            })
                          }
                        />
                        <span>
                          <strong>
                            {f.level} — {f.name}
                          </strong>
                          : {f.description}
                          {f.replaces ? ` (substitui ${f.replaces})` : ""}
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>
          )}
          <ClassFlavorPanel
            classId={classDef.id}
            backstory={state.backstory}
            onAppend={(text) => update({ backstory: text })}
          />
        </Panel>
      )}

      {step === 3 && (
        <Panel title="Atributos">
          <Select
            label="Método"
            value={state.abilityMethod}
            onChange={(e) => {
              const method = e.target.value as AbilityMethod;
              if (method === "standardArray") {
                update({
                  abilityMethod: method,
                  baseAbilities: {
                    strength: 15,
                    dexterity: 14,
                    constitution: 13,
                    intelligence: 12,
                    wisdom: 10,
                    charisma: 8,
                  },
                });
              } else if (method === "pointBuy") {
                update({
                  abilityMethod: method,
                  baseAbilities: {
                    strength: 8,
                    dexterity: 8,
                    constitution: 8,
                    intelligence: 8,
                    wisdom: 8,
                    charisma: 8,
                  },
                });
              } else {
                update({ abilityMethod: method });
              }
            }}
            options={[
              { value: "standardArray", label: "Array padrão (15,14,13,12,10,8)" },
              { value: "pointBuy", label: "Compra de pontos (27)" },
              { value: "roll4d6", label: "4d6 descartando o menor" },
            ]}
          />
          {state.abilityMethod === "pointBuy" ? (
            <div className="mt-4">
              <PointBuyPanel
                baseAbilities={state.baseAbilities}
                finalScores={scores}
                onChange={(baseAbilities) => update({ baseAbilities })}
              />
            </div>
          ) : (
            <>
              {state.abilityMethod === "roll4d6" && (
                <Button
                  type="button"
                  className="mt-3"
                  variant="secondary"
                  onClick={() =>
                    update({
                      baseAbilities: {
                        strength: roll4d6DropLowest(),
                        dexterity: roll4d6DropLowest(),
                        constitution: roll4d6DropLowest(),
                        intelligence: roll4d6DropLowest(),
                        wisdom: roll4d6DropLowest(),
                        charisma: roll4d6DropLowest(),
                      },
                    })
                  }
                >
                  Rolar atributos
                </Button>
              )}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {ABILITY_KEYS.map((key) => (
                  <div key={key} className="rounded-sm border border-frame p-3">
                    <p className="font-display text-sm text-crimson">{ABILITY_LABELS[key]}</p>
                    <input
                      type="number"
                      min={3}
                      max={18}
                      className="mt-1 w-full border border-frame bg-parchment p-1"
                      value={state.baseAbilities[key]}
                      onChange={(e) =>
                        update({
                          baseAbilities: {
                            ...state.baseAbilities,
                            [key]: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <p className="mt-1 text-xs text-ink-muted">
                      Final {scores[key]} ({abilityModifier(scores[key]) >= 0 ? "+" : ""}
                      {abilityModifier(scores[key])})
                    </p>
                  </div>
                ))}
              </div>
              {state.abilityMethod === "standardArray" && (
                <p className="mt-2 text-xs text-ink-muted">
                  Array: {STANDARD_ARRAY.join(", ")} — ajuste os valores acima para redistribuir.
                </p>
              )}
            </>
          )}
        </Panel>
      )}

      {step === 4 && (
        <Panel title="Antecedente e personalidade">
          <Select
            label="Antecedente"
            value={state.backgroundId}
            onChange={(e) => {
              const backgroundId = e.target.value;
              const classId = state.classes[0]?.classId ?? "fighter";
              const classPicks = extractClassSkillPicks(
                state.skillProficiencies,
                classId,
                state.raceId,
                state.subraceId,
                state.backgroundId,
              );
              update({
                backgroundId,
                skillProficiencies: composeSkillProficiencies(
                  state.raceId,
                  state.subraceId,
                  backgroundId,
                  classPicks,
                ),
                toolProficiencies: composeToolProficiencies(classId, backgroundId),
              });
            }}
            options={BACKGROUNDS.map((b) => ({ value: b.id, label: b.name }))}
          />
          {(() => {
            const bg = getBackground(state.backgroundId);
            if (!bg) return null;
            const racialSkills = getRacialSkillProficiencies(state.raceId, state.subraceId);
            const bgSkills = getBackgroundSkillProficiencies(state.backgroundId);
            return (
              <div className="mt-4 space-y-3 text-sm text-ink-muted">
                <p>{bg.description}</p>
                <p>
                  Perícias do antecedente:{" "}
                  <strong>{bgSkills.map((s) => SKILL_META[s].label).join(", ") || "nenhuma"}</strong>
                  {racialSkills.length > 0 ? (
                    <>
                      {" "}
                      · Raça:{" "}
                      <strong>{racialSkills.map((s) => SKILL_META[s].label).join(", ")}</strong>
                    </>
                  ) : null}
                </p>
                <p>
                  <strong>{bg.feature.name}:</strong> {bg.feature.description}
                </p>
                {(
                  [
                    ["traits", "Traço", bg.personalityTraits],
                    ["ideals", "Ideal", bg.ideals],
                    ["bonds", "Vínculo", bg.bonds],
                    ["flaws", "Defeito", bg.flaws],
                  ] as const
                ).map(([key, label, opts]) => (
                  <Select
                    key={key}
                    label={label}
                    value={state.personality[key][0] ?? ""}
                    onChange={(e) =>
                      update({
                        personality: { ...state.personality, [key]: [e.target.value] },
                      })
                    }
                    options={[
                      { value: "", label: "Escolher..." },
                      ...opts.map((t) => ({ value: t, label: t })),
                    ]}
                  />
                ))}
                <LifePathPanel
                  raceId={state.raceId}
                  backgroundId={state.backgroundId}
                  classId={state.classes[0]?.classId}
                  chaMod={abilityModifier(scores.charisma)}
                  backstory={state.backstory}
                  onAppend={(text) => update({ backstory: text })}
                />
                <div className="mt-4">
                  <p className="font-display text-xs uppercase tracking-widest text-crimson">
                    Ferramentas
                  </p>
                  <ToolProficienciesPanel
                    className="mt-2"
                    tools={state.toolProficiencies}
                    extraHints={classDef?.toolProficiencies}
                  />
                </div>
              </div>
            );
          })()}
        </Panel>
      )}

      {step === 5 && (
        <Panel title="Progressão (ASI / talentos)">
          {asiDraft.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Nível {startingLevel}: nenhum ASI automático neste nível. Você pode avançar.
            </p>
          ) : (
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-ink-muted">
                Nos níveis em que a classe concede Aumento no Valor de Habilidade, escolha{" "}
                <strong className="text-ink">+2 em um atributo</strong>,{" "}
                <strong className="text-ink">+1 em dois atributos</strong>, ou um{" "}
                <strong className="text-ink">talento</strong> no lugar disso.
              </p>
              {asiDraft.map((choice, idx) => {
                const panelMode = panelModeFromChoice(choice);
                const { primary, secondary } = abilitiesFromChoice(choice);
                return (
                  <AsiChoicePanel
                    key={choice.level}
                    heading={`Nível ${choice.level}`}
                    helpText="Escolha exatamente uma das opções. O benefício é aplicado ao criar a ficha."
                    mode={panelMode}
                    onModeChange={(mode) => {
                      setAsiDraft((prev) =>
                        prev.map((a, i) => {
                          if (i !== idx) return a;
                          if (mode === "feat" || mode === "none") {
                            return {
                              ...a,
                              mode: "feat",
                              featId: a.featId ?? FEATS[0]?.id,
                              abilityBonuses: undefined,
                            };
                          }
                          let second = secondary;
                          if (mode === "asi1x2" && second === primary) {
                            second = primary === "strength" ? "constitution" : "strength";
                          }
                          const bonuses = asiBonusesFromPanel(mode, primary, second);
                          return {
                            ...a,
                            mode: "asi",
                            featId: undefined,
                            abilityBonuses: bonuses ?? { [primary]: 2 },
                          };
                        }),
                      );
                    }}
                    abilityPrimary={primary}
                    onAbilityPrimaryChange={(key) => {
                      setAsiDraft((prev) =>
                        prev.map((a, i) => {
                          if (i !== idx || a.mode !== "asi") return a;
                          const mode = panelModeFromChoice(a);
                          const { secondary: sec } = abilitiesFromChoice(a);
                          return {
                            ...a,
                            abilityBonuses:
                              asiBonusesFromPanel(mode === "asi1x2" ? "asi1x2" : "asi2", key, sec) ??
                              { [key]: 2 },
                          };
                        }),
                      );
                    }}
                    abilitySecondary={secondary}
                    onAbilitySecondaryChange={(key) => {
                      setAsiDraft((prev) =>
                        prev.map((a, i) => {
                          if (i !== idx || a.mode !== "asi") return a;
                          const { primary: prim } = abilitiesFromChoice(a);
                          return {
                            ...a,
                            abilityBonuses:
                              asiBonusesFromPanel("asi1x2", prim, key) ?? {
                                [prim]: 1,
                                [key]: 1,
                              },
                          };
                        }),
                      );
                    }}
                    featId={choice.featId ?? FEATS[0]?.id ?? "alert"}
                    onFeatIdChange={(featId) =>
                      setAsiDraft((prev) =>
                        prev.map((a, i) => (i === idx ? { ...a, featId } : a)),
                      )
                    }
                    featAbilityPicks={featPicks[choice.featId ?? ""] ?? {}}
                    onFeatAbilityPicksChange={(picks) => {
                      const featId = choice.featId ?? FEATS[0]?.id ?? "alert";
                      setFeatPicks((prev) => ({ ...prev, [featId]: picks }));
                      setAsiDraft((prev) =>
                        prev.map((a, i) =>
                          i === idx ? { ...a, featAbilityChoices: picks } : a,
                        ),
                      );
                    }}
                    raceId={state.raceId}
                    subraceId={state.subraceId}
                  />
                );
              })}
            </div>
          )}
        </Panel>
      )}

      {step === 6 && (
        <Panel title="Equipamento e riqueza">
          <EquipmentStepPanel
            state={state}
            onChange={(partial) => {
              if ("schemaVersion" in partial && partial.schemaVersion) {
                setState(partial as CharacterState);
              } else {
                update(partial as Partial<CharacterState>);
              }
            }}
          />
        </Panel>
      )}

      {step === 7 && (
        <Panel title="Revisão">
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-crimson">Nome</dt>
              <dd>{state.name || "—"}</dd>
            </div>
            <div>
              <dt className="text-crimson">Raça</dt>
              <dd>
                {race?.name}
                {state.subraceId ? ` (${getSubrace(state.raceId, state.subraceId)?.name})` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-crimson">Classe</dt>
              <dd>
                {classDef?.name} {startingLevel}
                {state.classes[0].subclassId
                  ? ` — ${classDef?.subclasses.find((s) => s.id === state.classes[0].subclassId)?.name}`
                  : ""}
              </dd>
            </div>
            <div>
              <dt className="text-crimson">Antecedente</dt>
              <dd>{getBackground(state.backgroundId)?.name}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-crimson">Perícias</dt>
              <dd>
                {state.skillProficiencies.length === 0
                  ? "—"
                  : state.skillProficiencies.map((s) => SKILL_META[s].label).join(", ")}
              </dd>
            </div>
            <div>
              <dt className="text-crimson">Riqueza</dt>
              <dd>
                {state.currency.pp} platina · {state.currency.gp} PO · {state.currency.ep} PE ·{" "}
                {state.currency.sp} prata · {state.currency.cp} cobre
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-crimson">Inventário</dt>
              <dd>
                {state.inventory.length === 0
                  ? "—"
                  : state.inventory.map((i) => i.name).join("; ")}
              </dd>
            </div>
          </dl>
          <Textarea
            className="mt-4"
            label="História / aparência (opcional)"
            value={state.backstory}
            onChange={(e) => update({ backstory: e.target.value })}
          />
          <LifePathPanel
            raceId={state.raceId}
            backgroundId={state.backgroundId}
            classId={state.classes[0]?.classId}
            chaMod={abilityModifier(scores.charisma)}
            backstory={state.backstory}
            onAppend={(text) => update({ backstory: text })}
          />
          {error && <p className="mt-3 text-sm text-crimson">{error}</p>}
          <Button type="button" className="mt-4" disabled={saving} onClick={finish}>
            {saving ? "Salvando…" : "Salvar personagem"}
          </Button>
        </Panel>
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Voltar
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            disabled={!canAdvanceFromStep()}
            onClick={() => setStep((s) => s + 1)}
          >
            Próximo
          </Button>
        ) : (
          <Link href="/characters" className="font-display text-sm text-ink-muted underline">
            Cancelar
          </Link>
        )}
      </div>
    </div>
  );
}

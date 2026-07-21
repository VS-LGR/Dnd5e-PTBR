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
  ARMORS,
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
  type SkillKey,
} from "@/lib/character/types";
import { syncDerivedHp, asiLevelsForClass } from "@/lib/character/levelUp";
import { saveCharacter } from "@/lib/character/repository";
import { finalAbilityScores, abilityModifier } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { PointBuyPanel, isPointBuyValid } from "@/components/ui/PointBuyPanel";
import { MotmAsiPicker, isMotmAsiValid, type MotmAsiMode } from "@/components/ui/MotmAsiPicker";
import { FeatPicker } from "@/components/ui/FeatPicker";

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
  const [state, setState] = useState<CharacterState>(() => createEmptyCharacterState());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [motmMode, setMotmMode] = useState<MotmAsiMode>("plus2plus1");
  const [asiDraft, setAsiDraft] = useState<AsiChoice[]>([]);
  const [featPicks, setFeatPicks] = useState<Record<string, Partial<Record<AbilityKey, number>>>>({});

  const race = getRace(state.raceId);
  const classDef = getClass(state.classes[0]?.classId ?? "fighter");
  const startingLevel = state.startingLevel;
  const scores = useMemo(() => finalAbilityScores(state), [state]);

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
                update({
                  raceId,
                  subraceId: r?.subraces[0]?.id ?? null,
                  languages: r?.languages ?? ["Comum"],
                  motmAbilityBonuses: {},
                  raceChoices: {},
                  chosenSize: r?.sizeOptions?.[0] ?? null,
                  customLineage: raceId === "custom-lineage",
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
                onChange={(e) => update({ subraceId: e.target.value || null })}
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
                  skillProficiencies: [],
                  optionalFeatureIds: [],
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
                    label: `${s.name}${s.source === "tcoe" ? " (Tasha)" : ""}`,
                  })),
                ]}
              />
            )}
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            d{classDef.hitDie} · Nível {startingLevel} · Salvaguardas:{" "}
            {classDef.savingThrows.map((s) => ABILITY_LABELS[s]).join(", ")}.
          </p>
          <div className="mt-4">
            <p className="font-display text-xs uppercase tracking-widest text-crimson">
              Perícias (escolha {classDef.skillChoices.choose})
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {classDef.skillChoices.from.map((skill) => {
                const checked = state.skillProficiencies.includes(skill);
                const atCap =
                  state.skillProficiencies.filter((s) => classDef.skillChoices.from.includes(s))
                    .length >= classDef.skillChoices.choose;
                return (
                  <label key={skill} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!checked && atCap}
                      onChange={() => {
                        update({
                          skillProficiencies: checked
                            ? state.skillProficiencies.filter((s) => s !== skill)
                            : [...state.skillProficiencies, skill],
                        });
                      }}
                    />
                    {SKILL_META[skill].label}
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
              const bg = getBackground(e.target.value);
              update({
                backgroundId: e.target.value,
                skillProficiencies: [
                  ...new Set([...state.skillProficiencies, ...(bg?.skillProficiencies ?? [])]),
                ] as SkillKey[],
                toolProficiencies: bg?.toolProficiencies ?? [],
              });
            }}
            options={BACKGROUNDS.map((b) => ({ value: b.id, label: b.name }))}
          />
          {(() => {
            const bg = getBackground(state.backgroundId);
            if (!bg) return null;
            return (
              <div className="mt-4 space-y-3 text-sm text-ink-muted">
                <p>{bg.description}</p>
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
            <div className="space-y-4">
              {asiDraft.map((choice, idx) => (
                <div key={choice.level} className="rounded-sm border border-frame p-3">
                  <p className="font-display text-sm text-crimson">Nível {choice.level}</p>
                  <Select
                    label="Opção"
                    value={choice.mode}
                    onChange={(e) => {
                      const mode = e.target.value as "asi" | "feat";
                      setAsiDraft((prev) =>
                        prev.map((a, i) =>
                          i === idx
                            ? {
                                ...a,
                                mode,
                                featId: mode === "feat" ? FEATS[0]?.id : undefined,
                                abilityBonuses: mode === "asi" ? { strength: 2 } : undefined,
                              }
                            : a,
                        ),
                      );
                    }}
                    options={[
                      { value: "asi", label: "Melhoria de atributo" },
                      { value: "feat", label: "Talento" },
                    ]}
                  />
                  {choice.mode === "asi" ? (
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <Select
                        label="Atributo principal"
                        value={
                          (Object.entries(choice.abilityBonuses ?? {}).find(([, v]) => v)?.[0] as string) ??
                          "strength"
                        }
                        onChange={(e) => {
                          const key = e.target.value as AbilityKey;
                          const amount = Object.values(choice.abilityBonuses ?? {})[0] ?? 2;
                          setAsiDraft((prev) =>
                            prev.map((a, i) =>
                              i === idx ? { ...a, abilityBonuses: { [key]: amount } } : a,
                            ),
                          );
                        }}
                        options={ABILITY_KEYS.map((k) => ({
                          value: k,
                          label: ABILITY_LABELS[k],
                        }))}
                      />
                      <Select
                        label="Bônus"
                        value={String(Object.values(choice.abilityBonuses ?? {})[0] ?? 2)}
                        onChange={(e) => {
                          const amount = Number(e.target.value);
                          const key =
                            (Object.keys(choice.abilityBonuses ?? {})[0] as AbilityKey) || "strength";
                          setAsiDraft((prev) =>
                            prev.map((a, i) =>
                              i === idx ? { ...a, abilityBonuses: { [key]: amount } } : a,
                            ),
                          );
                        }}
                        options={[
                          { value: "2", label: "+2" },
                          { value: "1", label: "+1" },
                        ]}
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <FeatPicker
                        value={choice.featId ?? FEATS[0]?.id ?? "alert"}
                        onChange={(featId) =>
                          setAsiDraft((prev) =>
                            prev.map((a, i) => (i === idx ? { ...a, featId } : a)),
                          )
                        }
                        abilityPicks={featPicks[choice.featId ?? ""] ?? {}}
                        onAbilityPicksChange={(picks) => {
                          const featId = choice.featId ?? FEATS[0]?.id ?? "alert";
                          setFeatPicks((prev) => ({ ...prev, [featId]: picks }));
                          setAsiDraft((prev) =>
                            prev.map((a, i) =>
                              i === idx ? { ...a, featAbilityChoices: picks } : a,
                            ),
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {step === 6 && (
        <Panel title="Equipamento">
          <Select
            label="Armadura"
            value={state.armorId ?? ""}
            onChange={(e) => update({ armorId: e.target.value || null })}
            options={[
              { value: "", label: "Sem armadura" },
              ...ARMORS.filter((a) => a.category !== "shield").map((a) => ({
                value: a.id,
                label: a.name,
              })),
            ]}
          />
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.shieldEquipped}
              onChange={(e) => update({ shieldEquipped: e.target.checked })}
            />
            Escudo (+2 CA)
          </label>
          <Input
            className="mt-3"
            label="Ouro inicial (PO)"
            type="number"
            value={state.currency.gp}
            onChange={(e) => update({ currency: { ...state.currency, gp: Number(e.target.value) } })}
          />
          <Textarea
            className="mt-3"
            label="História / aparência (opcional)"
            value={state.backstory}
            onChange={(e) => update({ backstory: e.target.value })}
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
          </dl>
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

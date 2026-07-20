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
} from "@/config";
import { STANDARD_ARRAY, POINT_BUY_BUDGET, POINT_BUY_COST } from "@/config/tables/progression";
import { ABILITY_LABELS, ALIGNMENT_LABELS, SKILL_META } from "@/config/tables/labels";
import {
  createEmptyCharacterState,
  type AbilityKey,
  type AbilityMethod,
  type Alignment,
  type CharacterState,
  type SkillKey,
} from "@/lib/character/types";
import { syncDerivedHp } from "@/lib/character/levelUp";
import { saveCharacter } from "@/lib/character/repository";
import { finalAbilityScores, abilityModifier } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";

const STEPS = [
  "Identidade",
  "Raça",
  "Classe",
  "Atributos",
  "Antecedente",
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

export function CharacterWizardSection() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CharacterState>(() => createEmptyCharacterState());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arrayPool, setArrayPool] = useState<number[]>([...STANDARD_ARRAY]);

  const race = getRace(state.raceId);
  const classDef = getClass(state.classes[0]?.classId ?? "fighter");
  const scores = useMemo(() => finalAbilityScores(state), [state]);

  useEffect(() => {
    if (!classDef) return;
    setState((prev) => ({
      ...prev,
      saveProficiencies: [...classDef.savingThrows],
    }));
  }, [classDef]);

  function update(partial: Partial<CharacterState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  function pointBuySpent(): number {
    return ABILITY_KEYS.reduce((sum, key) => {
      const score = state.baseAbilities[key];
      return sum + (POINT_BUY_COST[score] ?? 99);
    }, 0);
  }

  async function finish() {
    setSaving(true);
    setError(null);
    try {
      const prepared = syncDerivedHp({
        ...state,
        name: state.name.trim() || "Aventureiro",
      });
      const record = await saveCharacter(prepared);
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
        <p className="mt-1 text-ink-muted">Assistente baseado no Capítulo 1 do Livro do Jogador.</p>
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
        <Panel title="Identidade">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nome do personagem"
              value={state.name}
              onChange={(e) => update({ name: e.target.value })}
            />
            <Input
              label="Nome do jogador"
              value={state.playerName}
              onChange={(e) => update({ playerName: e.target.value })}
            />
            <Select
              label="Tendência"
              value={state.alignment}
              onChange={(e) => update({ alignment: e.target.value as Alignment })}
              options={Object.entries(ALIGNMENT_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </div>
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
                });
              }}
              options={RACES.map((r) => ({ value: r.id, label: r.name }))}
            />
            {race && race.subraces.length > 0 && (
              <Select
                label="Sub-raça"
                value={state.subraceId ?? ""}
                onChange={(e) => update({ subraceId: e.target.value || null })}
                options={race.subraces.map((s) => ({ value: s.id, label: s.name }))}
              />
            )}
          </div>
          {race && (
            <div className="mt-4 space-y-2 text-sm text-ink-muted">
              <p>
                <Badge tone="crimson">{race.size}</Badge>{" "}
                <Badge>Deslocamento {race.speed} ft</Badge>
                {race.darkvision ? <Badge tone="gold">Visão no escuro {race.darkvision} ft</Badge> : null}
              </p>
              <ul className="list-disc pl-5">
                {race.traits.map((t) => (
                  <li key={t.id}>
                    <strong>{t.name}:</strong> {t.description}
                  </li>
                ))}
                {state.subraceId &&
                  getSubrace(state.raceId, state.subraceId)?.traits.map((t) => (
                    <li key={t.id}>
                      <strong>{t.name}:</strong> {t.description}
                    </li>
                  ))}
              </ul>
            </div>
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
                      level: 1,
                      hitDiceRolled: [],
                    },
                  ],
                  saveProficiencies: def?.savingThrows ?? [],
                  skillProficiencies: [],
                });
              }}
              options={CLASSES.map((c) => ({ value: c.id, label: c.name }))}
            />
            {classDef.subclassLevel === 1 && (
              <Select
                label="Subclasse"
                value={state.classes[0].subclassId ?? ""}
                onChange={(e) =>
                  update({
                    classes: [
                      {
                        ...state.classes[0],
                        subclassId: e.target.value || null,
                      },
                    ],
                  })
                }
                options={[
                  { value: "", label: "Escolher depois" },
                  ...classDef.subclasses.map((s) => ({ value: s.id, label: s.name })),
                ]}
              />
            )}
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            Dado de Vida d{classDef.hitDie}. Salvaguardas:{" "}
            {classDef.savingThrows.map((s) => ABILITY_LABELS[s]).join(", ")}.
          </p>
          <div className="mt-4">
            <p className="font-display text-xs uppercase tracking-widest text-crimson">
              Perícias da classe (escolha {classDef.skillChoices.choose})
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {classDef.skillChoices.from.map((skill) => {
                const checked = state.skillProficiencies.includes(skill);
                const atCap =
                  state.skillProficiencies.filter((s) =>
                    classDef.skillChoices.from.includes(s),
                  ).length >= classDef.skillChoices.choose;
                return (
                  <label key={skill} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!checked && atCap}
                      onChange={() => {
                        const next = checked
                          ? state.skillProficiencies.filter((s) => s !== skill)
                          : [...state.skillProficiencies, skill];
                        update({ skillProficiencies: next });
                      }}
                    />
                    {SKILL_META[skill].label}
                  </label>
                );
              })}
            </div>
          </div>
          <ul className="mt-4 list-disc pl-5 text-sm text-ink-muted">
            {classDef.features
              .filter((f) => f.level === 1)
              .map((f) => (
                <li key={f.name}>
                  <strong>{f.name}:</strong> {f.description}
                </li>
              ))}
          </ul>
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
                setArrayPool([...STANDARD_ARRAY]);
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
          {state.abilityMethod === "roll4d6" && (
            <Button
              type="button"
              className="mt-3"
              variant="secondary"
              onClick={() => {
                const rolled: CharacterState["baseAbilities"] = {
                  strength: roll4d6DropLowest(),
                  dexterity: roll4d6DropLowest(),
                  constitution: roll4d6DropLowest(),
                  intelligence: roll4d6DropLowest(),
                  wisdom: roll4d6DropLowest(),
                  charisma: roll4d6DropLowest(),
                };
                update({ baseAbilities: rolled });
              }}
            >
              Rolar atributos
            </Button>
          )}
          {state.abilityMethod === "pointBuy" && (
            <p className="mt-2 text-sm">
              Pontos gastos: {pointBuySpent()} / {POINT_BUY_BUDGET}
            </p>
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {ABILITY_KEYS.map((key) => (
              <div key={key} className="rounded-sm border border-frame p-3">
                <p className="font-display text-sm text-crimson">{ABILITY_LABELS[key]}</p>
                {state.abilityMethod === "pointBuy" ? (
                  <select
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
                  >
                    {[8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                ) : (
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
                )}
                <p className="mt-1 text-xs text-ink-muted">
                  Final {scores[key]} ({abilityModifier(scores[key]) >= 0 ? "+" : ""}
                  {abilityModifier(scores[key])})
                </p>
              </div>
            ))}
          </div>
          {state.abilityMethod === "standardArray" && (
            <p className="mt-2 text-xs text-ink-muted">
              Pool disponível: {arrayPool.join(", ") || "distribuída"}
            </p>
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
              const skills = bg?.skillProficiencies ?? [];
              update({
                backgroundId: e.target.value,
                skillProficiencies: [
                  ...new Set([...state.skillProficiencies, ...skills]),
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
                <Select
                  label="Traço de personalidade"
                  value={state.personality.traits[0] ?? ""}
                  onChange={(e) =>
                    update({
                      personality: { ...state.personality, traits: [e.target.value] },
                    })
                  }
                  options={[
                    { value: "", label: "Escolher..." },
                    ...bg.personalityTraits.map((t) => ({ value: t, label: t })),
                  ]}
                />
                <Select
                  label="Ideal"
                  value={state.personality.ideals[0] ?? ""}
                  onChange={(e) =>
                    update({
                      personality: { ...state.personality, ideals: [e.target.value] },
                    })
                  }
                  options={[
                    { value: "", label: "Escolher..." },
                    ...bg.ideals.map((t) => ({ value: t, label: t })),
                  ]}
                />
                <Select
                  label="Vínculo"
                  value={state.personality.bonds[0] ?? ""}
                  onChange={(e) =>
                    update({
                      personality: { ...state.personality, bonds: [e.target.value] },
                    })
                  }
                  options={[
                    { value: "", label: "Escolher..." },
                    ...bg.bonds.map((t) => ({ value: t, label: t })),
                  ]}
                />
                <Select
                  label="Defeito"
                  value={state.personality.flaws[0] ?? ""}
                  onChange={(e) =>
                    update({
                      personality: { ...state.personality, flaws: [e.target.value] },
                    })
                  }
                  options={[
                    { value: "", label: "Escolher..." },
                    ...bg.flaws.map((t) => ({ value: t, label: t })),
                  ]}
                />
              </div>
            );
          })()}
        </Panel>
      )}

      {step === 5 && (
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
            onChange={(e) =>
              update({ currency: { ...state.currency, gp: Number(e.target.value) } })
            }
          />
          {classDef && (
            <ul className="mt-3 list-disc pl-5 text-sm text-ink-muted">
              {classDef.startingEquipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <Textarea
            className="mt-3"
            label="História / aparência (opcional)"
            value={state.backstory}
            onChange={(e) => update({ backstory: e.target.value })}
          />
        </Panel>
      )}

      {step === 6 && (
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
                {classDef?.name} 1
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
          <Button type="button" onClick={() => setStep((s) => s + 1)}>
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

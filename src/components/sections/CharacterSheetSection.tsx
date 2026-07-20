"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getClass,
  getRace,
  getSubrace,
  getBackground,
  getSpell,
  ARMORS,
} from "@/config";
import { ABILITY_LABELS, SKILL_META, ALIGNMENT_LABELS } from "@/config/tables/labels";
import type { AbilityKey, CharacterState, SkillKey } from "@/lib/character/types";
import { classSummary } from "@/lib/character/levelUp";
import {
  deleteCharacter,
  getCharacter,
  saveCharacter,
  type CharacterRecord,
} from "@/lib/character/repository";
import { derivedSheet, skillBonus, saveBonus } from "@/lib/rules";
import { availableSpellsForCharacter } from "@/lib/spells";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Panel, Tabs, Badge } from "@/components/ui/Panel";
import { useRouter } from "next/navigation";

const SKILLS = Object.keys(SKILL_META) as SkillKey[];
const ABILITIES = Object.keys(ABILITY_LABELS) as AbilityKey[];

export interface CharacterSheetSectionProps {
  characterId: string;
}

export function CharacterSheetSection({ characterId }: CharacterSheetSectionProps) {
  const router = useRouter();
  const [record, setRecord] = useState<CharacterRecord | null>(null);
  const [tab, setTab] = useState("combat");
  const [saving, setSaving] = useState(false);
  const [spellQuery, setSpellQuery] = useState("");
  const [selectedSpell, setSelectedSpell] = useState<string | null>(null);

  useEffect(() => {
    void getCharacter(characterId).then(setRecord);
  }, [characterId]);

  const state = record?.data;
  const derived = useMemo(() => (state ? derivedSheet(state) : null), [state]);

  const updateState = useCallback((updater: (prev: CharacterState) => CharacterState) => {
    setRecord((prev) => {
      if (!prev) return prev;
      return { ...prev, data: updater(prev.data), name: updater(prev.data).name };
    });
  }, []);

  async function persist() {
    if (!record) return;
    setSaving(true);
    try {
      const saved = await saveCharacter(record.data, record.id);
      setRecord(saved);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Excluir este personagem?")) return;
    await deleteCharacter(characterId);
    router.push("/characters");
  }

  if (!record || !state || !derived) {
    return <p className="text-ink-muted">Carregando ficha…</p>;
  }

  const race = getRace(state.raceId);
  const bg = getBackground(state.backgroundId);
  const available = availableSpellsForCharacter(state).filter(
    (s) =>
      !spellQuery ||
      s!.name.toLowerCase().includes(spellQuery.toLowerCase()) ||
      s!.id.includes(spellQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-crimson">{state.name}</h1>
          <p className="text-ink-muted">
            {race?.name}
            {state.subraceId ? ` (${getSubrace(state.raceId, state.subraceId)?.name})` : ""} ·{" "}
            {classSummary(state.classes)} · Nível {derived.level} · {bg?.name} ·{" "}
            {ALIGNMENT_LABELS[state.alignment]}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/characters/${characterId}/level-up`}>
            <Button type="button" variant="secondary">
              Subir de nível
            </Button>
          </Link>
          <Button type="button" onClick={persist} disabled={saving}>
            {saving ? "Salvando…" : "Salvar"}
          </Button>
          <Button type="button" variant="danger" onClick={remove}>
            Excluir
          </Button>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: "combat", label: "Combate" },
          { id: "story", label: "Narrativa" },
          { id: "spells", label: "Magias" },
        ]}
        activeId={tab}
        onChange={setTab}
      />

      {tab === "combat" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Atributos" className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-2">
              {ABILITIES.map((key) => (
                <div key={key} className="rounded-sm border border-frame p-2 text-center">
                  <p className="font-display text-xs uppercase text-crimson">
                    {ABILITY_LABELS[key]}
                  </p>
                  <p className="text-2xl font-display text-ink">{derived.scores[key]}</p>
                  <p className="text-sm text-ink-muted">
                    {derived.modifiers[key] >= 0 ? "+" : ""}
                    {derived.modifiers[key]}
                  </p>
                  <p className="text-xs">
                    Salv. {saveBonus(state, key) >= 0 ? "+" : ""}
                    {saveBonus(state, key)}
                    {state.saveProficiencies.includes(key) ? " ●" : ""}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Badge tone="crimson">PB +{derived.proficiencyBonus}</Badge>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={state.inspiration}
                  onChange={(e) =>
                    updateState((s) => ({ ...s, inspiration: e.target.checked }))
                  }
                />
                Inspiração
              </label>
            </div>
          </Panel>

          <Panel title="Combate" className="lg:col-span-1">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-sm border border-frame p-2">
                <p className="text-xs text-crimson">CA</p>
                <p className="font-display text-2xl">{derived.armorClass}</p>
              </div>
              <div className="rounded-sm border border-frame p-2">
                <p className="text-xs text-crimson">Inic.</p>
                <p className="font-display text-2xl">
                  {derived.initiative >= 0 ? "+" : ""}
                  {derived.initiative}
                </p>
              </div>
              <div className="rounded-sm border border-frame p-2">
                <p className="text-xs text-crimson">Desloc.</p>
                <p className="font-display text-2xl">{derived.speed}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Input
                label="PV atuais"
                type="number"
                value={state.hp.current}
                onChange={(e) =>
                  updateState((s) => ({
                    ...s,
                    hp: { ...s.hp, current: Number(e.target.value) },
                  }))
                }
              />
              <Input
                label="PV máx"
                type="number"
                value={derived.maxHp}
                readOnly
              />
              <Input
                label="PV temp"
                type="number"
                value={state.hp.temporary}
                onChange={(e) =>
                  updateState((s) => ({
                    ...s,
                    hp: { ...s.hp, temporary: Number(e.target.value) },
                  }))
                }
              />
            </div>
            <Select
              className="mt-3"
              label="Armadura"
              value={state.armorId ?? ""}
              onChange={(e) =>
                updateState((s) => ({ ...s, armorId: e.target.value || null }))
              }
              options={[
                { value: "", label: "Sem armadura" },
                ...ARMORS.filter((a) => a.category !== "shield").map((a) => ({
                  value: a.id,
                  label: a.name,
                })),
              ]}
            />
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={state.shieldEquipped}
                onChange={(e) =>
                  updateState((s) => ({ ...s, shieldEquipped: e.target.checked }))
                }
              />
              Escudo
            </label>
            <div className="mt-3 flex gap-4 text-sm">
              <div>
                Sucessos mortais:{" "}
                {[0, 1, 2].map((i) => (
                  <input
                    key={`s${i}`}
                    type="checkbox"
                    className="ml-1"
                    checked={state.deathSaves.successes > i}
                    onChange={() =>
                      updateState((s) => ({
                        ...s,
                        deathSaves: {
                          ...s.deathSaves,
                          successes: s.deathSaves.successes > i ? i : i + 1,
                        },
                      }))
                    }
                  />
                ))}
              </div>
              <div>
                Falhas:{" "}
                {[0, 1, 2].map((i) => (
                  <input
                    key={`f${i}`}
                    type="checkbox"
                    className="ml-1"
                    checked={state.deathSaves.failures > i}
                    onChange={() =>
                      updateState((s) => ({
                        ...s,
                        deathSaves: {
                          ...s.deathSaves,
                          failures: s.deathSaves.failures > i ? i : i + 1,
                        },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Perícias" className="lg:col-span-1">
            <ul className="max-h-96 space-y-1 overflow-y-auto text-sm">
              {SKILLS.map((skill) => {
                const bonus = skillBonus(state, skill);
                const prof = state.skillProficiencies.includes(skill);
                const exp = state.skillExpertise.includes(skill);
                return (
                  <li key={skill} className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={prof}
                        onChange={() =>
                          updateState((s) => ({
                            ...s,
                            skillProficiencies: prof
                              ? s.skillProficiencies.filter((x) => x !== skill)
                              : [...s.skillProficiencies, skill],
                          }))
                        }
                      />
                      <span className={exp ? "font-semibold" : ""}>
                        {SKILL_META[skill].label}
                      </span>
                    </label>
                    <span>
                      {bonus >= 0 ? "+" : ""}
                      {bonus}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-sm">
              Percepção passiva: <strong>{derived.passivePerception}</strong>
            </p>
          </Panel>

          <Panel title="Características" className="lg:col-span-3">
            <ul className="columns-1 gap-4 text-sm md:columns-2">
              {state.classes.flatMap((cls) => {
                const def = getClass(cls.classId);
                if (!def) return [];
                return def.features
                  .filter((f) => f.level <= cls.level)
                  .map((f) => (
                    <li key={`${cls.classId}-${f.level}-${f.name}`} className="mb-2 break-inside-avoid">
                      <strong>
                        {def.name} {f.level} — {f.name}:
                      </strong>{" "}
                      {f.description}
                    </li>
                  ));
              })}
            </ul>
          </Panel>
        </div>
      )}

      {tab === "story" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Aparência">
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["age", "Idade"],
                  ["height", "Altura"],
                  ["weight", "Peso"],
                  ["eyes", "Olhos"],
                  ["skin", "Pele"],
                  ["hair", "Cabelo"],
                ] as const
              ).map(([key, label]) => (
                <Input
                  key={key}
                  label={label}
                  value={state.appearance[key]}
                  onChange={(e) =>
                    updateState((s) => ({
                      ...s,
                      appearance: { ...s.appearance, [key]: e.target.value },
                    }))
                  }
                />
              ))}
            </div>
            <Textarea
              className="mt-3"
              label="Descrição"
              value={state.appearance.description}
              onChange={(e) =>
                updateState((s) => ({
                  ...s,
                  appearance: { ...s.appearance, description: e.target.value },
                }))
              }
            />
          </Panel>
          <Panel title="História e personalidade">
            <Textarea
              label="História"
              value={state.backstory}
              onChange={(e) => updateState((s) => ({ ...s, backstory: e.target.value }))}
            />
            <Textarea
              className="mt-3"
              label="Aliados e organizações"
              value={state.allies}
              onChange={(e) => updateState((s) => ({ ...s, allies: e.target.value }))}
            />
            <Textarea
              className="mt-3"
              label="Tesouro"
              value={state.treasure}
              onChange={(e) => updateState((s) => ({ ...s, treasure: e.target.value }))}
            />
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Traços:</strong> {state.personality.traits.join("; ") || "—"}
              </p>
              <p>
                <strong>Ideais:</strong> {state.personality.ideals.join("; ") || "—"}
              </p>
              <p>
                <strong>Vínculos:</strong> {state.personality.bonds.join("; ") || "—"}
              </p>
              <p>
                <strong>Defeitos:</strong> {state.personality.flaws.join("; ") || "—"}
              </p>
            </div>
          </Panel>
        </div>
      )}

      {tab === "spells" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Conjuração" className="lg:col-span-1">
            <p className="text-sm">
              DC: <strong>{derived.spellSaveDc ?? "—"}</strong>
            </p>
            <p className="text-sm">
              Ataque mágico:{" "}
              <strong>
                {derived.spellAttackBonus != null
                  ? `${derived.spellAttackBonus >= 0 ? "+" : ""}${derived.spellAttackBonus}`
                  : "—"}
              </strong>
            </p>
            <div className="mt-3">
              <p className="font-display text-xs uppercase text-crimson">Espaços de magia</p>
              <ul className="mt-1 space-y-1 text-sm">
                {derived.spellSlots.map((total, i) =>
                  total > 0 ? (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span>Nível {i + 1}</span>
                      <span>
                        usados{" "}
                        <input
                          type="number"
                          min={0}
                          max={total}
                          className="w-12 border border-frame bg-parchment px-1"
                          value={state.spells.slots.used[i + 1] ?? 0}
                          onChange={(e) =>
                            updateState((s) => {
                              const used = [...s.spells.slots.used];
                              used[i + 1] = Number(e.target.value);
                              return {
                                ...s,
                                spells: {
                                  ...s.spells,
                                  slots: { ...s.spells.slots, used },
                                },
                              };
                            })
                          }
                        />{" "}
                        / {total}
                      </span>
                    </li>
                  ) : null,
                )}
              </ul>
              {derived.pactMagic.slotCount > 0 && (
                <p className="mt-2 text-sm">
                  Pactos (nível {derived.pactMagic.slotLevel}): {state.spells.slots.pactUsed} /{" "}
                  {derived.pactMagic.slotCount}
                </p>
              )}
            </div>
            <div className="mt-4">
              <p className="font-display text-xs uppercase text-crimson">Truques</p>
              <ul className="text-sm">
                {state.spells.cantrips.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      className="text-left underline"
                      onClick={() => setSelectedSpell(id)}
                    >
                      {getSpell(id)?.name ?? id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-display text-xs uppercase text-crimson">Conhecidas / preparadas</p>
              <ul className="text-sm">
                {[...new Set([...state.spells.known, ...state.spells.prepared])].map((id) => (
                  <li key={id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={state.spells.prepared.includes(id)}
                      onChange={() =>
                        updateState((s) => ({
                          ...s,
                          spells: {
                            ...s.spells,
                            prepared: s.spells.prepared.includes(id)
                              ? s.spells.prepared.filter((x) => x !== id)
                              : [...s.spells.prepared, id],
                          },
                        }))
                      }
                    />
                    <button type="button" className="underline" onClick={() => setSelectedSpell(id)}>
                      {getSpell(id)?.name ?? id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel title="Adicionar magia" className="lg:col-span-2">
            <Input
              label="Buscar na lista da classe"
              value={spellQuery}
              onChange={(e) => setSpellQuery(e.target.value)}
            />
            <ul className="mt-3 max-h-80 space-y-1 overflow-y-auto text-sm">
              {available.map((spell) =>
                spell ? (
                  <li key={spell.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-frame/40 py-1">
                    <button
                      type="button"
                      className="text-left font-medium underline"
                      onClick={() => setSelectedSpell(spell.id)}
                    >
                      {spell.name}{" "}
                      <span className="text-ink-muted">
                        ({spell.level === 0 ? "Truque" : `${spell.level}º`})
                      </span>
                    </button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="!px-2 !py-1 text-xs"
                      onClick={() =>
                        updateState((s) => {
                          if (spell.level === 0) {
                            if (s.spells.cantrips.includes(spell.id)) return s;
                            return {
                              ...s,
                              spells: {
                                ...s.spells,
                                cantrips: [...s.spells.cantrips, spell.id],
                              },
                            };
                          }
                          if (s.spells.known.includes(spell.id)) return s;
                          return {
                            ...s,
                            spells: {
                              ...s.spells,
                              known: [...s.spells.known, spell.id],
                            },
                          };
                        })
                      }
                    >
                      Adicionar
                    </Button>
                  </li>
                ) : null,
              )}
            </ul>
            {selectedSpell && getSpell(selectedSpell) && (
              <div className="mt-4 rounded-sm border-2 border-crimson/40 bg-parchment p-3 text-sm">
                {(() => {
                  const spell = getSpell(selectedSpell)!;
                  return (
                    <>
                      <h3 className="font-display text-lg text-crimson">{spell.name}</h3>
                      <p className="text-ink-muted">
                        {spell.level === 0 ? "Truque" : `${spell.level}º nível`} · {spell.school}
                        {spell.ritual ? " · ritual" : ""}
                        {spell.concentration ? " · concentração" : ""}
                      </p>
                      <p className="mt-1">
                        {spell.castingTime} · {spell.range} ·{" "}
                        {[spell.components.v && "V", spell.components.s && "S", spell.components.m && `M (${spell.components.m})`]
                          .filter(Boolean)
                          .join(", ")}{" "}
                        · {spell.duration}
                      </p>
                      <p className="mt-2">{spell.description}</p>
                      {spell.higherLevels && (
                        <p className="mt-2 italic">{spell.higherLevels}</p>
                      )}
                      <Link
                        href={`/spells/${spell.id}`}
                        className="mt-2 inline-block text-crimson underline"
                      >
                        Abrir página da magia
                      </Link>
                    </>
                  );
                })()}
              </div>
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}

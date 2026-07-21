"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getSpell } from "@/config";
import type { CharacterState } from "@/lib/character/types";
import {
  addSpellToCharacter,
  removeSpellFromCharacter,
  filterSpellsForSheet,
  castingClassIds,
  characterOwnsSpell,
  isPreparedCaster,
  maxPreparedSpells,
} from "@/lib/spells";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";

export interface SpellManagerPanelProps {
  state: CharacterState;
  spellSaveDc: number | null;
  spellAttackBonus: number | null;
  spellSlots: number[];
  pactMagic: { slotLevel: number; slotCount: number };
  onChange: (next: CharacterState) => void;
}

export function SpellManagerPanel({
  state,
  spellSaveDc,
  spellAttackBonus,
  spellSlots,
  pactMagic,
  onChange,
}: SpellManagerPanelProps) {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | number>("all");
  const [hideOwned, setHideOwned] = useState(true);
  const [selectedSpell, setSelectedSpell] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const casterIds = castingClassIds(state);
  const prepared = isPreparedCaster(state);
  const prepMax = maxPreparedSpells(state);

  const catalog = useMemo(
    () =>
      filterSpellsForSheet(state, {
        query,
        levelFilter,
        hideOwned,
        onlyCastable: false,
      }),
    [state, query, levelFilter, hideOwned],
  );

  const ownedCantrips = state.spells.cantrips;
  const ownedLeveled = [...new Set([...state.spells.known, ...state.spells.prepared])];

  function addSpell(spellId: string) {
    const next = addSpellToCharacter(state, spellId);
    if (next === state || characterOwnsSpell(state, spellId)) {
      setFeedback("Esta magia já está na ficha.");
      return;
    }
    onChange(next);
    setSelectedSpell(spellId);
    setFeedback(`Adicionada: ${getSpell(spellId)?.name ?? spellId}`);
  }

  function removeSpell(spellId: string) {
    onChange(removeSpellFromCharacter(state, spellId));
    setFeedback(`Removida: ${getSpell(spellId)?.name ?? spellId}`);
  }

  if (casterIds.length === 0) {
    return (
      <Panel title="Magias">
        <p className="text-sm text-ink-muted">
          Esta ficha não tem classe conjuradora com lista de magias configurada.
        </p>
      </Panel>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Conjuração" className="lg:col-span-1">
        <p className="text-sm">
          Classes:{" "}
          <strong>{casterIds.map((id) => getSpellClassLabel(id)).join(", ")}</strong>
        </p>
        <p className="text-sm">
          DC: <strong>{spellSaveDc ?? "—"}</strong>
        </p>
        <p className="text-sm">
          Ataque mágico:{" "}
          <strong>
            {spellAttackBonus != null
              ? `${spellAttackBonus >= 0 ? "+" : ""}${spellAttackBonus}`
              : "—"}
          </strong>
        </p>
        {prepared && prepMax != null && (
          <p className="mt-1 text-sm text-ink-muted">
            Preparadas: {state.spells.prepared.length} / ~{prepMax} (nível + mod. de
            conjuração)
          </p>
        )}

        <div className="mt-3">
          <p className="font-display text-xs uppercase text-crimson">Espaços de magia</p>
          <ul className="mt-1 space-y-1 text-sm">
            {spellSlots.map((total, i) =>
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
                      onChange={(e) => {
                        const used = [...state.spells.slots.used];
                        used[i + 1] = Number(e.target.value);
                        onChange({
                          ...state,
                          spells: {
                            ...state.spells,
                            slots: { ...state.spells.slots, used },
                          },
                        });
                      }}
                    />{" "}
                    / {total}
                  </span>
                </li>
              ) : null,
            )}
            {spellSlots.every((n) => n === 0) && (
              <li className="text-ink-muted">Nenhum espaço neste nível.</li>
            )}
          </ul>
          {pactMagic.slotCount > 0 && (
            <p className="mt-2 text-sm">
              Pactos (nível {pactMagic.slotLevel}): {state.spells.slots.pactUsed} /{" "}
              {pactMagic.slotCount}
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="font-display text-xs uppercase text-crimson">
            Truques ({ownedCantrips.length})
          </p>
          {ownedCantrips.length === 0 ? (
            <p className="text-xs text-ink-muted">Nenhum truque ainda.</p>
          ) : (
            <ul className="mt-1 space-y-1 text-sm">
              {ownedCantrips.map((id) => (
                <li key={id} className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-left underline"
                    onClick={() => setSelectedSpell(id)}
                  >
                    {getSpell(id)?.name ?? id}
                  </button>
                  <button
                    type="button"
                    className="text-xs text-crimson"
                    onClick={() => removeSpell(id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <p className="font-display text-xs uppercase text-crimson">
            {prepared ? "Preparadas / conhecidas" : "Conhecidas"} ({ownedLeveled.length})
          </p>
          {ownedLeveled.length === 0 ? (
            <p className="text-xs text-ink-muted">Nenhuma magia de nível ainda.</p>
          ) : (
            <ul className="mt-1 max-h-56 space-y-1 overflow-y-auto text-sm">
              {ownedLeveled.map((id) => {
                const spell = getSpell(id);
                return (
                  <li key={id} className="flex items-center gap-2">
                    {prepared && (
                      <input
                        type="checkbox"
                        title="Preparada"
                        checked={state.spells.prepared.includes(id)}
                        onChange={() =>
                          onChange({
                            ...state,
                            spells: {
                              ...state.spells,
                              prepared: state.spells.prepared.includes(id)
                                ? state.spells.prepared.filter((x) => x !== id)
                                : [...state.spells.prepared, id],
                            },
                          })
                        }
                      />
                    )}
                    <button
                      type="button"
                      className="flex-1 text-left underline"
                      onClick={() => setSelectedSpell(id)}
                    >
                      {spell?.name ?? id}{" "}
                      <span className="text-ink-muted">
                        ({spell?.level ?? "?"}º)
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-xs text-crimson"
                      onClick={() => removeSpell(id)}
                    >
                      Remover
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Panel>

      <Panel title="Adicionar magia" className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            label="Buscar"
            value={query}
            placeholder="Nome da magia…"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select
            label="Nível"
            value={String(levelFilter)}
            onChange={(e) =>
              setLevelFilter(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            options={[
              { value: "all", label: "Todos" },
              ...Array.from({ length: 6 }, (_, i) => ({
                value: String(i),
                label: i === 0 ? "Truques" : `${i}º nível`,
              })),
            ]}
          />
          <label className="flex items-end gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              checked={hideOwned}
              onChange={(e) => setHideOwned(e.target.checked)}
            />
            Ocultar já adicionadas
          </label>
        </div>

        {feedback && (
          <p className="mt-2 text-sm text-crimson" role="status">
            {feedback}
          </p>
        )}

        {catalog.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            Nenhuma magia encontrada. Confira o filtro ou a lista da classe.
          </p>
        ) : (
          <ul className="mt-3 max-h-96 space-y-1 overflow-y-auto text-sm">
            {catalog.map((spell) => {
              const owned = characterOwnsSpell(state, spell.id);
              return (
                <li
                  key={spell.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-frame/40 py-2"
                >
                  <button
                    type="button"
                    className="text-left font-medium underline"
                    onClick={() => setSelectedSpell(spell.id)}
                  >
                    {spell.name}{" "}
                    <span className="text-ink-muted">
                      ({spell.level === 0 ? "Truque" : `${spell.level}º`})
                    </span>
                    {owned && <Badge tone="gold">Na ficha</Badge>}
                  </button>
                  <Button
                    type="button"
                    variant={owned ? "ghost" : "secondary"}
                    className="!px-2 !py-1 text-xs"
                    disabled={owned}
                    onClick={() => addSpell(spell.id)}
                  >
                    {owned ? "Adicionada" : "Adicionar"}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}

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
                    {[
                      spell.components.v && "V",
                      spell.components.s && "S",
                      spell.components.m && `M (${spell.components.m})`,
                    ]
                      .filter(Boolean)
                      .join(", ")}{" "}
                    · {spell.duration}
                  </p>
                  <p className="mt-2">{spell.description}</p>
                  {spell.higherLevels && (
                    <p className="mt-2 italic">{spell.higherLevels}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {!characterOwnsSpell(state, spell.id) && (
                      <Button type="button" onClick={() => addSpell(spell.id)}>
                        Adicionar à ficha
                      </Button>
                    )}
                    <Link
                      href={`/spells/${spell.id}`}
                      className="inline-flex items-center font-display text-sm text-crimson underline"
                    >
                      Abrir página da magia
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </Panel>
    </div>
  );
}

function getSpellClassLabel(classId: string): string {
  const labels: Record<string, string> = {
    artificer: "Artífice",
    bard: "Bardo",
    cleric: "Clérigo",
    druid: "Druida",
    paladin: "Paladino",
    ranger: "Patrulheiro",
    sorcerer: "Feiticeiro",
    warlock: "Bruxo",
    wizard: "Mago",
  };
  return labels[classId] ?? classId;
}

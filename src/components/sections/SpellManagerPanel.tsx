"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { getSpell, SPELLS } from "@/config";
import type { CharacterState } from "@/lib/character/types";
import {
  addSpellToCharacter,
  removeSpellFromCharacter,
  filterSpellsForSheet,
  castingClassIds,
  characterOwnsSpell,
  isPreparedCaster,
  maxPreparedSpells,
  maxCantripsKnown,
  maxLeveledSpellsKnown,
  characterCanLearnCantrips,
  reasonCannotAddSpell,
  spellLimitLabels,
  togglePreparedSpell,
  ownedLeveledSpellIds,
} from "@/lib/spells";
import {
  addCustomOriginSpell,
  characterHasOriginMagic,
  maxOriginPickSlots,
  remainingOriginPickSlots,
  removeOriginSpell,
  syncOriginSpellsForCharacter,
  allowedOriginPickSpellIds,
} from "@/lib/character/originSpells";
import { maxSpellLevelAvailable } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select, NumberField } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { InvocationPicker } from "@/components/ui/InvocationPicker";

const ADD_BLOCK_MESSAGES: Record<string, string> = {
  missing: "Magia não encontrada.",
  owned: "Esta magia já está na ficha.",
  level: "Círculo acima do permitido no nível atual.",
  cantrips: "Limite de truques conhecidos atingido.",
  known: "Limite de magias conhecidas atingido.",
  prepared: "Limite de magias preparadas atingido.",
};

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

  const [originQuery, setOriginQuery] = useState("");

  const casterIds = castingClassIds(state);
  const prepared = isPreparedCaster(state);
  const prepMax = maxPreparedSpells(state);
  const cantripMax = maxCantripsKnown(state);
  const knownMax = maxLeveledSpellsKnown(state);
  const maxSpellLevel = maxSpellLevelAvailable(state);
  const isArtificer = casterIds.includes("artificer");
  const isPaladin = casterIds.includes("paladin");
  const limitLabels = spellLimitLabels(state);
  const atCantripCap =
    cantripMax > 0 && state.spells.cantrips.length >= cantripMax;
  const atLeveledCap =
    knownMax != null && ownedLeveledSpellIds(state).length >= knownMax;

  const catalog = useMemo(
    () =>
      filterSpellsForSheet(state, {
        query,
        levelFilter,
        hideOwned,
        onlyCastable: true,
      }),
    [state, query, levelFilter, hideOwned],
  );

  const canLearnCantrips = characterCanLearnCantrips(state);

  const levelFilterOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [
      { value: "all", label: "Disponíveis no nível" },
    ];
    if (canLearnCantrips) {
      opts.push({ value: "0", label: "Truques" });
    }
    for (let i = 1; i <= Math.max(0, maxSpellLevel); i++) {
      opts.push({ value: String(i), label: `${i}º círculo` });
    }
    return opts;
  }, [canLearnCantrips, maxSpellLevel]);

  useEffect(() => {
    const synced = syncOriginSpellsForCharacter(state);
    const prev = state.originSpells ?? [];
    const next = synced.originSpells;
    const same =
      prev.length === next.length &&
      prev.every(
        (e, i) =>
          e.spellId === next[i]?.spellId &&
          e.source === next[i]?.source &&
          e.note === next[i]?.note,
      );
    if (!same) onChange(synced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.raceId, state.subraceId, JSON.stringify(state.raceChoices), state.classes, state.startingLevel]);

  const ownedCantrips = state.spells.cantrips;
  const ownedLeveled = ownedLeveledSpellIds(state);
  const originEntries = state.originSpells ?? [];
  const hasOriginMagic = characterHasOriginMagic(state);
  const pickSlots = maxOriginPickSlots(state);
  const pickRemaining = remainingOriginPickSlots(state);
  const allowedOriginIds = useMemo(
    () => allowedOriginPickSpellIds(state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.raceId, state.subraceId, JSON.stringify(state.raceChoices), state.classes, state.startingLevel, state.originSpells],
  );

  const originCatalog = useMemo(() => {
    if (pickSlots <= 0) return [];
    const q = originQuery.trim().toLowerCase();
    return SPELLS.filter((s) => {
      if (!allowedOriginIds.has(s.id)) return false;
      if (characterOwnsSpell(state, s.id)) return false;
      if (!q) return true;
      return s.name.toLowerCase().includes(q) || s.id.includes(q);
    }).slice(0, 40);
  }, [originQuery, state, allowedOriginIds, pickSlots]);

  function addSpell(spellId: string) {
    const spell = getSpell(spellId);
    if (!spell) return;
    const reason = reasonCannotAddSpell(state, spellId);
    if (reason) {
      if (reason === "level") {
        setFeedback(
          spell.level === 0
            ? "Esta classe não aprende truques."
            : `Só é possível escolher magias de até ${maxSpellLevel}º círculo no nível atual.`,
        );
      } else {
        setFeedback(ADD_BLOCK_MESSAGES[reason] ?? "Não foi possível adicionar.");
      }
      return;
    }
    const next = addSpellToCharacter(state, spellId);
    if (next === state) {
      setFeedback("Não foi possível adicionar esta magia.");
      return;
    }
    onChange(next);
    setSelectedSpell(spellId);
    setFeedback(`Adicionada: ${spell.name}`);
  }

  function addOriginPick(spellId: string) {
    const next = addCustomOriginSpell(state, spellId);
    if (next === state) {
      setFeedback(
        pickRemaining <= 0
          ? "Você já escolheu todas as magias de origem disponíveis."
          : "Esta magia não é permitida pela sua raça/origem, ou já está na ficha.",
      );
      return;
    }
    onChange(next);
    setSelectedSpell(spellId);
    setFeedback(`Magia de origem: ${getSpell(spellId)?.name ?? spellId}`);
  }

  function removeSpell(spellId: string) {
    onChange(removeSpellFromCharacter(state, spellId));
    setFeedback(`Removida: ${getSpell(spellId)?.name ?? spellId}`);
  }

  const warlockLevel =
    state.classes.find((c) => c.classId === "warlock")?.level ?? 0;

  const originPanel = (
    <Panel title="Magias de origem / raça">
      {!hasOriginMagic ? (
        <p className="text-sm text-ink-muted">
          Sua raça ou origem atual não concede magias nativas. Só raças/traços que listam magias
          (ex.: Alto Elfo, Drow, Tiefling, Aasimar) aparecem aqui.
        </p>
      ) : (
        <>
          <p className="text-xs text-ink-muted">
            Magias nativas da raça/origem não consomem vagas de truques ou magias conhecidas da
            classe.
          </p>
          {originEntries.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">
              {pickSlots > 0
                ? "Escolha abaixo a(s) magia(s) permitida(s) pela sua raça."
                : "Nenhuma magia de origem liberada neste nível ainda."}
            </p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {originEntries.map((e) => {
                const spell = getSpell(e.spellId);
                return (
                  <li key={e.spellId} className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      className="text-left underline"
                      onClick={() => setSelectedSpell(e.spellId)}
                    >
                      {spell?.name ?? e.spellId}{" "}
                      <Badge tone={e.source === "race" ? "gold" : "crimson"}>
                        {e.source === "race" ? "Raça" : "Escolha"}
                      </Badge>
                      {e.note ? (
                        <span className="block text-xs text-ink-muted">{e.note}</span>
                      ) : null}
                    </button>
                    {e.source === "custom" ? (
                      <button
                        type="button"
                        className="text-xs text-crimson"
                        onClick={() => {
                          onChange(removeOriginSpell(state, e.spellId));
                          setFeedback(`Removida da origem: ${spell?.name ?? e.spellId}`);
                        }}
                      >
                        Remover
                      </button>
                    ) : (
                      <span className="text-[10px] text-ink-muted">automática</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {pickSlots > 0 ? (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-ink-muted">
                Escolhas de origem: {pickSlots - pickRemaining}/{pickSlots}
                {pickRemaining <= 0 ? " (completo)" : ""}
              </p>
              {pickRemaining > 0 ? (
                <>
                  <Input
                    label="Buscar magia permitida pela raça"
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    placeholder="Ex.: raio de gelo…"
                  />
                  <ul className="max-h-40 space-y-1 overflow-y-auto text-sm">
                    {originCatalog.length === 0 ? (
                      <li className="text-ink-muted">Nenhuma magia disponível neste filtro.</li>
                    ) : (
                      originCatalog.map((spell) => (
                        <li key={spell.id} className="flex items-center justify-between gap-2">
                          <span>
                            {spell.name}{" "}
                            <span className="text-ink-muted">
                              ({spell.level === 0 ? "Truque" : `${spell.level}º`})
                            </span>
                          </span>
                          <Button
                            type="button"
                            variant="secondary"
                            className="!px-2 !py-1 text-xs"
                            onClick={() => addOriginPick(spell.id)}
                          >
                            + Origem
                          </Button>
                        </li>
                      ))
                    )}
                  </ul>
                </>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </Panel>
  );

  if (casterIds.length === 0) {
    return (
      <div className="space-y-4">
        {originPanel}
        {warlockLevel >= 2 && (
          <InvocationPicker state={state} onChange={onChange} />
        )}
        <Panel title="Magias de classe">
          <p className="text-sm text-ink-muted">
            Esta ficha não tem classe conjuradora com lista de magias configurada.
          </p>
        </Panel>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {originPanel}
      {warlockLevel >= 2 && (
        <InvocationPicker state={state} onChange={onChange} />
      )}
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
            {limitLabels.leveled}
            {(isArtificer || isPaladin) && (
              <> (mod. de conjuração + metade do nível)</>
            )}
            {!isArtificer && !isPaladin && casterIds.includes("wizard") && (
              <> (livro: 6 + 2/nível · prep.: nível + INT)</>
            )}
            {!isArtificer &&
              !isPaladin &&
              !casterIds.includes("wizard") &&
              prepared && <> (nível + mod. de conjuração)</>}
          </p>
        )}
        {!prepared && knownMax != null && (
          <p className="mt-1 text-sm text-ink-muted">{limitLabels.leveled}</p>
        )}
        {cantripMax > 0 && (
          <p className="mt-1 text-sm text-ink-muted">{limitLabels.cantrips}</p>
        )}
        <p className="mt-1 text-sm text-ink-muted">
          Círculo máximo disponível:{" "}
          <strong>
            {maxSpellLevel > 0
              ? `${maxSpellLevel}º`
              : canLearnCantrips
                ? "apenas truques"
                : "nenhum (nível 1)"}
          </strong>
        </p>

        <div className="mt-3">
          <p className="font-display text-xs uppercase text-crimson">Espaços de magia</p>
          <ul className="mt-1 space-y-1 text-sm">
            {spellSlots.map((total, i) =>
              total > 0 ? (
                <li key={i} className="flex items-end justify-between gap-2">
                  <NumberField
                    label={`Usados Nv. ${i + 1}`}
                    className="!min-h-9 !py-1.5"
                    min={0}
                    max={total}
                    value={state.spells.slots.used[i + 1] ?? 0}
                    onValueChange={(n) => {
                      const used = [...state.spells.slots.used];
                      used[i + 1] = n;
                      onChange({
                        ...state,
                        spells: {
                          ...state.spells,
                          slots: { ...state.spells.slots, used },
                        },
                      });
                    }}
                  />
                  <span className="pb-2 text-sm text-ink-muted">/ {total}</span>
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
            Truques ({ownedCantrips.length}
            {cantripMax > 0 ? ` / ${cantripMax}` : ""})
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
            {prepared ? "Preparadas / conhecidas" : "Conhecidas"} ({ownedLeveled.length}
            {knownMax != null ? ` / ${knownMax}` : ""}
            {prepared && prepMax != null && knownMax !== prepMax
              ? ` · prep. ${state.spells.prepared.length}/${prepMax}`
              : prepared && prepMax != null
                ? ` · prep. ${state.spells.prepared.length}/${prepMax}`
                : ""}
            )
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
                        onChange={() => {
                          const result = togglePreparedSpell(state, id);
                          if (result.blocked === "prepared") {
                            setFeedback(ADD_BLOCK_MESSAGES.prepared);
                            return;
                          }
                          onChange(result.state);
                        }}
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
            options={levelFilterOptions}
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

        {(atCantripCap || atLeveledCap) && (
          <p className="mt-2 text-sm text-ink-muted">
            {atCantripCap && atLeveledCap
              ? "Limites de truques e magias atingidos — remova uma para adicionar outra."
              : atCantripCap
                ? "Limite de truques atingido — remova um para aprender outro."
                : "Limite de magias atingido — remova uma para aprender/preparar outra."}
          </p>
        )}

        {catalog.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            Nenhuma magia disponível neste nível. Suba de nível para liberar círculos
            maiores, ou ajuste a busca.
          </p>
        ) : (
          <ul className="mt-3 max-h-96 space-y-1 overflow-y-auto text-sm">
            {catalog.map((spell) => {
              const owned = characterOwnsSpell(state, spell.id);
              const block = owned ? "owned" : reasonCannotAddSpell(state, spell.id);
              const disabled = Boolean(block);
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
                    disabled={disabled}
                    title={
                      block && block !== "owned"
                        ? ADD_BLOCK_MESSAGES[block]
                        : undefined
                    }
                    onClick={() => addSpell(spell.id)}
                  >
                    {owned ? "Adicionada" : disabled ? "Limite" : "Adicionar"}
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
                      <Button
                        type="button"
                        disabled={Boolean(reasonCannotAddSpell(state, spell.id))}
                        onClick={() => addSpell(spell.id)}
                      >
                        {reasonCannotAddSpell(state, spell.id)
                          ? "Limite atingido"
                          : "Adicionar à ficha"}
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

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getClass,
  getRace,
  getSubrace,
  getBackground,
  getFeat,
  ARMORS,
  WEAPONS,
} from "@/config";
import { filterItems } from "@/config/items";
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
import { summarizeWeaponAttack } from "@/lib/items";
import {
  canAttune,
  countAttuned,
  forgeExtraDamageLabel,
  inventoryMagicBonus,
  listItemSpells,
  resolveCustomMagic,
} from "@/lib/items/forgeModifiers";
import { getSpell } from "@/config/spells";
import { getItem } from "@/config/items";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Panel, Tabs, Badge } from "@/components/ui/Panel";
import { SpellManagerPanel } from "@/components/sections/SpellManagerPanel";
import {
  WildShapePanel,
  characterHasWildShape,
} from "@/components/sections/WildShapePanel";
import { ToolProficienciesPanel } from "@/components/ui/ToolProficienciesPanel";
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

  useEffect(() => {
    void getCharacter(characterId).then(setRecord);
  }, [characterId]);

  const state = record?.data;
  const derived = useMemo(() => (state ? derivedSheet(state) : null), [state]);

  const updateState = useCallback((updater: (prev: CharacterState) => CharacterState) => {
    setRecord((prev) => {
      if (!prev) return prev;
      const data = updater(prev.data);
      return { ...prev, data, name: data.name };
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

          <Panel title="Ferramentas" className="lg:col-span-1">
            <ToolProficienciesPanel
              tools={state.toolProficiencies}
              extraHints={
                getClass(state.classes[0]?.classId ?? "")?.toolProficiencies
              }
            />
          </Panel>

          <Panel title="Riqueza e inventário" className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(
                [
                  ["pp", "Platina"],
                  ["gp", "Ouro (PO)"],
                  ["ep", "Electrum"],
                  ["sp", "Prata"],
                  ["cp", "Cobre"],
                ] as const
              ).map(([key, label]) => (
                <Input
                  key={key}
                  label={label}
                  type="number"
                  min={0}
                  value={state.currency[key]}
                  onChange={(e) =>
                    updateState((s) => ({
                      ...s,
                      currency: {
                        ...s.currency,
                        [key]: Math.max(0, Number(e.target.value) || 0),
                      },
                    }))
                  }
                />
              ))}
            </div>
            <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm">
              {state.inventory.length === 0 ? (
                <li className="text-ink-muted">Inventário vazio.</li>
              ) : (
                state.inventory.map((item) => {
                  const custom = resolveCustomMagic(item);
                  const catalog = item.itemId ? getItem(item.itemId) : undefined;
                  const requiresAttune =
                    custom?.requiresAttunement ??
                    catalog?.requiresAttunement ??
                    false;
                  const equipmentId =
                    item.equipmentId ??
                    custom?.baseWeaponId ??
                    custom?.baseArmorId ??
                    catalog?.equipmentId;
                  const isWeapon =
                    Boolean(equipmentId) &&
                    WEAPONS.some((w) => w.id === equipmentId);
                  const isArmor =
                    Boolean(equipmentId) &&
                    ARMORS.some((a) => a.id === equipmentId);
                  const magic = inventoryMagicBonus(item);
                  const extraDmg =
                    custom && item.equipped
                      ? forgeExtraDamageLabel(custom.powers)
                      : null;
                  const attack =
                    isWeapon && equipmentId
                      ? summarizeWeaponAttack(state, {
                          weaponEquipmentId: equipmentId,
                          magicBonus: magic,
                          itemName: item.name,
                          extraDamage: extraDmg,
                        })
                      : null;
                  const chargesMax = custom?.charges?.max ?? 0;
                  return (
                    <li
                      key={item.id}
                      className="border-b border-frame/30 py-1"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>
                          {item.equipped ? "⚔ " : ""}
                          {item.attuned ? "◎ " : ""}
                          {item.name}
                          {item.quantity > 1 ? ` ×${item.quantity}` : ""}
                          {magic ? ` (+${magic})` : ""}
                          {custom ? " · Criado" : ""}
                        </span>
                        <span className="flex flex-wrap gap-2">
                          {(isWeapon || isArmor || Boolean(custom)) && (
                            <button
                              type="button"
                              className="text-xs text-gold"
                              onClick={() =>
                                updateState((s) => {
                                  const nextEquipped = !item.equipped;
                                  let armorId = s.armorId;
                                  let shieldEquipped = s.shieldEquipped;
                                  if (isArmor && equipmentId && nextEquipped) {
                                    const armor = ARMORS.find(
                                      (a) => a.id === equipmentId,
                                    );
                                    if (armor?.category === "shield") {
                                      shieldEquipped = true;
                                    } else {
                                      armorId = equipmentId;
                                    }
                                  }
                                  return {
                                    ...s,
                                    armorId,
                                    shieldEquipped,
                                    inventory: s.inventory.map((i) =>
                                      i.id === item.id
                                        ? { ...i, equipped: nextEquipped }
                                        : i,
                                    ),
                                  };
                                })
                              }
                            >
                              {item.equipped ? "Desequipar" : "Equipar"}
                            </button>
                          )}
                          {requiresAttune && (
                            <button
                              type="button"
                              className="text-xs text-crimson"
                              onClick={() =>
                                updateState((s) => {
                                  if (!item.attuned && !canAttune(s, item.id)) {
                                    alert(
                                      "Limite de 3 itens sintonizados (PHB).",
                                    );
                                    return s;
                                  }
                                  return {
                                    ...s,
                                    inventory: s.inventory.map((i) =>
                                      i.id === item.id
                                        ? { ...i, attuned: !i.attuned }
                                        : i,
                                    ),
                                  };
                                })
                              }
                            >
                              {item.attuned
                                ? "Remover sintonização"
                                : "Sintonizar"}
                            </button>
                          )}
                          <button
                            type="button"
                            className="text-xs text-crimson"
                            onClick={() =>
                              updateState((s) => ({
                                ...s,
                                inventory: s.inventory.filter(
                                  (i) => i.id !== item.id,
                                ),
                              }))
                            }
                          >
                            Remover
                          </button>
                        </span>
                      </div>
                      {chargesMax > 0 && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
                          Cargas: {(item.chargesUsed ?? 0)}/{chargesMax}
                          <button
                            type="button"
                            className="text-gold"
                            onClick={() =>
                              updateState((s) => ({
                                ...s,
                                inventory: s.inventory.map((i) =>
                                  i.id === item.id
                                    ? {
                                        ...i,
                                        chargesUsed: Math.max(
                                          0,
                                          (i.chargesUsed ?? 0) - 1,
                                        ),
                                      }
                                    : i,
                                ),
                              }))
                            }
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="text-crimson"
                            onClick={() =>
                              updateState((s) => ({
                                ...s,
                                inventory: s.inventory.map((i) =>
                                  i.id === item.id
                                    ? {
                                        ...i,
                                        chargesUsed: Math.min(
                                          chargesMax,
                                          (i.chargesUsed ?? 0) + 1,
                                        ),
                                      }
                                    : i,
                                ),
                              }))
                            }
                          >
                            −
                          </button>
                        </div>
                      )}
                      {attack && item.equipped && (
                        <p className="text-xs text-ink-muted">{attack.label}</p>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
            <p className="mt-1 text-xs text-ink-muted">
              Sintonizados: {countAttuned(state)}/3
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Select
                label="Adicionar do catálogo"
                value=""
                onChange={(e) => {
                  const catalogId = e.target.value;
                  if (!catalogId) return;
                  const catalog = filterItems({ preset: "all" }).find(
                    (i) => i.id === catalogId,
                  );
                  if (!catalog) return;
                  updateState((s) => ({
                    ...s,
                    inventory: [
                      ...s.inventory,
                      {
                        id: crypto.randomUUID(),
                        name: catalog.name,
                        quantity: 1,
                        itemId: catalog.id,
                        equipmentId: catalog.equipmentId,
                        magicBonus: catalog.magicBonus,
                        equipped: false,
                        attuned: false,
                        chargesUsed: 0,
                      },
                    ],
                  }));
                }}
                options={[
                  { value: "", label: "Escolher item…" },
                  ...filterItems({ preset: "created" }).map((i) => ({
                    value: i.id,
                    label: `[Forja] ${i.name}`,
                  })),
                  ...filterItems({ preset: "weapons" })
                    .slice(0, 80)
                    .map((i) => ({
                      value: i.id,
                      label: `${i.name}${i.kind === "magic" ? " ★" : ""}`,
                    })),
                  ...filterItems({ preset: "armor" })
                    .slice(0, 60)
                    .map((i) => ({
                      value: i.id,
                      label: `${i.name}${i.kind === "magic" ? " ★" : ""}`,
                    })),
                  ...filterItems({ preset: "magic" })
                    .filter(
                      (i) =>
                        i.category !== "weapon" &&
                        i.category !== "armor" &&
                        i.category !== "shield",
                    )
                    .slice(0, 60)
                    .map((i) => ({
                      value: i.id,
                      label: i.name,
                    })),
                  ...filterItems({ preset: "potions" })
                    .slice(0, 40)
                    .map((i) => ({
                      value: i.id,
                      label: i.name,
                    })),
                  ...filterItems({ preset: "gear" })
                    .slice(0, 40)
                    .map((i) => ({
                      value: i.id,
                      label: i.name,
                    })),
                ]}
              />
              <Input
                label="Adicionar item livre (Enter)"
                name="new-item"
                placeholder="Nome do item"
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  e.preventDefault();
                  const input = e.target as HTMLInputElement;
                  const value = input.value.trim();
                  if (!value) return;
                  updateState((s) => ({
                    ...s,
                    inventory: [
                      ...s.inventory,
                      { id: crypto.randomUUID(), name: value, quantity: 1 },
                    ],
                  }));
                  input.value = "";
                }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Catálogo e{" "}
              <Link href="/items/forja" className="text-crimson underline">
                Forja
              </Link>
              . Equipe e sintonize itens mágicos para aplicar poderes.
            </p>
          </Panel>

          {listItemSpells(state).length > 0 && (
            <Panel title="Magias de itens" className="lg:col-span-3">
              <ul className="space-y-2 text-sm">
                {listItemSpells(state).map((entry) => {
                  const spell = getSpell(entry.spellId);
                  return (
                    <li
                      key={`${entry.inventoryId}-${entry.spellId}`}
                      className="flex flex-wrap items-center justify-between gap-2 border-b border-frame/30 py-1"
                    >
                      <span>
                        <Link
                          href={`/spells/${entry.spellId}`}
                          className="text-crimson underline"
                        >
                          {spell?.name ?? entry.spellId}
                        </Link>
                        <span className="text-ink-muted">
                          {" "}
                          — {entry.itemName}
                          {entry.mode === "a-vontade"
                            ? " (à vontade)"
                            : ` (${entry.chargesMin ?? 1} carga${
                                (entry.chargesMin ?? 1) > 1 ? "s" : ""
                              })`}
                          {entry.castAtLevel != null
                            ? ` · ${entry.castAtLevel}º círculo`
                            : ""}
                        </span>
                      </span>
                      {entry.mode === "cargas" &&
                        entry.chargesMaxItem != null && (
                          <button
                            type="button"
                            className="text-xs text-gold"
                            onClick={() =>
                              updateState((s) => ({
                                ...s,
                                inventory: s.inventory.map((i) =>
                                  i.id === entry.inventoryId
                                    ? {
                                        ...i,
                                        chargesUsed: Math.min(
                                          entry.chargesMaxItem!,
                                          (i.chargesUsed ?? 0) +
                                            (entry.chargesMin ?? 1),
                                        ),
                                      }
                                    : i,
                                ),
                              }))
                            }
                          >
                            Gastar carga
                          </button>
                        )}
                    </li>
                  );
                })}
              </ul>
            </Panel>
          )}

          {characterHasWildShape(state) && (
            <WildShapePanel state={state} updateState={updateState} />
          )}

          <Panel title="Características" className="lg:col-span-3">
            <ul className="columns-1 gap-4 text-sm md:columns-2">
              {state.classes.flatMap((cls) => {
                const def = getClass(cls.classId);
                if (!def) return [];
                const replaced = new Set(
                  (def.optionalFeatures ?? [])
                    .filter((f) => state.optionalFeatureIds.includes(f.id ?? f.name) && f.replaces)
                    .map((f) => f.replaces!),
                );
                const core = def.features
                  .filter((f) => f.level <= cls.level && !replaced.has(f.name))
                  .map((f) => (
                    <li key={`${cls.classId}-${f.level}-${f.name}`} className="mb-2 break-inside-avoid">
                      <strong>
                        {def.name} {f.level} — {f.name}:
                      </strong>{" "}
                      {f.description}
                    </li>
                  ));
                const optional = (def.optionalFeatures ?? [])
                  .filter(
                    (f) =>
                      f.level <= cls.level &&
                      state.optionalFeatureIds.includes(f.id ?? f.name),
                  )
                  .map((f) => (
                    <li
                      key={`opt-${cls.classId}-${f.id ?? f.name}`}
                      className="mb-2 break-inside-avoid"
                    >
                      <strong>
                        {def.name} {f.level} — {f.name} (opcional):
                      </strong>{" "}
                      {f.description}
                    </li>
                  ));
                const subclass = def.subclasses.find((s) => s.id === cls.subclassId);
                const subFeats =
                  subclass?.features
                    .filter((f) => f.level <= cls.level)
                    .map((f) => (
                      <li
                        key={`${cls.subclassId}-${f.level}-${f.name}`}
                        className="mb-2 break-inside-avoid"
                      >
                        <strong>
                          {subclass.name} {f.level} — {f.name}:
                        </strong>{" "}
                        {f.description}
                      </li>
                    )) ?? [];
                return [...core, ...optional, ...subFeats];
              })}
            </ul>
          </Panel>

          <Panel title="Talentos" className="lg:col-span-3">
            {state.feats.length === 0 ? (
              <p className="text-sm text-ink-muted">Nenhum talento selecionado.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {state.feats.map((id) => {
                  const feat = getFeat(id);
                  if (!feat) return <li key={id}>{id}</li>;
                  return (
                    <li key={id} className="rounded-sm border border-frame p-3">
                      <p className="font-display text-crimson">{feat.name}</p>
                      {feat.prerequisites && (
                        <p className="text-xs text-ink-muted">Pré-requisito: {feat.prerequisites}</p>
                      )}
                      <p className="mt-1 text-ink-muted">{feat.description}</p>
                    </li>
                  );
                })}
              </ul>
            )}
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
        <SpellManagerPanel
          state={state}
          spellSaveDc={derived.spellSaveDc}
          spellAttackBonus={derived.spellAttackBonus}
          spellSlots={derived.spellSlots}
          pactMagic={derived.pactMagic}
          onChange={(next) => updateState(() => next)}
        />
      )}
    </div>
  );
}

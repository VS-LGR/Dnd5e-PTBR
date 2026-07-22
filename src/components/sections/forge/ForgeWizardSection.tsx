"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { ItemRichDescription } from "@/components/ui/ItemRichDescription";
import { ARMORS, WEAPONS } from "@/config/equipment";
import { filterItems } from "@/config/items";
import { searchSpells, getSpell } from "@/config/spells";
import type { ItemCategory, ItemRarity } from "@/config/types";
import { ABILITY_LABELS, SKILL_META } from "@/config/tables/labels";
import type { AbilityKey, SkillKey } from "@/lib/character/types";
import { forgeBudgetStatus, powerCost } from "@/lib/items/forgeBalance";
import { generateForgeDescription } from "@/lib/items/forgeGenerate";
import {
  getForgeItem,
  saveForgeItem,
} from "@/lib/items/forgeRepository";
import {
  createEmptyForgeDraft,
  type CustomMagicItem,
  type ForgeBaseKind,
  type ForgeChargeReset,
  type ForgePower,
} from "@/lib/items/forgeTypes";
import { customItemToDefinition } from "@/lib/items/forgeConvert";

const STEPS = ["Identidade", "Base", "Poderes", "Revisão"] as const;

const RARITY_OPTIONS: { value: ItemRarity; label: string }[] = [
  { value: "common", label: "Comum" },
  { value: "uncommon", label: "Incomum" },
  { value: "rare", label: "Rara" },
  { value: "very-rare", label: "Muito rara" },
  { value: "legendary", label: "Lendária" },
  { value: "artifact", label: "Artefato" },
  { value: "varies", label: "Variável" },
];

const WONDER_CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: "wondrous", label: "Item maravilhoso" },
  { value: "ring", label: "Anel" },
  { value: "potion", label: "Poção" },
  { value: "wand", label: "Varinha" },
  { value: "staff", label: "Cajado" },
  { value: "rod", label: "Bastão" },
  { value: "scroll", label: "Pergaminho" },
  { value: "other", label: "Outro" },
];

function newPowerId() {
  return `pwr-${crypto.randomUUID()}`;
}

export function ForgeWizardSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CustomMagicItem>(() =>
    createEmptyForgeDraft(),
  );
  const [modelQuery, setModelQuery] = useState("");
  const [spellQuery, setSpellQuery] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      const existing = getForgeItem(editId);
      if (existing) setDraft(existing);
    } else if (searchParams.get("modelo") === "1") {
      setStep(0);
    }
    setReady(true);
  }, [searchParams]);

  const budget = useMemo(() => forgeBudgetStatus(draft), [draft]);

  const modelResults = useMemo(() => {
    if (!modelQuery.trim()) return [];
    return filterItems({ query: modelQuery, kind: "magic" }).slice(0, 12);
  }, [modelQuery]);

  const spellResults = useMemo(() => {
    if (!spellQuery.trim()) return [];
    return searchSpells(spellQuery).slice(0, 10);
  }, [spellQuery]);

  const previewDef = useMemo(() => {
    const withDesc = {
      ...draft,
      descriptionGenerated: generateForgeDescription(draft),
    };
    return customItemToDefinition(withDesc);
  }, [draft]);

  function patch(p: Partial<CustomMagicItem>) {
    setDraft((d) => ({ ...d, ...p }));
  }

  function applyModel(itemId: string) {
    const item = filterItems({ kind: "magic" }).find((i) => i.id === itemId);
    if (!item) return;
    let baseKind: ForgeBaseKind = "wonder";
    if (item.category === "weapon" || item.baseWeaponId || item.equipmentId) {
      baseKind = "weapon";
    } else if (item.category === "armor" || item.category === "shield") {
      baseKind = "armor";
    }
    setDraft(
      createEmptyForgeDraft({
        name: `${item.name} (forja)`,
        rarity: item.rarity === "mundane" ? "uncommon" : item.rarity,
        baseKind,
        wonderCategory:
          baseKind === "wonder"
            ? (item.category as ItemCategory)
            : "wondrous",
        baseWeaponId:
          baseKind === "weapon"
            ? item.equipmentId ?? item.baseWeaponId
            : undefined,
        baseArmorId:
          baseKind === "armor" ? item.equipmentId : undefined,
        requiresAttunement: Boolean(item.requiresAttunement),
        descriptionManual: item.description,
        powers:
          item.magicBonus && item.magicBonus >= 1 && item.magicBonus <= 3
            ? [
                {
                  id: newPowerId(),
                  type: "bonus-ataque-dano",
                  value: item.magicBonus as 1 | 2 | 3,
                },
              ]
            : [],
      }),
    );
    setStep(1);
  }

  function addPower(power: ForgePower) {
    setDraft((d) => ({ ...d, powers: [...d.powers, power] }));
  }

  function removePower(id: string) {
    setDraft((d) => ({
      ...d,
      powers: d.powers.filter((p) => p.id !== id),
    }));
  }

  function handleSave() {
    const descriptionGenerated = generateForgeDescription(draft);
    const saved = saveForgeItem({
      ...draft,
      name: draft.name.trim() || "Item sem nome",
      descriptionGenerated,
      descriptionManual: draft.descriptionManual?.trim() || undefined,
    });
    router.push(`/items/${saved.id}`);
  }

  if (!ready) {
    return <p className="text-ink-muted">Carregando forja…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-muted">
          <Link href="/items/forja" className="underline">
            Forja
          </Link>{" "}
          / Assistente
        </p>
        <h1 className="font-display text-3xl text-crimson">
          {draft.name || "Novo item mágico"}
        </h1>
      </div>

      <ol className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`rounded-sm border-2 px-3 py-1 font-display text-sm ${
                i === step
                  ? "border-crimson bg-crimson text-parchment"
                  : "border-frame bg-parchment text-ink"
              }`}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          {step === 0 && (
            <Panel title="Identidade">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Nome"
                  value={draft.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Ex.: Lâmina do Crepúsculo"
                />
                <Select
                  label="Raridade"
                  value={draft.rarity}
                  onChange={(e) =>
                    patch({ rarity: e.target.value as ItemRarity })
                  }
                  options={RARITY_OPTIONS}
                />
                <label className="flex items-center gap-2 text-sm text-ink sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={draft.requiresAttunement}
                    onChange={(e) =>
                      patch({ requiresAttunement: e.target.checked })
                    }
                  />
                  Requer sintonização
                </label>
                {draft.requiresAttunement && (
                  <Input
                    label="Sintonização por (opcional)"
                    value={draft.attunementBy ?? ""}
                    onChange={(e) => patch({ attunementBy: e.target.value })}
                    placeholder="ex.: druida, feiticeiro"
                    className="sm:col-span-2"
                  />
                )}
              </div>

              {searchParams.get("modelo") === "1" && (
                <div className="mt-4 border-t border-frame/40 pt-4">
                  <Input
                    label="Buscar modelo no catálogo"
                    value={modelQuery}
                    onChange={(e) => setModelQuery(e.target.value)}
                    placeholder="Nome do item mágico…"
                  />
                  <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-sm">
                    {modelResults.map((m) => (
                      <li key={m.id}>
                        <button
                          type="button"
                          className="w-full rounded-sm px-2 py-1 text-left hover:bg-parchment-dark"
                          onClick={() => applyModel(m.id)}
                        >
                          {m.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Panel>
          )}

          {step === 1 && (
            <Panel title="Base">
              <Select
                label="Tipo de base"
                value={draft.baseKind}
                onChange={(e) =>
                  patch({ baseKind: e.target.value as ForgeBaseKind })
                }
                options={[
                  { value: "wonder", label: "Maravilha / outro" },
                  { value: "weapon", label: "Arma" },
                  { value: "armor", label: "Armadura / escudo" },
                ]}
              />
              {draft.baseKind === "wonder" && (
                <div className="mt-3">
                  <Select
                    label="Categoria"
                    value={draft.wonderCategory ?? "wondrous"}
                    onChange={(e) =>
                      patch({
                        wonderCategory: e.target.value as ItemCategory,
                      })
                    }
                    options={WONDER_CATEGORIES}
                  />
                </div>
              )}
              {draft.baseKind === "weapon" && (
                <div className="mt-3">
                  <Select
                    label="Arma base"
                    value={draft.baseWeaponId ?? ""}
                    onChange={(e) =>
                      patch({ baseWeaponId: e.target.value || undefined })
                    }
                    options={[
                      { value: "", label: "Escolher…" },
                      ...WEAPONS.map((w) => ({
                        value: w.id,
                        label: w.name,
                      })),
                    ]}
                  />
                </div>
              )}
              {draft.baseKind === "armor" && (
                <div className="mt-3">
                  <Select
                    label="Armadura / escudo base"
                    value={draft.baseArmorId ?? ""}
                    onChange={(e) =>
                      patch({ baseArmorId: e.target.value || undefined })
                    }
                    options={[
                      { value: "", label: "Escolher…" },
                      ...ARMORS.map(
                        (a) => ({
                          value: a.id,
                          label: a.name,
                        }),
                      ),
                    ]}
                  />
                </div>
              )}
            </Panel>
          )}

          {step === 2 && (
            <Panel title="Poderes e cargas">
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <Input
                  label="Cargas máximas"
                  type="number"
                  min={0}
                  value={draft.charges?.max ?? 0}
                  onChange={(e) => {
                    const max = Math.max(0, Number(e.target.value) || 0);
                    if (max <= 0) {
                      patch({ charges: undefined });
                      return;
                    }
                    patch({
                      charges: {
                        max,
                        reset: draft.charges?.reset ?? "amanhecer",
                        resetText: draft.charges?.resetText,
                      },
                    });
                  }}
                />
                <Select
                  label="Recuperação"
                  value={draft.charges?.reset ?? "amanhecer"}
                  onChange={(e) =>
                    patch({
                      charges: {
                        max: draft.charges?.max ?? 0,
                        reset: e.target.value as ForgeChargeReset,
                        resetText: draft.charges?.resetText,
                      },
                    })
                  }
                  options={[
                    { value: "amanhecer", label: "Ao amanhecer" },
                    { value: "descanso-curto", label: "Descanso curto" },
                    { value: "descanso-longo", label: "Descanso longo" },
                    { value: "custom", label: "Texto livre" },
                  ]}
                />
                {draft.charges?.reset === "custom" && (
                  <Input
                    label="Texto de recuperação"
                    value={draft.charges.resetText ?? ""}
                    onChange={(e) =>
                      patch({
                        charges: {
                          max: draft.charges?.max ?? 0,
                          reset: "custom",
                          resetText: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>

              <ul className="mb-4 space-y-2 text-sm">
                {draft.powers.length === 0 && (
                  <li className="text-ink-muted">Nenhum poder ainda.</li>
                )}
                {draft.powers.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-2 border border-frame/40 bg-parchment-dark/40 px-2 py-1"
                  >
                    <span>
                      <Badge>{p.type}</Badge>{" "}
                      {summarizePower(p)}{" "}
                      <span className="text-ink-muted">
                        ({powerCost(p)} pt)
                      </span>
                    </span>
                    <button
                      type="button"
                      className="text-xs text-crimson"
                      onClick={() => removePower(p.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 border-t border-frame/40 pt-4 sm:grid-cols-2">
                {draft.baseKind === "weapon" && (
                  <div className="space-y-2 rounded-sm border border-frame/50 p-2">
                    <p className="font-display text-sm text-crimson">
                      Bônus ataque/dano
                    </p>
                    <Select
                      label="Valor"
                      value="1"
                      onChange={() => undefined}
                      options={[
                        { value: "1", label: "+1" },
                        { value: "2", label: "+2" },
                        { value: "3", label: "+3" },
                      ]}
                      id="add-atk"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        const sel = document.getElementById(
                          "add-atk",
                        ) as HTMLSelectElement | null;
                        const value = Number(sel?.value ?? 1) as 1 | 2 | 3;
                        addPower({
                          id: newPowerId(),
                          type: "bonus-ataque-dano",
                          value,
                        });
                      }}
                    >
                      Adicionar
                    </Button>
                  </div>
                )}

                {(draft.baseKind === "weapon" ||
                  draft.baseKind === "armor") && (
                  <div className="space-y-2 rounded-sm border border-frame/50 p-2">
                    <p className="font-display text-sm text-crimson">
                      {draft.baseKind === "armor"
                        ? "Bônus de CA (via +ataque)"
                        : "Dano extra"}
                    </p>
                    {draft.baseKind === "armor" ? (
                      <>
                        <Select
                          label="Bônus"
                          id="add-ac"
                          value="1"
                          onChange={() => undefined}
                          options={[
                            { value: "1", label: "+1 CA" },
                            { value: "2", label: "+2 CA" },
                            { value: "3", label: "+3 CA" },
                          ]}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-full"
                          onClick={() => {
                            const sel = document.getElementById(
                              "add-ac",
                            ) as HTMLSelectElement | null;
                            const value = Number(sel?.value ?? 1) as 1 | 2 | 3;
                            addPower({
                              id: newPowerId(),
                              type: "bonus-ataque-dano",
                              value,
                            });
                          }}
                        >
                          Adicionar
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-1">
                          <Input
                            label="N"
                            id="extra-n"
                            type="number"
                            min={1}
                            defaultValue={1}
                          />
                          <Select
                            label="Dado"
                            id="extra-die"
                            defaultValue="d6"
                            options={[
                              { value: "d4", label: "d4" },
                              { value: "d6", label: "d6" },
                              { value: "d8", label: "d8" },
                              { value: "d10", label: "d10" },
                              { value: "d12", label: "d12" },
                            ]}
                          />
                          <Input
                            label="Tipo"
                            id="extra-type"
                            defaultValue="fogo"
                          />
                        </div>
                        <Input
                          label="Contra (opcional)"
                          id="extra-vs"
                          placeholder="aberrações…"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-full"
                          onClick={() => {
                            const n = Number(
                              (
                                document.getElementById(
                                  "extra-n",
                                ) as HTMLInputElement
                              )?.value || 1,
                            );
                            const die = ((
                              document.getElementById(
                                "extra-die",
                              ) as HTMLSelectElement
                            )?.value || "d6") as
                              | "d4"
                              | "d6"
                              | "d8"
                              | "d10"
                              | "d12";
                            const damageType =
                              (
                                document.getElementById(
                                  "extra-type",
                                ) as HTMLInputElement
                              )?.value || "fogo";
                            const versus =
                              (
                                document.getElementById(
                                  "extra-vs",
                                ) as HTMLInputElement
                              )?.value || undefined;
                            addPower({
                              id: newPowerId(),
                              type: "dano-extra",
                              diceCount: Math.max(1, n),
                              die,
                              damageType,
                              versus: versus?.trim() || undefined,
                            });
                          }}
                        >
                          Adicionar
                        </Button>
                      </>
                    )}
                  </div>
                )}

                <div className="space-y-2 rounded-sm border border-frame/50 p-2">
                  <p className="font-display text-sm text-crimson">
                    Bônus de atributo
                  </p>
                  <Select
                    label="Atributo"
                    id="add-abi"
                    defaultValue="strength"
                    options={(
                      Object.keys(ABILITY_LABELS) as AbilityKey[]
                    ).map((k) => ({
                      value: k,
                      label: ABILITY_LABELS[k],
                    }))}
                  />
                  <Input
                    label="Valor"
                    id="add-abi-v"
                    type="number"
                    min={1}
                    max={3}
                    defaultValue={1}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      const ability = (
                        document.getElementById(
                          "add-abi",
                        ) as HTMLSelectElement
                      )?.value as AbilityKey;
                      const value = Math.max(
                        1,
                        Number(
                          (
                            document.getElementById(
                              "add-abi-v",
                            ) as HTMLInputElement
                          )?.value || 1,
                        ),
                      );
                      addPower({
                        id: newPowerId(),
                        type: "bonus-atributo",
                        ability,
                        value,
                      });
                    }}
                  >
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2 rounded-sm border border-frame/50 p-2">
                  <p className="font-display text-sm text-crimson">Perícia</p>
                  <Select
                    label="Perícia"
                    id="add-skill"
                    defaultValue="perception"
                    options={(Object.keys(SKILL_META) as SkillKey[]).map(
                      (k) => ({
                        value: k,
                        label: SKILL_META[k].label,
                      }),
                    )}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      const skill = (
                        document.getElementById(
                          "add-skill",
                        ) as HTMLSelectElement
                      )?.value as SkillKey;
                      addPower({
                        id: newPowerId(),
                        type: "pericia",
                        skill,
                      });
                    }}
                  >
                    Adicionar
                  </Button>
                </div>

                <div className="space-y-2 rounded-sm border border-frame/50 p-2 sm:col-span-2">
                  <p className="font-display text-sm text-crimson">Magia</p>
                  <Input
                    label="Buscar magia"
                    value={spellQuery}
                    onChange={(e) => setSpellQuery(e.target.value)}
                    placeholder="Nome…"
                  />
                  <ul className="max-h-28 overflow-y-auto text-sm">
                    {spellResults.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          className="w-full px-1 py-0.5 text-left hover:bg-parchment-dark"
                          onClick={() => {
                            addPower({
                              id: newPowerId(),
                              type: "magia",
                              spellId: s.id,
                              mode: "cargas",
                              chargesMin: 1,
                              chargesMax: 1,
                            });
                            setSpellQuery("");
                          }}
                        >
                          {s.name} (círculo {s.level})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 rounded-sm border border-frame/50 p-2 sm:col-span-2">
                  <p className="font-display text-sm text-crimson">
                    Texto livre
                  </p>
                  <Textarea
                    label="Efeito"
                    id="free-text"
                    placeholder="Efeito narrativo ou mecânico sem motor…"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      const text = (
                        document.getElementById(
                          "free-text",
                        ) as HTMLTextAreaElement
                      )?.value?.trim();
                      if (!text) return;
                      addPower({
                        id: newPowerId(),
                        type: "texto-livre",
                        text,
                      });
                      (
                        document.getElementById(
                          "free-text",
                        ) as HTMLTextAreaElement
                      ).value = "";
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </Panel>
          )}

          {step === 3 && (
            <Panel title="Revisão">
              <Textarea
                label="Descrição (editável; vazio = gerada automaticamente)"
                value={draft.descriptionManual ?? ""}
                onChange={(e) =>
                  patch({ descriptionManual: e.target.value })
                }
                placeholder={generateForgeDescription(draft)}
              />
              <div className="mt-4 rounded-sm border border-frame/50 bg-parchment-dark/30 p-3">
                <p className="mb-2 font-display text-sm text-crimson">
                  Pré-visualização
                </p>
                <h2 className="font-display text-xl text-crimson">
                  {previewDef.name}
                </h2>
                <p className="text-sm text-ink-muted">{previewDef.typeLine}</p>
                <div className="mt-2">
                  <ItemRichDescription description={previewDef.description} />
                </div>
              </div>
              {budget.over && (
                <p className="mt-3 text-sm text-crimson">
                  Orçamento estourado ({budget.used}/{budget.max}). A mesa
                  decide — você ainda pode salvar.
                </p>
              )}
            </Panel>
          )}

          <div className="flex flex-wrap justify-between gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Voltar
            </Button>
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
              >
                Continuar
              </Button>
            ) : (
              <Button type="button" onClick={handleSave}>
                Salvar na forja
              </Button>
            )}
          </div>
        </div>

        <aside>
          <Panel title="Orçamento de poder">
            <p className="font-display text-2xl text-crimson">
              {budget.used}
              <span className="text-base text-ink-muted"> / {budget.max}</span>
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Pontos usados / sugeridos para a raridade.
            </p>
            {budget.over && (
              <p className="mt-2">
                <Badge tone="crimson">Acima do orçamento</Badge>
              </p>
            )}
            <ul className="mt-3 space-y-1 text-xs text-ink-muted">
              {draft.powers.map((p) => (
                <li key={p.id}>
                  {p.type}: {powerCost(p)} pt
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function summarizePower(p: ForgePower): string {
  switch (p.type) {
    case "bonus-ataque-dano":
      return `+${p.value}`;
    case "dano-extra":
      return `${p.diceCount}${p.die} ${p.damageType}`;
    case "bonus-atributo":
      return `+${p.value} ${ABILITY_LABELS[p.ability]}`;
    case "pericia":
      return SKILL_META[p.skill].label;
    case "magia":
      return getSpell(p.spellId)?.name ?? p.spellId;
    case "texto-livre":
      return p.text.slice(0, 40);
    default:
      return "";
  }
}

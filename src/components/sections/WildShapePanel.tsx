"use client";

import { useMemo, useState } from "react";
import type { CharacterState } from "@/lib/character/types";
import { formatCr, getWildShapeStatBlock } from "@/config/wildShape";
import type { WildShapeForm, WildShapeStatBlock } from "@/config/wildShape";
import {
  canAffordWildShape,
  druidLevel,
  isMoonDruid,
  listAvailableWildShapes,
  maxWildShapeCr,
  wildShapeDurationHours,
  wildShapeMaxUses,
} from "@/lib/wildShape/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";

const MOVE_LABEL: Record<string, string> = {
  climb: "Escalada",
  burrow: "Escavação",
  swim: "Natação",
  fly: "Voo",
};

function ensureWildShape(state: CharacterState): NonNullable<CharacterState["wildShape"]> {
  return state.wildShape ?? { usesRemaining: 2, activeFormId: null };
}

function abilityMod(score: number): string {
  const m = Math.floor((score - 10) / 2);
  return m >= 0 ? `+${m}` : `${m}`;
}

function StatBlockView({ block }: { block: WildShapeStatBlock }) {
  const a = block.abilities;
  return (
    <div className="space-y-3 text-sm">
      <p className="italic text-ink-muted">{block.typeLine}</p>
      <ul className="space-y-0.5">
        <li>
          <strong>Classe de Armadura</strong> {block.armorClass}
          {block.armorNotes ? ` (${block.armorNotes})` : ""}
        </li>
        <li>
          <strong>Pontos de Vida</strong> {block.hitPoints}
        </li>
        <li>
          <strong>Deslocamento</strong> {block.speed}
        </li>
      </ul>
      <div className="grid grid-cols-3 gap-2 border border-frame/50 bg-parchment px-2 py-2 text-center sm:grid-cols-6">
        {(
          [
            ["FOR", a.strength],
            ["DES", a.dexterity],
            ["CON", a.constitution],
            ["INT", a.intelligence],
            ["SAB", a.wisdom],
            ["CAR", a.charisma],
          ] as const
        ).map(([label, score]) => (
          <div key={label}>
            <div className="font-display text-xs text-crimson">{label}</div>
            <div>
              {score} ({abilityMod(score)})
            </div>
          </div>
        ))}
      </div>
      {block.skills && (
        <p>
          <strong>Perícias</strong> {block.skills}
        </p>
      )}
      {block.senses && (
        <p>
          <strong>Sentidos</strong> {block.senses}
        </p>
      )}
      {block.languages && (
        <p>
          <strong>Idiomas</strong> {block.languages}
        </p>
      )}
      <p>
        <strong>Nível de Desafio</strong> {block.challenge}
      </p>
      {block.traits.length > 0 && (
        <div className="space-y-2">
          <p className="font-display text-crimson">Traços</p>
          {block.traits.map((t) => (
            <p key={t.name}>
              <em className="font-semibold">{t.name}.</em> {t.description}
            </p>
          ))}
        </div>
      )}
      {block.actions.length > 0 && (
        <div className="space-y-2">
          <p className="font-display text-crimson">Ações</p>
          {block.actions.map((t) => (
            <p key={t.name}>
              <em className="font-semibold">{t.name}.</em> {t.description}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryView({ form }: { form: WildShapeForm }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex flex-wrap gap-1">
        <Badge tone="gold">Resumo</Badge>
        <Badge>CR {formatCr(form.cr)}</Badge>
        <Badge>PV {form.hpSummary}</Badge>
        {form.movement.map((m) => (
          <Badge key={m}>{MOVE_LABEL[m] ?? m}</Badge>
        ))}
      </div>
      <p className="text-ink-muted">
        Ficha completa SRD não disponível para esta criatura. Use o resumo do
        catálogo de Forma Selvagem e a referência da mesa (MM) se precisar de
        ataques detalhados.
      </p>
      {form.traitTags.length > 0 && (
        <p>
          <strong>Traços-chave:</strong> {form.traitTags.join(", ")}
        </p>
      )}
      <p className="text-xs text-ink-muted">EN: {form.nameEn}</p>
    </div>
  );
}

export interface WildShapePanelProps {
  state: CharacterState;
  updateState: (fn: (s: CharacterState) => CharacterState) => void;
}

export function WildShapePanel({ state, updateState }: WildShapePanelProps) {
  const lvl = druidLevel(state);
  const [query, setQuery] = useState("");
  const [onlyUsable, setOnlyUsable] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(
    state.wildShape?.activeFormId ?? null,
  );

  const maxUses = wildShapeMaxUses(state);
  const ws = ensureWildShape(state);
  const list = useMemo(() => listAvailableWildShapes(state), [state]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    return list.filter(({ form, usable }) => {
      if (onlyUsable && !usable) return false;
      if (!q) return true;
      return (
        form.name.toLocaleLowerCase("pt-BR").includes(q) ||
        form.nameEn.toLocaleLowerCase("en").includes(q) ||
        formatCr(form.cr).includes(q)
      );
    });
  }, [list, query, onlyUsable]);

  const selected = list.find((x) => x.form.id === selectedId)?.form;
  const activeForm = ws.activeFormId
    ? list.find((x) => x.form.id === ws.activeFormId)?.form
    : undefined;
  const selectedBlock =
    selected?.statBlockId != null
      ? getWildShapeStatBlock(selected.statBlockId)
      : undefined;

  if (lvl < 2) {
    return (
      <Panel title="Forma Selvagem" className="lg:col-span-3">
        <p className="text-sm text-ink-muted">
          Disponível a partir do 2º nível de druida.
        </p>
      </Panel>
    );
  }

  function setUses(remaining: number) {
    updateState((s) => ({
      ...s,
      wildShape: {
        ...ensureWildShape(s),
        usesRemaining: Math.max(0, remaining),
      },
    }));
  }

  function assumeForm(form: WildShapeForm) {
    if (!canAffordWildShape(state, form) && maxUses !== "unlimited") {
      alert("Usos de Forma Selvagem insuficientes.");
      return;
    }
    updateState((s) => {
      const cur = ensureWildShape(s);
      const nextUses =
        maxUses === "unlimited"
          ? cur.usesRemaining
          : Math.max(0, cur.usesRemaining - form.wildShapeCost);
      return {
        ...s,
        wildShape: {
          usesRemaining: nextUses,
          activeFormId: form.id,
        },
      };
    });
    setSelectedId(form.id);
  }

  function revertForm() {
    updateState((s) => ({
      ...s,
      wildShape: {
        ...ensureWildShape(s),
        activeFormId: null,
      },
    }));
  }

  return (
    <Panel title="Forma Selvagem" className="lg:col-span-3">
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-sm border-2 border-crimson/40 bg-parchment px-3 py-2">
        <span className="font-display text-lg text-crimson">
          {maxUses === "unlimited" ? (
            <>Usos: Ilimitado (Arquidruida)</>
          ) : (
            <>
              Usos:{" "}
              <strong>
                {ws.usesRemaining} / {maxUses}
              </strong>
            </>
          )}
        </span>
        <Badge>CR máx. {formatCr(maxWildShapeCr(state))}</Badge>
        <Badge>Duração {wildShapeDurationHours(state)} h</Badge>
        {isMoonDruid(state) && <Badge tone="gold">Círculo da Lua</Badge>}
        {maxUses !== "unlimited" && (
          <>
            <Button
              type="button"
              variant="secondary"
              className="!px-2 !py-1 text-xs"
              onClick={() => setUses(ws.usesRemaining - 1)}
            >
              − Uso
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="!px-2 !py-1 text-xs"
              onClick={() =>
                setUses(Math.min(Number(maxUses), ws.usesRemaining + 1))
              }
            >
              + Uso
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="!px-2 !py-1 text-xs"
              onClick={() => setUses(Number(maxUses))}
            >
              Descanso curto/longo
            </Button>
          </>
        )}
      </div>

      <p className="mb-3 text-xs text-ink-muted">
        Os PV da forma são separados dos seus (não sincronizados automaticamente
        nesta ficha). Em 0 PV na forma, você reverte e o excesso de dano passa
        para você. {isMoonDruid(state) ? "Lua: ação bônus para transformar. " : ""}
        Elementais (10º Lua) custam 2 usos.
      </p>

      {activeForm && (
        <div className="mb-4 rounded-sm border-2 border-gold bg-parchment-dark/40 px-3 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-display text-crimson">
              Forma ativa: {activeForm.name}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                className="!px-2 !py-1 text-xs"
                onClick={() => setSelectedId(activeForm.id)}
              >
                Ver ficha
              </Button>
              <Button
                type="button"
                variant="danger"
                className="!px-2 !py-1 text-xs"
                onClick={revertForm}
              >
                Reverter
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <Input
              label="Buscar forma"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome ou CR…"
            />
            <Select
              label="Filtro"
              value={onlyUsable ? "usable" : "all"}
              onChange={(e) => setOnlyUsable(e.target.value === "usable")}
              options={[
                { value: "usable", label: "Só disponíveis" },
                { value: "all", label: "Todas (com bloqueio)" },
              ]}
            />
          </div>
          <ul className="max-h-80 space-y-1 overflow-y-auto text-sm">
            {filtered.length === 0 && (
              <li className="text-ink-muted">Nenhuma forma neste filtro.</li>
            )}
            {filtered.map(({ form, usable, reason }) => (
              <li key={form.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(form.id)}
                  className={`w-full rounded-sm border px-2 py-1.5 text-left ${
                    selectedId === form.id
                      ? "border-crimson bg-parchment"
                      : "border-frame/40 hover:border-frame"
                  } ${usable ? "" : "opacity-60"}`}
                >
                  <span className="font-display text-crimson">{form.name}</span>
                  <span className="text-ink-muted">
                    {" "}
                    · CR {formatCr(form.cr)} · PV {form.hpSummary}
                    {form.wildShapeCost === 2 ? " · custo 2" : ""}
                    {form.statBlockId &&
                    getWildShapeStatBlock(form.statBlockId)
                      ? ""
                      : " · resumo"}
                  </span>
                  {!usable && reason && (
                    <span className="mt-0.5 block text-xs text-crimson">
                      {reason}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm border border-frame/50 bg-parchment-dark/20 p-3">
          {!selected ? (
            <p className="text-sm text-ink-muted">
              Selecione uma forma para ver a ficha.
            </p>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-xl text-crimson">
                  {selected.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.find((x) => x.form.id === selected.id)?.usable && (
                    <Button
                      type="button"
                      className="!px-3 !py-1 text-xs"
                      onClick={() => assumeForm(selected)}
                      disabled={
                        maxUses !== "unlimited" &&
                        !canAffordWildShape(state, selected)
                      }
                    >
                      Assumir forma
                      {selected.wildShapeCost === 2 ? " (2 usos)" : ""}
                    </Button>
                  )}
                </div>
              </div>
              {selectedBlock ? (
                <StatBlockView block={selectedBlock} />
              ) : (
                <SummaryView form={selected} />
              )}
            </>
          )}
        </div>
      </div>
    </Panel>
  );
}

export function characterHasWildShape(state: CharacterState): boolean {
  return druidLevel(state) >= 2;
}

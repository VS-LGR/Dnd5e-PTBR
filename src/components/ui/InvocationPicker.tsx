"use client";

import { useMemo, useState } from "react";
import type { CharacterState } from "@/lib/character/types";
import {
  ELDRITCH_INVOCATIONS,
  maxInvocationsForWarlockLevel,
  type EldritchInvocationDef,
} from "@/config/classes/eldritchInvocations";
import { characterOwnsSpell } from "@/lib/spells";
import { Panel, Badge } from "@/components/ui/Panel";
import { Input } from "@/components/ui/Input";

export interface InvocationPickerProps {
  state: CharacterState;
  onChange: (next: CharacterState) => void;
}

function meetsPrereq(state: CharacterState, inv: EldritchInvocationDef, warlockLevel: number): boolean {
  if (warlockLevel < inv.minWarlockLevel) return false;
  if (inv.requiresSpellId && !characterOwnsSpell(state, inv.requiresSpellId)) {
    return false;
  }
  return true;
}

export function InvocationPicker({ state, onChange }: InvocationPickerProps) {
  const [query, setQuery] = useState("");
  const warlock = state.classes.find((c) => c.classId === "warlock");
  const warlockLevel = warlock?.level ?? 0;
  const max = maxInvocationsForWarlockLevel(warlockLevel);
  const selected = state.eldritchInvocations ?? [];

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ELDRITCH_INVOCATIONS.filter((inv) => {
      if (!q) return true;
      return (
        inv.name.toLowerCase().includes(q) ||
        inv.description.toLowerCase().includes(q) ||
        inv.id.includes(q)
      );
    });
  }, [query]);

  if (warlockLevel < 2) return null;

  function toggle(id: string) {
    const has = selected.includes(id);
    if (has) {
      onChange({
        ...state,
        eldritchInvocations: selected.filter((x) => x !== id),
      });
      return;
    }
    if (selected.length >= max) return;
    onChange({
      ...state,
      eldritchInvocations: [...selected, id],
    });
  }

  return (
    <Panel
      title="Invocações místicas"
      titleAside={
        <Badge tone={selected.length >= max ? "crimson" : "gold"}>
          {selected.length} / {max}
        </Badge>
      }
    >
      <p className="text-xs text-ink-muted">
        No {warlockLevel}º nível de bruxo você conhece até {max} invocações. Escolha abaixo
        (PHB + Xanathar). Pré-requisitos não atendidos ficam indicados.
      </p>
      <div className="mt-3">
        <Input
          label="Buscar invocação"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex.: rajada agonizante…"
        />
      </div>
      <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto text-sm">
        {list.map((inv) => {
          const checked = selected.includes(inv.id);
          const ok = meetsPrereq(state, inv, warlockLevel);
          const atCap = !checked && selected.length >= max;
          return (
            <li key={inv.id}>
              <label
                className={`flex cursor-pointer items-start gap-2 rounded-sm border p-2 ${
                  checked ? "border-crimson bg-parchment" : "border-frame/50"
                } ${atCap || (!ok && !checked) ? "opacity-70" : ""}`}
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={checked}
                  disabled={atCap || (!ok && !checked)}
                  onChange={() => toggle(inv.id)}
                />
                <span className="min-w-0 flex-1">
                  <span className="font-display text-crimson">{inv.name}</span>{" "}
                  <Badge>{inv.source.toUpperCase()}</Badge>
                  {!ok && (
                    <span className="ml-1 text-xs text-crimson">
                      (pré-requisito: nível {inv.minWarlockLevel}
                      {inv.requiresSpellId ? ` · ${inv.requiresSpellId}` : ""})
                    </span>
                  )}
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                    {inv.description}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

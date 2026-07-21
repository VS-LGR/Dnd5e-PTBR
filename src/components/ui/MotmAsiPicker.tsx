"use client";

import type { AbilityKey, AbilityScores } from "@/lib/character/types";
import { ABILITY_LABELS } from "@/config/tables/labels";
import { Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Panel";

const KEYS: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export type MotmAsiMode = "plus2plus1" | "plus1x3";

export interface MotmAsiPickerProps {
  mode: MotmAsiMode;
  onModeChange: (mode: MotmAsiMode) => void;
  bonuses: Partial<AbilityScores>;
  onChange: (bonuses: Partial<AbilityScores>) => void;
}

export function MotmAsiPicker({ mode, onModeChange, bonuses, onChange }: MotmAsiPickerProps) {
  const plus2 = (Object.entries(bonuses).find(([, v]) => v === 2)?.[0] as AbilityKey) ?? "";
  const plus1s = Object.entries(bonuses)
    .filter(([, v]) => v === 1)
    .map(([k]) => k as AbilityKey);

  function setPlus2Plus1(a: AbilityKey, b: AbilityKey) {
    if (!a || !b || a === b) {
      onChange(a ? { [a]: 2 } : {});
      return;
    }
    onChange({ [a]: 2, [b]: 1 });
  }

  function setPlus1x3(selected: AbilityKey[]) {
    const uniq = [...new Set(selected)].slice(0, 3);
    const next: Partial<AbilityScores> = {};
    for (const k of uniq) next[k] = 1;
    onChange(next);
  }

  const valid =
    mode === "plus2plus1"
      ? plus2 && plus1s.length === 1 && plus2 !== plus1s[0]
      : plus1s.length === 3;

  return (
    <div className="mt-4 space-y-3 rounded-sm border border-gold/40 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-xs uppercase tracking-widest text-crimson">
          Bônus de atributo MotM
        </p>
        <Badge tone={valid ? "gold" : "crimson"}>
          {valid ? "Distribuído" : "Incompleto"}
        </Badge>
      </div>
      <Select
        label="Modelo"
        value={mode}
        onChange={(e) => {
          onModeChange(e.target.value as MotmAsiMode);
          onChange({});
        }}
        options={[
          { value: "plus2plus1", label: "+2 em um e +1 em outro" },
          { value: "plus1x3", label: "+1 em três atributos" },
        ]}
      />
      {mode === "plus2plus1" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <Select
            label="+2"
            value={plus2}
            onChange={(e) =>
              setPlus2Plus1(e.target.value as AbilityKey, plus1s[0] ?? ("" as AbilityKey))
            }
            options={[
              { value: "", label: "Escolher…" },
              ...KEYS.map((k) => ({ value: k, label: ABILITY_LABELS[k] })),
            ]}
          />
          <Select
            label="+1"
            value={plus1s[0] ?? ""}
            onChange={(e) => setPlus2Plus1(plus2 as AbilityKey, e.target.value as AbilityKey)}
            options={[
              { value: "", label: "Escolher…" },
              ...KEYS.filter((k) => k !== plus2).map((k) => ({
                value: k,
                label: ABILITY_LABELS[k],
              })),
            ]}
          />
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {KEYS.map((key) => {
            const checked = plus1s.includes(key);
            return (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!checked && plus1s.length >= 3}
                  onChange={() => {
                    if (checked) setPlus1x3(plus1s.filter((k) => k !== key));
                    else setPlus1x3([...plus1s, key]);
                  }}
                />
                {ABILITY_LABELS[key]}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function isMotmAsiValid(
  mode: MotmAsiMode,
  bonuses: Partial<AbilityScores>,
): boolean {
  const entries = Object.entries(bonuses).filter(([, v]) => (v ?? 0) > 0);
  if (mode === "plus2plus1") {
    return (
      entries.length === 2 &&
      entries.some(([, v]) => v === 2) &&
      entries.some(([, v]) => v === 1)
    );
  }
  return entries.length === 3 && entries.every(([, v]) => v === 1);
}

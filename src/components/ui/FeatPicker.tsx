"use client";

import { FEATS, getFeat } from "@/config";
import type { AbilityKey } from "@/lib/character/types";
import { ABILITY_LABELS } from "@/config/tables/labels";
import { Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Panel";

export interface FeatPickerProps {
  value: string;
  onChange: (featId: string) => void;
  abilityPicks?: Partial<Record<AbilityKey, number>>;
  onAbilityPicksChange?: (picks: Partial<Record<AbilityKey, number>>) => void;
  label?: string;
  excludeIds?: string[];
}

export function FeatPicker({
  value,
  onChange,
  abilityPicks = {},
  onAbilityPicksChange,
  label = "Talento",
  excludeIds = [],
}: FeatPickerProps) {
  const feat = getFeat(value);
  const options = FEATS.filter((f) => !excludeIds.includes(f.id) || f.id === value).map((f) => ({
    value: f.id,
    label: `${f.name}${f.source === "tcoe" ? " (Tasha)" : ""}`,
  }));

  const choiceKeys = feat?.abilityBonusChoices ?? [];
  const choiceCount = feat?.abilityBonusChoiceCount ?? 1;

  return (
    <div className="space-y-3">
      <Select label={label} value={value} onChange={(e) => onChange(e.target.value)} options={options} />
      {feat && (
        <div className="rounded-sm border-2 border-crimson/30 bg-parchment p-3 text-sm">
          <div className="mb-1 flex flex-wrap gap-2">
            <span className="font-display text-base text-crimson">{feat.name}</span>
            {feat.source && <Badge tone="gold">{feat.source.toUpperCase()}</Badge>}
          </div>
          {feat.prerequisites && (
            <p className="mb-2 text-xs text-ink-muted">
              <strong>Pré-requisito:</strong> {feat.prerequisites}
            </p>
          )}
          <p className="text-ink-muted whitespace-pre-wrap">{feat.description}</p>
          {choiceKeys.length > 0 && onAbilityPicksChange && (
            <div className="mt-3 space-y-2">
              <p className="font-display text-xs uppercase tracking-widest text-crimson">
                Escolha de atributo ({choiceCount})
              </p>
              <div className="flex flex-wrap gap-3">
                {choiceKeys.map((key) => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={(abilityPicks[key] ?? 0) > 0}
                      onChange={() => {
                        const currently = (abilityPicks[key] ?? 0) > 0;
                        const next: Partial<Record<AbilityKey, number>> = { ...abilityPicks };
                        if (currently) {
                          delete next[key];
                        } else {
                          const selected = Object.keys(next).length;
                          if (selected >= choiceCount) {
                            const first = Object.keys(next)[0] as AbilityKey;
                            delete next[first];
                          }
                          next[key] = 1;
                        }
                        onAbilityPicksChange(next);
                      }}
                    />
                    {ABILITY_LABELS[key]}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

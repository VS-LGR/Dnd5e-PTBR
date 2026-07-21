"use client";

import type { AbilityKey, AbilityScores } from "@/lib/character/types";
import { ABILITY_LABELS } from "@/config/tables/labels";
import { POINT_BUY_BUDGET, POINT_BUY_COST } from "@/config/tables/progression";
import { abilityModifier } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Panel";

const KEYS: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export interface PointBuyPanelProps {
  baseAbilities: AbilityScores;
  finalScores: AbilityScores;
  onChange: (next: AbilityScores) => void;
}

function spent(scores: AbilityScores): number {
  return KEYS.reduce((sum, key) => sum + (POINT_BUY_COST[scores[key]] ?? 99), 0);
}

function costToRaise(from: number): number | null {
  if (from >= 15) return null;
  const next = from + 1;
  return (POINT_BUY_COST[next] ?? 99) - (POINT_BUY_COST[from] ?? 0);
}

export function PointBuyPanel({ baseAbilities, finalScores, onChange }: PointBuyPanelProps) {
  const used = spent(baseAbilities);
  const remaining = POINT_BUY_BUDGET - used;
  const valid = remaining === 0;

  function bump(key: AbilityKey, delta: 1 | -1) {
    const current = baseAbilities[key];
    const nextVal = current + delta;
    if (nextVal < 8 || nextVal > 15) return;
    if (delta === 1) {
      const cost = costToRaise(current);
      if (cost === null || cost > remaining) return;
    }
    onChange({ ...baseAbilities, [key]: nextVal });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={valid ? "gold" : "crimson"}>
          Pontos restantes: {remaining} / {POINT_BUY_BUDGET}
        </Badge>
        <span className="text-sm text-ink-muted">Gastos: {used}</span>
        {!valid && (
          <span className="text-sm text-crimson">
            Distribua exatamente {POINT_BUY_BUDGET} pontos para continuar.
          </span>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {KEYS.map((key) => {
          const base = baseAbilities[key];
          const raiseCost = costToRaise(base);
          const canUp = raiseCost !== null && raiseCost <= remaining;
          const canDown = base > 8;
          return (
            <div key={key} className="rounded-sm border-2 border-frame p-3">
              <p className="font-display text-sm text-crimson">{ABILITY_LABELS[key]}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="!px-3"
                  disabled={!canDown}
                  onClick={() => bump(key, -1)}
                >
                  −
                </Button>
                <div className="text-center">
                  <p className="font-display text-2xl text-ink">{base}</p>
                  <p className="text-xs text-ink-muted">
                    Final {finalScores[key]} (
                    {abilityModifier(finalScores[key]) >= 0 ? "+" : ""}
                    {abilityModifier(finalScores[key])})
                  </p>
                  <p className="text-xs text-ink-muted">
                    Custo atual {POINT_BUY_COST[base] ?? "—"}
                    {raiseCost != null ? ` · próximo +${raiseCost}` : ""}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="!px-3"
                  disabled={!canUp}
                  onClick={() => bump(key, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function isPointBuyValid(baseAbilities: AbilityScores): boolean {
  return spent(baseAbilities) === POINT_BUY_BUDGET;
}

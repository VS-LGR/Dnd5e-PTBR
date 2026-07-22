"use client";

import { useEffect, useMemo, useState } from "react";
import {
  generateName,
  getNameTableOptions,
  NAME_RACE_OPTIONS,
  raceIdToNameKey,
} from "@/config/names";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";

export interface NameGeneratorPanelProps {
  raceId?: string;
  value: string;
  onPick: (name: string) => void;
}

export function NameGeneratorPanel({
  raceId,
  value,
  onPick,
}: NameGeneratorPanelProps) {
  const defaultRace = raceIdToNameKey(raceId ?? "") ?? "human";
  const [raceKey, setRaceKey] = useState(defaultRace);
  const tableOptions = useMemo(() => getNameTableOptions(raceKey), [raceKey]);
  const [tableId, setTableId] = useState(tableOptions[0]?.id ?? "");
  const [withClan, setWithClan] = useState(true);
  const [last, setLast] = useState("");

  useEffect(() => {
    if (!raceId) return;
    const next = raceIdToNameKey(raceId);
    if (!next) return;
    setRaceKey(next);
    const opts = getNameTableOptions(next);
    setTableId(opts[0]?.id ?? "");
  }, [raceId]);

  function roll() {
    const name = generateName({
      raceKey,
      tableId: tableId || undefined,
      includeFamilyOrClan: withClan,
    });
    if (!name) return;
    setLast(name);
    onPick(name);
  }

  return (
    <div className="mt-3 space-y-2 rounded-sm border border-frame/50 bg-parchment-dark/20 p-3">
      <p className="font-display text-sm text-crimson">Gerador de nomes (Xanathar)</p>
      <p className="text-xs text-ink-muted">
        Tabelas do Apêndice B — escolha raça/cultura e sorteie. Opcional.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <Select
          label="Tabela racial / cultural"
          value={raceKey}
          onChange={(e) => {
            const next = e.target.value;
            setRaceKey(next);
            const opts = getNameTableOptions(next);
            setTableId(opts[0]?.id ?? "");
          }}
          options={NAME_RACE_OPTIONS.map((o) => ({
            value: o.id,
            label: o.label,
          }))}
          />
        <Select
          label="Subtabela"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          options={tableOptions.map((o) => ({
            value: o.id,
            label: o.label,
          }))}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={withClan}
          onChange={(e) => setWithClan(e.target.checked)}
        />
        Incluir clã / família quando houver
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="secondary" className="!px-3 !py-1 text-xs" onClick={roll}>
          Sortear nome
        </Button>
        {last && last !== value && (
          <span className="text-xs text-ink-muted">Último: {last}</span>
        )}
      </div>
    </div>
  );
}

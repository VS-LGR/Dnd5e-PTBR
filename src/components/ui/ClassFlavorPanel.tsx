"use client";

import { useEffect, useState } from "react";
import {
  formatClassFlavorText,
  getClassFlavor,
  rollClassFlavor,
} from "@/config/classes/xgteFlavor";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";

export interface ClassFlavorPanelProps {
  classId: string;
  backstory: string;
  onAppend: (text: string) => void;
}

export function ClassFlavorPanel({ classId, backstory, onAppend }: ClassFlavorPanelProps) {
  const pack = getClassFlavor(classId);
  const [picks, setPicks] = useState<Record<string, string>>({});

  useEffect(() => {
    setPicks({});
  }, [classId]);

  if (!pack) return null;

  function sortear() {
    setPicks(rollClassFlavor(classId));
  }

  function append() {
    const text = formatClassFlavorText(classId, picks).trim();
    if (!text || Object.keys(picks).length === 0) return;
    const next = backstory.trim() ? `${backstory.trim()}\n\n${text}` : text;
    onAppend(next);
  }

  return (
    <div className="mt-4 space-y-3 rounded-sm border border-frame/50 bg-parchment-dark/20 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-sm text-crimson">Sabor de classe (Xanathar)</p>
          <p className="text-xs text-ink-muted">
            Tabelas de personalidade e detalhe — opcional, só para roleplay.
          </p>
        </div>
        <Button type="button" variant="secondary" className="!px-3 !py-1 text-xs" onClick={sortear}>
          Sortear tudo
        </Button>
      </div>
      <div className="space-y-2">
        {pack.tables.map((table) => (
          <Select
            key={table.id}
            label={table.name}
            value={picks[table.id] ?? ""}
            onChange={(e) =>
              setPicks((prev) => ({ ...prev, [table.id]: e.target.value }))
            }
            options={[
              { value: "", label: "Escolher…" },
              ...table.options.map((o) => ({ value: o, label: o })),
            ]}
          />
        ))}
      </div>
      <Button
        type="button"
        className="!px-3 !py-1 text-xs"
        disabled={Object.values(picks).every((v) => !v)}
        onClick={append}
      >
        Acrescentar à história
      </Button>
    </div>
  );
}

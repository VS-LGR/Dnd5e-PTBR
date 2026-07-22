"use client";

import { useState } from "react";
import { generateLifePathText } from "@/config/lifePath";
import { Button } from "@/components/ui/Button";

export interface LifePathPanelProps {
  raceId?: string;
  backgroundId?: string;
  classId?: string;
  chaMod?: number;
  backstory: string;
  onAppend: (text: string) => void;
}

export function LifePathPanel({
  raceId,
  backgroundId,
  classId,
  chaMod,
  backstory,
  onAppend,
}: LifePathPanelProps) {
  const [preview, setPreview] = useState("");

  function roll() {
    setPreview(
      generateLifePathText({
        raceId,
        backgroundId,
        classId,
        chaMod,
      }),
    );
  }

  function append() {
    const block = preview.trim();
    if (!block) return;
    const next = backstory.trim()
      ? `${backstory.trim()}\n\n${block}`
      : block;
    onAppend(next);
  }

  return (
    <div className="mt-6 space-y-3 rounded-sm border border-frame/50 bg-parchment-dark/20 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-sm text-crimson">Essa é Sua Vida (Xanathar)</p>
          <p className="text-xs text-ink-muted">
            Gerador opcional de origem, família e eventos — só texto de história, sem
            mudar mecânica.
          </p>
        </div>
        <Button type="button" variant="secondary" className="!px-3 !py-1 text-xs" onClick={roll}>
          Sortear
        </Button>
      </div>
      {preview && (
        <>
          <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-sm border border-frame/40 bg-parchment px-2 py-2 text-xs text-ink">
            {preview}
          </pre>
          <Button type="button" className="!px-3 !py-1 text-xs" onClick={append}>
            Acrescentar à história
          </Button>
        </>
      )}
    </div>
  );
}

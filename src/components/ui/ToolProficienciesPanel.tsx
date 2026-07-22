"use client";

import { useState } from "react";
import {
  formatToolTooltip,
  resolveTool,
  type ToolDefinition,
} from "@/config/tools";
import { Badge } from "@/components/ui/Panel";

function ToolChip({ label }: { label: string }) {
  const tool = resolveTool(label);
  const [open, setOpen] = useState(false);

  if (!tool) {
    return (
      <span className="rounded-sm border border-frame/40 bg-parchment px-2 py-1 text-sm">
        {label}
      </span>
    );
  }

  return (
    <div className="rounded-sm border border-frame/40 bg-parchment">
      <button
        type="button"
        title={formatToolTooltip(tool)}
        className="flex w-full items-center justify-between gap-2 px-2 py-1 text-left text-sm"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          <span className="font-display text-crimson">{tool.name}</span>
          <span className="text-ink-muted"> · {tool.ability}</span>
        </span>
        <Badge tone="gold">Xanathar</Badge>
      </button>
      {open && <ToolDetails tool={tool} />}
    </div>
  );
}

function ToolDetails({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="border-t border-frame/30 px-2 py-2 text-xs text-ink-muted">
      <p>{tool.summary}</p>
      {tool.utilize.length > 0 && (
        <ul className="mt-1 list-inside list-disc">
          {tool.utilize.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      )}
      {tool.craft && tool.craft.length > 0 && (
        <p className="mt-1">
          <strong className="text-ink">Criar:</strong> {tool.craft.join(", ")}
        </p>
      )}
    </div>
  );
}

export interface ToolProficienciesPanelProps {
  tools: string[];
  className?: string;
  /** Também listar ferramentas tipicamente da classe (quando o estado ainda não as tem). */
  extraHints?: string[];
}

export function ToolProficienciesPanel({
  tools,
  className = "",
  extraHints = [],
}: ToolProficienciesPanelProps) {
  const merged = [...new Set([...tools, ...extraHints].filter(Boolean))];
  if (merged.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-ink-muted">Nenhuma proficiência com ferramentas.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-xs text-ink-muted">
        Clique para ver usos expandidos (Guia de Xanathar). Passe o mouse para o
        resumo.
      </p>
      <ul className="space-y-1">
        {merged.map((label) => (
          <li key={label}>
            <ToolChip label={label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

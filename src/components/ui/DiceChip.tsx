import type { ReactNode } from "react";

export interface DiceChipProps {
  formula: string;
  title?: string;
  className?: string;
}

/** Highlight for dice formulas (1d8, 3d4+2, 1d100). */
export function DiceChip({ formula, title, className = "" }: DiceChipProps) {
  return (
    <span
      title={title ?? `Rolagem: ${formula}`}
      className={`inline-flex items-center rounded-sm border border-crimson/50 bg-parchment px-1.5 py-0.5 font-mono text-xs font-semibold tracking-wide text-crimson shadow-[inset_0_0_0_1px_rgba(107,28,28,0.08)] transition-[border-color,background-color] duration-150 hover:border-crimson hover:bg-parchment-dark ${className}`}
    >
      {formula}
    </span>
  );
}

export interface DcChipProps {
  label: string;
  className?: string;
}

export function DcChip({ label, className = "" }: DcChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-gold/60 bg-parchment px-1.5 py-0.5 font-display text-xs uppercase tracking-wide text-gold ${className}`}
    >
      {label}
    </span>
  );
}

export interface EffectTableProps {
  die?: string;
  title?: string;
  headers: string[];
  rows: string[][];
  caption?: string;
}

/** Roll / effect table for magic items. */
export function EffectTable({ die, title, headers, rows, caption }: EffectTableProps) {
  return (
    <div className="my-4 overflow-hidden rounded-sm border-2 border-frame bg-parchment shadow-[0_1px_4px_var(--phb-shadow)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-frame/60 bg-parchment-dark/60 px-3 py-2">
        <p className="font-display text-sm uppercase tracking-wide text-crimson">
          {title ? `Tabela — ${title}` : "Tabela de efeitos"}
        </p>
        {die && <DiceChip formula={die} title={`Role ${die}`} />}
      </div>
      <div className="max-h-[28rem] overflow-auto">
        <table className="w-full min-w-[16rem] border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-frame bg-parchment-dark/40">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="sticky top-0 bg-parchment-dark/90 px-3 py-2 font-display text-xs uppercase tracking-wide text-ink"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row[0]}-${i}`}
                className="border-b border-frame/30 odd:bg-parchment even:bg-parchment-dark/20"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 align-top leading-snug ${
                      j === 0
                        ? "w-[5.5rem] whitespace-nowrap font-mono text-xs font-semibold text-crimson"
                        : "text-ink"
                    }`}
                  >
                    {j === 0 ? cell : <RichInline text={cell} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RichInline({ text }: { text: string }) {
  // Lazy inline dice in table cells without circular imports
  const parts: ReactNode[] = [];
  const re = /\b(\d+d\d+(?:\s*[+-]\s*\d+)?)\b/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<DiceChip key={`d-${key++}`} formula={m[1]!.replace(/\s+/g, "")} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

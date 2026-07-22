/** Parse item descriptions into prose, dice highlights, and roll tables. */

export type InlineNode =
  | { type: "text"; text: string }
  | { type: "dice"; formula: string }
  | { type: "dc"; label: string };

export type DescriptionBlock =
  | { type: "paragraph"; nodes: InlineNode[] }
  | {
      type: "table";
      die?: string;
      title?: string;
      headers: string[];
      rows: string[][];
    };

const DICE_RE = /\b(\d+d\d+(?:\s*[+-]\s*\d+)?)\b/gi;
const DC_RE = /\b((?:CD|DC)\s*\d+)\b/gi;
const TABLE_START_RE = /\b(1d(?:4|6|8|10|12|20|100))\b\s+([A-Za-zÀ-ÿ][^0-9]{0,80}?)(?=\s*\d{2}\b)/i;
const ROW_RE =
  /(?:^|\s)(\d{2})(?:\s*[–\-—]\s*(\d{2})|(?=\s+(?:\d+d\d+|[A-ZÀ-Ý])))\s+/g;

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const combined = new RegExp(`${DICE_RE.source}|${DC_RE.source}`, "gi");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = combined.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push({ type: "text", text: text.slice(last, m.index) });
    }
    const token = m[0];
    if (/^(?:CD|DC)/i.test(token)) {
      nodes.push({ type: "dc", label: token.replace(/^DC\s*/i, "CD ") });
    } else {
      nodes.push({ type: "dice", formula: token.replace(/\s+/g, "") });
    }
    last = m.index + token.length;
  }
  if (last < text.length) {
    nodes.push({ type: "text", text: text.slice(last) });
  }
  return nodes.length ? nodes : [{ type: "text", text }];
}

function parseRows(body: string): Array<{ roll: string; effect: string }> {
  const matches = [...body.matchAll(ROW_RE)];
  if (matches.length < 2) return [];

  const rows: Array<{ roll: string; effect: string }> = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i]!;
    const start = (cur.index ?? 0) + cur[0].length;
    const end = i + 1 < matches.length ? matches[i + 1]!.index! : body.length;
    const from = cur[1]!;
    const to = cur[2];
    const roll = to ? `${from}–${to}` : from;
    let effect = body.slice(start, end).trim();
    // Drop repeated die+header fragments inside body
    effect = effect.replace(/\b1d(?:4|6|8|10|12|20|100)\b\s+[A-Za-zÀ-ÿ][^0-9]{0,40}/gi, " ").trim();
    effect = effect.replace(/\s+/g, " ");
    if (effect.length < 2) continue;
    rows.push({ roll, effect });
  }
  return rows;
}

/**
 * Detect roll tables mashed into prose (common after PDF extract).
 * Returns prose before first table + zero or more tables + trailing prose.
 */
export function parseItemDescription(description: string): DescriptionBlock[] {
  const text = description.replace(/\s+/g, " ").trim();
  if (!text) return [];

  const blocks: DescriptionBlock[] = [];
  let remaining = text;

  while (remaining) {
    const start = remaining.search(TABLE_START_RE);
    if (start < 0) {
      if (remaining.trim()) {
        blocks.push({ type: "paragraph", nodes: parseInline(remaining.trim()) });
      }
      break;
    }

    const before = remaining.slice(0, start).trim();
    if (before) {
      blocks.push({ type: "paragraph", nodes: parseInline(before) });
    }

    const match = remaining.slice(start).match(TABLE_START_RE);
    if (!match) {
      blocks.push({ type: "paragraph", nodes: parseInline(remaining) });
      break;
    }

    const die = match[1]!;
    const title = match[2]!.replace(/\s+/g, " ").trim();
    const afterHeader = remaining.slice(start + match[0].length);
    const rows = parseRows(afterHeader);

    if (rows.length < 2) {
      // Not a real table — keep as prose including the die mention
      const chunkEnd = Math.min(afterHeader.length, 200);
      const proseChunk = remaining.slice(start, start + match[0].length + chunkEnd);
      blocks.push({ type: "paragraph", nodes: parseInline(proseChunk.trim()) });
      remaining = remaining.slice(start + proseChunk.length);
      continue;
    }

    // Consume through last row: find end of last row's effect in afterHeader
    const last = rows[rows.length - 1]!;
    const lastIdx = afterHeader.lastIndexOf(last.effect);
    const consumed =
      lastIdx >= 0 ? match[0].length + lastIdx + last.effect.length : match[0].length;

    blocks.push({
      type: "table",
      die,
      title,
      headers: ["Resultado", title || "Efeito"],
      rows: rows.map((r) => [r.roll, r.effect]),
    });

    remaining = remaining.slice(start + consumed).trim();
    // Skip duplicate "1d100 Title" headers that PDF repeated mid-table
    remaining = remaining.replace(
      /^(?:1d(?:4|6|8|10|12|20|100)\s+[A-Za-zÀ-ÿ][^0-9]{0,40})+/i,
      "",
    ).trim();
  }

  return blocks;
}

/** Collect unique dice formulas for catalog chips. */
export function extractDiceFormulas(description: string, limit = 4): string[] {
  const found: string[] = [];
  const seen = new Set<string>();
  for (const m of description.matchAll(DICE_RE)) {
    const f = m[1]!.replace(/\s+/g, "");
    const key = f.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(f);
    if (found.length >= limit) break;
  }
  return found;
}

export function descriptionHasTable(description: string): boolean {
  return parseItemDescription(description).some((b) => b.type === "table");
}

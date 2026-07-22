import {
  parseItemDescription,
  type DescriptionBlock,
  type InlineNode,
} from "@/lib/items/parseDescription";
import { DiceChip, DcChip, EffectTable } from "@/components/ui/DiceChip";

function renderInline(nodes: InlineNode[]) {
  return nodes.map((n, i) => {
    if (n.type === "dice") {
      return <DiceChip key={i} formula={n.formula} />;
    }
    if (n.type === "dc") {
      return <DcChip key={i} label={n.label} />;
    }
    return <span key={i}>{n.text}</span>;
  });
}

function BlockView({ block }: { block: DescriptionBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-sm leading-relaxed text-ink [&_.inline-flex]:mx-0.5 [&_.inline-flex]:align-baseline">
        {renderInline(block.nodes)}
      </p>
    );
  }
  return (
    <EffectTable
      die={block.die}
      title={block.title}
      headers={block.headers}
      rows={block.rows}
      caption={
        block.die
          ? `Tabela de efeitos — role ${block.die}`
          : "Tabela de efeitos do item"
      }
    />
  );
}

export interface ItemRichDescriptionProps {
  description: string;
  /** Optional curated tables (shown after parsed content). */
  extraTables?: Array<{
    die?: string;
    title?: string;
    headers: string[];
    rows: string[][];
  }>;
  className?: string;
}

export function ItemRichDescription({
  description,
  extraTables,
  className = "",
}: ItemRichDescriptionProps) {
  const blocks = parseItemDescription(description);

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
      {extraTables?.map((t, i) => (
        <EffectTable
          key={`extra-${i}`}
          die={t.die}
          title={t.title}
          headers={t.headers}
          rows={t.rows}
        />
      ))}
    </div>
  );
}

import Link from "next/link";
import { getSpell } from "@/config/spells";
import { Panel, Badge } from "@/components/ui/Panel";

export interface SpellDetailSectionProps {
  spellId: string;
}

export function SpellDetailSection({ spellId }: SpellDetailSectionProps) {
  const spell = getSpell(spellId);
  if (!spell) {
    return (
      <div>
        <h1 className="font-display text-3xl text-crimson">Magia não encontrada</h1>
        <Link href="/spells" className="text-crimson underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-4">
      <div>
        <Link href="/spells" className="text-sm text-ink-muted underline">
          ← Catálogo
        </Link>
        <h1 className="mt-2 font-display text-4xl text-crimson">{spell.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge tone="crimson">
            {spell.level === 0 ? "Truque" : `${spell.level}º nível`}
          </Badge>
          <Badge>{spell.school}</Badge>
          {spell.ritual && <Badge tone="gold">Ritual</Badge>}
          {spell.concentration && <Badge tone="crimson">Concentração</Badge>}
        </div>
      </div>

      <Panel title="Detalhes">
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-crimson">Tempo de conjuração</dt>
            <dd>{spell.castingTime}</dd>
          </div>
          <div>
            <dt className="text-crimson">Alcance</dt>
            <dd>{spell.range}</dd>
          </div>
          <div>
            <dt className="text-crimson">Componentes</dt>
            <dd>
              {[
                spell.components.v && "V",
                spell.components.s && "S",
                spell.components.m && `M (${spell.components.m})`,
              ]
                .filter(Boolean)
                .join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-crimson">Duração</dt>
            <dd>{spell.duration}</dd>
          </div>
        </dl>
        <p className="mt-4 text-ink-muted">{spell.description}</p>
        {spell.higherLevels && (
          <p className="mt-3 italic text-ink-muted">
            <strong>Em níveis superiores.</strong> {spell.higherLevels}
          </p>
        )}
      </Panel>
    </article>
  );
}

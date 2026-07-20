import Link from "next/link";
import { RULE_ARTICLES } from "@/config/rules/articles";
import { Panel } from "@/components/ui/Panel";

export function RulesIndexSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-crimson">Regras</h1>
        <p className="text-ink-muted">
          Explicações claras para consulta rápida durante a criação e o jogo.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {RULE_ARTICLES.map((article) => (
          <li key={article.slug}>
            <Panel title={article.title}>
              <p className="text-sm text-ink-muted">{article.summary}</p>
              <Link
                href={`/rules/${article.slug}`}
                className="mt-3 inline-block font-display text-sm text-crimson underline"
              >
                Ler artigo
              </Link>
            </Panel>
          </li>
        ))}
      </ul>
    </div>
  );
}

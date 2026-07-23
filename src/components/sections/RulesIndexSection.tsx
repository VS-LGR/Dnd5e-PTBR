import Link from "next/link";
import { RULE_ARTICLES } from "@/config/rules/articles";
import { PageHeader } from "@/components/ui/PageHeader";

export function RulesIndexSection() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Regras"
        description="Explicações claras para consulta rápida durante a criação e o jogo."
      />
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {RULE_ARTICLES.map((article) => (
          <li key={article.slug} className="min-w-0">
            <Link
              href={`/rules/${article.slug}`}
              className="group flex h-full flex-col rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-4 shadow-[0_2px_8px_var(--phb-shadow)] transition hover:border-crimson hover:shadow-[0_4px_14px_var(--phb-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:p-5"
            >
              <h2 className="border-b-2 border-crimson/80 pb-2 font-display text-base tracking-wide text-crimson sm:text-lg">
                {article.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {article.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-display text-sm !text-crimson transition group-hover:gap-2">
                Ler artigo
                <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

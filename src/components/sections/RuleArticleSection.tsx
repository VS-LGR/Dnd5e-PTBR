import Link from "next/link";
import { getRuleArticle } from "@/config/rules/articles";
import { Panel } from "@/components/ui/Panel";

export interface RuleArticleSectionProps {
  slug: string;
}

export function RuleArticleSection({ slug }: RuleArticleSectionProps) {
  const article = getRuleArticle(slug);
  if (!article) {
    return (
      <div>
        <h1 className="font-display text-3xl text-crimson">Artigo não encontrado</h1>
        <Link href="/rules" className="text-crimson underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-4">
      <Link href="/rules" className="text-sm text-ink-muted underline">
        ← Índice de regras
      </Link>
      <h1 className="font-display text-4xl text-crimson">{article.title}</h1>
      <p className="text-lg text-ink-muted">{article.summary}</p>
      {article.sections.map((section) => (
        <Panel key={section.heading} title={section.heading}>
          <p className="text-ink-muted">{section.body}</p>
        </Panel>
      ))}
    </article>
  );
}

import type { Metadata } from "next";
import { RuleArticleSection } from "@/components/sections/RuleArticleSection";
import { RULE_ARTICLES } from "@/config/rules/articles";

export function generateStaticParams() {
  return RULE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = RULE_ARTICLES.find((a) => a.slug === slug);
  return { title: article?.title ?? "Regra" };
}

export default async function RulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RuleArticleSection slug={slug} />;
}

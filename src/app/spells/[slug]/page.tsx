import type { Metadata } from "next";
import { SpellDetailSection } from "@/components/sections/SpellDetailSection";
import { SPELLS } from "@/config/spells";

export function generateStaticParams() {
  return SPELLS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spell = SPELLS.find((s) => s.id === slug);
  return { title: spell?.name ?? "Magia" };
}

export default async function SpellPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SpellDetailSection spellId={slug} />;
}

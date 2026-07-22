import type { Metadata } from "next";
import { ItemDetailSection } from "@/components/sections/ItemDetailSection";
import { ITEMS } from "@/config/items";

export function generateStaticParams() {
  return ITEMS.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = ITEMS.find((i) => i.id === slug);
  return { title: item?.name ?? "Item" };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ItemDetailSection itemId={slug} />;
}

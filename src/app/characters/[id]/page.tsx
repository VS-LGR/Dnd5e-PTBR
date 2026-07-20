import type { Metadata } from "next";
import { CharacterSheetSection } from "@/components/sections/CharacterSheetSection";

export const metadata: Metadata = {
  title: "Ficha",
};

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CharacterSheetSection characterId={id} />;
}

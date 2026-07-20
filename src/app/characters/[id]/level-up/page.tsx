import type { Metadata } from "next";
import { LevelUpSection } from "@/components/sections/LevelUpSection";

export const metadata: Metadata = {
  title: "Subir de nível",
};

export default async function LevelUpPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LevelUpSection characterId={id} />;
}

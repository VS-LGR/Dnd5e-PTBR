import type { Metadata } from "next";
import { CharacterWizardSection } from "@/components/sections/CharacterWizardSection";

export const metadata: Metadata = {
  title: "Criar personagem",
};

export default function NewCharacterPage() {
  return <CharacterWizardSection />;
}

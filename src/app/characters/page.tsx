import type { Metadata } from "next";
import { CharacterListSection } from "@/components/sections/CharacterListSection";

export const metadata: Metadata = {
  title: "Personagens",
};

export default function CharactersPage() {
  return <CharacterListSection />;
}

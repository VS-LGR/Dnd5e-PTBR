import type { Metadata } from "next";
import { SpellsCatalogSection } from "@/components/sections/SpellsCatalogSection";

export const metadata: Metadata = {
  title: "Magias",
};

export default function SpellsPage() {
  return <SpellsCatalogSection />;
}

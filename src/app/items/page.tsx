import type { Metadata } from "next";
import { ItemsCatalogSection } from "@/components/sections/ItemsCatalogSection";

export const metadata: Metadata = {
  title: "Itens",
};

export default function ItemsPage() {
  return <ItemsCatalogSection />;
}

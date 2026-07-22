import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { ItemsCatalogSection } from "@/components/sections/ItemsCatalogSection";

export const metadata: Metadata = {
  title: "Itens",
};

export default function ItemsPage() {
  return (
    <>
      <ItemsCatalogSection />
      <div className="mt-10">
        <AdSlot slotKey="catalog" format="horizontal" minHeight={90} />
      </div>
    </>
  );
}

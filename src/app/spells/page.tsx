import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { SpellsCatalogSection } from "@/components/sections/SpellsCatalogSection";

export const metadata: Metadata = {
  title: "Magias",
};

export default function SpellsPage() {
  return (
    <>
      <SpellsCatalogSection />
      <div className="mt-10">
        <AdSlot slotKey="catalog" minHeight={90} />
      </div>
    </>
  );
}

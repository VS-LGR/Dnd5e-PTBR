import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { RulesIndexSection } from "@/components/sections/RulesIndexSection";

export const metadata: Metadata = {
  title: "Regras",
};

export default function RulesPage() {
  return (
    <>
      <RulesIndexSection />
      <div className="mt-10">
        <AdSlot slotKey="catalog" format="horizontal" minHeight={90} />
      </div>
    </>
  );
}

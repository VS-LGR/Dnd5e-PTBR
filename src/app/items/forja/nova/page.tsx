import type { Metadata } from "next";
import { Suspense } from "react";
import { ForgeWizardSection } from "@/components/sections/forge/ForgeWizardSection";

export const metadata: Metadata = {
  title: "Novo item — Forja",
};

export default function ForgeNovaPage() {
  return (
    <Suspense fallback={<p className="text-ink-muted">Carregando assistente…</p>}>
      <ForgeWizardSection />
    </Suspense>
  );
}

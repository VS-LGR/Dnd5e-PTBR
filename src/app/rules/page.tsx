import type { Metadata } from "next";
import { RulesIndexSection } from "@/components/sections/RulesIndexSection";

export const metadata: Metadata = {
  title: "Regras",
};

export default function RulesPage() {
  return <RulesIndexSection />;
}

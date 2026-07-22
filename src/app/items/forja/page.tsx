import type { Metadata } from "next";
import { ForgeListSection } from "@/components/sections/forge/ForgeListSection";

export const metadata: Metadata = {
  title: "Forja de Itens",
};

export default function ForgePage() {
  return <ForgeListSection />;
}

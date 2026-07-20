import type { Metadata } from "next";
import { AuthSection } from "@/components/sections/AuthSection";

export const metadata: Metadata = {
  title: "Conta",
};

export default function AuthPage() {
  return <AuthSection />;
}

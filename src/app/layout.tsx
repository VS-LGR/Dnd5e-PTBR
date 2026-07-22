import type { Metadata } from "next";
import { Cinzel, Libre_Baskerville } from "next/font/google";
import { ADSENSE_CLIENT } from "@/config/ads";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Grimório do Aventureiro | Ferramenta de RPG compatível com DnD 5e",
    template: "%s | Grimório do Aventureiro",
  },
  description:
    "Ferramenta de RPG compatível com DnD 5e: criação e gestão de fichas de personagem em português.",
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cinzel.variable} ${libre.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

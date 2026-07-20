import type { Metadata } from "next";
import { Cinzel, Libre_Baskerville } from "next/font/google";
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
    default: "Grimório do Aventureiro | D&D 5e PT-BR",
    template: "%s | Grimório do Aventureiro",
  },
  description:
    "Ferramenta de criação e gestão de fichas de personagem Dungeons & Dragons 5ª Edição em português.",
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

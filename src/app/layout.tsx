import type { Metadata } from "next";
import { Cinzel, Libre_Baskerville } from "next/font/google";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { ADSENSE_CLIENT } from "@/config/ads";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/config/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE}: criação e gestão de fichas de personagem em português.`,
  alternates: {
    canonical: "/",
  },
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
        <AdSenseScript />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

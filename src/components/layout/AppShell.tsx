import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";

const nav = [
  { href: "/", label: "Início" },
  { href: "/characters", label: "Personagens" },
  { href: "/characters/new", label: "Criar" },
  { href: "/spells", label: "Magias" },
  { href: "/items", label: "Itens" },
  { href: "/items/forja", label: "Forja" },
  { href: "/rules", label: "Regras" },
  { href: "/auth", label: "Conta" },
];

export function Header() {
  return (
    <header className="border-b-4 border-crimson bg-[linear-gradient(180deg,#2a1a12_0%,#1a1208_100%)] text-parchment">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group">
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.25em]">
            Ferramenta de RPG compatível com DnD 5e
          </p>
          <p className="font-display text-2xl tracking-wide text-parchment group-hover:text-gold">
            Grimório do Aventureiro
          </p>
        </Link>
        <nav className="flex flex-wrap gap-1" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-1.5 font-display text-sm tracking-wide text-parchment/90 hover:bg-crimson/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-frame bg-parchment-dark/80">
      <div className="border-b border-frame/30 px-4 py-4">
        <AdSlot slotKey="footer" format="horizontal" minHeight={90} />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-ink-muted">
        <p className="font-display text-crimson">Grimório do Aventureiro</p>
        <p className="mt-1">
          Ferramenta de RPG compatível com DnD 5e. Não afiliado à Wizards of the Coast.
          Conteúdo de regras baseado no SRD sob Creative Commons — use apenas material
          autorizado em produção pública.
        </p>
      </div>
    </footer>
  );
}

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}

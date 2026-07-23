import type { ReactNode } from "react";
import { DONATE_URL } from "@/config/site";
import { AdSlot } from "@/components/ads/AdSlot";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SupportWelcomeModal } from "@/components/ui/SupportWelcomeModal";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-frame bg-parchment-dark/80">
      <div className="border-b border-frame/30 px-4 py-4">
        <AdSlot slotKey="footer" minHeight={90} />
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm text-ink-muted sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="min-w-0 space-y-2">
          <p className="font-display text-base text-crimson">Grimório do Aventureiro</p>
          <p className="max-w-2xl leading-relaxed">
            Ferramenta de RPG compatível com DnD 5e. Não afiliado à Wizards of the Coast.
            Conteúdo de regras baseado no SRD sob Creative Commons — use apenas material
            autorizado em produção pública.
          </p>
          <p className="leading-relaxed">
            Gostou do projeto?{" "}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display !text-crimson underline decoration-crimson/40 underline-offset-2 hover:decoration-crimson"
            >
              Apoie com uma doação
            </a>{" "}
            para manter o sistema no ar — é opcional e sempre bem-vindo.
          </p>
        </div>
        <p className="font-display text-xs uppercase tracking-widest text-ink-muted/70 sm:pt-1 sm:text-right">
          Feito para jogadores BR
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
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8 md:py-10">
        {children}
      </main>
      <Footer />
      <SupportWelcomeModal />
    </div>
  );
}

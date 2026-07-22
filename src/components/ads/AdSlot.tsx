"use client";

import {
  ADSENSE_SLOTS,
  type AdSlotKey,
} from "@/config/ads";

export interface AdSlotProps {
  /** Chave de slot configurada em `src/config/ads.ts`. */
  slotKey: AdSlotKey;
  className?: string;
  /** Altura mínima do espaço reservado. */
  minHeight?: number;
}

/**
 * Espaço reservado para propaganda — compacto e fora do fluxo crítico.
 * A conta AdSense é vinculada pela meta tag `google-adsense-account` no layout.
 */
export function AdSlot({
  slotKey,
  className = "",
  minHeight = 90,
}: AdSlotProps) {
  // Mantém a chave no DOM para futura unidade (data-ad-slot) sem carregar script aqui.
  const slotId = ADSENSE_SLOTS[slotKey];

  return (
    <aside
      className={`ad-slot mx-auto w-full max-w-6xl ${className}`}
      aria-label="Publicidade"
      data-ad-slot-key={slotKey}
      data-ad-slot={slotId || undefined}
    >
      <p className="mb-1 text-center font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/70">
        Publicidade
      </p>
      <div
        className="flex items-center justify-center overflow-hidden rounded-sm border border-frame/30 bg-parchment-dark/20 px-3 text-center text-xs text-ink-muted/60"
        style={{ minHeight }}
      >
        Espaço reservado para anúncios
      </div>
    </aside>
  );
}

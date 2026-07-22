"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_SLOTS,
  adsEnabled,
  type AdSlotKey,
} from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export interface AdSlotProps {
  slotKey: AdSlotKey;
  className?: string;
  minHeight?: number;
}

/**
 * Unidade AdSense (ins + push). Script carregado uma vez no layout.
 */
export function AdSlot({
  slotKey,
  className = "",
  minHeight = 90,
}: AdSlotProps) {
  const slotId = ADSENSE_SLOTS[slotKey];
  const pushed = useRef(false);
  const live = adsEnabled() && Boolean(slotId);

  useEffect(() => {
    if (!live || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Script ainda carregando ou bloqueador de anúncios.
    }
  }, [live, slotId]);

  return (
    <aside
      className={`ad-slot mx-auto w-full max-w-6xl ${className}`}
      aria-label="Publicidade"
      data-ad-slot-key={slotKey}
    >
      <p className="mb-1 text-center font-display text-[10px] uppercase tracking-[0.2em] text-ink-muted/70">
        Publicidade
      </p>
      <div
        className="overflow-hidden rounded-sm border border-frame/30 bg-parchment-dark/20"
        style={{ minHeight }}
      >
        {live ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div
            className="flex items-center justify-center px-3 text-center text-xs text-ink-muted/60"
            style={{ minHeight }}
          >
            Espaço reservado para anúncios
          </div>
        )}
      </div>
    </aside>
  );
}

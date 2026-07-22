/** Google AdSense — IDs públicos (ca-pub-…). */

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-2183854536970513";

/**
 * Ativa anúncios reais. Em desenvolvimento fica só o placeholder
 * (evita erros no console sem o script / política do AdSense).
 * Force com NEXT_PUBLIC_ADSENSE_ENABLED=true.
 */
export function adsEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "false") return false;
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true") return true;
  return process.env.NODE_ENV === "production";
}

/** Unidades de anúncio (data-ad-slot). */
export const ADSENSE_SLOTS = {
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "6339416281",
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "3014534934",
  catalog: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CATALOG ?? "7644759099",
} as const;

export type AdSlotKey = keyof typeof ADSENSE_SLOTS;

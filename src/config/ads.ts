/** Google AdSense — IDs públicos (ca-pub-…). */

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-2183854536970513";

/** Ativa anúncios reais (ins + push). Em desenvolvimento fica só o espaço reservado. */
export function adsEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "false") return false;
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true") return true;
  return process.env.NODE_ENV === "production";
}

/** Slots opcionais criados no painel AdSense (data-ad-slot). */
export const ADSENSE_SLOTS = {
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "",
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
  catalog: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CATALOG ?? "",
} as const;

export type AdSlotKey = keyof typeof ADSENSE_SLOTS;

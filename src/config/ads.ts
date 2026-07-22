/** Google AdSense — IDs públicos (ca-pub-…). */

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-2183854536970513";

/** Slots opcionais (quando houver unidades no painel). */
export const ADSENSE_SLOTS = {
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "",
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
  catalog: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CATALOG ?? "",
} as const;

export type AdSlotKey = keyof typeof ADSENSE_SLOTS;

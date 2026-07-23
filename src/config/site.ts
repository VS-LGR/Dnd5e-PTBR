/** URL canônica do site (produção). */

export const SITE_HOST = "dnd-br.com.br";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_HOST}`;

export const SITE_NAME = "Grimório do Aventureiro";

export const SITE_TAGLINE = "Ferramenta de RPG compatível com DnD 5e";

/** Doação PayPal (manutenção e evolução do projeto). */
export const DONATE_URL =
  process.env.NEXT_PUBLIC_DONATE_URL ??
  "https://www.paypal.com/donate/?business=CDBN7C2YF6EDJ&no_recurring=0&item_name=Oi%21+Me+ajude+a+manter+o+sistema+no+ar%21+%3A%29&currency_code=BRL";

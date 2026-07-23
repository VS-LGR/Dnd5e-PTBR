/** URL canônica do site (produção). */

export const SITE_HOST = "dnd-br.com.br";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_HOST}`;

export const SITE_NAME = "Grimório do Aventureiro";

export const SITE_TAGLINE = "Ferramenta de RPG compatível com DnD 5e";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

function HeroBrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-cover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b1c1c" />
          <stop offset="100%" stopColor="#3d1010" />
        </linearGradient>
        <linearGradient id="hero-page" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f4e4c1" />
          <stop offset="100%" stopColor="#e0c994" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="8"
        width="44"
        height="48"
        rx="3"
        fill="url(#hero-cover)"
        stroke="#8b6914"
        strokeWidth="2"
      />
      <rect x="10" y="8" width="7" height="48" rx="2" fill="#4a1212" />
      <rect x="20" y="12" width="30" height="40" rx="1.5" fill="url(#hero-page)" />
      <path
        d="M24 20h22M24 26h22M24 32h16M24 38h20"
        stroke="#8b6914"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M35 22 L43 30 L35 44 L27 30 Z"
        fill="#6b1c1c"
        stroke="#8b6914"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M35 22 L43 30 L35 30 Z" fill="#8b1e1e" />
      <path d="M35 30 L43 30 L35 44 Z" fill="#4a1212" />
      <text
        x="35"
        y="34.5"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="9"
        fontWeight="700"
        fill="#f4e4c1"
      >
        20
      </text>
    </svg>
  );
}

export function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-sm border-2 border-frame bg-[linear-gradient(145deg,var(--phb-parchment)_0%,var(--phb-parchment-dark)_48%,#d4be96_100%)] px-5 py-8 shadow-[0_4px_20px_var(--phb-shadow)] sm:px-8 sm:py-12 md:px-10 md:py-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(107,28,28,0.18), transparent 42%), radial-gradient(circle at 88% 72%, rgba(139,105,20,0.16), transparent 38%)",
        }}
        aria-hidden
      />
      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-14">
        <div className="min-w-0 max-w-2xl">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-gold sm:text-xs sm:tracking-[0.32em]">
            Ferramenta de RPG compatível com DnD 5e
          </p>
          <h1 className="mt-3 font-display text-[2.15rem] leading-[1.1] tracking-wide text-crimson sm:text-5xl md:text-[3.25rem]">
            Grimório do Aventureiro
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Crie fichas em português, evolua personagens, gerencie magias e consulte regras —
            feito para a mesa brasileira.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/characters/new" className="sm:w-auto">
              <Button type="button" className="w-full sm:w-auto">
                Criar personagem
              </Button>
            </Link>
            <Link href="/characters" className="sm:w-auto">
              <Button type="button" variant="secondary" className="w-full sm:w-auto">
                Meus personagens
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto flex shrink-0 items-center justify-center md:mx-0 md:justify-self-end">
          <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60">
            <div
              className="pointer-events-none absolute inset-0 rounded-full border border-gold/30 bg-parchment/35 shadow-[inset_0_0_40px_rgba(139,105,20,0.12)]"
              aria-hidden
            />
            <HeroBrandMark className="relative h-[78%] w-[78%] drop-shadow-[0_8px_18px_rgba(26,18,8,0.28)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturesSection() {
  const items = [
    {
      title: "Criação guiada",
      body: "Siga o Capítulo 1: raça, classe, atributos, antecedente e equipamento.",
      href: "/characters/new",
      cta: "Começar ficha",
    },
    {
      title: "Ficha viva",
      body: "HP, CA, perícias, slots e DC calculados automaticamente pelo motor de regras.",
      href: "/characters",
      cta: "Ver personagens",
    },
    {
      title: "Magias e regras",
      body: "Catálogo pesquisável e artigos claros para iniciantes e veteranos.",
      href: "/spells",
      cta: "Abrir magias",
    },
    {
      title: "Itens e combate",
      body: "Armas, armaduras, poções e itens mágicos com dano e bônus de ataque.",
      href: "/items",
      cta: "Abrir itens",
    },
    {
      title: "Forja de Itens",
      body: "Monte itens mágicos com orçamento por raridade e use na ficha.",
      href: "/items/forja",
      cta: "Abrir forja",
    },
  ];

  return (
    <section className="mt-8 sm:mt-10" aria-labelledby="home-features-heading">
      <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
        <h2
          id="home-features-heading"
          className="font-display text-xl tracking-wide text-crimson sm:text-2xl"
        >
          O que você encontra aqui
        </h2>
        <Link
          href="/rules"
          className="shrink-0 font-display text-xs uppercase tracking-wider !text-crimson underline decoration-crimson/30 underline-offset-2 hover:decoration-crimson sm:text-sm"
        >
          Ver regras
        </Link>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="min-w-0">
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-4 shadow-[0_2px_8px_var(--phb-shadow)] transition hover:border-crimson hover:shadow-[0_4px_14px_var(--phb-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:p-5"
            >
              <h3 className="border-b-2 border-crimson/80 pb-2 font-display text-base tracking-wide text-crimson sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-display text-sm !text-crimson transition group-hover:gap-2">
                {item.cta}
                <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

export function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-sm border-2 border-frame bg-[linear-gradient(135deg,var(--phb-parchment)_0%,var(--phb-parchment-dark)_55%,#d9c4a0_100%)] p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(107,28,28,0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(139,105,20,0.12), transparent 35%)",
        }}
      />
      <div className="relative max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">Ferramenta de mesa</p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-crimson sm:text-5xl">
          Grimório do Aventureiro
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Crie fichas de D&D 5e em português, evolua personagens, gerencie magias e consulte regras.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/characters/new">
            <Button type="button">Criar personagem</Button>
          </Link>
          <Link href="/characters">
            <Button type="button" variant="secondary">
              Meus personagens
            </Button>
          </Link>
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
    },
    {
      title: "Ficha viva",
      body: "HP, CA, perícias, slots e DC calculados automaticamente pelo motor de regras.",
      href: "/characters",
    },
    {
      title: "Magias e regras",
      body: "Catálogo pesquisável e artigos claros para iniciantes e veteranos.",
      href: "/spells",
    },
    {
      title: "Itens e combate",
      body: "Armas, armaduras, poções e itens mágicos com dano e bônus de ataque.",
      href: "/items",
    },
    {
      title: "Forja de Itens",
      body: "Monte itens mágicos com orçamento por raridade e use na ficha.",
      href: "/items/forja",
    },
  ];
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Panel key={item.title} title={item.title}>
          <p className="text-ink-muted">{item.body}</p>
          <Link href={item.href} className="mt-3 inline-block font-display text-sm text-crimson underline">
            Abrir
          </Link>
        </Panel>
      ))}
    </section>
  );
}

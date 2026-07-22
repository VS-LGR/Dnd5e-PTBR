import Link from "next/link";
import { getItem } from "@/config/items";
import { Panel, Badge } from "@/components/ui/Panel";

const RARITY_LABEL: Record<string, string> = {
  mundane: "Mundano",
  common: "Comum",
  uncommon: "Incomum",
  rare: "Rara",
  "very-rare": "Muito rara",
  legendary: "Lendária",
  artifact: "Artefato",
  varies: "Variável",
};

export function ItemDetailSection({ itemId }: { itemId: string }) {
  const item = getItem(itemId);
  if (!item) {
    return (
      <div>
        <p>Item não encontrado.</p>
        <Link href="/items" className="text-crimson underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/items" className="text-sm text-ink-muted underline">
        ← Catálogo de itens
      </Link>
      <Panel title={item.name}>
        <div className="flex flex-wrap gap-2">
          <Badge>{item.kind === "magic" ? "Mágico" : "Mundano"}</Badge>
          <Badge tone="gold">{RARITY_LABEL[item.rarity] ?? item.rarity}</Badge>
          <Badge>{item.category}</Badge>
          {item.requiresAttunement && <Badge tone="crimson">Sintonização</Badge>}
        </div>
        {item.typeLine && (
          <p className="mt-2 text-sm italic text-ink-muted">{item.typeLine}</p>
        )}
        {item.nameEn && (
          <p className="mt-1 text-xs text-ink-muted">EN: {item.nameEn}</p>
        )}

        {item.weaponStats && (
          <div className="mt-4 rounded-sm border border-frame/50 bg-parchment p-3">
            <p className="font-display text-sm uppercase text-crimson">Combate</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                Dano: <strong>{item.weaponStats.damage}</strong>{" "}
                {item.weaponStats.damageType}
              </li>
              <li>
                Tipo:{" "}
                {item.weaponStats.category === "simple" ? "simples" : "marcial"} /{" "}
                {item.weaponStats.range === "melee" ? "corpo a corpo" : "à distância"}
              </li>
              {item.weaponStats.properties.length > 0 && (
                <li>Propriedades: {item.weaponStats.properties.join(", ")}</li>
              )}
              {item.weaponStats.normalRangeM != null && (
                <li>
                  Alcance: {item.weaponStats.normalRangeM}/
                  {item.weaponStats.longRangeM} m
                </li>
              )}
              {item.weaponStats.versatile && (
                <li>Versátil: {item.weaponStats.versatile}</li>
              )}
            </ul>
          </div>
        )}

        {item.armorStats && (
          <div className="mt-4 rounded-sm border border-frame/50 bg-parchment p-3">
            <p className="font-display text-sm uppercase text-crimson">Proteção</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li>
                CA: <strong>{item.armorStats.baseAc}</strong>
                {item.armorStats.category !== "shield" &&
                  (item.armorStats.dexCap == null
                    ? " + modificador de Destreza"
                    : ` + DES (máx. +${item.armorStats.dexCap})`)}
              </li>
              {item.armorStats.stealthDisadvantage && (
                <li>Desvantagem em Furtividade</li>
              )}
              {item.armorStats.strengthRequirement != null && (
                <li>Requisito de Força: {item.armorStats.strengthRequirement}</li>
              )}
            </ul>
          </div>
        )}

        {item.variants && item.variants.length > 0 && (
          <div className="mt-4 text-sm">
            <p className="font-display text-sm uppercase text-crimson">Variantes</p>
            <ul className="mt-1 list-disc pl-5">
              {item.variants.map((v) => (
                <li key={v.idSuffix}>
                  +{v.magicBonus} ({RARITY_LABEL[v.rarity] ?? v.rarity})
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
          {item.description}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {item.costGp != null && (
            <div>
              <dt className="text-ink-muted">Custo</dt>
              <dd>{item.costGp} PO</dd>
            </div>
          )}
          {item.weight != null && (
            <div>
              <dt className="text-ink-muted">Peso</dt>
              <dd>{item.weight} lb</dd>
            </div>
          )}
          {item.source && (
            <div>
              <dt className="text-ink-muted">Fonte</dt>
              <dd>{item.source}</dd>
            </div>
          )}
        </dl>
      </Panel>
    </div>
  );
}

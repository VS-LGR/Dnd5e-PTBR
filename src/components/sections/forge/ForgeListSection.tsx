"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Panel, Badge } from "@/components/ui/Panel";
import {
  deleteForgeItem,
  listForgeItems,
} from "@/lib/items/forgeRepository";
import type { CustomMagicItem } from "@/lib/items/forgeTypes";

const RARITY_LABEL: Record<string, string> = {
  common: "Comum",
  uncommon: "Incomum",
  rare: "Rara",
  "very-rare": "Muito rara",
  legendary: "Lendária",
  artifact: "Artefato",
  varies: "Variável",
};

export function ForgeListSection() {
  const router = useRouter();
  const [items, setItems] = useState<CustomMagicItem[]>([]);

  const refresh = () => setItems(listForgeItems());

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">
            <Link href="/items" className="underline">
              Itens
            </Link>{" "}
            / Forja
          </p>
          <h1 className="font-display text-3xl text-crimson">Forja de Itens</h1>
          <p className="mt-1 max-w-xl text-ink-muted">
            Monte itens mágicos customizados com orçamento por raridade e use-os
            na ficha ao equipar.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => router.push("/items/forja/nova")}
          >
            Novo item
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/items/forja/nova?modelo=1")}
          >
            Usar modelo
          </Button>
        </div>
      </div>

      <Panel title="Criados nesta mesa">
        {items.length === 0 ? (
          <p className="text-sm text-ink-muted">
            Nenhum item na forja ainda. Comece com &quot;Novo item&quot; ou
            parta de um modelo do catálogo.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-frame/40 py-2"
              >
                <div>
                  <Link
                    href={`/items/${item.id}`}
                    className="font-display text-lg text-crimson hover:underline"
                  >
                    {item.name || "Sem nome"}
                  </Link>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge tone="gold">Criado</Badge>
                    <Badge>{RARITY_LABEL[item.rarity] ?? item.rarity}</Badge>
                    <Badge>
                      {item.baseKind === "weapon"
                        ? "Arma"
                        : item.baseKind === "armor"
                          ? "Armadura"
                          : "Maravilha"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="!px-3 !py-1 text-xs"
                    onClick={() =>
                      router.push(`/items/forja/nova?edit=${item.id}`)
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    className="!px-3 !py-1 text-xs"
                    onClick={() => {
                      if (
                        !confirm(
                          `Remover "${item.name || "item"}" da forja?`,
                        )
                      )
                        return;
                      deleteForgeItem(item.id);
                      refresh();
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

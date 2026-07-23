"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listCharacters, deleteCharacter, type CharacterRecord } from "@/lib/character/repository";
import { classSummary } from "@/lib/character/levelUp";
import { getRace } from "@/config";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";
import { CloudAuthBanner } from "@/components/ui/CloudAuthBanner";
import { hasSupabaseConfig } from "@/lib/supabase/client";

export function CharacterListSection() {
  const [items, setItems] = useState<CharacterRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const cloud = hasSupabaseConfig();

  async function refresh() {
    setLoading(true);
    try {
      setItems(await listCharacters());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Meus personagens"
        description={
          cloud
            ? "Com a Conta, suas fichas sincronizam entre aparelhos. Sem login, você vê as fichas deste dispositivo."
            : "As fichas ficam salvas neste dispositivo."
        }
        actions={
          <Link href="/characters/new">
            <Button type="button" className="w-full sm:w-auto">
              Novo personagem
            </Button>
          </Link>
        }
      />

      <CloudAuthBanner />

      {loading ? (
        <p className="text-ink-muted">Carregando…</p>
      ) : items.length === 0 ? (
        <Panel title="Nenhuma ficha ainda">
          <p className="text-ink-muted">Comece pelo assistente de criação.</p>
          <Link href="/characters/new" className="mt-4 inline-block">
            <Button type="button">Criar personagem</Button>
          </Link>
        </Panel>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((item) => (
            <li key={item.id} className="min-w-0">
              <Panel title={item.name}>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {getRace(item.data.raceId)?.name} · {classSummary(item.data.classes)} · Nível{" "}
                  {item.level}
                </p>
                <p className="mt-1.5 text-xs text-ink-muted/80">
                  Atualizado {new Date(item.updatedAt).toLocaleString("pt-BR")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/characters/${item.id}`}>
                    <Button type="button">Abrir</Button>
                  </Link>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={async () => {
                      if (!confirm("Excluir?")) return;
                      await deleteCharacter(item.id);
                      await refresh();
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

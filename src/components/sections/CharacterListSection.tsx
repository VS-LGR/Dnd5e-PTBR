"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listCharacters, deleteCharacter, type CharacterRecord } from "@/lib/character/repository";
import { classSummary } from "@/lib/character/levelUp";
import { getRace } from "@/config";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

export function CharacterListSection() {
  const [items, setItems] = useState<CharacterRecord[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-crimson">Meus personagens</h1>
          <p className="text-ink-muted">
            Sem Supabase configurado, as fichas ficam salvas neste navegador.
          </p>
        </div>
        <Link href="/characters/new">
          <Button type="button">Novo personagem</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-ink-muted">Carregando…</p>
      ) : items.length === 0 ? (
        <Panel title="Nenhuma ficha ainda">
          <p className="text-ink-muted">Comece pelo assistente de criação.</p>
          <Link href="/characters/new" className="mt-3 inline-block">
            <Button type="button">Criar personagem</Button>
          </Link>
        </Panel>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <Panel title={item.name}>
                <p className="text-sm text-ink-muted">
                  {getRace(item.data.raceId)?.name} · {classSummary(item.data.classes)} · Nível{" "}
                  {item.level}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Atualizado {new Date(item.updatedAt).toLocaleString("pt-BR")}
                </p>
                <div className="mt-3 flex gap-2">
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

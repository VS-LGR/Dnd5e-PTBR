"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SPELLS, searchSpells, CLASS_SPELL_LISTS } from "@/config/spells";
import { CLASSES } from "@/config";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";

export function SpellsCatalogSection() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [classId, setClassId] = useState("all");

  const results = useMemo(() => {
    let list = query ? searchSpells(query) : SPELLS;
    if (level !== "all") {
      list = list.filter((s) => s.level === Number(level));
    }
    if (classId !== "all") {
      const ids = new Set(CLASS_SPELL_LISTS[classId] ?? []);
      list = list.filter((s) => ids.has(s.id));
    }
    return list;
  }, [query, level, classId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-crimson">Magias</h1>
        <p className="text-ink-muted">
          Catálogo com {SPELLS.length} magias em português. Filtre por classe e nível.
        </p>
      </div>

      <Panel title="Filtros">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input label="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select
            label="Nível"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={[
              { value: "all", label: "Todos" },
              ...Array.from({ length: 10 }, (_, i) => ({
                value: String(i),
                label: i === 0 ? "Truques" : `${i}º nível`,
              })),
            ]}
          />
          <Select
            label="Classe"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            options={[
              { value: "all", label: "Todas" },
              ...CLASSES.filter((c) => CLASS_SPELL_LISTS[c.id]).map((c) => ({
                value: c.id,
                label: c.name,
              })),
            ]}
          />
        </div>
      </Panel>

      <ul className="grid gap-2 sm:grid-cols-2">
        {results.map((spell) => (
          <li key={spell.id}>
            <Link
              href={`/spells/${spell.id}`}
              className="block rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-3 hover:border-crimson"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-lg text-crimson">{spell.name}</span>
                <Badge>
                  {spell.level === 0 ? "Truque" : `${spell.level}º`}
                </Badge>
                {spell.ritual && <Badge tone="gold">Ritual</Badge>}
                {spell.concentration && <Badge tone="crimson">Conc.</Badge>}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{spell.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

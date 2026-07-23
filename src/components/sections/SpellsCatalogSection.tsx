"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SPELLS, searchSpells, CLASS_SPELL_LISTS } from "@/config/spells";
import { CLASSES } from "@/config";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Magias"
        description={`Catálogo com ${SPELLS.length} magias em português. Filtre por classe e nível.`}
      />

      <Panel title="Filtros">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
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

      <p className="text-sm text-ink-muted">
        {results.length} magia{results.length === 1 ? "" : "s"} encontrada
        {results.length === 1 ? "" : "s"}
      </p>

      <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {results.map((spell) => (
          <li key={spell.id} className="min-w-0">
            <Link
              href={`/spells/${spell.id}`}
              className="block h-full rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-3.5 shadow-[0_1px_4px_var(--phb-shadow)] transition hover:border-crimson hover:shadow-[0_3px_10px_var(--phb-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson sm:p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-base text-crimson sm:text-lg">{spell.name}</span>
                <Badge>{spell.level === 0 ? "Truque" : `${spell.level}º`}</Badge>
                {spell.ritual && <Badge tone="gold">Ritual</Badge>}
                {spell.concentration && <Badge tone="crimson">Conc.</Badge>}
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {spell.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

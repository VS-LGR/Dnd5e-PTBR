"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, FEATS, getClass } from "@/config";
import { ABILITY_LABELS } from "@/config/tables/labels";
import type { AbilityKey, CharacterState } from "@/lib/character/types";
import { getCharacter, saveCharacter } from "@/lib/character/repository";
import { applyLevelUp } from "@/lib/character/levelUp";
import { characterLevel } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";
import { FeatPicker } from "@/components/ui/FeatPicker";

export interface LevelUpSectionProps {
  characterId: string;
}

export function LevelUpSection({ characterId }: LevelUpSectionProps) {
  const router = useRouter();
  const [state, setState] = useState<CharacterState | null>(null);
  const [classId, setClassId] = useState("fighter");
  const [subclassId, setSubclassId] = useState("");
  const [hitDieRoll, setHitDieRoll] = useState(5);
  const [mode, setMode] = useState<"asi" | "feat" | "none">("asi");
  const [asiAbility, setAsiAbility] = useState<AbilityKey>("strength");
  const [asiAmount, setAsiAmount] = useState(2);
  const [featId, setFeatId] = useState(FEATS[0]?.id ?? "alert");
  const [featAbilityPicks, setFeatAbilityPicks] = useState<
    Partial<Record<AbilityKey, number>>
  >({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void getCharacter(characterId).then((r) => {
      if (!r) return;
      setState(r.data);
      setClassId(r.data.classes[0]?.classId ?? "fighter");
    });
  }, [characterId]);

  const classDef = getClass(classId);
  const nextClassLevel = (state?.classes.find((c) => c.classId === classId)?.level ?? 0) + 1;
  const nextLevel = state ? characterLevel(state) + 1 : 1;
  const isAsiLevel = [4, 8, 12, 16, 19].includes(nextClassLevel);

  async function confirm() {
    if (!state) return;
    setSaving(true);
    try {
      let next = applyLevelUp(state, {
        classId,
        hitDieRoll,
        subclassId: subclassId || null,
        asi: mode === "asi" && isAsiLevel ? { [asiAbility]: asiAmount } : undefined,
        featId: mode === "feat" && isAsiLevel ? featId : undefined,
      });
      if (mode === "feat" && isAsiLevel && featId) {
        next = {
          ...next,
          featAbilityPicks: {
            ...next.featAbilityPicks,
            [featId]: featAbilityPicks,
          },
        };
      }
      await saveCharacter(next, characterId);
      router.push(`/characters/${characterId}`);
    } finally {
      setSaving(false);
    }
  }

  if (!state) return <p className="text-ink-muted">Carregando…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-crimson">Subir de nível</h1>
        <p className="text-ink-muted">
          {state.name} — nível atual {characterLevel(state)} → {nextLevel}
        </p>
      </div>

      <Panel title="Escolhas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Classe a avançar (ou multiclasse)"
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              setSubclassId("");
            }}
            options={CLASSES.map((c) => ({ value: c.id, label: c.name }))}
          />
          {classDef && (
            <Select
              label="Subclasse"
              value={subclassId}
              onChange={(e) => setSubclassId(e.target.value)}
              options={[
                { value: "", label: "Manter / escolher depois" },
                ...classDef.subclasses.map((s) => ({ value: s.id, label: s.name })),
              ]}
            />
          )}
          <Input
            label={`Rolagem do dado de vida (média ${classDef ? Math.floor(classDef.hitDie / 2) + 1 : 5})`}
            type="number"
            min={1}
            max={classDef?.hitDie ?? 12}
            value={hitDieRoll}
            onChange={(e) => setHitDieRoll(Number(e.target.value))}
          />
        </div>

        {isAsiLevel && (
          <div className="mt-4 space-y-3 rounded-sm border border-gold/50 p-3">
            <p className="font-display text-sm text-gold">
              Este nível concede Melhoria de Atributo ou Talento
            </p>
            <Select
              label="Opção"
              value={mode}
              onChange={(e) => setMode(e.target.value as typeof mode)}
              options={[
                { value: "asi", label: "Melhoria de atributo" },
                { value: "feat", label: "Talento" },
                { value: "none", label: "Decidir depois" },
              ]}
            />
            {mode === "asi" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Select
                  label="Atributo"
                  value={asiAbility}
                  onChange={(e) => setAsiAbility(e.target.value as AbilityKey)}
                  options={Object.entries(ABILITY_LABELS).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                />
                <Select
                  label="Bônus"
                  value={String(asiAmount)}
                  onChange={(e) => setAsiAmount(Number(e.target.value))}
                  options={[
                    { value: "2", label: "+2 em um atributo" },
                    { value: "1", label: "+1" },
                  ]}
                />
              </div>
            )}
            {mode === "feat" && (
              <FeatPicker
                value={featId}
                onChange={setFeatId}
                abilityPicks={featAbilityPicks}
                onAbilityPicksChange={setFeatAbilityPicks}
              />
            )}
          </div>
        )}

        <Button type="button" className="mt-4" disabled={saving} onClick={confirm}>
          {saving ? "Aplicando…" : "Confirmar nível"}
        </Button>
      </Panel>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, FEATS, getClass, getSubclass } from "@/config";
import { ABILITY_LABELS } from "@/config/tables/labels";
import type { AbilityKey, CharacterState } from "@/lib/character/types";
import { getCharacter, saveCharacter } from "@/lib/character/repository";
import {
  applyLevelUp,
  isAsiLevel,
  isSubclassChoiceRequired,
  shouldOfferSubclassChoice,
} from "@/lib/character/levelUp";
import { characterLevel } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
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
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void getCharacter(characterId).then((r) => {
      if (!r) return;
      setState(r.data);
      const primary = r.data.classes[0]?.classId ?? "fighter";
      setClassId(primary);
      const def = getClass(primary);
      setHitDieRoll(def ? Math.floor(def.hitDie / 2) + 1 : 5);
    });
  }, [characterId]);

  const classDef = getClass(classId);
  const existing = state?.classes.find((c) => c.classId === classId);
  const currentClassLevel = existing?.level ?? 0;
  const existingSubclassId = existing?.subclassId ?? null;
  const nextClassLevel = currentClassLevel + 1;
  const nextCharacterLevel = state ? characterLevel(state) + 1 : 1;

  const offerSubclass = shouldOfferSubclassChoice(
    classId,
    currentClassLevel,
    existingSubclassId,
  );
  const requireSubclass = isSubclassChoiceRequired(
    classId,
    currentClassLevel,
    existingSubclassId,
  );
  const asiThisLevel = isAsiLevel(classId, nextClassLevel);

  const existingSubclassName = useMemo(() => {
    if (!existingSubclassId) return null;
    return getSubclass(classId, existingSubclassId)?.name ?? existingSubclassId;
  }, [classId, existingSubclassId]);

  useEffect(() => {
    setSubclassId("");
    setMode("asi");
    if (classDef) {
      setHitDieRoll(Math.floor(classDef.hitDie / 2) + 1);
    }
  }, [classId, classDef]);

  async function confirm() {
    if (!state) return;
    setError(null);

    if (requireSubclass && !subclassId) {
      setError(
        `Ao alcançar o nível ${classDef?.subclassLevel} de ${classDef?.name}, a escolha de subclasse é obrigatória.`,
      );
      return;
    }

    setSaving(true);
    try {
      let next = applyLevelUp(state, {
        classId,
        hitDieRoll,
        subclassId: offerSubclass ? subclassId || null : null,
        asi: mode === "asi" && asiThisLevel ? { [asiAbility]: asiAmount } : undefined,
        featId: mode === "feat" && asiThisLevel ? featId : undefined,
      });
      if (mode === "feat" && asiThisLevel && featId) {
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao subir de nível");
      setSaving(false);
    }
  }

  if (!state) return <p className="text-ink-muted">Carregando…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-crimson">Subir de nível</h1>
        <p className="text-ink-muted">
          {state.name} — personagem {characterLevel(state)} → {nextCharacterLevel}
          {existing ? (
            <>
              {" "}
              · {classDef?.name} {currentClassLevel} → {nextClassLevel}
            </>
          ) : (
            <>
              {" "}
              · nova classe {classDef?.name} 1
            </>
          )}
        </p>
      </div>

      <Panel title="Escolhas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Classe a avançar (ou multiclasse)"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            options={CLASSES.map((c) => ({ value: c.id, label: c.name }))}
          />

          {existingSubclassName && (
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-display text-xs uppercase tracking-widest text-crimson">
                Subclasse atual
              </span>
              <p className="rounded-sm border-2 border-frame bg-parchment px-3 py-2">
                {existingSubclassName}{" "}
                <Badge tone="gold">já escolhida</Badge>
              </p>
            </div>
          )}

          {offerSubclass && classDef && (
            <Select
              label={`Subclasse (nível ${classDef.subclassLevel}${requireSubclass ? " — obrigatória" : ""})`}
              value={subclassId}
              onChange={(e) => setSubclassId(e.target.value)}
              options={[
                { value: "", label: "Escolher subclasse…" },
                ...classDef.subclasses.map((s) => ({
                  value: s.id,
                  label: `${s.name}${s.source === "tcoe" ? " (Tasha)" : ""}`,
                })),
              ]}
            />
          )}

          {!offerSubclass && !existingSubclassName && classDef && (
            <div className="flex flex-col gap-1 text-sm text-ink-muted">
              <span className="font-display text-xs uppercase tracking-widest text-crimson">
                Subclasse
              </span>
              <p className="rounded-sm border border-frame/60 px-3 py-2">
                Disponível no nível {classDef.subclassLevel} de {classDef.name} (você
                chegará a {nextClassLevel}).
              </p>
            </div>
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

        {asiThisLevel && (
          <div className="mt-4 space-y-3 rounded-sm border border-gold/50 p-3">
            <p className="font-display text-sm text-gold">
              Nível {nextClassLevel} de {classDef?.name} concede Melhoria de Atributo ou
              Talento
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

        {error && <p className="mt-3 text-sm text-crimson">{error}</p>}

        <Button
          type="button"
          className="mt-4"
          disabled={saving || (requireSubclass && !subclassId)}
          onClick={confirm}
        >
          {saving ? "Aplicando…" : "Confirmar nível"}
        </Button>
      </Panel>
    </div>
  );
}

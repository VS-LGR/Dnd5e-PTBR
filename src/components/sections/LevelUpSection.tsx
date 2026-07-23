"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, FEATS, getClass, getSubclass } from "@/config";
import type { AbilityKey, CharacterState } from "@/lib/character/types";
import { getCharacter, saveCharacter } from "@/lib/character/repository";
import {
  applyLevelUp,
  asiLevelsForClass,
  isAsiLevel,
  isSubclassChoiceRequired,
  shouldOfferSubclassChoice,
} from "@/lib/character/levelUp";
import { characterLevel } from "@/lib/rules";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Panel, Badge } from "@/components/ui/Panel";
import {
  AsiChoicePanel,
  asiBonusesFromPanel,
  validateAsiPanel,
  type AsiPanelMode,
} from "@/components/ui/AsiChoicePanel";

export interface LevelUpSectionProps {
  characterId: string;
}

export function LevelUpSection({ characterId }: LevelUpSectionProps) {
  const router = useRouter();
  const [state, setState] = useState<CharacterState | null>(null);
  const [classId, setClassId] = useState("fighter");
  const [subclassId, setSubclassId] = useState("");
  const [hitDieRoll, setHitDieRoll] = useState(5);
  const [asiMode, setAsiMode] = useState<AsiPanelMode>("asi2");
  const [abilityPrimary, setAbilityPrimary] = useState<AbilityKey>("strength");
  const [abilitySecondary, setAbilitySecondary] = useState<AbilityKey>("constitution");
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
    setAsiMode("asi2");
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

    if (asiThisLevel) {
      const asiError = validateAsiPanel(asiMode, abilityPrimary, abilitySecondary, featId);
      if (asiError) {
        setError(asiError);
        return;
      }
    }

    setSaving(true);
    try {
      const asi =
        asiThisLevel && (asiMode === "asi2" || asiMode === "asi1x2")
          ? asiBonusesFromPanel(asiMode, abilityPrimary, abilitySecondary)
          : undefined;

      let next = applyLevelUp(state, {
        classId,
        hitDieRoll,
        subclassId: offerSubclass ? subclassId || null : null,
        asi,
        featId: asiThisLevel && asiMode === "feat" ? featId : undefined,
      });
      if (asiThisLevel && asiMode === "feat" && featId) {
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

  const avgHit = classDef ? Math.floor(classDef.hitDie / 2) + 1 : 5;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl text-crimson sm:text-3xl">Subir de nível</h1>
        <p className="mt-1 text-sm text-ink-muted sm:text-base">
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

      <Panel title="Escolhas do nível">
        <div className="grid grid-cols-1 gap-5">
          <Select
            label="Classe a avançar (ou multiclasse)"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            options={CLASSES.map((c) => ({ value: c.id, label: c.name }))}
          />

          {existingSubclassName && (
            <div className="flex flex-col gap-1.5 text-sm">
              <span className="font-display text-xs uppercase tracking-widest text-crimson">
                Subclasse atual
              </span>
              <p className="min-h-11 rounded-sm border-2 border-frame bg-parchment px-3 py-2.5 text-base">
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
                  label: `${s.name}${
                    s.source === "tcoe"
                      ? " (Tasha)"
                      : s.source === "xgte"
                        ? " (Xanathar)"
                        : ""
                  }`,
                })),
              ]}
            />
          )}

          {!offerSubclass && !existingSubclassName && classDef && (
            <div className="flex flex-col gap-1.5 text-sm text-ink-muted">
              <span className="font-display text-xs uppercase tracking-widest text-crimson">
                Subclasse
              </span>
              <p className="rounded-sm border border-frame/60 px-3 py-2.5 text-sm leading-relaxed">
                Disponível no nível {classDef.subclassLevel} de {classDef.name}. Neste avanço
                você chega ao nível {nextClassLevel} — ainda não precisa escolher.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <Input
              label={`Rolagem do dado de vida (d${classDef?.hitDie ?? 8})`}
              type="number"
              inputMode="numeric"
              min={1}
              max={classDef?.hitDie ?? 12}
              value={hitDieRoll}
              onChange={(e) => setHitDieRoll(Number(e.target.value))}
            />
            <p className="text-xs leading-relaxed text-ink-muted">
              Some o valor rolado (ou a média {avgHit}) + modificador de Constituição aos PV
              máximos. A média de um d{classDef?.hitDie ?? 8} é {avgHit}.
            </p>
          </div>
        </div>

        {asiThisLevel && (
          <div className="mt-5">
            <AsiChoicePanel
              heading={`Nível ${nextClassLevel} de ${classDef?.name}: melhoria de atributo ou talento`}
              helpText="Este nível concede o benefício de Aumento no Valor de Habilidade. Escolha uma opção: +2 em um atributo, +1 em dois atributos diferentes, ou um talento no lugar disso."
              mode={asiMode}
              onModeChange={setAsiMode}
              abilityPrimary={abilityPrimary}
              onAbilityPrimaryChange={setAbilityPrimary}
              abilitySecondary={abilitySecondary}
              onAbilitySecondaryChange={setAbilitySecondary}
              featId={featId}
              onFeatIdChange={setFeatId}
              featAbilityPicks={featAbilityPicks}
              onFeatAbilityPicksChange={setFeatAbilityPicks}
              raceId={state.raceId}
              subraceId={state.subraceId}
              allowDefer
            />
          </div>
        )}

        {!asiThisLevel && classDef && (
          <p className="mt-5 rounded-sm border border-frame/50 bg-parchment/50 px-3 py-2.5 text-sm text-ink-muted">
            O nível {nextClassLevel} de {classDef.name} não concede melhoria de atributo nem
            talento
            {(() => {
              const upcoming = asiLevelsForClass(classId).filter((l) => l > nextClassLevel);
              if (upcoming.length === 0) return ".";
              return `. Próximos ASI desta classe: ${upcoming.slice(0, 3).join(", ")}.`;
            })()}
          </p>
        )}

        {error && <p className="mt-4 text-sm text-crimson">{error}</p>}

        <Button
          type="button"
          className="mt-5 min-h-12 w-full touch-manipulation sm:w-auto"
          disabled={saving || (requireSubclass && !subclassId)}
          onClick={confirm}
        >
          {saving ? "Aplicando…" : "Confirmar nível"}
        </Button>
      </Panel>
    </div>
  );
}

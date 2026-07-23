"use client";

import type { AbilityKey } from "@/lib/character/types";
import { ABILITY_LABELS } from "@/config/tables/labels";
import { Select } from "@/components/ui/Input";
import { FeatPicker } from "@/components/ui/FeatPicker";

export type AsiPanelMode = "asi2" | "asi1x2" | "feat" | "none";

const ABILITY_KEYS = Object.keys(ABILITY_LABELS) as AbilityKey[];

export interface AsiChoicePanelProps {
  heading?: string;
  helpText?: string;
  mode: AsiPanelMode;
  onModeChange: (mode: AsiPanelMode) => void;
  abilityPrimary: AbilityKey;
  onAbilityPrimaryChange: (key: AbilityKey) => void;
  abilitySecondary: AbilityKey;
  onAbilitySecondaryChange: (key: AbilityKey) => void;
  featId: string;
  onFeatIdChange: (featId: string) => void;
  featAbilityPicks?: Partial<Record<AbilityKey, number>>;
  onFeatAbilityPicksChange?: (picks: Partial<Record<AbilityKey, number>>) => void;
  raceId?: string;
  subraceId?: string | null;
  /** Mostra a opção "Decidir depois" (útil no level-up). */
  allowDefer?: boolean;
  error?: string | null;
}

function ModeCard({
  selected,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  title: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`min-h-14 w-full rounded-sm border-2 px-3 py-3 text-left touch-manipulation transition ${
        selected
          ? "border-crimson bg-parchment"
          : "border-frame bg-parchment/60 hover:border-crimson/50"
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? "border-crimson" : "border-frame"
          }`}
          aria-hidden
        >
          {selected ? <span className="h-2.5 w-2.5 rounded-full bg-crimson" /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm text-crimson">{title}</span>
          <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{description}</span>
        </span>
      </span>
    </button>
  );
}

/** Converte o modo do painel em bônus de atributo prontos para aplicar. */
export function asiBonusesFromPanel(
  mode: AsiPanelMode,
  abilityPrimary: AbilityKey,
  abilitySecondary: AbilityKey,
): Partial<Record<AbilityKey, number>> | undefined {
  if (mode === "asi2") return { [abilityPrimary]: 2 };
  if (mode === "asi1x2") {
    if (abilityPrimary === abilitySecondary) return undefined;
    return { [abilityPrimary]: 1, [abilitySecondary]: 1 };
  }
  return undefined;
}

export function validateAsiPanel(
  mode: AsiPanelMode,
  abilityPrimary: AbilityKey,
  abilitySecondary: AbilityKey,
  featId: string,
): string | null {
  if (mode === "asi1x2" && abilityPrimary === abilitySecondary) {
    return "Escolha dois atributos diferentes para receber +1 cada.";
  }
  if (mode === "feat" && !featId) {
    return "Escolha um talento.";
  }
  return null;
}

export function AsiChoicePanel({
  heading = "Melhoria de atributo ou talento",
  helpText = "Nas regras de D&D 5e, ao ganhar este benefício você escolhe uma das opções abaixo. O total de pontos é sempre +2 distribuídos em atributos, ou um talento no lugar disso.",
  mode,
  onModeChange,
  abilityPrimary,
  onAbilityPrimaryChange,
  abilitySecondary,
  onAbilitySecondaryChange,
  featId,
  onFeatIdChange,
  featAbilityPicks,
  onFeatAbilityPicksChange,
  raceId,
  subraceId,
  allowDefer = false,
  error,
}: AsiChoicePanelProps) {
  return (
    <div className="relative z-0 space-y-4 rounded-sm border border-gold/50 bg-parchment/40 p-3 sm:p-4">
      <div className="space-y-1">
        <p className="font-display text-sm text-gold">{heading}</p>
        <p className="text-xs leading-relaxed text-ink-muted">{helpText}</p>
      </div>

      <fieldset className="space-y-2">
        <legend className="sr-only">Tipo de benefício</legend>
        <ModeCard
          selected={mode === "asi2"}
          title="+2 em um atributo"
          description="Aumenta um único atributo em +2 (máximo 20)."
          onSelect={() => onModeChange("asi2")}
        />
        <ModeCard
          selected={mode === "asi1x2"}
          title="+1 em dois atributos"
          description="Aumenta dois atributos diferentes em +1 cada (máximo 20)."
          onSelect={() => onModeChange("asi1x2")}
        />
        <ModeCard
          selected={mode === "feat"}
          title="Talento"
          description="Em vez da melhoria de atributo, escolha um talento. Alguns talentos também concedem +1 em um atributo."
          onSelect={() => onModeChange("feat")}
        />
        {allowDefer ? (
          <ModeCard
            selected={mode === "none"}
            title="Decidir depois"
            description="Sobe de nível sem aplicar ASI/talento agora. Você poderá ajustar atributos ou talentos depois na ficha."
            onSelect={() => onModeChange("none")}
          />
        ) : null}
      </fieldset>

      {mode === "asi2" && (
        <div className="space-y-2 border-t border-frame/60 pt-3">
          <p className="text-xs text-ink-muted">
            Qual atributo recebe <strong className="text-ink">+2</strong>?
          </p>
          <Select
            label="Atributo"
            value={abilityPrimary}
            onChange={(e) => onAbilityPrimaryChange(e.target.value as AbilityKey)}
            options={ABILITY_KEYS.map((k) => ({
              value: k,
              label: ABILITY_LABELS[k],
            }))}
          />
          <p className="text-xs text-ink-muted">
            Resumo: {ABILITY_LABELS[abilityPrimary]} +2
          </p>
        </div>
      )}

      {mode === "asi1x2" && (
        <div className="space-y-3 border-t border-frame/60 pt-3">
          <p className="text-xs text-ink-muted">
            Escolha <strong className="text-ink">dois atributos diferentes</strong>. Cada um
            recebe +1.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="1º atributo (+1)"
              value={abilityPrimary}
              onChange={(e) => onAbilityPrimaryChange(e.target.value as AbilityKey)}
              options={ABILITY_KEYS.map((k) => ({
                value: k,
                label: ABILITY_LABELS[k],
              }))}
            />
            <Select
              label="2º atributo (+1)"
              value={abilitySecondary}
              onChange={(e) => onAbilitySecondaryChange(e.target.value as AbilityKey)}
              options={ABILITY_KEYS.map((k) => ({
                value: k,
                label: ABILITY_LABELS[k],
              }))}
            />
          </div>
          {abilityPrimary === abilitySecondary ? (
            <p className="text-xs text-crimson">
              Os dois atributos precisam ser diferentes. Se quiser +2 no mesmo, use a opção
              “+2 em um atributo”.
            </p>
          ) : (
            <p className="text-xs text-ink-muted">
              Resumo: {ABILITY_LABELS[abilityPrimary]} +1 e {ABILITY_LABELS[abilitySecondary]} +1
            </p>
          )}
        </div>
      )}

      {mode === "feat" && (
        <div className="space-y-2 border-t border-frame/60 pt-3">
          <p className="text-xs text-ink-muted">
            Escolha o talento. Leia a descrição — vários talentos exigem pré-requisito ou
            pedem escolha de atributo.
          </p>
          <FeatPicker
            value={featId}
            onChange={onFeatIdChange}
            abilityPicks={featAbilityPicks}
            onAbilityPicksChange={onFeatAbilityPicksChange}
            raceId={raceId}
            subraceId={subraceId}
          />
        </div>
      )}

      {mode === "none" && allowDefer && (
        <p className="border-t border-frame/60 pt-3 text-xs text-ink-muted">
          Nenhum bônus de atributo ou talento será aplicado neste nível.
        </p>
      )}

      {error ? <p className="text-sm text-crimson">{error}</p> : null}
    </div>
  );
}

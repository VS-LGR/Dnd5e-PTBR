"use client";

import { useMemo, useState } from "react";
import { ARMORS, WEAPONS, getArmor } from "@/config/equipment";
import { getClass, getBackground } from "@/config";
import type { CharacterState } from "@/lib/character/types";
import { computeArmorClass, finalAbilityScores } from "@/lib/rules";
import {
  applyGoldBuyMode,
  applyStartingPackage,
  buyArmor,
  buyWeapon,
  canUseShield,
  rollStartingGold,
  toggleShieldPurchase,
} from "@/lib/character/equipment";
import { Button } from "@/components/ui/Button";
import { Select, NumberField } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Panel";

export interface EquipmentStepPanelProps {
  state: CharacterState;
  onChange: (partial: Partial<CharacterState> | CharacterState) => void;
}

type Mode = "package" | "gold";

export function EquipmentStepPanel({ state, onChange }: EquipmentStepPanelProps) {
  const classId = state.classes[0]?.classId ?? "fighter";
  const classDef = getClass(classId);
  const background = getBackground(state.backgroundId);
  const [mode, setMode] = useState<Mode>(
    state.inventory.length > 0 ? "package" : state.currency.gp > 0 ? "gold" : "package",
  );
  const [lastRoll, setLastRoll] = useState<string | null>(null);
  const [weaponToBuy, setWeaponToBuy] = useState(WEAPONS[0]?.id ?? "dagger");
  const [message, setMessage] = useState<string | null>(null);

  const scores = useMemo(() => finalAbilityScores(state), [state]);
  const previewAc = computeArmorClass(state);
  const dice = classDef?.startingGoldDice ?? "5d4×10";
  const shieldOk = canUseShield(classId);
  const shieldCost = getArmor("shield")?.costGp ?? 10;

  const armorChoices = useMemo(() => {
    const profs = (classDef?.armorProficiencies ?? []).join(" ").toLowerCase();
    return ARMORS.filter((a) => {
      if (a.category === "shield") return false;
      if (mode === "package") return true;
      if (a.category === "light") return profs.includes("leve") || profs.includes("leves");
      if (a.category === "medium") return /m[eé]dia/.test(profs);
      if (a.category === "heavy") return profs.includes("pesada") || profs.includes("pesadas");
      return true;
    });
  }, [classDef, mode]);

  function setFull(next: CharacterState) {
    onChange(next);
  }

  function choosePackage() {
    setMode("package");
    const next = applyStartingPackage(state);
    setFull(next);
    setLastRoll(null);
    setMessage("Pacote de classe + antecedente aplicado ao inventário.");
  }

  function chooseGold() {
    setMode("gold");
    const rolled = rollStartingGold(dice);
    const gp = rolled?.gp ?? 0;
    const next = applyGoldBuyMode(state, gp);
    setFull(next);
    if (rolled) {
      setLastRoll(
        `Rolagem ${dice}: [${rolled.rolls.join(", ")}]${rolled.multiplier > 1 ? ` × ${rolled.multiplier}` : ""} = ${gp} PO`,
      );
    }
    setMessage("Modo compra: use o ouro para armadura, escudo e armas.");
  }

  function rerollGold() {
    const rolled = rollStartingGold(dice);
    if (!rolled) return;
    setFull({
      ...state,
      currency: { ...state.currency, gp: rolled.gp },
      // keep purchases? better reset buys on reroll
      inventory: mode === "gold" ? [] : state.inventory,
      armorId: mode === "gold" ? null : state.armorId,
      shieldEquipped: mode === "gold" ? false : state.shieldEquipped,
    });
    setLastRoll(
      `Rolagem ${dice}: [${rolled.rolls.join(", ")}]${rolled.multiplier > 1 ? ` × ${rolled.multiplier}` : ""} = ${rolled.gp} PO`,
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={mode === "package" ? "primary" : "secondary"}
          onClick={choosePackage}
        >
          Pacote inicial
        </Button>
        <Button
          type="button"
          variant={mode === "gold" ? "primary" : "secondary"}
          onClick={chooseGold}
        >
          Comprar com ouro ({dice})
        </Button>
      </div>

      <p className="text-sm text-ink-muted">
        No PHB você escolhe o <strong>pacote</strong> da classe (e do antecedente){" "}
        <em>ou</em> rola o ouro inicial da classe e compra o equipamento.
      </p>

      {message && (
        <p className="text-sm text-crimson" role="status">
          {message}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-sm border-2 border-frame p-3">
          <p className="font-display text-sm text-crimson">Pacote sugerido — {classDef?.name}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-ink-muted">
            {(classDef?.startingEquipment ?? []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {background && (
            <>
              <p className="mt-3 font-display text-sm text-crimson">
                Antecedente — {background.name}
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm text-ink-muted">
                {background.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="rounded-sm border-2 border-frame p-3 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="gold">CA prevista {previewAc}</Badge>
            <Badge>Des {scores.dexterity}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(
              [
                ["pp", "Platina"],
                ["gp", "Ouro (PO)"],
                ["ep", "Electrum"],
                ["sp", "Prata"],
                ["cp", "Cobre"],
              ] as const
            ).map(([key, label]) => (
              <NumberField
                key={key}
                label={label}
                min={0}
                value={state.currency[key]}
                onValueChange={(n) =>
                  onChange({
                    currency: {
                      ...state.currency,
                      [key]: n,
                    },
                  })
                }
              />
            ))}
          </div>
          <p className="text-xs text-ink-muted">
            Dados de ouro inicial da classe: <strong>{dice}</strong>
            {mode === "package" ? " (não usados no modo pacote)." : "."}
          </p>
          {mode === "gold" && (
            <Button type="button" variant="secondary" onClick={rerollGold}>
              Rolar ouro novamente
            </Button>
          )}
          {lastRoll && <p className="text-sm text-ink-muted">{lastRoll}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Armadura equipada"
          value={state.armorId ?? ""}
          onChange={(e) => {
            const id = e.target.value || null;
            if (mode === "gold") {
              const next = buyArmor(state, id);
              if (next === state && id) {
                setMessage("Ouro insuficiente para esta armadura.");
                return;
              }
              setFull(next);
              setMessage(null);
            } else {
              onChange({ armorId: id });
            }
          }}
          options={[
            { value: "", label: "Sem armadura" },
            ...armorChoices.map((a) => ({
              value: a.id,
              label: `${a.name} (CA ${a.baseAc}${a.dexCap === null ? "+Des" : a.dexCap > 0 ? `+Des máx ${a.dexCap}` : ""}) — ${a.costGp} PO`,
            })),
          ]}
        />

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm pt-6">
            <input
              type="checkbox"
              checked={state.shieldEquipped}
              disabled={!shieldOk}
              onChange={(e) => {
                if (mode === "gold") {
                  const next = toggleShieldPurchase(state, e.target.checked);
                  if (next === state && e.target.checked) {
                    setMessage("Ouro insuficiente para o escudo.");
                    return;
                  }
                  setFull(next);
                } else {
                  onChange({ shieldEquipped: e.target.checked });
                }
              }}
            />
            Escudo (+2 CA)
            {mode === "gold" ? ` — ${shieldCost} PO` : ""}
            {!shieldOk ? " (classe sem proficiência)" : ""}
          </label>
        </div>
      </div>

      {mode === "gold" && (
        <div className="rounded-sm border border-frame p-3">
          <p className="font-display text-sm text-crimson">Comprar arma</p>
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <Select
              label="Arma"
              value={weaponToBuy}
              onChange={(e) => setWeaponToBuy(e.target.value)}
              options={WEAPONS.map((w) => ({
                value: w.id,
                label: `${w.name} — ${w.costGp} PO (${w.damage})`,
              }))}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                const next = buyWeapon(state, weaponToBuy);
                if (next === state) {
                  setMessage("Ouro insuficiente para esta arma.");
                  return;
                }
                setFull(next);
                setMessage(`Comprado: ${WEAPONS.find((w) => w.id === weaponToBuy)?.name}`);
              }}
            >
              Comprar
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-sm border-2 border-frame p-3">
        <p className="font-display text-sm text-crimson">
          Inventário ({state.inventory.length} itens)
        </p>
        {state.inventory.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">
            Vazio. Aplique o pacote ou compre itens com ouro.
          </p>
        ) : (
          <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-sm">
            {state.inventory.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 border-b border-frame/30 py-1">
                <span>
                  {item.name}
                  {item.quantity > 1 ? ` ×${item.quantity}` : ""}
                </span>
                <button
                  type="button"
                  className="text-xs text-crimson"
                  onClick={() =>
                    onChange({
                      inventory: state.inventory.filter((i) => i.id !== item.id),
                    })
                  }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

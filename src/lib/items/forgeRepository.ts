import type { CustomMagicItem } from "./forgeTypes";
import { customItemToDefinition } from "./forgeConvert";
import { resolveForgeDescription } from "./forgeGenerate";
import type { ItemDefinition } from "@/config/types";

const LOCAL_KEY = "dnd5e-ptbr-forge-items";

function readLocal(): CustomMagicItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CustomMagicItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(items: CustomMagicItem[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

export function listForgeItems(): CustomMagicItem[] {
  return readLocal().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getForgeItem(id: string): CustomMagicItem | undefined {
  return readLocal().find((i) => i.id === id);
}

export function saveForgeItem(item: CustomMagicItem): CustomMagicItem {
  const now = new Date().toISOString();
  const descriptionGenerated =
    item.descriptionGenerated || resolveForgeDescription(item);
  const next: CustomMagicItem = {
    ...item,
    descriptionGenerated,
    updatedAt: now,
    createdAt: item.createdAt || now,
  };
  const all = readLocal();
  const idx = all.findIndex((i) => i.id === next.id);
  if (idx >= 0) all[idx] = next;
  else all.push(next);
  writeLocal(all);
  return next;
}

export function deleteForgeItem(id: string): void {
  writeLocal(readLocal().filter((i) => i.id !== id));
}

export function listForgeAsDefinitions(): ItemDefinition[] {
  return listForgeItems().map(customItemToDefinition);
}

export function getForgeAsDefinition(id: string): ItemDefinition | undefined {
  const item = getForgeItem(id);
  return item ? customItemToDefinition(item) : undefined;
}

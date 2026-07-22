export {
  ITEMS,
  getItem,
  searchItems,
  filterItems,
  listEffectiveItems,
  ADVENTURING_GEAR,
  type ItemFilterPreset,
} from "@/config/items";

export {
  summarizeWeaponAttack,
  summarizeInventoryWeapon,
  attackAbilityForWeapon,
  type WeaponAttackSummary,
} from "./combat";

export {
  parseItemDescription,
  extractDiceFormulas,
  descriptionHasTable,
} from "./parseDescription";

export {
  listForgeItems,
  getForgeItem,
  saveForgeItem,
  deleteForgeItem,
} from "./forgeRepository";

export {
  forgeBudgetStatus,
  powerCost,
  FORGE_BUDGET,
} from "./forgeBalance";

export {
  generateForgeDescription,
  resolveForgeDescription,
} from "./forgeGenerate";

export type {
  CustomMagicItem,
  ForgePower,
  ForgeBaseKind,
} from "./forgeTypes";

export {
  listItemSpells,
  inventoryMagicBonus,
  forgeExtraDamageLabel,
  canAttune,
  countAttuned,
  resolveCustomMagic,
  itemPowersActive,
} from "./forgeModifiers";

import type { WildShapeStatBlock } from "./types";
import raw from "./statBlocksData.json";

export const WILD_SHAPE_STAT_BLOCKS: WildShapeStatBlock[] =
  raw as WildShapeStatBlock[];

export function getWildShapeStatBlock(
  id: string,
): WildShapeStatBlock | undefined {
  return WILD_SHAPE_STAT_BLOCKS.find((b) => b.id === id);
}

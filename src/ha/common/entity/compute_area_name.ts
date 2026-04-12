import type { AreaRegistryEntry } from "../../types";

export const computeAreaName = (area: AreaRegistryEntry): string | undefined =>
  area.name?.trim();

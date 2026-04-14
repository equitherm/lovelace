import type { FloorRegistryEntry } from "../../types";

export const computeFloorName = (floor: FloorRegistryEntry): string =>
  floor.name?.trim();

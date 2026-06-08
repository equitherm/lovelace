// @source home-assistant/frontend/src/panels/lovelace/header-footer/types.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: EntitiesCardEntityConfig typed as any — it extends EntityConfig from
//   entity-rows/types.ts which pulls in evaluate-filter, components/types, and the full
//   cards/types.ts (739 lines, 15+ deep imports).

import type { ActionConfig } from "../../../data/lovelace/config/action";

export interface LovelaceHeaderFooterConfig {
  type: "buttons" | "graph" | "picture";
}

export interface ButtonsHeaderFooterConfig extends LovelaceHeaderFooterConfig {
  type: "buttons";
  entities: (string | any)[];
}

export interface GraphHeaderFooterConfig extends LovelaceHeaderFooterConfig {
  type: "graph";
  entity: string;
  detail?: number;
  hours_to_show?: number;
  limits?: {
    min?: number;
    max?: number;
  };
}

export interface PictureHeaderFooterConfig extends LovelaceHeaderFooterConfig {
  type: "picture";
  image: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  alt_text?: string;
}

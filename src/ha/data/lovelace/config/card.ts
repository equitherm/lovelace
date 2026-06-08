// @source home-assistant/frontend/src/data/lovelace/config/card.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: LovelaceLayoutOptions and LovelaceGridOptions typed as any —
//   sourced from panels/lovelace/types.ts sub-types we don't use.

import type { Condition } from "../../../panels/lovelace/common/validate-condition";

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  /** @deprecated Use `grid_options` instead */
  layout_options?: any;
  grid_options?: any;
  type: string;
  [key: string]: any;
  visibility?: Condition[];
  disabled?: boolean;
}

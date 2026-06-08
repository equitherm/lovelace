// @source home-assistant/frontend/src/data/lovelace/config/card.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: Condition typed as any[] — upstream imports from a 478-line
//   validate-condition.ts which we don't vendor. LovelaceLayoutOptions and
//   LovelaceGridOptions typed as any — sourced from panels/lovelace/types.ts
//   sub-types we don't use.

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  /** @deprecated Use `grid_options` instead */
  layout_options?: any;
  grid_options?: any;
  type: string;
  visibility?: any[];
  disabled?: boolean;
  [key: string]: any;
}

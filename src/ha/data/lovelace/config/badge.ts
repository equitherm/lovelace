// @source home-assistant/frontend/src/data/lovelace/config/badge.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: Condition typed as any[] — upstream imports from a 478-line
//   validate-condition.ts which we don't vendor. Runtime function ensureBadgeConfig
//   excluded — our cards don't manage dashboard badges.

export interface LovelaceBadgeConfig {
  type: string;
  visibility?: any[];
  disabled?: boolean;
  [key: string]: any;
}

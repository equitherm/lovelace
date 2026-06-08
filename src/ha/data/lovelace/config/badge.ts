// @source home-assistant/frontend/src/data/lovelace/config/badge.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: Runtime function ensureBadgeConfig excluded — our cards don't
//   manage dashboard badges.

import type { Condition } from "../../../panels/lovelace/common/validate-condition";

export interface LovelaceBadgeConfig {
  type: string;
  [key: string]: any;
  visibility?: Condition[];
  disabled?: boolean;
}

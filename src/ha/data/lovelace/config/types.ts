// @source home-assistant/frontend/src/data/lovelace/config/types.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: LovelaceViewRawConfig, LovelaceStrategyConfig, LovelaceResource not
//   vendored — we use LovelaceViewConfig directly. Runtime functions (fetchConfig,
//   saveConfig, deleteConfig, isStrategyDashboard) excluded — our cards don't manage dashboards.

import type { LovelaceCardConfig } from "./card";

export interface LovelaceConfig {
  title?: string;
  strategy?: {
    type: string;
    options?: Record<string, unknown>;
  };
  views: LovelaceViewConfig[];
  background?: string;
}

export interface LovelaceViewConfig {
  index?: number;
  title?: string;
  type?: string;
  strategy?: {
    type: string;
    options?: Record<string, unknown>;
  };
  cards?: LovelaceCardConfig[];
  path?: string;
  icon?: string;
  theme?: string;
  panel?: boolean;
  background?: string;
  visible?: boolean | ShowViewConfig[];
}

export interface ShowViewConfig {
  user?: string;
}

// @source home-assistant/frontend/src/data/lovelace/config/card.ts
// @source home-assistant/frontend/src/data/lovelace/config/action.ts
// @source home-assistant/frontend/src/data/lovelace/config/badge.ts
// @synced 2026-06-08 @ SHA 1cca5f3

import type { HassServiceTarget } from "home-assistant-js-websocket";

// ============================================================================
// Lovelace Configuration Types
// Sourced from home-assistant/frontend/src/data/lovelace/config/types.ts
// ============================================================================

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

// ============================================================================
// Card Config
// Sourced from home-assistant/frontend/src/data/lovelace/config/card.ts
// ============================================================================

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

// ============================================================================
// Badge Config
// Sourced from home-assistant/frontend/src/data/lovelace/config/badge.ts
// ============================================================================

export interface LovelaceBadgeConfig {
  type: string;
  visibility?: any[];
  disabled?: boolean;
  [key: string]: any;
}

// ============================================================================
// Action Config Types
// Sourced from home-assistant/frontend/src/data/lovelace/config/action.ts
// ============================================================================

export interface BaseActionConfig {
  action: string;
  confirmation?: ConfirmationRestrictionConfig;
}

export interface ConfirmationRestrictionConfig {
  text?: string;
  title?: string;
  confirm_text?: string;
  dismiss_text?: string;
  exemptions?: RestrictionConfig[];
}

export interface RestrictionConfig {
  user: string;
}

export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: "call-service" | "perform-action";
  /** @deprecated "service" is kept for backwards compatibility. Replaced by "perform_action". */
  service?: string;
  perform_action: string;
  target?: HassServiceTarget;
  /** @deprecated "service_data" is kept for backwards compatibility. Replaced by "data". */
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  navigation_path: string;
  navigation_replace?: boolean;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  url_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  entity?: string;
}

export interface NoActionConfig extends BaseActionConfig {
  action: "none";
}

export interface CustomActionConfig extends BaseActionConfig {
  action: "fire-dom-event";
}

export interface AssistActionConfig extends BaseActionConfig {
  action: "assist";
  pipeline_id?: string;
  start_listening?: boolean;
}

export type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | AssistActionConfig
  | NoActionConfig
  | CustomActionConfig;

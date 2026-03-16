// src/types.ts
// Re-export from custom-card-helpers
export type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceCardConfig,
} from 'custom-card-helpers';

// HA entity state object
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// Project types
export type { StatusCardConfig } from './config/status-card-config';
export type { CurveCardConfig } from './config/curve-card-config';
export type { Layout, Info, IconType, AppearanceConfig } from './shared/config/appearance-config';

// ─── Lovelace action config ───────────────────────────────────────────────────

export interface ActionConfig {
  action: 'more-info' | 'navigate' | 'call-service' | 'url' | 'none' | 'assist';
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
}

// ─── Lovelace grid options (sections view) ────────────────────────────────────

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

// ─── HA entity state helpers ───────────────────────────────────────────────────

export type HvacAction = 'heating' | 'idle' | 'off';

export interface ClimateEntityAttributes {
  current_temperature?: number;
  temperature?: number;
  hvac_action?: HvacAction;
  hvac_modes?: string[];
  min_temp?: number;
  max_temp?: number;
}

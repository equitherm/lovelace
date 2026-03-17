// src/types.ts

// Re-export from custom-card-helpers
export type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceCardConfig,
} from 'custom-card-helpers';

// ─── HVAC Action Types ─────────────────────────────────────────────────────────

/** HVAC action states from Home Assistant climate entities */
export type HvacAction = 'heating' | 'cooling' | 'idle' | 'off' | 'fault';

// ─── HA entity state helpers ───────────────────────────────────────────────────

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface ClimateEntityAttributes {
  current_temperature?: number;
  temperature?: number;
  hvac_action?: HvacAction;
  hvac_modes?: string[];
  min_temp?: number;
  max_temp?: number;
}

// ─── Project Types ─────────────────────────────────────────────────────────────

export type { StatusCardConfig } from './config/status-card-config';
export type { CurveCardConfig } from './config/curve-card-config';
export type { Layout, Info, IconType, AppearanceConfig } from './shared/config/appearance-config';

// ─── Lovelace Action Config ───────────────────────────────────────────────────

export interface ActionConfig {
  action: 'more-info' | 'navigate' | 'call-service' | 'url' | 'none' | 'assist';
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
}

// ─── Lovelace Grid Options ────────────────────────────────────────────────────

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

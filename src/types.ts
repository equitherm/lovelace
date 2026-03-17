// src/types.ts

// Re-export from vendored HA types
export type { HomeAssistant } from './ha/types';
export type { HassEntity } from 'home-assistant-js-websocket';
export type { LovelaceCard, LovelaceCardEditor } from './ha/panels/lovelace/types';
export type { LovelaceCardConfig, ActionConfig } from './ha/data/lovelace';

// ─── HVAC Action Types ─────────────────────────────────────────────────────────

/** HVAC action states from Home Assistant climate entities */
export type HvacAction = 'heating' | 'cooling' | 'idle' | 'off' | 'fault';

// ─── HA entity state helpers ───────────────────────────────────────────────────

export interface ClimateEntityAttributes {
  current_temperature?: number;
  temperature?: number;
  hvac_action?: HvacAction;
  hvac_modes?: string[];
  min_temp?: number;
  max_temp?: number;
}

// ─── Project Types ─────────────────────────────────────────────────────────────

export type { StatusCardConfig } from './cards/status-card/status-card-config';
export type { CurveCardConfig } from './cards/curve-card/curve-card-config';

// Appearance types - import from utils (Mushroom pattern)
export type { Layout } from './utils/layout';
export type { Info, IconType } from './utils/info';
export type { AppearanceSharedConfig, Appearance } from './shared/config/appearance-config';

// ─── Lovelace Grid Options ────────────────────────────────────────────────────

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

// src/types.ts

// Core HA types (commonly used)
export type { HomeAssistant } from './ha/types';
export type { HassEntity } from 'home-assistant-js-websocket';
export type { LovelaceCard, LovelaceCardEditor } from './ha/panels/lovelace/types';
export type { LovelaceCardConfig, ActionConfig } from './ha/data/lovelace';

// ─── Project Types ─────────────────────────────────────────────────────────────

export type { StatusCardConfig } from './cards/status-card/status-card-config';
export type { CurveCardConfig } from './cards/curve-card/curve-card-config';

// Appearance types
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

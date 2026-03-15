import { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

export { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor };

// ─── Lovelace grid options (sections view) ────────────────────────────────────
// ⚠️ getGridOptions() is an INSTANCE method, not static. HA silently ignores static getLayoutOptions().

export interface LovelaceGridOptions {
  columns?: number;      // snap to 3 | 6 | 9 | 12
  rows?: number;
  min_columns?: number;
  min_rows?: number;
  max_columns?: number;
  max_rows?: number;
}

// ─── HA entity state helpers ───────────────────────────────────────────────────

export type HvacAction = 'heating' | 'idle' | 'off';

export interface ClimateEntityAttributes {
  temperature: number;          // target temp (setpoint)
  current_temperature: number;  // actual room temp
  hvac_action: HvacAction;
  hvac_mode: string;
  preset_mode?: string;
}

export interface WeatherForecastEntry {
  datetime: string;
  temperature: number;
}

// Card configs will be added here as cards are implemented

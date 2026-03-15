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
  min_temp?: number;            // climate's min allowed temp
  max_temp?: number;            // climate's max allowed temp
}

export interface WeatherForecastEntry {
  datetime: string;
  temperature: number;
}

// ─── Shared curve parameters (used by multiple cards) ──────────────────────────

export interface CurveParamsConfig {
  hc: number;           // heat curve coefficient
  n: number;            // curve exponent
  shift: number;        // temperature offset (°C)
  min_flow: number;     // minimum flow temperature (°C)
  max_flow: number;     // maximum flow temperature (°C)
  t_out_min: number;    // outdoor temp range minimum (°C)
  t_out_max: number;    // outdoor temp range maximum (°C)
}

// ─── Card configs ───────────────────────────────────────────────────────────────

export interface StatusCardConfig extends LovelaceCardConfig {
  type: 'custom:equitherm-status-card';
  climate_entity: string;
  outdoor_entity: string;
  flow_entity: string;             // sensor.flow_setpoint — rate-limited actual
  curve_output_entity?: string;    // sensor.heating_curve_output — enables ramping display
  rate_limiting_entity?: string;   // binary_sensor.rate_limiting_active
  control_mode_entity?: string;
  fill_container?: boolean;        // stretch to fill container height
}

export interface CurveCardConfig extends LovelaceCardConfig, CurveParamsConfig {
  type: 'custom:equitherm-curve-card';
  title?: string;
  climate_entity: string;
  outdoor_entity: string;
  curve_output_entity: string;   // sensor.heating_curve_output — solid dot (pre-rate-limit)
  flow_entity: string;           // sensor.flow_setpoint — hollow dot (rate-limited)
  rate_limiting_entity?: string; // binary_sensor.rate_limiting_active — controls dual-dot display
  fill_container?: boolean;      // stretch to fill container height
}

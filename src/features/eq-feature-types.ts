/** Config for eq-hvac-badges feature */
export interface EqHvacBadgesConfig {
  type: 'custom:eq-hvac-badges';
  climate_entity: string;
  outdoor_entity?: string;
  wws_entity?: string;
  /** PID active binary sensor entity */
  pid_active_entity?: string;
  /** Rate-limiting binary sensor entity */
  rate_limiting_entity?: string;
  /** PID output number entity (for adjusting direction) */
  pid_output_entity?: string;
  /** Curve output number entity (fallback for adjusting direction) */
  curve_output_entity?: string;
  /** Flow temperature entity (needed for adjusting direction comparison) */
  flow_entity?: string;
  /** Whether tuning mode is active (shows tune button) */
  tunable?: boolean;
}

/** Config for eq-temp-kpis feature */
export interface EqTempKpisConfig {
  type: 'custom:eq-temp-kpis';
  outdoor_entity?: string;
  flow_entity?: string;
  climate_entity?: string;
  adjusting_dir?: string;
  curve_output?: string;
  outdoor_click_entity?: string;
}

/** Config for eq-params-footer feature */
export interface EqParamsFooterConfig {
  type: 'custom:eq-params-footer';
  hc_entity?: string;
  hc_fallback?: number;
  n_entity?: string;
  n_fallback?: number;
  shift_entity?: string;
  shift_fallback?: number;
  pid_correction_entity?: string;
  pid_correction_fallback?: number;
  interactive?: boolean;
}

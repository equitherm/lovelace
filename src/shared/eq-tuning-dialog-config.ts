/** Minimal config that <eq-tuning-dialog> needs from any parent card. */
export interface TuningDialogConfig {
  // Required tuning entities
  climate_entity: string;
  outdoor_entity: string;
  hc_entity: string;
  shift_entity: string;
  // Optional entities
  flow_entity?: string;
  n_entity?: string;
  min_flow_entity?: string;
  max_flow_entity?: string;
  recalculate_service?: string;
  // Curve parameters
  curve_from_entities?: boolean;
  n: number;
  min_flow: number;
  max_flow: number;
  t_out_min: number;
  t_out_max: number;
}

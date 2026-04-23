import type { TuningDialogConfig } from '../shared/eq-tuning-dialog-config';
import { CURVE_CONFIG_DEFAULTS } from './curve-config';

export function buildTuningDialogConfig(
  cfg: { [key: string]: unknown },
): TuningDialogConfig | undefined {
  const hc_entity = cfg.hc_entity as string | undefined;
  const shift_entity = cfg.shift_entity as string | undefined;
  if (!hc_entity || !shift_entity) return undefined;

  return {
    climate_entity:       cfg.climate_entity as string,
    outdoor_entity:       cfg.outdoor_entity as string,
    flow_entity:          cfg.flow_entity    as string | undefined,
    hc_entity,
    shift_entity,
    n_entity:             cfg.n_entity             as string | undefined,
    min_flow_entity:      cfg.min_flow_entity       as string | undefined,
    max_flow_entity:      cfg.max_flow_entity       as string | undefined,
    recalculate_service:  cfg.recalculate_service   as string | undefined,
    curve_from_entities:  (cfg.curve_from_entities  as boolean | undefined)
                            ?? !!(cfg.n_entity),
    n:          (cfg.n         as number | undefined) ?? CURVE_CONFIG_DEFAULTS.n,
    min_flow:   (cfg.min_flow  as number | undefined) ?? CURVE_CONFIG_DEFAULTS.min_flow,
    max_flow:   (cfg.max_flow  as number | undefined) ?? CURVE_CONFIG_DEFAULTS.max_flow,
    t_out_min:  (cfg.t_out_min as number | undefined) ?? CURVE_CONFIG_DEFAULTS.t_out_min,
    t_out_max:  (cfg.t_out_max as number | undefined) ?? CURVE_CONFIG_DEFAULTS.t_out_max,
  };
}

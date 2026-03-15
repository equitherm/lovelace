import { string, number, optional, define, assert } from 'superstruct';
import type { CurveCardConfig } from '../types';

/** Custom type validator for entity IDs */
const entityId = define<string>('entityId', (value) => {
  if (typeof value !== 'string') return false;
  return /^\w+\.\w+$/.test(value);
});

/** Validate curve card config and throw descriptive error if invalid */
export function validateCurveCardConfig(config: unknown): asserts config is CurveCardConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Config must be an object');
  }

  const cfg = config as Record<string, unknown>;

  // Required entities
  assert(cfg.climate_entity, entityId);
  assert(cfg.outdoor_entity, entityId);
  assert(cfg.curve_output_entity, entityId);
  assert(cfg.flow_entity, entityId);

  // Optional entities
  if (cfg.rate_limiting_entity !== undefined) {
    assert(cfg.rate_limiting_entity, optional(entityId));
  }

  // Curve parameters (all required)
  assert(cfg.hc, number());
  assert(cfg.n, number());
  assert(cfg.shift, number());
  assert(cfg.min_flow, number());
  assert(cfg.max_flow, number());
  assert(cfg.t_out_min, number());
  assert(cfg.t_out_max, number());

  // Optional title
  if (cfg.title !== undefined) {
    assert(cfg.title, optional(string()));
  }
}

// src/cards/curve-card/curve-card-editor.ts
import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { CurveCardConfig } from './curve-card-config';
import { validateCurveCardConfig } from './curve-card-config';
import type { LovelaceCardConfig } from '../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../utils/base';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import { isImperial, celsiusToDisplay, displayToCelsius, celsiusToDisplayDelta, displayDeltaToCelsius } from '../../utils/temperature';
import setupCustomLocalize from '../../localize';
import { CURVE_CARD_EDITOR_NAME } from './const';

@customElement(CURVE_CARD_EDITOR_NAME)
export class EquithermCurveCardEditor extends EquithermBaseEditor<CurveCardConfig> {

  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as CurveCardConfig;
  }

  protected _validate(config: CurveCardConfig): void {
    validateCurveCardConfig(config);
  }

  /** Convert user-entered imperial values to °C before validation. */
  protected override _transformConfig(raw: CurveCardConfig): CurveCardConfig {
    const imp = isImperial(this.hass);
    if (!imp) return raw;
    const cfg = { ...raw } as Record<string, unknown>;
    if (cfg.shift != null) cfg.shift = displayDeltaToCelsius(cfg.shift as number, true);
    for (const f of ['min_flow', 'max_flow', 't_out_min', 't_out_max'] as const) {
      if (cfg[f] != null) cfg[f] = displayToCelsius(cfg[f] as number, true);
    }
    return cfg as CurveCardConfig;
  }

  /** Convert internal °C values to display units for the form. */
  protected override _getDisplayConfig(): CurveCardConfig {
    const imp = isImperial(this.hass);
    if (!imp) return this._config;
    const cfg = { ...this._config } as Record<string, unknown>;
    if (cfg.shift != null) cfg.shift = Math.round(celsiusToDisplayDelta(cfg.shift as number, true) * 10) / 10;
    for (const f of ['min_flow', 'max_flow', 't_out_min', 't_out_max'] as const) {
      if (cfg[f] != null) cfg[f] = Math.round(celsiusToDisplay(cfg[f] as number, true) * 10) / 10;
    }
    return cfg as CurveCardConfig;
  }

  private _schemaMemo = memoizeOne(
    (curveFromEntities: boolean, tunable: boolean, imperial: boolean): readonly HaFormSchema[] => {
      const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
      const abs = (c: number) => Math.round(celsiusToDisplay(c, imperial) * 10) / 10;
      const delta = (c: number) => Math.round(celsiusToDisplayDelta(c, imperial) * 10) / 10;
      const localize = setupCustomLocalize(this.hass);
      return [
        // Required entities — top level
        schemaHelpers.entity('climate_entity', { domain: 'climate' }),
        // Name (depends on climate_entity for context)
        schemaHelpers.entityName('name', { entity: 'climate_entity' }),
        schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
        schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
        { name: 'tunable', selector: { boolean: {} }, default: false },
        { name: 'show_last_updated', selector: { boolean: {} }, default: false },
        { name: 'show_kpi_footer', selector: { boolean: {} }, default: true },
        { name: 'show_params_footer', selector: { boolean: {} }, default: true },
        // Tuning entities (only when tunable enabled)
        ...(tunable
          ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
              schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
              schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
              { name: 'recalculate_service', selector: { text: {} } },
            ])]
          : []),
        // Optional entities
        schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
          schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
          schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
          schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
        ]),
        // Curve parameters
        schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve', [
          { name: 'curve_from_entities', selector: { boolean: {} } },
          ...(curveFromEntities
            ? [
                schemaHelpers.entity('hc_entity', { domain: 'number' }),
                schemaHelpers.entity('n_entity', { domain: 'number' }),
                schemaHelpers.entity('shift_entity', { domain: 'number' }),
                schemaHelpers.entity('min_flow_entity', { domain: ['sensor', 'number'], required: false }),
                schemaHelpers.entity('max_flow_entity', { domain: ['sensor', 'number'], required: false }),
              ]
            : [
                schemaHelpers.grid([
                  schemaHelpers.number('hc', 0.5, 3.0, 0.1, { default: 0.9 }),
                  schemaHelpers.number('n', 1.0, 2.0, 0.05, { default: 1.25 }),
                ]),
                schemaHelpers.number('shift', delta(-15), delta(15), 1, { unit_of_measurement: unit, default: delta(0) }),
                schemaHelpers.grid([
                  schemaHelpers.number('min_flow', abs(15), abs(35), 1, { unit_of_measurement: unit, default: abs(20) }),
                  schemaHelpers.number('max_flow', abs(50), abs(90), 1, { unit_of_measurement: unit, default: abs(70) }),
                ]),
              ]),
        ]),
        // Display range
        schemaHelpers.expandable(localize('editor.display_range'), 'mdi:arrow-expand-horizontal', [
          schemaHelpers.grid([
            schemaHelpers.number('t_out_min', abs(-30), abs(5), 1, { unit_of_measurement: unit, default: abs(-20) }),
            schemaHelpers.number('t_out_max', abs(0), abs(30), 1, { unit_of_measurement: unit, default: abs(20) }),
          ]),
        ]),
      ] as const satisfies readonly HaFormSchema[];
    },
  );

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo(
      !!this._config.curve_from_entities,
      !!this._config.tunable,
      isImperial(this.hass),
    );
  }
}

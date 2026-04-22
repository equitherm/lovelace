// src/cards/forecast-card/forecast-card-editor.ts
import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { ForecastCardConfig } from './forecast-card-config';
import { validateForecastCardConfig } from './forecast-card-config';
import type { LovelaceCardConfig } from '../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../utils/base';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { FORECAST_CARD_EDITOR_NAME } from './const';

@customElement(FORECAST_CARD_EDITOR_NAME)
export class EquithermForecastCardEditor extends EquithermBaseEditor<ForecastCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as ForecastCardConfig;
  }

  protected _validate(config: ForecastCardConfig): void {
    validateForecastCardConfig(config);
  }

  private _schemaMemo = memoizeOne((curveFromEntities: boolean, tunable: boolean): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities — top level
      schemaHelpers.entity('weather_entity', { domain: 'weather' }),
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} }, default: false },
      { name: 'show_kpi_footer', selector: { boolean: {} }, default: true },
      { name: 'show_params_footer', selector: { boolean: {} }, default: true },
      { name: 'tunable', selector: { boolean: {} }, default: false },
      ...(tunable
        ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
            schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
            schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
            { name: 'recalculate_service', selector: { text: {} } },
          ])]
        : []),
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
      ]),
      // Forecast settings
      schemaHelpers.expandable(localize('editor.forecast_settings'), 'mdi:clock-outline', [
        schemaHelpers.number('hours', 1, 48, 1, { unit_of_measurement: 'h', default: 24 }),
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
              schemaHelpers.number('shift', -15, 15, 1, { unit_of_measurement: '°C', default: 0 }),
              schemaHelpers.grid([
                schemaHelpers.number('min_flow', 15, 35, 1, { unit_of_measurement: '°C', default: 20 }),
                schemaHelpers.number('max_flow', 50, 90, 1, { unit_of_measurement: '°C', default: 70 }),
              ]),
            ]),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo(!!this._config.curve_from_entities, !!this._config.tunable);
  }
}

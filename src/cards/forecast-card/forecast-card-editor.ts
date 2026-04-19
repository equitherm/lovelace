// src/cards/forecast-card/forecast-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { ForecastCardConfig } from './forecast-card-config';
import { validateForecastCardConfig } from './forecast-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import { fireEvent } from '../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { FORECAST_CARD_EDITOR_NAME } from './const';

@customElement(FORECAST_CARD_EDITOR_NAME)
export class EquithermForecastCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: ForecastCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: ForecastCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as ForecastCardConfig;
    try {
      validateForecastCardConfig(newConfig);
      this._error = undefined;
      fireEvent(this, 'config-changed', { config: newConfig });
    } catch (err) {
      this._error = { base: (err as Error).message };
    }
  }

  static styles = css`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `;

  private _getSchema = memoizeOne((curveFromEntities: boolean): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities — top level
      schemaHelpers.entity('weather_entity', { domain: 'weather' }),
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
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

  private _computeLabel = (schema: { name: string; required?: boolean }): string => {
    const localize = setupCustomLocalize(this.hass);
    const key = `editor.${schema.name}`;
    const localized = localize(key);
    const label = localized !== key ? localized : schema.name;
    return schema.required === false ? `${label} (${localize('editor.optional')})` : label;
  };

  private _computeHelper = (schema: { name: string }): string => {
    const localize = setupCustomLocalize(this.hass);
    const key = `editor.helper.${schema.name}`;
    const localized = localize(key);
    return localized !== key ? localized : '';
  };

  render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema(!!this._config.curve_from_entities)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

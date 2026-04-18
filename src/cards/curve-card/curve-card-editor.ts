// src/cards/curve-card/curve-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { CurveCardConfig } from './curve-card-config';
import { validateCurveCardConfig } from './curve-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import { fireEvent } from '../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { CURVE_CARD_EDITOR_NAME } from './const';

@customElement(CURVE_CARD_EDITOR_NAME)
export class EquithermCurveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: CurveCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: CurveCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as CurveCardConfig;
    try {
      validateCurveCardConfig(newConfig);
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
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      // Name (depends on climate_entity for context)
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
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
              schemaHelpers.entity('min_flow_entity', { domain: 'sensor', required: false }),
              schemaHelpers.entity('max_flow_entity', { domain: 'sensor', required: false }),
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
      // Display range
      schemaHelpers.expandable(localize('editor.display_range'), 'mdi:arrow-expand-horizontal', [
        schemaHelpers.grid([
          schemaHelpers.number('t_out_min', -30, 5, 1, { unit_of_measurement: '°C', default: -20 }),
          schemaHelpers.number('t_out_max', 0, 30, 1, { unit_of_measurement: '°C', default: 20 }),
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

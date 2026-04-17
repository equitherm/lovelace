// src/cards/tuning-card/tuning-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { TuningCardConfig } from './tuning-card-config';
import { validateTuningCardConfig } from './tuning-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import { fireEvent } from '../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { TUNING_CARD_EDITOR_NAME } from './const';

@customElement(TUNING_CARD_EDITOR_NAME)
export class EquithermTuningCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: TuningCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: TuningCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as TuningCardConfig;
    try {
      validateTuningCardConfig(newConfig);
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
      // Required entities
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
      schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
      // Curve parameters
      schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve', [
        { name: 'curve_from_entities', selector: { boolean: {} } },
        ...(curveFromEntities
          ? [
              schemaHelpers.entity('n_entity', { domain: ['number', 'input_number'] }),
            ]
          : [
              schemaHelpers.number('n', 1.0, 2.0, 0.05, { default: 1.25 }),
            ]),
        schemaHelpers.grid([
          schemaHelpers.number('min_flow', 15, 35, 1, { unit_of_measurement: '°C', default: 20 }),
          schemaHelpers.number('max_flow', 50, 90, 1, { unit_of_measurement: '°C', default: 70 }),
        ]),
      ]),
      // Display range
      schemaHelpers.expandable(localize('editor.display_range'), 'mdi:arrow-expand-horizontal', [
        schemaHelpers.grid([
          schemaHelpers.number('t_out_min', -30, 5, 1, { unit_of_measurement: '°C', default: -20 }),
          schemaHelpers.number('t_out_max', 0, 30, 1, { unit_of_measurement: '°C', default: 20 }),
        ]),
      ]),
      // Advanced
      schemaHelpers.expandable(localize('editor.advanced'), 'mdi:cog', [
        { name: 'recalculate_service', selector: { text: {} } },
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

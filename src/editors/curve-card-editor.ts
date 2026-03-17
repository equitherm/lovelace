// src/editors/curve-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { HomeAssistant, CurveCardConfig, LovelaceCardEditor } from '../types';
import { fireEvent } from '../ha/common/dom/fire_event';
import { schemaHelpers } from '../utils/form';
import type { HaFormSchema } from '../utils/form';
import setupCustomlocalize from '../localize';

@customElement('equitherm-curve-card-editor')
export class EquithermCurveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: CurveCardConfig;

  setConfig(config: CurveCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig = { ...ev.detail.value } as CurveCardConfig;
    if (JSON.stringify(newConfig) !== JSON.stringify(this._config)) {
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  static styles = css`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `;

  private _getSchema = memoizeOne((): HaFormSchema[] => {
    const localize = setupCustomlocalize(this.hass);
    return [
    schemaHelpers.text('title', false),
    schemaHelpers.expandable(localize('editor.entities'), 'mdi:connection', [
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
    ]),
    schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve', [
      schemaHelpers.grid([
        schemaHelpers.number('hc', 0.5, 3.0, 0.1),
        schemaHelpers.number('n', 1.0, 2.0, 0.05),
      ]),
      schemaHelpers.number('shift', -15, 15, 1),
      schemaHelpers.grid([
        schemaHelpers.number('min_flow', 15, 35, 1),
        schemaHelpers.number('max_flow', 50, 90, 1),
      ]),
    ]),
    schemaHelpers.expandable(localize('editor.display_range'), 'mdi:arrow-expand-horizontal', [
      schemaHelpers.grid([
        schemaHelpers.number('t_out_min', -30, 5, 1),
        schemaHelpers.number('t_out_max', 0, 30, 1),
      ]),
    ]),
  ]});

  private _computeLabel = (schema: { name: string }): string => {
    const localize = setupCustomlocalize(this.hass);
    const key = `editor.${schema.name}`;
    const localized = localize(key);
    return localized !== key ? localized : schema.name;
  };

  render() {
    if (!this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

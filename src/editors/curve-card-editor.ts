import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, CurveCardConfig } from '../types';
import { fireEvent } from 'custom-card-helpers';

@customElement('equitherm-curve-card-editor')
export class EquithermCurveCardEditor extends LitElement {
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

  static styles = css`ha-form { display: block; }`;

  private _schema = [
    { name: 'title', required: false, selector: { text: {} } },
    { name: 'climate_entity', required: true, selector: { entity: { domain: ['climate'] } } },
    { name: 'outdoor_entity', required: true, selector: { entity: { domain: ['sensor', 'input_number'], device_class: 'temperature' } } },
    { name: 'curve_output_entity', required: true, selector: { entity: { domain: ['sensor'], device_class: 'temperature' } } },
    { name: 'flow_entity', required: true, selector: { entity: { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' } } },
    { name: 'rate_limiting_entity', required: false, selector: { entity: { domain: ['binary_sensor'] } } },
    // Curve parameters
    { name: 'hc', required: true, selector: { number: { min: 0.5, max: 3.0, step: 0.1, mode: 'slider' } } },
    { name: 'n', required: true, selector: { number: { min: 1.0, max: 2.0, step: 0.05, mode: 'slider' } } },
    { name: 'shift', required: true, selector: { number: { min: -15, max: 15, step: 1, mode: 'slider' } } },
    { name: 'min_flow', required: true, selector: { number: { min: 15, max: 35, step: 1, mode: 'slider' } } },
    { name: 'max_flow', required: true, selector: { number: { min: 50, max: 90, step: 1, mode: 'slider' } } },
    { name: 't_out_min', required: true, selector: { number: { min: -30, max: 5, step: 1, mode: 'slider' } } },
    { name: 't_out_max', required: true, selector: { number: { min: 0, max: 30, step: 1, mode: 'slider' } } },
  ];

  private _computeLabel = (schema: { name: string }): string => ({
    title: 'Title (optional)',
    climate_entity: 'Climate Entity',
    outdoor_entity: 'Outdoor Temperature Entity',
    curve_output_entity: 'Heating Curve Output Entity (operating point)',
    flow_entity: 'Flow Setpoint Entity',
    rate_limiting_entity: 'Rate Limiting Active (optional)',
    hc: 'Heat Curve Coefficient',
    n: 'Curve Exponent',
    shift: 'Temperature Shift (°C)',
    min_flow: 'Min Flow Temperature (°C)',
    max_flow: 'Max Flow Temperature (°C)',
    t_out_min: 'Outdoor Temp Min (°C)',
    t_out_max: 'Outdoor Temp Max (°C)',
  }[schema.name] ?? schema.name);

  render() {
    if (!this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

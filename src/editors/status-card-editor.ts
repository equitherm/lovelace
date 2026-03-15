import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, StatusCardConfig } from '../types';
import { fireEvent } from 'custom-card-helpers';

@customElement('equitherm-status-card-editor')
export class EquithermStatusCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: StatusCardConfig;

  setConfig(config: StatusCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;

    // ha-form passes the entire updated data object in ev.detail.value
    const newConfig = { ...ev.detail.value } as StatusCardConfig;

    // Only fire if something actually changed
    if (JSON.stringify(newConfig) !== JSON.stringify(this._config)) {
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  static styles = css`ha-form { display: block; }`;

  private _schema = [
    { name: 'climate_entity', required: true, selector: { entity: { domain: ['climate'] } } },
    { name: 'outdoor_entity', required: true, selector: { entity: { domain: ['sensor', 'input_number'], device_class: 'temperature' } } },
    { name: 'flow_entity', required: true, selector: { entity: { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' } } },
    { name: 'curve_output_entity', required: false, selector: { entity: { domain: ['sensor'], device_class: 'temperature' } } },
    { name: 'rate_limiting_entity', required: false, selector: { entity: { domain: ['binary_sensor'] } } },
    { name: 'control_mode_entity', required: false, selector: { entity: { domain: ['sensor'] } } },
  ];

  private _computeLabel = (schema: { name: string }): string => ({
    climate_entity: 'Climate Entity',
    outdoor_entity: 'Outdoor Temperature Entity',
    flow_entity: 'Flow Setpoint Entity (rate-limited)',
    curve_output_entity: 'Heating Curve Output Entity (pre-rate-limit, optional)',
    rate_limiting_entity: 'Rate Limiting Active Entity (optional)',
    control_mode_entity: 'Control Mode Entity (optional)',
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

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { HomeAssistant, StatusCardConfig } from '../types';
import { fireEvent } from 'custom-card-helpers';
import { schemaHelpers, HaFormSchema } from '../utils/editor';

@customElement('equitherm-status-card-editor')
export class EquithermStatusCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: StatusCardConfig;

  setConfig(config: StatusCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    const target = ev.target as HTMLElement & { configValue?: string; value?: unknown; checked?: boolean };
    if (!this._config || target.configValue === undefined) {
      return;
    }
    const value = target.value ?? target.checked;
    const newConfig = {
      ...this._config,
      [target.configValue]: value,
    };
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static styles = css`ha-form { display: block; }`;

  private _getSchema = memoizeOne((): HaFormSchema[] => [
    schemaHelpers.entity('climate_entity', { domain: 'climate' }),
    schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'] }),
    schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'] }),
    schemaHelpers.entity('curve_output_entity', { domain: 'sensor', required: false }),
    schemaHelpers.entity('rate_limiting_entity', { domain: 'binary_sensor', required: false }),
    schemaHelpers.entity('control_mode_entity', { domain: 'sensor', required: false }),
  ]);

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
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

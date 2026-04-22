// src/cards/status-card/status-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { StatusCardConfig } from './status-card-config';
import { validateStatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import { fireEvent } from '../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { STATUS_CARD_EDITOR_NAME } from './const';

@customElement(STATUS_CARD_EDITOR_NAME)
export class StatusCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: StatusCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: StatusCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as Record<string, unknown>;
    try {
      validateStatusCardConfig(newConfig);
      this._error = undefined;
      fireEvent(this, 'config-changed', { config: newConfig as StatusCardConfig });
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

  private _getSchema = memoizeOne((tunable: boolean): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} }, default: false },
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
        schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('pid_correction_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature', required: false }),
      ]),
      schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve-cumulative', [
        schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'], required: false }),
        schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'], required: false }),
        schemaHelpers.entity('n_entity', { domain: ['number', 'input_number'], required: false }),
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
        .schema=${this._getSchema(!!this._config.tunable)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'equitherm-status-card-editor': StatusCardEditor;
  }
}

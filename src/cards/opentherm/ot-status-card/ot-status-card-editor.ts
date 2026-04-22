// src/cards/opentherm/ot-status-card/ot-status-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtStatusCardConfig } from './ot-status-card-config';
import { validateOtStatusCardConfig } from './ot-status-card-config';
import type { HomeAssistant } from '../../../ha/types';
import type { LovelaceCardEditor } from '../../../ha/panels/lovelace/types';
import { fireEvent } from '../../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_STATUS_CARD_EDITOR_NAME } from './const';

@customElement(OT_STATUS_CARD_EDITOR_NAME)
export class OtStatusCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: OtStatusCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: OtStatusCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as OtStatusCardConfig;
    try {
      validateOtStatusCardConfig(newConfig);
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

  private _getSchema = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('boiler_temp_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entityName('name', { entity: 'boiler_temp_entity' }),
      schemaHelpers.entity('return_temp_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('flame_entity', { domain: ['binary_sensor', 'input_boolean'] }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('setpoint_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('modulation_entity', { domain: ['sensor', 'input_number'], required: false }),
        schemaHelpers.entity('ch_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('dhw_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
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
        .schema=${this._getSchema()}
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
    'opentherm-status-card-editor': OtStatusCardEditor;
  }
}

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtDhwCardConfig } from './ot-dhw-card-config';
import { validateOtDhwCardConfig } from './ot-dhw-card-config';
import type { HomeAssistant } from '../../../ha/types';
import type { LovelaceCardEditor } from '../../../ha/panels/lovelace/types';
import { fireEvent } from '../../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_DHW_CARD_EDITOR_NAME } from './const';

@customElement(OT_DHW_CARD_EDITOR_NAME)
export class OtDhwCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: OtDhwCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: OtDhwCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as OtDhwCardConfig;
    try {
      validateOtDhwCardConfig(newConfig);
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
      schemaHelpers.entity('dhw_enable_entity', { domain: ['switch', 'input_boolean'] }),
      schemaHelpers.entityName('name', { entity: 'dhw_enable_entity' }),
      schemaHelpers.entity('dhw_setpoint_entity', { domain: ['number', 'input_number'] }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('dhw_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('dhw_temp_entity', { domain: ['sensor', 'input_number'], required: false }),
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
    'opentherm-dhw-card-editor': OtDhwCardEditor;
  }
}

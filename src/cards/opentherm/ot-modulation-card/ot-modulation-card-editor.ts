import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtModulationCardConfig } from './ot-modulation-card-config';
import { validateOtModulationCardConfig } from './ot-modulation-card-config';
import type { HomeAssistant } from '../../../ha/types';
import type { LovelaceCardEditor } from '../../../ha/panels/lovelace/types';
import { fireEvent } from '../../../ha/common/dom/fire_event';
import { schemaHelpers } from '../../../utils/form/schema-helpers';
import type { HaFormSchema } from '../../../utils/form/ha-form';
import setupCustomLocalize from '../../../localize';
import { OT_MODULATION_CARD_EDITOR_NAME } from './const';

@customElement(OT_MODULATION_CARD_EDITOR_NAME)
export class OtModulationCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: OtModulationCardConfig;
  @state() private _error?: Record<string, string>;

  setConfig(config: OtModulationCardConfig) { this._config = { ...config }; }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value } as Record<string, unknown>;
    try {
      validateOtModulationCardConfig(newConfig);
      this._error = undefined;
      fireEvent(this, 'config-changed', { config: newConfig as OtModulationCardConfig });
    } catch (err) {
      this._error = { base: (err as Error).message };
    }
  }

  static styles = css`
    ha-form { display: block; }
    ha-expandable { margin: 8px 0; --ha-card-border-radius: 8px; }
  `;

  private _getSchema = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      schemaHelpers.entity('modulation_entity', { domain: ['sensor', 'input_number'] }),
      schemaHelpers.entity('max_modulation_entity', { domain: ['number', 'input_number'] }),
      schemaHelpers.entity('flame_entity', { domain: ['binary_sensor', 'input_boolean'] }),
      schemaHelpers.entityName('name', { entity: 'modulation_entity' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:tune', [
        { name: 'hours', selector: { number: { min: 1, max: 24, step: 1, mode: 'box' as const } } },
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
    'opentherm-modulation-card-editor': OtModulationCardEditor;
  }
}

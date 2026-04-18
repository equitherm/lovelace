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
    let newConfig = { ...this._config, ...ev.detail.value } as Record<string, unknown>;
    // Convert content_layout selector → vertical boolean
    if ('content_layout' in newConfig) {
      newConfig.vertical = newConfig.content_layout === 'vertical';
      delete newConfig.content_layout;
    }
    // Clean up legacy layout field
    delete (newConfig as Record<string, unknown>).layout;
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

  private _getSchema = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
      ]),
      // Appearance
      schemaHelpers.expandable(localize('editor.appearance'), 'mdi:palette-outline', [
        {
          name: 'content_layout',
          selector: {
            select: {
              mode: 'box',
              options: ['horizontal', 'vertical'].map((value) => ({
                value,
                label: localize(`editor.layout_options.${value}`),
              })),
            },
          },
        },
      ]),
      // Actions
      schemaHelpers.expandable(localize('editor.actions'), 'mdi:gesture-tap', [
        { name: 'tap_action', selector: { ui_action: {} } },
        { name: 'hold_action', selector: { ui_action: {} } },
        { name: 'double_tap_action', selector: { ui_action: {} } },
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
        .data=${{ ...this._config, content_layout: this._config.vertical ? 'vertical' : 'horizontal' }}
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
    'equitherm-status-card-editor': StatusCardEditor;
  }
}

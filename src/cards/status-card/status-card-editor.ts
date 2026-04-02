// src/cards/status-card/status-card-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent } from '../../ha/common/dom/fire_event';
import type { StatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { STATUS_CARD_EDITOR_NAME } from './const';

@customElement(STATUS_CARD_EDITOR_NAME)
export class StatusCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: StatusCardConfig;

  private _getSchema(): HaFormSchema[] {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Title
      {
        name: 'title',
        selector: { text: {} },
      },
      // Required entities
      {
        name: 'climate_entity',
        required: true,
        selector: { entity: { domain: 'climate' } },
      },
      {
        name: 'outdoor_entity',
        required: true,
        selector: { entity: { device_class: 'temperature' } },
      },
      {
        name: 'flow_entity',
        required: true,
        selector: { entity: { device_class: 'temperature' } },
      },
      // Optional entities (expandable)
      {
        type: 'expandable',
        flatten: true,
        name: 'optional_entities',
        title: localize('editor.optional'),
        icon: 'mdi:chevron-down',
        schema: [
          {
            name: 'curve_output_entity',
            selector: { entity: { device_class: 'temperature' } },
          },
          {
            name: 'rate_limiting_entity',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'control_mode_entity',
            selector: { entity: {} },
          },
        ],
      },
      // Appearance (expandable)
      {
        type: 'expandable',
        flatten: true,
        name: 'appearance',
        title: localize('editor.appearance'),
        icon: 'mdi:palette',
        schema: [
          {
            name: 'layout',
            selector: {
              select: {
                options: [
                  { value: 'default', label: localize('editor.layout_default') },
                  { value: 'vertical', label: localize('editor.layout_vertical') },
                  { value: 'horizontal', label: localize('editor.layout_horizontal') },
                ],
                mode: 'dropdown',
              },
            },
          },
        ],
      },
    ];
  }

  setConfig(config: StatusCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;

    const newConfig = { ...this._config, ...ev.detail.value };
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

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

  private _computeLabel = (schema: { name: string }): string => {
    const localize = setupCustomLocalize(this.hass);
    const key = `editor.${schema.name}`;
    const localized = localize(key);
    return localized !== key ? localized : schema.name;
  };

  static styles = css`
    ha-form {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'equitherm-status-card-editor': StatusCardEditor;
  }
}

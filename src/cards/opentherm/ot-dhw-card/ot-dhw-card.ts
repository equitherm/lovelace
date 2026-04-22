import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { OtDhwCardConfig } from './ot-dhw-card-config';
import type { HomeAssistant } from '../../../ha';
import type { LovelaceGridOptions } from '../../../ha/panels/lovelace/types';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { computeEntityNameDisplay } from '../../../ha/common/entity/compute_entity_name_display';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_DHW_CARD_NAME, OT_DHW_CARD_EDITOR_NAME } from './const';
import { validateOtDhwCardConfig } from './ot-dhw-card-config';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';

registerCustomCard({
  type: OT_DHW_CARD_NAME,
  name: 'OpenTherm DHW',
  description: 'Domestic hot water control',
});

@customElement(OT_DHW_CARD_NAME)
export class OtDhwCard extends OtBaseCard<OtDhwCardConfig> {

  static async getStubConfig(hass: HomeAssistant): Promise<OtDhwCardConfig> {
    const entityIds = Object.keys(hass.states);
    const enable = entityIds.find(e =>
      (computeDomain(e) === 'switch' || computeDomain(e) === 'input_boolean') &&
      e.includes('dhw_enable')
    ) ?? entityIds.find(e =>
      computeDomain(e) === 'switch' || computeDomain(e) === 'input_boolean'
    ) ?? '';
    const setpoint = entityIds.find(e =>
      (computeDomain(e) === 'number' || computeDomain(e) === 'input_number') &&
      e.includes('dhw')
    ) ?? entityIds.find(e =>
      computeDomain(e) === 'number' || computeDomain(e) === 'input_number'
    ) ?? '';
    return {
      type: `custom:${OT_DHW_CARD_NAME}`,
      dhw_enable_entity: enable,
      dhw_setpoint_entity: setpoint,
    } as OtDhwCardConfig;
  }

  static async getConfigElement() {
    await import('./ot-dhw-card-editor');
    return document.createElement(OT_DHW_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateOtDhwCardConfig(config);
  }

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 4, min_rows: 1 };
  }

  private get _dhwEnabled(): boolean {
    return this._entityState(this._config.dhw_enable_entity)?.state === 'on';
  }

  private get _dhwActive(): boolean {
    if (!this._config.dhw_active_entity) return false;
    return this._entityState(this._config.dhw_active_entity)?.state === 'on';
  }

  private get _setpointValue(): number {
    return this._resolveEntityNumber(this._config.dhw_setpoint_entity, NaN);
  }

  private get _setpointMin(): number {
    return this._entityAttr<number>(this._config.dhw_setpoint_entity, 'min') ?? 30;
  }

  private get _setpointMax(): number {
    return this._entityAttr<number>(this._config.dhw_setpoint_entity, 'max') ?? 60;
  }

  private get _dhwTemp(): number {
    if (!this._config.dhw_temp_entity) return NaN;
    return this._resolveEntityNumber(this._config.dhw_temp_entity, NaN);
  }

  private get _setpointStep(): number {
    return this._entityAttr<number>(this._config.dhw_setpoint_entity, 'step') ?? 0.5;
  }

  protected override _headerIconColor(): string {
    return this._dhwEnabled
      ? 'var(--rgb-state-climate-heat, 244,81,30)'
      : 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    return html`
      <div class="badges">
        ${this._dhwActive ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .icon=${'mdi:water-boiler'}
            .label=${localize('opentherm.dhw_card.dhw')}
            .active=${true}
          ></eq-badge-info>
        ` : nothing}
      </div>
    `;
  }

  private _toggleDhw(): void {
    if (!this.hass) return;
    const { dhw_enable_entity: entityId } = this._config;
    const domain = computeDomain(entityId);
    const service = this._dhwEnabled ? 'turn_off' : 'turn_on';
    this.hass.callService(domain, service, { entity_id: entityId });
  }

  private _setpointChanged(ev: CustomEvent): void {
    if (!this.hass) return;
    const value = (ev.target as HTMLInputElement).value;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    const domain = computeDomain(this._config.dhw_setpoint_entity);
    const serviceDomain = domain === 'input_number' ? 'input_number' : 'number';
    this.hass.callService(serviceDomain, 'set_value', {
      entity_id: this._config.dhw_setpoint_entity,
      value: numValue,
    });
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; }
        .body {
          padding: 8px 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .control-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .control-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          min-width: 60px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toggle-label {
          font-size: var(--ha-font-size-m, 1rem);
          font-weight: 500;
          color: var(--primary-text-color);
        }
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .slider-value {
          font-size: 22px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
        }
        .hero-temp {
          text-align: center;
          padding: 4px 0;
        }
        .hero-value {
          font-size: 28px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--gradient-hot, #f97316);
          cursor: pointer;
        }
        .hero-target {
          font-size: 12px;
          color: var(--secondary-text-color);
          margin-top: 2px;
        }
        ha-slider {
          width: 100%;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    const enabled = this._dhwEnabled;
    const setpoint = this._setpointValue;
    const dhwTemp = this._dhwTemp;
    const hasDhwTemp = cfg.dhw_temp_entity && !isNaN(dhwTemp);
    const enableState = this._entityState(cfg.dhw_enable_entity);
    const title = enableState
      ? computeEntityNameDisplay(enableState, cfg.name, this.hass) || localize('opentherm.dhw_card.default_title')
      : localize('opentherm.dhw_card.default_title');

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:shower',
          clickEntity: cfg.dhw_enable_entity,
          title,
        })}
        <div class="body">
          ${hasDhwTemp ? html`
            <div class="hero-temp">
              <div class="hero-value">${this._formatCalcTemp(dhwTemp)}</div>
              <div class="hero-target">→ ${isNaN(setpoint) ? '—' : this._formatCalcTemp(setpoint)}</div>
            </div>
          ` : nothing}
          <div class="toggle-row">
            <span class="toggle-label">${localize('opentherm.dhw_card.enable')}</span>
            <ha-switch
              .checked=${enabled}
              @change=${this._toggleDhw}
            ></ha-switch>
          </div>
          <div class="slider-container">
            <div class="slider-header">
              <span class="control-label">${localize('opentherm.dhw_card.setpoint')}</span>
              <span class="slider-value">${isNaN(setpoint) ? '—' : this._formatCalcTemp(setpoint)}</span>
            </div>
            <ha-slider
              .min=${this._setpointMin}
              .max=${this._setpointMax}
              .step=${this._setpointStep}
              .value=${isNaN(setpoint) ? this._setpointMin : setpoint}
              .disabled=${!enabled}
              pin
              @change=${this._setpointChanged}
            ></ha-slider>
          </div>
        </div>
        ${cfg.show_last_updated ? html`
          <div class="footer-meta">${this._renderLastUpdated(cfg.dhw_setpoint_entity)}</div>
        ` : nothing}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-dhw-card': OtDhwCard;
  }
}

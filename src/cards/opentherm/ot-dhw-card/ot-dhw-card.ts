import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { OtDhwCardConfig } from './ot-dhw-card-config';
import type { HomeAssistant } from '../../../ha';
import type { LovelaceGridOptions } from '../../../ha/panels/lovelace/types';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_DHW_CARD_NAME, OT_DHW_CARD_EDITOR_NAME, WRITABLE_BINARY_DOMAINS, NUMBER_DOMAINS } from './const';
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
    const binaries = entityIds.filter(e => WRITABLE_BINARY_DOMAINS.includes(computeDomain(e) as 'switch' | 'input_boolean'));
    const numbers = entityIds.filter(e => NUMBER_DOMAINS.includes(computeDomain(e)));
    const enable = binaries.find(e => e.includes('dhw_enable')) ?? binaries[0] ?? '';
    const setpoint = numbers.find(e => e.includes('dhw')) ?? numbers[0] ?? '';
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
    return { columns: 6, rows: this._config.show_last_updated ? 5 : 4, min_rows: 3 };
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

  private get _sliderProps() {
    const id = this._config.dhw_setpoint_entity;
    return {
      min: this._entityAttr<number>(id, 'min') ?? 40,
      max: this._entityAttr<number>(id, 'max') ?? 65,
      step: this._entityAttr<number>(id, 'step') ?? 1,
    };
  }

  private get _dhwTemp(): number {
    if (!this._config.dhw_temp_entity) return NaN;
    return this._resolveEntityNumber(this._config.dhw_temp_entity, NaN);
  }

  protected override _titleEntity(): string | undefined {
    return this._config.dhw_enable_entity;
  }

  protected override _headerIconColor(): string {
    const fault = this._faultOverride();
    if (fault) return fault;
    return this._dhwEnabled
      ? 'var(--rgb-state-climate-heat, 244,81,30)'
      : 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    return html`
      <div class="badges">
        ${this._renderFaultBadge()}
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

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.dhw_setpoint_entity;
  }

  private _toggleDhw(): void {
    if (!this.hass) return;
    const { dhw_enable_entity: entityId } = this._config;
    const domain = computeDomain(entityId);
    const service = this._dhwEnabled ? 'turn_off' : 'turn_on';
    this.hass.callService(domain, service, { entity_id: entityId });
  }

  private _onSetpointChanged(ev: CustomEvent): void {
    const value = Number((ev.detail as { value: unknown }).value);
    if (isNaN(value)) return;
    const domain = computeDomain(this._config.dhw_setpoint_entity);
    const serviceDomain = domain === 'input_number' ? 'input_number' : 'number';
    this.hass.callService(serviceDomain, 'set_value', {
      entity_id: this._config.dhw_setpoint_entity,
      value,
    });
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; }
        .content {
          text-align: center;
          padding: 8px 16px 12px;
          transition: opacity 0.3s ease;
        }
        .content.disabled {
          opacity: 0.45;
        }
        .hero-value {
          font-size: calc(var(--ha-font-size-l, 16px) * 1.75);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--gradient-hot, #f97316);
          cursor: pointer;
        }
        .hero-value.disabled {
          color: var(--secondary-text-color);
          cursor: default;
        }
        .hero-label {
          font-size: var(--ha-font-size-s, 12px);
          color: var(--secondary-text-color);
          margin-top: 2px;
        }
        .features {
          --feature-color: var(--gradient-hot, #f97316);
          border-top: 1px solid var(--divider-color);
          padding: 12px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: var(--ha-card-feature-gap, 12px);
          flex-shrink: 0;
        }
        .feature-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .feature-label {
          font-size: var(--ha-font-size-m, 1rem);
          font-weight: 500;
          color: var(--primary-text-color);
        }
        ha-control-slider {
          width: 100%;
          --control-slider-color: var(--feature-color);
          --control-slider-background: var(--feature-color);
          --control-slider-background-opacity: 0.2;
          --control-slider-thickness: 32px;
          --control-slider-border-radius: var(--ha-border-radius-lg, 12px);
        }
        @container (max-width: 260px) {
          .feature-row {
            flex-wrap: wrap;
            gap: 4px;
          }
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
    const title = this._computeCardTitle('opentherm.dhw_card.default_title');
    const notFoundEnable = this._renderNotFound(cfg.dhw_enable_entity, localize('opentherm.dhw_card.enable'));

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:shower',
          clickEntity: cfg.dhw_enable_entity,
          title,
        })}
        <div class="content ${classMap({ disabled: !enabled })}">
          ${hasDhwTemp
            ? html`
              <div class="hero-value ${classMap({ disabled: !enabled })}"
                @click=${() => this._openMoreInfo(cfg.dhw_temp_entity!)}>
                ${this._formatCalcTemp(dhwTemp)}
              </div>
              <div class="hero-label">
                ${localize('opentherm.dhw_card.target')} ${isNaN(setpoint) ? '—' : this._formatCalcTemp(setpoint)}
              </div>
            `
            : html`
              <div class="hero-value ${classMap({ disabled: !enabled })}">${isNaN(setpoint) ? '—' : this._formatCalcTemp(setpoint)}</div>
              <div class="hero-label">${localize('opentherm.dhw_card.setpoint')}</div>
            `
          }
        </div>
        <div class="features">
          <div class="feature-row">
            <span class="feature-label">${localize('opentherm.dhw_card.enable')}</span>
            <ha-switch .checked=${enabled} @change=${this._toggleDhw}></ha-switch>
          </div>
          <ha-control-slider
            .min=${this._sliderProps.min}
            .max=${this._sliderProps.max}
            .step=${this._sliderProps.step}
            .value=${isNaN(setpoint) ? this._sliderProps.min : setpoint}
            .disabled=${!enabled}
            mode="start"
            .label=${localize('opentherm.dhw_card.setpoint')}
            .locale=${this.hass.locale}
            @value-changed=${this._onSetpointChanged}
          ></ha-control-slider>
        </div>
        ${notFoundEnable}
        ${this._renderFooterMeta()}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-dhw-card': OtDhwCard;
  }
}

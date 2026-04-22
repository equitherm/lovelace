import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { OtStatusCardConfig } from './ot-status-card-config';
import type { HomeAssistant } from '../../../ha';
import type { LovelaceGridOptions } from '../../../ha/panels/lovelace/types';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { computeEntityNameDisplay } from '../../../ha/common/entity/compute_entity_name_display';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_STATUS_CARD_NAME, OT_STATUS_CARD_EDITOR_NAME, BINARY_SENSOR_DOMAINS, SENSOR_DOMAINS } from './const';
import { validateOtStatusCardConfig } from './ot-status-card-config';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';

registerCustomCard({
  type: OT_STATUS_CARD_NAME,
  name: 'OpenTherm Status',
  description: 'Boiler status at a glance',
});

@customElement(OT_STATUS_CARD_NAME)
export class OtStatusCard extends OtBaseCard<OtStatusCardConfig> {

  static async getStubConfig(hass: HomeAssistant): Promise<OtStatusCardConfig> {
    const entityIds = Object.keys(hass.states);
    const sensors = entityIds.filter(e => SENSOR_DOMAINS.includes(computeDomain(e)));
    const binaries = entityIds.filter(e => BINARY_SENSOR_DOMAINS.includes(computeDomain(e)));
    const boiler = sensors.find(e => e.includes('boiler') || e.includes('t_boiler')) ?? sensors[0] ?? '';
    const ret = sensors.find(e => e.includes('ret') || e.includes('return')) ?? sensors[1] ?? '';
    const flame = binaries.find(e => e.includes('flame')) ?? binaries[0] ?? '';
    return {
      type: `custom:${OT_STATUS_CARD_NAME}`,
      boiler_temp_entity: boiler,
      return_temp_entity: ret,
      flame_entity: flame,
    } as OtStatusCardConfig;
  }

  static async getConfigElement() {
    await import('./ot-status-card-editor');
    return document.createElement(OT_STATUS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateOtStatusCardConfig(config);
  }

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 3, min_rows: 1 };
  }

  private get _flameOn(): boolean {
    return this._entityState(this._config.flame_entity)?.state === 'on';
  }

  private get _boilerTemp(): number {
    return this._resolveEntityNumber(this._config.boiler_temp_entity, NaN);
  }

  private get _returnTemp(): number {
    return this._resolveEntityNumber(this._config.return_temp_entity, NaN);
  }

  private get _deltaT(): number {
    return this._boilerTemp - this._returnTemp;
  }

  private get _modulation(): number {
    if (!this._config.modulation_entity) return NaN;
    return this._resolveEntityNumber(this._config.modulation_entity, NaN);
  }

  protected override _renderHeaderIcon(iconName: string, clickEntity: string) {
    const tileColor = this._flameOn
      ? 'var(--rgb-state-climate-heat, 244,81,30)'
      : 'var(--rgb-disabled, 158,158,158)';
    return html`
      <ha-tile-icon .interactive=${true}
        style="--tile-icon-color: rgb(${tileColor}); --tile-icon-size: 42px"
        @click=${() => this._openMoreInfo(clickEntity)}>
        <ha-icon slot="icon" .icon=${iconName}></ha-icon>
      </ha-tile-icon>
    `;
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const chActive = cfg.ch_active_entity ? this._entityState(cfg.ch_active_entity)?.state === 'on' : false;
    const dhwActive = cfg.dhw_active_entity ? this._entityState(cfg.dhw_active_entity)?.state === 'on' : false;

    return html`
      <div class="badges">
        ${this._flameOn ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${localize('opentherm.status_card.flame')}
            .icon=${'mdi:fire'}
            .active=${true}
          ></eq-badge-info>
        ` : nothing}
        ${chActive ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-primary-color, 33, 150, 243)"
            .label=${localize('opentherm.status_card.ch')}
            .icon=${'mdi:radiator'}
          ></eq-badge-info>
        ` : nothing}
        ${dhwActive ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${localize('opentherm.status_card.dhw')}
            .icon=${'mdi:water-boiler'}
          ></eq-badge-info>
        ` : nothing}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; }
        .body { padding: 8px 10px 10px; display: flex; flex-direction: column; gap: 8px; }
        .temps-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 8px;
        }
        .temp-block {
          text-align: center;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .temp-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .temp-value {
          font-size: 22px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .temp-value.hot { color: var(--gradient-hot, #f97316); }
        .temp-setpoint {
          font-size: 11px;
          color: var(--secondary-text-color);
          margin-top: 1px;
        }
        .temp-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          margin-top: 2px;
        }
        .divider { width: 1px; background: var(--divider-color); height: 32px; flex-shrink: 0; }
        .arrow { color: var(--divider-color); font-size: 0.9rem; padding-bottom: 14px; }
        .mod-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 4px;
        }
        .mod-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--secondary-text-color);
          white-space: nowrap;
          min-width: 70px;
        }
        .mod-track {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--secondary-background-color, rgba(0,0,0,0.08));
          overflow: hidden;
        }
        .mod-fill {
          height: 100%;
          border-radius: 3px;
          background: var(--gradient-hot, #f97316);
          transition: width 0.4s ease;
        }
        .mod-value {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 36px;
          text-align: right;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    const flameOn = this._flameOn;
    const boiler = this._boilerTemp;
    const ret = this._returnTemp;
    const delta = this._deltaT;
    const mod = this._modulation;
    const setpoint = cfg.setpoint_entity ? this._resolveEntityNumber(cfg.setpoint_entity, NaN) : NaN;
    const fmtTemp = (v: number) => isNaN(v) ? '—' : this._formatCalcTemp(v);
    const boilerState = this._entityState(cfg.boiler_temp_entity);
    const title = boilerState
      ? computeEntityNameDisplay(boilerState, cfg.name, this.hass) || localize('opentherm.status_card.default_title')
      : localize('opentherm.status_card.default_title');

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: flameOn ? 'mdi:fire' : 'mdi:fire-off',
          clickEntity: cfg.boiler_temp_entity,
          title,
        })}
        <div class="body">
          <div class="temps-row">
            <div class="temp-block" @click=${() => this._openMoreInfo(cfg.boiler_temp_entity)}>
              <div class="temp-value hot">${fmtTemp(boiler)}</div>
              ${!isNaN(setpoint) ? html`<div class="temp-setpoint">→ ${fmtTemp(setpoint)}</div>` : nothing}
              <div class="temp-label">${localize('opentherm.status_card.flow')}</div>
            </div>
            <div class="arrow" aria-hidden="true">→</div>
            <div class="temp-block" @click=${() => this._openMoreInfo(cfg.return_temp_entity)}>
              <div class="temp-value">${fmtTemp(ret)}</div>
              <div class="temp-label">${localize('opentherm.status_card.return')}</div>
            </div>
            <div class="divider"></div>
            <div class="temp-block">
              <div class="temp-value">${isNaN(delta) ? '—' : `${delta > 0 ? '+' : ''}${delta.toFixed(1)}${this.hass?.config?.unit_system?.temperature ?? '°C'}`}</div>
              <div class="temp-label">ΔT</div>
            </div>
          </div>
          ${!isNaN(mod) ? html`
            <div class="mod-row">
              <span class="mod-label">${localize('opentherm.status_card.modulation')}</span>
              <div class="mod-track">
                <div class="mod-fill" style="width: ${Math.max(0, Math.min(100, mod))}%"></div>
              </div>
              <span class="mod-value">${mod.toFixed(0)}%</span>
            </div>
          ` : nothing}
        </div>
        ${cfg.show_last_updated ? html`
          <div class="footer-meta">${this._renderLastUpdated(cfg.boiler_temp_entity)}</div>
        ` : nothing}
      </ha-card>
    `;
  }
}

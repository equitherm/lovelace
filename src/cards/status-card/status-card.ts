import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { StatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { EquithermBaseCard, headerStyles } from '../../utils/base';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import setupCustomLocalize from '../../localize';
import { validateStatusCardConfig } from './status-card-config';
import { STATUS_CARD_NAME, STATUS_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS } from './const';
import { getAdjustingDirection, getRateTargetEntity } from '../../utils/climate-helpers';
import '../../shared/badge-info';

registerCustomCard({
  type: STATUS_CARD_NAME,
  name: 'Equitherm Status',
  description: 'Compact heating status tile with temperature displays',
});

@customElement(STATUS_CARD_NAME)
export class EquithermStatusCard extends EquithermBaseCard<StatusCardConfig> {
  // Layout property reflected to attribute for CSS styling
  @property({ reflect: true, type: Boolean }) vertical = false;

  public getGridOptions(): LovelaceGridOptions {
    if (this.vertical) {
      return this._hasPidDiagnostic
        ? { columns: 9, rows: 5, min_rows: 4 }
        : { columns: 6, rows: 4, min_rows: 4 };
    }
    return { columns: 12, rows: 3, min_rows: 1 };
  }

  static async getStubConfig(hass: HomeAssistant): Promise<StatusCardConfig> {
    const states = hass.states;
    const entityIds = Object.keys(states);

    // Find climate entity by domain
    const climateEntity = entityIds.find(e =>
      CLIMATE_ENTITY_DOMAINS.includes(computeDomain(e))
    );

    // Find temperature sensors by domain + device_class
    const tempSensors = entityIds.filter(e => {
      const state = states[e];
      return SENSOR_ENTITY_DOMAINS.includes(computeDomain(e))
        && state?.attributes?.device_class === 'temperature';
    });

    // Prefer outdoor/outside in name for outdoor temp
    const outdoorEntity = tempSensors.find(e =>
      e.includes('outdoor') || e.includes('outside') || e.includes('exterior')
    ) ?? tempSensors[0];

    // Prefer flow/supply in name for flow temp
    const flowEntity = tempSensors.find(e =>
      e.includes('flow') || e.includes('supply') || e.includes('forward')
    ) ?? tempSensors[0];

    return {
      type: 'custom:equitherm-status-card',
      climate_entity: climateEntity,
      outdoor_entity: outdoorEntity,
      flow_entity: flowEntity,
    } as StatusCardConfig;
  }

  static async getConfigElement() {
    await import('./status-card-editor');
    return document.createElement(STATUS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateStatusCardConfig(config);
    this.vertical = this._config.vertical ?? false;
  }

  private get _outdoorTemp(): string {
    const state = this._entityState(this._config.outdoor_entity);
    if (!state) return '—';
    return this._formatTemp(parseFloat(state.state), this._entityAttr<string>(this._config.outdoor_entity, 'unit_of_measurement'));
  }

  private get _flowTemp(): string {
    const state = this._entityState(this._config.flow_entity);
    if (!state) return '—';
    return this._formatTemp(parseFloat(state.state), this._entityAttr<string>(this._config.flow_entity, 'unit_of_measurement'));
  }

  private get _curveOutputTemp(): string {
    const entity = getRateTargetEntity(this._config);
    if (!entity) return '';
    const state = this._entityState(entity);
    if (!state) return '';
    const value = parseFloat(state.state);
    if (isNaN(value)) return '';
    return this._formatTemp(value, this._entityAttr<string>(entity, 'unit_of_measurement'));
  }

  private _readNum(entityId: string | undefined): number | null {
    const s = this._entityState(entityId);
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }

  private _formatNum(value: number | null, decimals = 2): string {
    if (value === null) return '—';
    const locale = this.hass?.locale?.language;
    return locale
      ? value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : value.toFixed(decimals);
  }

  private get _hasPidDiagnostic(): boolean {
    return !!this._config.pid_correction_entity;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card {
          height: 100%;
        }
        .temps {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
          padding: 0 10px;
        }
        .temp-block {
          text-align: center;
          min-width: 0;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .temp-block:hover {
          background: var(--secondary-background-color, rgba(0,0,0,0.04));
        }
        .temp-value {
          font-size: var(--ha-font-size-xl, 1.4rem);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          color: var(--primary-text-color);
          white-space: nowrap;
        }
        .temp-value.flow { color: var(--gradient-hot); }
        .temp-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          margin-top: 4px;
          white-space: nowrap;
        }
        .arrow {
          color: var(--divider-color, rgba(0,0,0,0.2));
          font-size: 0.9rem;
          padding-bottom: calc(0.68rem + 4px);
        }
        .divider { width: 1px; background: var(--divider-color, rgba(0,0,0,0.12)); height: 32px; flex-shrink: 0; }
        .flow-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .flow-dual .target { font-size: 0.7rem; color: var(--secondary-text-color); }

        /* Layout variations */
        .temps.vertical {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;
          gap: 12px;
        }
        .temps.vertical .arrow,
        .temps.vertical .divider {
          display: none;
        }

        /* PID diagnostic */
        .pid-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 10px 8px;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }
        .pid-row .sep {
          color: var(--divider-color, rgba(0,0,0,0.25));
          font-size: 10px;
        }
        .pid-row .divider-v {
          width: 1px;
          height: 12px;
          background: var(--divider-color, rgba(0,0,0,0.2));
          flex-shrink: 0;
          margin: 0 2px;
        }
        .pid-row .term {
          cursor: pointer;
          border-radius: 4px;
          padding: 1px 3px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .pid-row .term:hover {
          background: var(--secondary-background-color, rgba(0,0,0,0.04));
        }
        .pid-row .correction {
          border-radius: 10px;
          padding: 2px 7px;
          transition: background 0.2s;
        }
        .pid-row .correction:hover {
          filter: brightness(0.94);
        }
        .pid-row .correction.positive { background: rgba(76,175,80,0.13); }
        .pid-row .correction.negative { background: rgba(229,57,53,0.13); }
        .pid-row .correction.neutral  { background: var(--secondary-background-color, rgba(0,0,0,0.06)); }
        .pid-row .lbl {
          font-size: 10px;
          font-weight: var(--ha-font-weight-medium, 500);
          color: var(--secondary-text-color);
        }
        .pid-row .val {
          font-size: var(--ha-font-size-s, 0.8rem);
          font-weight: 600;
          color: var(--primary-text-color);
        }
        .pid-row .correction .val {
          font-size: var(--ha-font-size-m, 1rem);
          font-weight: 700;
        }
        .pid-row .val.positive { color: var(--success-color, #4caf50); }
        .pid-row .val.negative { color: var(--error-color, #e53935); }

        .pid-row.vertical .term:not(.correction),
        .pid-row.vertical .sep,
        .pid-row.vertical .divider-v { display: none; }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const vertical = this._config.vertical ?? false;
    const lookup = (id: string) => this._entityState(id)!;
    const adjustingDir = getAdjustingDirection(this._config, lookup);
    const curveOutput = this._curveOutputTemp;
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name ?? this._config.title, this.hass) || localize('status_card.default_title')
      : (this._config.title ?? localize('status_card.default_title'));

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:thermostat',
          clickEntity: this._config.climate_entity,
          title,
        })}

        <div class=${classMap({ temps: true, vertical })}>
          <div class="temp-block"
            @click=${() => this._openMoreInfo(this._config.outdoor_entity)}
          >
            <div class="temp-value">${this._outdoorTemp}</div>
            <div class="temp-label">${localize('common.outdoor')}</div>
          </div>
          <div class="arrow" aria-hidden="true">→</div>
          <div class="temp-block"
            @click=${() => this._openMoreInfo(this._config.flow_entity)}
          >
            ${adjustingDir && curveOutput ? html`
              <div class="flow-dual">
                <div class="temp-value flow">${this._flowTemp}</div>
                <div class="target">→ ${curveOutput}</div>
              </div>
            ` : html`
              <div class="temp-value flow">${this._flowTemp}</div>
            `}
            <div class="temp-label">${localize('common.flow')}</div>
          </div>
          <div class="divider"></div>
          <div class="temp-block"
            @click=${() => this._openMoreInfo(this._config.climate_entity)}
          >
            <div class="temp-value">${this._roomTemp}</div>
            <div class="temp-label">${localize('common.room')}</div>
          </div>
        </div>
        ${this._hasPidDiagnostic ? this._renderPidSection() : nothing}
        ${this._config.show_last_updated ? html`
          <div class="footer-meta">
            ${this._renderLastUpdated(this._config.flow_entity)}
          </div>
        ` : nothing}
      </ha-card>
    `;
  }

  private _renderPidSection() {
    const correction = this._readNum(this._config.pid_correction_entity);
    const pValue = this._readNum(this._config.pid_proportional_entity);
    const iValue = this._readNum(this._config.pid_integral_entity);
    const dValue = this._readNum(this._config.pid_derivative_entity);
    const correctionClass = correction !== null
      ? (correction > 0 ? 'positive' : correction < 0 ? 'negative' : '')
      : '';

    const term = (label: string, value: number | null, entityId: string | undefined, termClass = '', valClass = '') => html`
      <span class="term ${termClass}" @click=${() => this._openMoreInfo(entityId)}>
        <span class="lbl">${label}</span> <span class="val ${valClass}">${this._formatNum(value)}°</span>
      </span>
    `;

    const chipClass = correctionClass || 'neutral';
    return html`
      <div class=${classMap({ 'pid-row': true, vertical: this.vertical })}>
        ${term('P', pValue, this._config.pid_proportional_entity)}
        <span class="sep">·</span>
        ${term('I', iValue, this._config.pid_integral_entity)}
        <span class="sep">·</span>
        ${term('D', dValue, this._config.pid_derivative_entity)}
        <span class="divider-v"></span>
        ${term('Σ', correction, this._config.pid_correction_entity, `correction ${chipClass}`, chipClass)}
      </div>
    `;
  }
}

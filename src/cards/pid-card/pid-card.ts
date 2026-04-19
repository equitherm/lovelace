import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { PidCardConfig } from './pid-card-config';
import type { HomeAssistant } from '../../ha';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { PID_CARD_NAME, PID_CARD_EDITOR_NAME, SENSOR_ENTITY_DOMAINS, CLIMATE_ENTITY_DOMAINS } from './const';
import { validatePidCardConfig } from './pid-card-config';
import { EquithermBaseCard, headerStyles } from '../../utils/base';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';

registerCustomCard({
  type: PID_CARD_NAME,
  name: 'Equitherm PID Diagnostic',
  description: 'PID diagnostic display with P/I/D terms and correction',
});

@customElement(PID_CARD_NAME)
export class EquithermPidCard extends EquithermBaseCard<PidCardConfig> {

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 3, min_rows: 2 };
  }

  static async getStubConfig(hass: HomeAssistant): Promise<PidCardConfig> {
    const states = hass.states;
    const entityIds = Object.keys(states);
    const sensors = entityIds.filter(e =>
      SENSOR_ENTITY_DOMAINS.includes(computeDomain(e))
    );
    const findSensor = (keyword: string) => sensors.find(e => e.includes(keyword)) ?? '';
    return {
      type: `custom:${PID_CARD_NAME}`,
      pid_correction_entity: findSensor('pid_correction'),
      pid_proportional_entity: findSensor('pid_proportional'),
      pid_integral_entity: findSensor('pid_integral'),
      pid_derivative_entity: findSensor('pid_derivative'),
    } as PidCardConfig;
  }

  static async getConfigElement() {
    await import('./pid-card-editor');
    return document.createElement(PID_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validatePidCardConfig(config);
  }

  // --- Entity helpers ---

  private _readNum(entityId: string | undefined): number | null {
    const s = this._entityState(entityId);
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }

  private _formatValue(value: number | null, decimals = 2): string {
    if (value === null) return '—';
    const locale = this.hass?.locale?.language;
    return locale
      ? value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : value.toFixed(decimals);
  }

  // --- Styles ---

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .pid-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          flex: 1;
          padding: 0 8px;
        }

        .pid-term {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .pid-term:hover {
          background: var(--secondary-background-color, rgba(0,0,0,0.04));
        }

        .term-label {
          font-size: 10px;
          font-weight: var(--ha-font-weight-medium, 500);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--secondary-text-color);
        }

        .term-value {
          font-size: var(--ha-font-size-xl, 1.4rem);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          color: var(--primary-text-color);
        }

        .correction-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          flex-shrink: 0;
        }

        .correction-label {
          font-size: var(--ha-font-size-s, 12px);
          color: var(--secondary-text-color);
        }

        .correction-value {
          font-size: var(--ha-font-size-l, 1.1rem);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
        }
        .correction-value.positive { color: var(--success-color, #4caf50); }
        .correction-value.negative { color: var(--error-color, #e53935); }
      `,
    ];
  }

  // --- Render ---

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const climateState = this._config.climate_entity ? this.hass.states[this._config.climate_entity] : undefined;
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name, this.hass) || localize('pid_card.default_title')
      : localize('pid_card.default_title');

    const pValue = this._readNum(this._config.pid_proportional_entity);
    const iValue = this._readNum(this._config.pid_integral_entity);
    const dValue = this._readNum(this._config.pid_derivative_entity);
    const correction = this._readNum(this._config.pid_correction_entity);

    const correctionClass = correction !== null
      ? (correction > 0 ? 'positive' : correction < 0 ? 'negative' : '')
      : '';

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:tune',
          clickEntity: this._config.climate_entity ?? this._config.pid_correction_entity,
          title,
        })}

        <div class="pid-grid">
          <div class="pid-term" @click=${() => this._openMoreInfo(this._config.pid_proportional_entity)}>
            <span class="term-label">P</span>
            <span class="term-value">${this._formatValue(pValue)}</span>
          </div>
          <div class="pid-term" @click=${() => this._openMoreInfo(this._config.pid_integral_entity)}>
            <span class="term-label">I</span>
            <span class="term-value">${this._formatValue(iValue)}</span>
          </div>
          <div class="pid-term" @click=${() => this._openMoreInfo(this._config.pid_derivative_entity)}>
            <span class="term-label">D</span>
            <span class="term-value">${this._formatValue(dValue)}</span>
          </div>
        </div>

        <div class="correction-row">
          <span class="correction-label">${localize('pid_card.correction')}</span>
          <span class="correction-value ${correctionClass}">${this._formatValue(correction)}°</span>
        </div>

        ${this._config.show_last_updated ? html`
          <div class="footer-meta">${this._renderLastUpdated(this._config.pid_correction_entity)}</div>
        ` : nothing}
      </ha-card>
    `;
  }
}

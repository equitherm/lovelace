import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { OtDiagnosticsCardConfig } from './ot-diagnostics-card-config';
import type { HomeAssistant } from '../../../ha';
import type { LovelaceGridOptions } from '../../../ha/panels/lovelace/types';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { formatNumber } from '../../../ha';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_DIAGNOSTICS_CARD_NAME, OT_DIAGNOSTICS_CARD_EDITOR_NAME, BINARY_SENSOR_DOMAINS, SENSOR_DOMAINS } from './const';
import { validateOtDiagnosticsCardConfig } from './ot-diagnostics-card-config';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';

registerCustomCard({
  type: OT_DIAGNOSTICS_CARD_NAME,
  name: 'OpenTherm Diagnostics',
  description: 'Boiler fault and diagnostic monitoring',
});

@customElement(OT_DIAGNOSTICS_CARD_NAME)
export class OtDiagnosticsCard extends OtBaseCard<OtDiagnosticsCardConfig> {

  static async getStubConfig(hass: HomeAssistant): Promise<OtDiagnosticsCardConfig> {
    const entityIds = Object.keys(hass.states);
    const binaries = entityIds.filter(e => BINARY_SENSOR_DOMAINS.includes(computeDomain(e)));
    const sensors = entityIds.filter(e => SENSOR_DOMAINS.includes(computeDomain(e)));

    const fault = binaries.find(e => e.includes('fault_indication') || e.includes('fault')) ?? binaries[0] ?? '';
    const pressure = sensors.find(e => e.includes('pressure')) ?? '';
    const exhaust = sensors.find(e => e.includes('exhaust')) ?? '';
    const faultCode = sensors.find(e => e.includes('fault_code')) ?? '';
    const flameFault = binaries.find(e => e.includes('flame_fault')) ?? '';
    const lowPressure = binaries.find(e => e.includes('low_pressure')) ?? '';
    const airPressure = binaries.find(e => e.includes('air_pressure')) ?? '';
    const waterOvertemp = binaries.find(e => e.includes('water_overtemp')) ?? '';
    const lockout = binaries.find(e => e.includes('lockout')) ?? '';
    const serviceRequest = binaries.find(e => e.includes('service_request')) ?? '';
    const diagnostic = binaries.find(e => e.includes('diagnostic_indication') || e.includes('diagnostic')) ?? '';

    return {
      type: `custom:${OT_DIAGNOSTICS_CARD_NAME}`,
      fault_entity: fault,
      ...(pressure && { pressure_entity: pressure }),
      ...(exhaust && { exhaust_entity: exhaust }),
      ...(faultCode && { fault_code_entity: faultCode }),
      ...(flameFault && { flame_fault_entity: flameFault }),
      ...(lowPressure && { low_pressure_entity: lowPressure }),
      ...(airPressure && { air_pressure_entity: airPressure }),
      ...(waterOvertemp && { water_overtemp_entity: waterOvertemp }),
      ...(lockout && { lockout_entity: lockout }),
      ...(serviceRequest && { service_request_entity: serviceRequest }),
      ...(diagnostic && { diagnostic_entity: diagnostic }),
    } as OtDiagnosticsCardConfig;
  }

  static async getConfigElement() {
    await import('./ot-diagnostics-card-editor');
    return document.createElement(OT_DIAGNOSTICS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateOtDiagnosticsCardConfig(config);
  }

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: this._config.show_last_updated ? 4 : 3, min_rows: 3 };
  }

  protected override _titleEntity(): string | undefined {
    return this._config.fault_entity;
  }

  protected override _headerIconColor(): string {
    const fault = this._faultOverride();
    if (fault) return fault;
    if (!this._hasFault()) return 'var(--rgb-success, 76,175,80)';
    return 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> | typeof nothing {
    return html`
      <div class="badges">
        ${this._renderFaultBadge()}
        ${this._renderActiveDiagnosticBadge('lockout_entity', 'lockout', 'mdi:lock')}
        ${this._renderActiveDiagnosticBadge('service_request_entity', 'service_request', 'mdi:wrench')}
        ${this._renderActiveDiagnosticBadge('diagnostic_entity', 'diagnostic', 'mdi:information')}
      </div>
    `;
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.fault_entity;
  }

  // --- Pressure value ---

  private get _pressure(): number {
    return this._resolveEntityNumber(this._config.pressure_entity, NaN);
  }

  private get _pressureWarning(): boolean {
    const p = this._pressure;
    return !isNaN(p) && (p < 1.0 || p > 3.0);
  }

  // --- Exhaust value ---

  private get _exhaust(): number {
    return this._resolveEntityNumber(this._config.exhaust_entity, NaN);
  }

  // --- Fault code ---

  private get _faultCode(): string {
    const state = this._entityState(this._config.fault_code_entity);
    if (!state) return '';
    return state.state;
  }

  // --- Numeric sensors check ---

  private get _hasNumericSensors(): boolean {
    const cfg = this._config;
    return !!(cfg.pressure_entity || cfg.exhaust_entity || cfg.fault_code_entity);
  }

  // --- Render helpers ---

  private _renderKpiBlock(
    entityId: string | undefined,
    value: string,
    label: string,
    opts: { warning?: boolean; clickEntity?: string } = {}
  ): ReturnType<typeof html> | typeof nothing {
    if (!entityId) return nothing;
    const clickEntity = opts.clickEntity ?? entityId;
    return html`
      <div class="kpi-block ${opts.warning ? 'kpi-block--warn' : ''}"
           @click=${() => this._openMoreInfo(clickEntity)}>
        <div class="kpi-value ${opts.warning ? 'kpi-value--warn' : ''}">${value}</div>
        <div class="kpi-label">${label}</div>
      </div>
    `;
  }

  private _renderStatusRow(
    entityId: string | undefined,
    label: string,
    icon: string
  ): ReturnType<typeof html> | typeof nothing {
    if (!entityId) return nothing;
    const state = this._entityState(entityId);
    if (!state) return nothing;
    const isFault = state.state === 'on';
    return html`
      <div class="status-row" @click=${() => this._openMoreInfo(entityId)}>
        <ha-icon .icon=${isFault ? 'mdi:close-circle' : 'mdi:check-circle'}
          class="status-icon ${isFault ? 'status-icon--fault' : 'status-icon--ok'}">
        </ha-icon>
        <span class="status-label">${label}</span>
      </div>
    `;
  }

  private _renderActiveDiagnosticBadge(
    configKey: string,
    localizationKey: string,
    icon: string
  ): ReturnType<typeof html> | typeof nothing {
    const entityId = this._config[configKey] as string | undefined;
    if (!entityId) return nothing;
    const state = this._entityState(entityId);
    if (!state || state.state !== 'on') return nothing;
    const localize = setupCustomLocalize(this.hass);
    return html`
      <eq-badge-info
        .label=${localize(`opentherm.diagnostics_card.${localizationKey}`)}
        .icon=${icon}
        .active=${true}
        style="--badge-info-color: var(--rgb-warning, 255,152,0)"
      ></eq-badge-info>
    `;
  }

  // --- Styles ---

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; }
        .body { padding: 8px 10px 10px; display: flex; flex-direction: column; gap: 10px; }

        /* KPI row — 3-column grid for numeric sensors */
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 8px;
        }
        .kpi-block {
          text-align: center;
          cursor: pointer;
          padding: 6px 4px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .kpi-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .kpi-value {
          font-size: 20px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .kpi-value--warn { color: var(--error-color, #e53935); }
        .kpi-label {
          font-size: var(--ha-font-size-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          margin-top: 2px;
        }

        /* Status grid — fault binary sensor rows */
        .status-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .status-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          padding: 2px 4px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .status-row:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
        .status-icon {
          --mdc-icon-size: 18px;
          flex-shrink: 0;
        }
        .status-icon--ok { color: var(--success-color, #4caf50); }
        .status-icon--fault { color: var(--error-color, #e53935); }
        .status-label {
          font-size: var(--ha-font-size-s, 0.875rem);
          color: var(--primary-text-color);
        }

        /* All-clear banner */
        .all-clear {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(var(--rgb-success, 76,175,80), 0.08);
          color: var(--success-color, #4caf50);
          font-size: var(--ha-font-size-s, 0.875rem);
          font-weight: 500;
        }
        .all-clear ha-icon {
          --mdc-icon-size: 18px;
        }

        @container (max-width: 260px) {
          .kpi-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
      `,
    ];
  }

  // --- Render ---

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    const hasFault = this._hasFault();
    const iconName = hasFault ? 'mdi:alert-circle' : 'mdi:shield-check';
    const title = this._computeCardTitle('opentherm.diagnostics_card.default_title');

    // Numeric KPI values
    const pressure = this._pressure;
    const exhaust = this._exhaust;
    const faultCode = this._faultCode;

    // Check if any fault sensor is active
    const faultSensorKeys: (keyof OtDiagnosticsCardConfig)[] = [
      'flame_fault_entity', 'low_pressure_entity', 'air_pressure_entity', 'water_overtemp_entity',
    ];
    const hasActiveFaultSensor = faultSensorKeys.some(key => {
      const entityId = cfg[key] as string | undefined;
      return entityId && this._entityState(entityId)?.state === 'on';
    });

    // Check if any fault binary sensor is configured
    const hasFaultSensors = faultSensorKeys.some(key => !!(cfg[key] as string | undefined));

    // All-clear: no fault active and fault sensors configured
    const allClear = !hasFault && !hasActiveFaultSensor && hasFaultSensors;

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName,
          clickEntity: cfg.fault_entity,
          title,
        })}
        <div class="body">
          ${this._hasNumericSensors ? html`
            <div class="kpi-row">
              ${this._renderKpiBlock(
                cfg.pressure_entity,
                isNaN(pressure) ? '—' : formatNumber(pressure, this.hass?.locale, { maximumFractionDigits: 1 }),
                localize('opentherm.diagnostics_card.pressure'),
                { warning: this._pressureWarning }
              )}
              ${this._renderKpiBlock(
                cfg.exhaust_entity,
                isNaN(exhaust) ? '—' : this._formatCalcTemp(exhaust),
                localize('opentherm.diagnostics_card.exhaust')
              )}
              ${this._renderKpiBlock(
                cfg.fault_code_entity,
                faultCode || '—',
                localize('opentherm.diagnostics_card.fault_code')
              )}
            </div>
          ` : nothing}

          ${hasFaultSensors ? html`
            <div class="status-grid">
              ${this._renderStatusRow(cfg.flame_fault_entity, localize('opentherm.diagnostics_card.flame_fault'), 'mdi:fire')}
              ${this._renderStatusRow(cfg.low_pressure_entity, localize('opentherm.diagnostics_card.low_pressure'), 'mdi:water-alert')}
              ${this._renderStatusRow(cfg.air_pressure_entity, localize('opentherm.diagnostics_card.air_pressure'), 'mdi:fan-alert')}
              ${this._renderStatusRow(cfg.water_overtemp_entity, localize('opentherm.diagnostics_card.water_overtemp'), 'mdi:thermometer-alert')}
            </div>
          ` : nothing}

          ${allClear ? html`
            <div class="all-clear">
              <ha-icon .icon=${'mdi:check-circle'}></ha-icon>
              <span>${localize('opentherm.diagnostics_card.all_clear')}</span>
            </div>
          ` : nothing}

          ${this._renderNotFound(cfg.fault_entity, localize('opentherm.diagnostics_card.fault_code'))}
        </div>
        ${this._renderFooterMeta()}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-diagnostics-card': OtDiagnosticsCard;
  }
}

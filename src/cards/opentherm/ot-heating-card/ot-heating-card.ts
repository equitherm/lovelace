import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { OtHeatingCardConfig } from './ot-heating-card-config';
import type { HomeAssistant } from '../../../ha';
import type { LovelaceGridOptions } from '../../../ha/panels/lovelace/types';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { formatNumber } from '../../../ha';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_HEATING_CARD_NAME, OT_HEATING_CARD_EDITOR_NAME } from './const';
import { validateOtHeatingCardConfig } from './ot-heating-card-config';
import { OtHistoryHelper, type OtHistoryPoint } from '../../../utils/ot-history';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';
import '../../../shared/eq-param-bar';
import '../../../shared/ot-timeline-section';
import type { KpiItem } from '../../../shared/ot-timeline-section';
import type { BinarySegment } from '../../../shared/eq-binary-timeline';

const DEFAULT_HOURS = 1;
const SHORT_CYCLE_THRESHOLD = 6;

registerCustomCard({
  type: OT_HEATING_CARD_NAME,
  name: 'OpenTherm Heating',
  description: 'Boiler status, modulation control, and flame monitoring',
});

@customElement(OT_HEATING_CARD_NAME)
export class OtHeatingCard extends OtBaseCard<OtHeatingCardConfig> {

  @state() private _cyclesPerHour = 0;
  @state() private _totalCycles = 0;
  @state() private _totalActiveTime = 0;
  private _flameHistory: OtHistoryPoint[] = [];
  private _timelineCache: { segments: BinarySegment[]; startTime: number; endTime: number } | null = null;
  private _fetchTimer?: ReturnType<typeof setInterval>;

  static async getStubConfig(hass: HomeAssistant): Promise<OtHeatingCardConfig> {
    const entityIds = Object.keys(hass.states);
    const boiler = entityIds.find(e => e.includes('boiler') || e.includes('t_boiler')) ?? '';
    const ret = entityIds.find(e => e.includes('ret') || e.includes('return')) ?? '';
    const flame = entityIds.find(e => e.includes('flame')) ?? '';
    return {
      type: `custom:${OT_HEATING_CARD_NAME}`,
      boiler_temp_entity: boiler,
      return_temp_entity: ret,
      flame_entity: flame,
    } as OtHeatingCardConfig;
  }

  static async getConfigElement() {
    await import('./ot-heating-card-editor');
    return document.createElement(OT_HEATING_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    const cfg = config as Record<string, unknown>;
    const type = cfg.type as string | undefined;
    if (type?.includes('status-card') || type?.includes('modulation-card')) {
      console.warn(
        `[equitherm-cards] "${type}" is deprecated. Use "custom:${OT_HEATING_CARD_NAME}" instead.`
      );
    }
    this._config = validateOtHeatingCardConfig(config);
  }

  public override getGridOptions(): LovelaceGridOptions {
    const hasFeatures = !!this._config.max_modulation_entity;
    const hasMonitoring = !!(this._config.hours);
    const rows = 3 + (hasFeatures ? 1 : 0) + (hasMonitoring ? 1 : 0)
      + (this._config.show_last_updated ? 1 : 0);
    return { columns: 6, rows, min_rows: 3 };
  }

  // === Private getters ===

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

  private get _formattedDeltaT(): string {
    return this._formatCalcDelta(this._deltaT);
  }

  private get _modulation(): number {
    if (!this._config.modulation_entity) return NaN;
    return this._resolveEntityNumber(this._config.modulation_entity, NaN);
  }

  private get _timelineKpis(): KpiItem[] {
    const localize = setupCustomLocalize(this.hass);
    const kpis: KpiItem[] = [];
    if (this._totalCycles > 0) {
      kpis.push({ value: `${this._totalCycles}`, label: localize('opentherm.heating_card.cycles') });
    }
    if (this._totalActiveTime > 0) {
      kpis.push({ value: this._formatActiveTime(this._totalActiveTime), label: localize('opentherm.heating_card.active_time') });
    }
    return kpis;
  }

  // === Hooks ===

  protected override _titleEntity(): string | undefined {
    return this._config.boiler_temp_entity;
  }

  protected override _headerIconColor(): string {
    const fault = this._faultOverride();
    if (fault) return fault;
    return this._flameOn
      ? 'var(--rgb-state-climate-heat, 244,81,30)'
      : 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.boiler_temp_entity;
  }

  // === Header badges ===

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const chActive = cfg.ch_active_entity ? this._entityState(cfg.ch_active_entity)?.state === 'on' : false;
    const dhwActive = cfg.dhw_active_entity ? this._entityState(cfg.dhw_active_entity)?.state === 'on' : false;
    const cycles = this._cyclesPerHour;
    const shortCycling = cycles > SHORT_CYCLE_THRESHOLD;

    return html`
      <div class="badges">
        ${this._renderFaultBadge()}
        ${this._flameOn ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${localize('opentherm.heating_card.flame')}
            .icon=${'mdi:fire'}
            .active=${true}
          ></eq-badge-info>
        ` : nothing}
        ${chActive ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-primary-color, 33, 150, 243)"
            .label=${localize('opentherm.heating_card.ch')}
            .icon=${'mdi:radiator'}
          ></eq-badge-info>
        ` : nothing}
        ${dhwActive ? html`
          <eq-badge-info
            style="--badge-info-color: var(--rgb-state-climate-heat, 255, 152, 0)"
            .label=${localize('opentherm.heating_card.dhw')}
            .icon=${'mdi:water-boiler'}
          ></eq-badge-info>
        ` : nothing}
        ${cycles > 0 ? html`
          <eq-badge-info .label=${`${cycles} ${localize('opentherm.heating_card.cycles_per_hour')}`}
            icon=${shortCycling ? 'mdi:alert' : 'mdi:lightning-bolt'}
            .active=${shortCycling}
            style="--badge-info-color: ${shortCycling ? 'var(--rgb-error, 229,57,53)' : 'var(--rgb-info, 3,169,244)'}">
          </eq-badge-info>
        ` : nothing}
      </div>
    `;
  }

  // === Lifecycle ===

  override connectedCallback() {
    super.connectedCallback();
    this._fetchHistory();
    this._fetchTimer = setInterval(() => this._fetchHistory(), 30_000);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._fetchTimer);
    this._fetchTimer = undefined;
  }

  // === History fetching ===

  private async _fetchHistory(): Promise<void> {
    if (!this.hass) return;
    if (document.visibilityState !== 'visible') return;
    const hours = this._config.hours ?? DEFAULT_HOURS;

    const entityIds = [this._config.flame_entity];
    if (this._config.ch_active_entity) {
      entityIds.push(this._config.ch_active_entity);
    }
    const history = await OtHistoryHelper.fetch(this.hass, entityIds, hours);
    this._flameHistory = history[this._config.flame_entity] ?? [];

    const chActiveHistory = this._config.ch_active_entity
      ? (history[this._config.ch_active_entity] ?? [])
      : null;

    const oneHourAgo = Date.now() - 3600 * 1000;
    const lastHourHistory = this._flameHistory.filter(
      p => new Date(p.last_changed).getTime() >= oneHourAgo,
    );

    if (chActiveHistory) {
      const lastHourCh = chActiveHistory.filter(
        p => new Date(p.last_changed).getTime() >= oneHourAgo,
      );
      this._cyclesPerHour = this._countChOnlyCycles(lastHourHistory, lastHourCh);
    } else {
      this._cyclesPerHour = OtHistoryHelper.countCycles(lastHourHistory);
    }
    this._totalCycles = OtHistoryHelper.countCycles(this._flameHistory);
    this._totalActiveTime = this._computeActiveTime(this._flameHistory);
    this._timelineCache = this._buildTimelineData();
  }

  /** Count flame OFF->ON transitions only while CH was active */
  private _countChOnlyCycles(flameHistory: OtHistoryPoint[], chHistory: OtHistoryPoint[]): number {
    if (!chHistory.length) return OtHistoryHelper.countCycles(flameHistory);

    let count = 0;
    for (let i = 1; i < flameHistory.length; i++) {
      if (flameHistory[i - 1].state === 'off' && flameHistory[i].state === 'on') {
        const transitionTime = new Date(flameHistory[i].last_changed).getTime();
        const chState = this._getChStateAtTime(chHistory, transitionTime);
        if (chState === 'on') count++;
      }
    }
    return count;
  }

  /** Get CH active state at a specific point in time from history */
  private _getChStateAtTime(chHistory: OtHistoryPoint[], timestamp: number): string {
    let state = 'off';
    for (const point of chHistory) {
      if (new Date(point.last_changed).getTime() <= timestamp) {
        state = point.state;
      } else {
        break;
      }
    }
    return state;
  }

  private _computeActiveTime(history: OtHistoryPoint[]): number {
    let totalMs = 0;
    const now = Date.now();
    for (let i = 0; i < history.length; i++) {
      if (history[i].state !== 'on') continue;
      const start = new Date(history[i].last_changed).getTime();
      const end = i + 1 < history.length
        ? new Date(history[i + 1].last_changed).getTime()
        : now;
      totalMs += end - start;
    }
    return Math.round(totalMs / 60_000);
  }

  // === Max modulation control ===

  private _onMaxModulationChange(ev: CustomEvent): void {
    const value = Number((ev.detail as { value: unknown }).value);
    if (isNaN(value)) return;
    this._setMaxModulation(value);
  }

  private async _setMaxModulation(value: number): Promise<void> {
    if (!this.hass) return;
    const entityId = this._config.max_modulation_entity;
    if (!entityId) return;
    try {
      await this.hass.callService(computeDomain(entityId), 'set_value', {
        entity_id: entityId,
        value,
      });
    } catch (err) {
      console.warn('Failed to set max modulation:', err);
    }
  }

  // === Timeline ===

  private _buildTimelineData() {
    const hours = this._config.hours ?? DEFAULT_HOURS;
    const endTime = Date.now();
    const startTime = endTime - hours * 3600 * 1000;
    const nowMs = endTime;

    const segments: BinarySegment[] = [];
    const points = this._flameHistory.filter(p => {
      const t = new Date(p.last_changed).getTime();
      return t >= startTime && t <= nowMs;
    });

    for (let i = 0; i < points.length; i++) {
      const segStart = new Date(points[i].last_changed).getTime();
      const segEnd = i + 1 < points.length
        ? new Date(points[i + 1].last_changed).getTime()
        : nowMs;
      segments.push({
        start: segStart,
        end: segEnd,
        state: points[i].state === 'on' ? 'on' : 'off',
      });
    }

    return { segments, startTime, endTime };
  }

  // === Styles ===

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; overflow: hidden; display: flex; flex-direction: column; }
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
          font-size: var(--ha-font-size-xs, 0.75rem);
          color: var(--secondary-text-color);
          margin-top: 1px;
        }
        .temp-label {
          font-size: var(--ha-font-size-xs, 0.75rem);
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
          font-size: var(--ha-font-size-xs, 0.75rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--secondary-text-color);
          white-space: nowrap;
          min-width: 70px;
        }
        .mod-row eq-param-bar {
          flex: 1;
          --eq-bar-height: 6px;
          --eq-bar-fill-color: var(--gradient-hot, #f97316);
        }
        .mod-row:hover eq-param-bar {
          --eq-bar-height: 8px;
        }
        .mod-value {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 36px;
          text-align: right;
        }
        .feature-panel {
          padding: 6px 10px;
          border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .feature-panel .mod-label {
          min-width: 56px;
        }
        ha-control-slider { width: 100%; }
        @container (max-width: 260px) {
          .temps-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          .temps-row .divider,
          .temps-row .arrow {
            display: none;
          }
          .temp-block {
            text-align: left;
            padding: 2px 4px;
          }
          .mod-row, .feature-panel {
            flex-wrap: wrap;
            gap: 4px;
          }
          .mod-label {
            min-width: unset;
            width: 100%;
          }
        }
      `,
    ];
  }

  // === Render ===

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    const flameOn = this._flameOn;
    const boiler = this._boilerTemp;
    const ret = this._returnTemp;
    const mod = this._modulation;
    const setpoint = cfg.setpoint_entity ? this._resolveEntityNumber(cfg.setpoint_entity, NaN) : NaN;
    const fmtTemp = (v: number) => isNaN(v) ? '—' : this._formatCalcTemp(v);
    const title = this._computeCardTitle('opentherm.heating_card.default_title');
    const notFoundBoiler = this._renderNotFound(cfg.boiler_temp_entity, localize('opentherm.heating_card.flow'));
    const notFoundReturn = this._renderNotFound(cfg.return_temp_entity, localize('opentherm.heating_card.return'));

    // Feature panel: max modulation slider
    const hasMaxMod = !!cfg.max_modulation_entity;
    const maxMod = hasMaxMod ? this._resolveEntityNumber(cfg.max_modulation_entity, 100) : NaN;
    const maxMin = this._entityAttr<number>(cfg.max_modulation_entity, 'min') ?? 0;
    const maxMax = this._entityAttr<number>(cfg.max_modulation_entity, 'max') ?? 100;
    const maxModFormatted = formatNumber(maxMod, this.hass.locale, { maximumFractionDigits: 0 });

    // Monitoring: flame timeline
    const hasMonitoring = !!(cfg.hours);
    const timeline = this._timelineCache ?? this._buildTimelineData();
    if (!this._timelineCache) this._timelineCache = timeline;
    const { segments, startTime, endTime } = timeline;

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
              <div class="temp-label">${localize('opentherm.heating_card.flow')}</div>
            </div>
            <div class="arrow" aria-hidden="true">→</div>
            <div class="temp-block" @click=${() => this._openMoreInfo(cfg.return_temp_entity)}>
              <div class="temp-value">${fmtTemp(ret)}</div>
              <div class="temp-label">${localize('opentherm.heating_card.return')}</div>
            </div>
            <div class="divider"></div>
            <div class="temp-block">
              <div class="temp-value">${this._formattedDeltaT}</div>
              <div class="temp-label">ΔT</div>
            </div>
          </div>
          ${!isNaN(mod) ? html`
            <div class="mod-row">
              <span class="mod-label">${localize('opentherm.heating_card.modulation')}</span>
              <eq-param-bar .min=${0} .max=${100} .value=${mod}></eq-param-bar>
              <span class="mod-value">${formatNumber(mod, this.hass?.locale, { maximumFractionDigits: 0 })}%</span>
            </div>
          ` : nothing}
        </div>
        ${hasMaxMod ? html`
          <div class="feature-panel">
            <span class="mod-label">${localize('opentherm.heating_card.max')}</span>
            <ha-control-slider
              .min=${maxMin}
              .max=${maxMax}
              .step=${1}
              .value=${isNaN(maxMod) ? maxMin : maxMod}
              mode="start"
              .label=${localize('opentherm.heating_card.max')}
              .locale=${this.hass.locale}
              @value-changed=${this._onMaxModulationChange}
            ></ha-control-slider>
            <span class="mod-value">${maxModFormatted}%</span>
          </div>
        ` : nothing}
        ${hasMonitoring ? html`
          <ot-timeline-section
            .hass=${this.hass}
            .label=${localize('opentherm.heating_card.flame')}
            .segments=${segments}
            .startTime=${startTime}
            .endTime=${endTime}
            .kpis=${this._timelineKpis}
          ></ot-timeline-section>
        ` : nothing}
        ${notFoundBoiler}
        ${notFoundReturn}
        ${this._renderFooterMeta()}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-heating-card': OtHeatingCard;
  }
}

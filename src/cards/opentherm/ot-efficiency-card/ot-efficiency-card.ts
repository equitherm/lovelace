import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { OtEfficiencyCardConfig } from './ot-efficiency-card-config';
import { OtEChartCard } from '../../../utils/base/ot-echart-card';
import { type EChartConfig, headerStyles } from '../../../utils/base';
import type { HomeAssistant } from '../../../ha';
import { formatNumber } from '../../../ha';
import { cardStyle, kpiFooterStyles } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { SENSOR_DOMAINS, BINARY_SENSOR_DOMAINS } from '../../../utils/domains';
import { OT_EFFICIENCY_CARD_NAME, OT_EFFICIENCY_CARD_EDITOR_NAME } from './const';
import { validateOtEfficiencyCardConfig } from './ot-efficiency-card-config';
import { OtHistoryHelper, type OtHistoryPoint } from '../../../utils/ot-history';
import { resolveRgbColor } from '../../../utils/hvac-colors';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';

const DEFAULT_HOURS = 6;

registerCustomCard({
  type: OT_EFFICIENCY_CARD_NAME,
  name: 'OpenTherm Efficiency',
  description: 'Boiler condensing efficiency chart',
});

@customElement(OT_EFFICIENCY_CARD_NAME)
export class OtEfficiencyCard extends OtEChartCard<OtEfficiencyCardConfig> {
  private _boilerHistory: OtHistoryPoint[] = [];
  private _returnHistory: OtHistoryPoint[] = [];
  private _fetchTimer?: ReturnType<typeof setInterval>;

  setConfig(config: unknown) {
    this._config = validateOtEfficiencyCardConfig(config);
  }

  static async getConfigElement() {
    await import('./ot-efficiency-card-editor');
    return document.createElement(OT_EFFICIENCY_CARD_EDITOR_NAME);
  }

  static async getStubConfig(hass: HomeAssistant): Promise<OtEfficiencyCardConfig> {
    const entityIds = Object.keys(hass.states);
    const boiler = entityIds.find(e => SENSOR_DOMAINS.includes(computeDomain(e)) && (e.includes('boiler') || e.includes('t_boiler'))) ?? '';
    const ret = entityIds.find(e => SENSOR_DOMAINS.includes(computeDomain(e)) && (e.includes('ret') || e.includes('return'))) ?? '';
    const flame = entityIds.find(e =>
      BINARY_SENSOR_DOMAINS.includes(computeDomain(e)) && e.includes('flame')
    ) ?? '';
    const chActive = entityIds.find(e =>
      BINARY_SENSOR_DOMAINS.includes(computeDomain(e)) && (e.includes('ch_active') || e.includes('central_heating'))
    ) ?? '';
    return {
      type: `custom:${OT_EFFICIENCY_CARD_NAME}`,
      boiler_temp_entity: boiler,
      return_temp_entity: ret,
      flame_entity: flame || undefined,
      ch_active_entity: chActive || undefined,
    } as OtEfficiencyCardConfig;
  }

  private get _defaultThreshold(): number {
    return this.hass?.config?.unit_system?.temperature === '°F' ? 131 : 55;
  }

  private get _isChActive(): boolean {
    if (this._config.ch_active_entity) {
      return this._entityState(this._config.ch_active_entity)?.state === 'on';
    }
    // Fallback: flame as proxy — may include DHW cycles.
    // User should configure ch_active_entity for accurate condensing detection.
    if (this._config.flame_entity) {
      return this._entityState(this._config.flame_entity)?.state === 'on';
    }
    return false;
  }

  private get _returnTemp(): number {
    return this._resolveEntityNumber(this._config.return_temp_entity, NaN);
  }

  private get _flameOn(): boolean {
    return this._entityState(this._config.flame_entity)?.state === 'on';
  }

  private get _formattedDeltaT(): string {
    const boilerTemp = this._resolveEntityNumber(this._config.boiler_temp_entity, NaN);
    const delta = boilerTemp - this._returnTemp;
    return this._formatCalcDelta(delta);
  }

  private get _isCondensing(): boolean {
    if (!this._isChActive) return false;
    const threshold = this._config.condensing_threshold ?? this._defaultThreshold;
    return !isNaN(this._returnTemp) && this._returnTemp < threshold;
  }

  private get _isHeatingTooHot(): boolean {
    if (!this._isChActive) return false;
    const threshold = this._config.condensing_threshold ?? this._defaultThreshold;
    return !isNaN(this._returnTemp) && this._returnTemp >= threshold;
  }

  protected override _titleEntity(): string | undefined {
    return this._config.boiler_temp_entity;
  }

  protected override _headerIconColor(): string {
    const fault = this._faultOverride();
    if (fault) return fault;
    if (this._isCondensing) return 'var(--rgb-success, 76,175,80)';
    if (this._isHeatingTooHot) return 'var(--rgb-state-climate-heat, 244,81,30)';
    return 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const chActive = cfg.ch_active_entity ? this._entityState(cfg.ch_active_entity)?.state === 'on' : false;

    return html`
      <div class="badges">
        ${this._renderFaultBadge()}
        ${this._isCondensing ? html`
          <eq-badge-info .label=${localize('opentherm.efficiency_card.condensing')} .icon=${'mdi:water-percent'} .active=${true}
            style="--badge-info-color: var(--rgb-success, 76,175,80)">
          </eq-badge-info>
        ` : nothing}
        ${this._isHeatingTooHot ? html`
          <eq-badge-info .label=${localize('opentherm.efficiency_card.too_hot')} .icon=${'mdi:thermometer-alert'} .active=${true}
            style="--badge-info-color: var(--rgb-state-climate-heat, 244,81,30)">
          </eq-badge-info>
        ` : nothing}
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
      </div>
    `;
  }

  protected override _onChartReconnected(): void {
    this._fetchHistory();
    this._fetchTimer = setInterval(() => this._fetchHistory(), 60_000);
  }

  protected override _onChartDisconnecting(): void {
    clearInterval(this._fetchTimer);
    this._fetchTimer = undefined;
  }

  private async _fetchHistory(): Promise<void> {
    const hours = this._config.hours ?? DEFAULT_HOURS;
    const history = await OtHistoryHelper.fetch(
      this.hass,
      [this._config.boiler_temp_entity, this._config.return_temp_entity],
      hours,
    );
    this._boilerHistory = history[this._config.boiler_temp_entity] ?? [];
    this._returnHistory = history[this._config.return_temp_entity] ?? [];
    this._updateChartConfig();
  }

  private _toChartData(history: OtHistoryPoint[], currentEntity?: string): [number, number][] {
    const data = history
      .map(p => [new Date(p.last_changed).getTime(), parseFloat(p.state)] as [number, number])
      .filter(p => !isNaN(p[1]));
    if (currentEntity) {
      const current = this._resolveEntityNumber(currentEntity, NaN);
      if (!isNaN(current)) data.push([Date.now(), current]);
    }
    return data;
  }

  private _buildMarkLine(threshold: number): object {
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const label = `${formatNumber(threshold, this.hass?.locale, { maximumFractionDigits: 0 })}${unit}`;
    return {
      silent: true,
      symbol: 'none' as const,
      lineStyle: { color: 'rgba(76,175,80,0.5)', type: 'dashed' as const, width: 1 },
      data: [{ yAxis: threshold, label: { formatter: label, fontSize: 10, position: 'insideEndTop' } }],
    };
  }

  private _buildTooltipFormatter(): (params: any) => ReturnType<typeof html> {
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const locale = this.hass?.locale;
    return (params: any) => {
      const time = this._formatChartTime(params[0].value[0] as number);
      return html`
        <span style="opacity:0.6">${time}</span><br/>
        ${params.map((p: any) => html`
          <ha-chart-tooltip-marker .color=${p.color}></ha-chart-tooltip-marker>${p.seriesName}: <b>${formatNumber(p.value[1] as number, locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}${unit}</b><br/>
        `)}
      `;
    };
  }

  protected override _buildEChartOptions(): EChartConfig {
    const threshold = this._config.condensing_threshold ?? this._defaultThreshold;
    const localize = setupCustomLocalize(this.hass);
    const heatingColor = resolveRgbColor(this, 'heating');
    const coolingColor = resolveRgbColor(this, 'cooling');

    return {
      options: {
        animation: false,
        xAxis: {
          type: 'time' as const,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { fontSize: 10, hideOverlap: true },
        },
        yAxis: {
          type: 'value' as const,
          name: `${localize('opentherm.efficiency_card.temp_axis')} (${this.hass?.config?.unit_system?.temperature ?? '°C'})`,
          axisLabel: { fontSize: 10, formatter: (v: number) => formatNumber(v, this.hass?.locale, { maximumFractionDigits: 1 }) },
        },
        grid: { top: 24, right: 10, bottom: 25, left: 40 },
        tooltip: { trigger: 'axis' as const, formatter: this._buildTooltipFormatter() as any },
        legend: { show: true, top: 0, right: 0, textStyle: { fontSize: 10 }, icon: 'circle', itemWidth: 8, itemHeight: 8 },
      },
      data: [
        {
          type: 'line' as const,
          name: 'Flow',
          data: this._toChartData(this._boilerHistory, this._config.boiler_temp_entity),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2 },
          itemStyle: { color: heatingColor },
          markLine: this._buildMarkLine(threshold),
        },
        {
          type: 'line' as const,
          name: 'Return',
          data: this._toChartData(this._returnHistory, this._config.return_temp_entity),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1.5 },
          itemStyle: { color: coolingColor },
        },
      ],
    };
  }

  private _renderEfficiencyKpiFooter(): ReturnType<typeof html> | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const boilerMissing = !this._entityExists(cfg.boiler_temp_entity);
    const returnMissing = !this._entityExists(cfg.return_temp_entity);

    return html`
      <div class="kpi-footer">
        <div class="kpi-block${boilerMissing ? ' missing' : ''}"
             @click=${boilerMissing ? undefined : () => this._openMoreInfo(cfg.boiler_temp_entity)}>
          <div class="kpi-value">${this._formatEntityTemp(cfg.boiler_temp_entity)}</div>
          <div class="kpi-label">${localize('opentherm.status_card.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${returnMissing ? ' missing' : ''}"
             @click=${returnMissing ? undefined : () => this._openMoreInfo(cfg.return_temp_entity)}>
          <div class="kpi-value">${this._formatEntityTemp(cfg.return_temp_entity)}</div>
          <div class="kpi-label">${localize('opentherm.status_card.return')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block">
          <div class="kpi-value">${this._formattedDeltaT}</div>
          <div class="kpi-label">ΔT</div>
        </div>
      </div>
    `;
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.boiler_temp_entity;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      kpiFooterStyles,
      css`
        ha-card { height: 100%; overflow: hidden; }
        @container (max-width: 260px) {
          .kpi-footer {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .kpi-footer .kpi-divider {
            display: none;
          }
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const localize = setupCustomLocalize(this.hass);
    const title = this._computeCardTitle('opentherm.efficiency_card.default_title');
    const notFoundBoiler = this._renderNotFound(cfg.boiler_temp_entity);
    const notFoundReturn = this._renderNotFound(cfg.return_temp_entity);

    return html`
      <ha-card>
        ${this._renderHeader({ iconName: 'mdi:chart-areaspline', clickEntity: cfg.boiler_temp_entity, title })}
        ${this._renderChart()}
        ${this._renderEfficiencyKpiFooter()}
        ${notFoundBoiler}
        ${notFoundReturn}
        ${this._renderFooterMeta()}
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-efficiency-card': OtEfficiencyCard;
  }
}

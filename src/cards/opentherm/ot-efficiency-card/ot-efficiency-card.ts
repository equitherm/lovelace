import { html, css, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { OtEfficiencyCardConfig } from './ot-efficiency-card-config';
import { EquithermEChartCard, type EChartConfig, headerStyles } from '../../../utils/base';
import type { HomeAssistant } from '../../../ha';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { computeDomain } from '../../../ha/common/entity/compute_domain';
import { OT_EFFICIENCY_CARD_NAME, OT_EFFICIENCY_CARD_EDITOR_NAME } from './const';
import { validateOtEfficiencyCardConfig } from './ot-efficiency-card-config';
import { OtHistoryHelper, type OtHistoryPoint } from '../../../utils/ot-history';
import { resolveRgbColor } from '../../../utils/hvac-colors';
import { computeEntityNameDisplay } from '../../../ha/common/entity/compute_entity_name_display';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';

const DEFAULT_HOURS = 6;

registerCustomCard({
  type: OT_EFFICIENCY_CARD_NAME,
  name: 'OpenTherm Efficiency',
  description: 'Boiler condensing efficiency chart',
});

@customElement(OT_EFFICIENCY_CARD_NAME)
export class OtEfficiencyCard extends EquithermEChartCard<OtEfficiencyCardConfig> {
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
    const boiler = entityIds.find(e => e.includes('boiler') || e.includes('t_boiler')) ?? '';
    const ret = entityIds.find(e => e.includes('ret') || e.includes('return')) ?? '';
    const flame = entityIds.find(e =>
      computeDomain(e) === 'binary_sensor' && e.includes('flame')
    ) ?? '';
    const chActive = entityIds.find(e =>
      computeDomain(e) === 'binary_sensor' && (e.includes('ch_active') || e.includes('central_heating'))
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

  protected override _headerIconColor(): string {
    if (this._isCondensing) return 'var(--rgb-success, 76,175,80)';
    if (this._isHeatingTooHot) return 'var(--rgb-state-climate-heat, 244,81,30)';
    return 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    return html`
      <div class="badges">
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
    return {
      silent: true,
      symbol: 'none' as const,
      lineStyle: { color: 'rgba(76,175,80,0.5)', type: 'dashed' as const, width: 1 },
      data: [{ yAxis: threshold, label: { formatter: `${threshold}${unit}`, fontSize: 10, position: 'insideEndTop' } }],
    };
  }

  private _buildTooltipFormatter(): (params: any) => string {
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    return (params: any) => {
      const time = this._formatChartTime(params[0].value[0] as number);
      let html = `<span style="opacity:0.6">${time}</span><br/>`;
      for (const p of params) {
        const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${p.color};"></span>`;
        html += `${marker}${p.seriesName}: <b>${p.value[1].toFixed(1)}${unit}</b><br/>`;
      }
      return html;
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
          axisLabel: { fontSize: 10, formatter: (v: number) => `${v.toFixed(1)}` },
        },
        grid: { top: 10, right: 10, bottom: 25, left: 40 },
        tooltip: { trigger: 'axis' as const, formatter: this._buildTooltipFormatter() },
        legend: { show: false },
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

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.boiler_temp_entity;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; overflow: hidden; }
        .chart-wrapper { --chart-max-height: none; }
        .chart-wrapper ha-chart-base { height: 100%; }
      `,
    ];
  }

  protected override _renderChart(): TemplateResult | typeof nothing {
    if (!this._echartConfig) return nothing;
    const { options, data } = this._echartConfig;
    return html`
      <div class="chart-wrapper">
        <ha-chart-base .hass=${this.hass} .options=${options} .data=${data} height="100%" hide-reset-button></ha-chart-base>
      </div>
    `;
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const localize = setupCustomLocalize(this.hass);
    const boilerState = this._entityState(cfg.boiler_temp_entity);
    const title = boilerState
      ? computeEntityNameDisplay(boilerState, cfg.name, this.hass) || localize('opentherm.efficiency_card.default_title')
      : localize('opentherm.efficiency_card.default_title');

    return html`
      <ha-card>
        ${this._renderHeader({ iconName: 'mdi:chart-areaspline', clickEntity: cfg.boiler_temp_entity, title })}
        ${this._renderChart()}
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

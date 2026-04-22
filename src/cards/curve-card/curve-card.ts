import { html, css, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { CurveCardConfig } from './curve-card-config';
import type { HomeAssistant } from '../../ha/types';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle, paramsFooterStyles, kpiFooterStyles, tunableFooterStyles } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { CURVE_CARD_NAME, CURVE_CARD_EDITOR_NAME } from './const';
import { findClimateEntity, findOutdoorEntity, findFlowEntity, findCurveOutputEntity } from '../../utils/stub-config';
import { validateCurveCardConfig } from './curve-card-config';
import { resolveRgbColor } from '../../utils/hvac-colors';
import { isRateLimitingActive, getAdjustingDirection, getRateTargetEntity } from '../../utils/climate-helpers';

registerCustomCard({
  type: CURVE_CARD_NAME,
  name: 'Equitherm Curve',
  description: 'Heating curve visualization with current operating point',
});
import { buildCurveSeries, flowAtOutdoor } from '../../utils/curve';
import { EquithermEChartCard, type EChartConfig, headerStyles } from '../../utils/base';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';
import '../../shared/eq-manual-overlay';
import '../../shared/eq-tuning-dialog';
import type { TuningDialogConfig } from '../../shared/eq-tuning-dialog-config';

/** Marker sizes for chart annotations */
const MARKER_SINGLE = 9;
const MARKER_CURVE_OUTPUT = 10;
const MARKER_RATE_LIMITED = 8;

@customElement(CURVE_CARD_NAME)
export class EquithermCurveCard extends EquithermEChartCard<CurveCardConfig> {

  @state() private _showDialog = false;
  @state() private _dialogConfig?: TuningDialogConfig;

  protected override willUpdate(changedProps: Map<string, unknown>): void {
    super.willUpdate(changedProps);
    if (changedProps.has('_config')) {
      this._dialogConfig = this._computeDialogConfig();
      this._updateChartConfig();
      return;
    }
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass || this._relevantStateChanged(oldHass)) {
        this._updateChartConfig();
      }
    }
  }

  private _relevantStateChanged(oldHass: HomeAssistant): boolean {
    const entities = [
      this._config.outdoor_entity,
      this._config.flow_entity,
      this._config.climate_entity,
      this._config.rate_limiting_entity,
      this._config.pid_output_entity,
      this._config.curve_output_entity,
      this._config.pid_active_entity,
      ...((this._config.curve_from_entities || this._config.tunable) ? [this._config.hc_entity, this._config.shift_entity, this._config.n_entity, this._config.min_flow_entity, this._config.max_flow_entity] : []),
    ].filter(Boolean) as string[];
    return entities.some(id =>
      this.hass!.states[id]?.state !== oldHass.states[id]?.state
    );
  }

  static async getStubConfig(hass: HomeAssistant): Promise<CurveCardConfig> {
    return {
      type: 'custom:equitherm-curve-card',
      climate_entity: findClimateEntity(hass),
      outdoor_entity: findOutdoorEntity(hass),
      curve_output_entity: findCurveOutputEntity(hass),
      flow_entity: findFlowEntity(hass),
      hc: 1.2,
      n: 1.25,
      shift: 0,
      min_flow: 25,
      max_flow: 70,
      t_out_min: -20,
      t_out_max: 20,
    } as CurveCardConfig;
  }

  static async getConfigElement() {
    await import('./curve-card-editor');
    return document.createElement(CURVE_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateCurveCardConfig(config);
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.flow_entity;
  }

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _tOutdoor(): number | null {
    const s = this._entityState(this._config.outdoor_entity);
    if (!s) return null;
    const val = parseFloat(s.state);
    return isNaN(val) ? null : this._fromDisplayTemp(val);
  }

  private get _flowTemp(): number {
    const s = this._entityState(this._config.flow_entity);
    if (s) {
      const val = parseFloat(s.state);
      if (!isNaN(val)) return this._fromDisplayTemp(val);
    }
    return this._config.min_flow;
  }

  private get _currentN(): number {
    return this._config.curve_from_entities
      ? this._resolveEntityNumber(this._config.n_entity, this._config.n)
      : this._config.n;
  }

  private _computeDialogConfig(): TuningDialogConfig | undefined {
    const cfg = this._config;
    if (!cfg?.hc_entity || !cfg?.shift_entity) return undefined;
    return {
      climate_entity: cfg.climate_entity,
      outdoor_entity: cfg.outdoor_entity,
      hc_entity: cfg.hc_entity,
      shift_entity: cfg.shift_entity,
      flow_entity: cfg.flow_entity,
      n_entity: cfg.n_entity,
      min_flow_entity: cfg.min_flow_entity,
      max_flow_entity: cfg.max_flow_entity,
      recalculate_service: cfg.recalculate_service,
      curve_from_entities: cfg.curve_from_entities,
      n: cfg.n,
      min_flow: cfg.min_flow,
      max_flow: cfg.max_flow,
      t_out_min: cfg.t_out_min,
      t_out_max: cfg.t_out_max,
    };
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    if (!this._config.tunable) return super._renderHeaderBadges();

    const manual = this._isManualPreset;
    return html`
      <div class="badges">
        ${manual ? nothing : this._renderPidBadge()}
        ${manual ? nothing : this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderHvacBadge()}
        <ha-icon-button
          @click=${() => { this._showDialog = true; }}
          style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
        ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
      </div>
    `;
  }

  private _renderParamsFooterContent(): TemplateResult | typeof nothing {
    if (!this._config.curve_from_entities) return nothing;

    return this._renderTunableParamsFooter(
      {
        hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: this._config.hc, onClick: this._config.tunable ? undefined : () => { this._showDialog = true; } } : undefined,
        n: this._config.n_entity ? { entity: this._config.n_entity, fallback: this._config.n } : undefined,
        shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: this._config.shift, onClick: this._config.tunable ? undefined : () => { this._showDialog = true; } } : undefined,
      },
      () => { this._showDialog = true; },
    );
  }

  protected override _buildEChartOptions(): EChartConfig {
    return this._buildSingleCurveOptions();
  }

  private _buildSingleCurveOptions(): EChartConfig {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const curveParams = {
      tTarget: this._tTarget,
      hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
      n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
      shift: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.shift_entity, cfg.shift) : cfg.shift,
      minFlow: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow,
      maxFlow: cfg.curve_from_entities ? this._resolveEntityTemp(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow,
    };

    // Resolve colors at runtime from CSS variables
    const style = getComputedStyle(this);
    const gradientStart = style.getPropertyValue('--curve-gradient-start').trim();
    const gradientEnd = style.getPropertyValue('--curve-gradient-end').trim();
    const heatingColor = gradientStart ? `rgb(${gradientStart})` : resolveRgbColor(this, 'heating');
    const coolingColor = gradientEnd ? `rgb(${gradientEnd})` : resolveRgbColor(this, 'cooling');
    const wwsdFill = `rgba(${style.getPropertyValue('--rgb-warning').trim() || '255, 167, 38'}, 0.08)`;

    const curveSeries = buildCurveSeries(curveParams, cfg.t_out_min, cfg.t_out_max);
    // Convert curve data to display units for charting
    const displaySeries = curveSeries.map(p => ({
      x: this._toDisplayTemp(p.x),
      y: this._toDisplayTemp(p.y),
    }));
    const tOutdoor = this._tOutdoor;

    // Build operating point data for a line series (markPoint doesn't work through ha-chart-base)
    const operatingPoints: Array<{
      value: [number, number];
      symbolSize: number;
      itemStyle: { color: string; borderColor: string; borderWidth: number };
    }> = [];
    const lookup = (id: string) => this._entityState(id);
    const rateLimiting = isRateLimitingActive(this._config, lookup);
    const rateTarget = getRateTargetEntity(this._config);
    if (tOutdoor !== null) {
      const tOutdoorDisplay = this._toDisplayTemp(tOutdoor);
      const currentFlow = flowAtOutdoor(curveParams, tOutdoor);
      const currentFlowDisplay = this._toDisplayTemp(currentFlow);
      if (rateLimiting) {
        // rateTarget entity state is already in display units
        const rateTargetValue = rateTarget
          ? (this._entityState(rateTarget) ? parseFloat(this._entityState(rateTarget)!.state) : currentFlowDisplay)
          : currentFlowDisplay;

        if (this._config.pid_output_entity && this._config.curve_output_entity) {
          // curveOutput entity state is already in display units
          const curveOutput = this._entityState(this._config.curve_output_entity);
          const curveValue = curveOutput ? parseFloat(curveOutput.state) : currentFlowDisplay;
          operatingPoints.push({
            value: [tOutdoorDisplay, curveValue],
            symbolSize: MARKER_RATE_LIMITED,
            itemStyle: { color: 'transparent', borderColor: heatingColor, borderWidth: 1.5 },
          });
        }

        operatingPoints.push({
          value: [tOutdoorDisplay, rateTargetValue],
          symbolSize: MARKER_CURVE_OUTPUT,
          itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
        });

        operatingPoints.push({
          value: [tOutdoorDisplay, this._toDisplayTemp(this._flowTemp)],
          symbolSize: MARKER_RATE_LIMITED,
          itemStyle: { color: 'transparent', borderColor: heatingColor, borderWidth: 2 },
        });
      } else {
        operatingPoints.push({
          value: [tOutdoorDisplay, currentFlowDisplay],
          symbolSize: MARKER_SINGLE,
          itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
        });
      }
    }

    // Discrete markers: sample every 50th point
    const discretePoints = displaySeries
      .filter((_p, i) => i % 50 === 0)
      .map(p => [p.x, p.y] as [number, number]);

    return {
      options: {
        animation: false,
        xAxis: {
          type: 'value' as const,
          min: this._toDisplayTemp(cfg.t_out_min),
          max: this._toDisplayTemp(cfg.t_out_max),
          inverse: true,
          axisLabel: {
            fontSize: 10,
            formatter: (val: number) => `${parseFloat(val.toFixed(1))}`,
          },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          type: 'value' as const,
          axisLabel: {
            fontSize: 10,
            formatter: (v: number) => `${parseFloat(v.toFixed(1))}`,
          },
          min: this._toDisplayTemp(curveParams.minFlow - 5),
          max: this._toDisplayTemp(curveParams.maxFlow + 5),
        },
        grid: { top: 5, right: 5, bottom: 20, left: 30 },
        tooltip: {
          trigger: 'axis' as const,
          backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
          borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
          borderWidth: 1,
          padding: [8, 12],
          textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
          formatter: (params: any) => {
            const curveParam = (Array.isArray(params) ? params : []).find(
              (p: any) => p.seriesName === localize('curve_card.flow_temp'),
            );
            if (!curveParam) return '';
            const outdoorVal = curveParam.value[0];
            const flowVal = curveParam.value[1];
            const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
            const fmt = (v: number) => `${parseFloat(v.toFixed(1))} ${unit}`;
            const marker = (color: string) =>
              `<span style="display:inline-block;margin-right:6px;border-radius:50%;width:8px;height:8px;background-color:${color}"></span>`;
            return `<div style="margin-bottom:4px;font-weight:600">${fmt(outdoorVal)} ${localize('curve_card.outdoor_axis_suffix')}</div>`
              + `<div>${marker(heatingColor)}${fmt(flowVal)} ${localize('curve_card.flow_axis_suffix')}</div>`;
          },
        },
        legend: { show: false },
      },
      data: [
        {
          type: 'line' as const,
          name: localize('curve_card.flow_temp'),
          data: displaySeries.map(p => [p.x, p.y] as [number, number]),
          showSymbol: false,
          lineStyle: { width: 2 },
          itemStyle: { color: heatingColor },
          areaStyle: {
            color: {
              type: 'linear' as const,
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: heatingColor },
                { offset: 1, color: coolingColor },
              ],
            },
          },
        },
        // Discrete markers (every 50th point) — line series with no line
        {
          type: 'line' as const,
          name: 'markers',
          data: discretePoints,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 3,
          lineStyle: { width: 0 },
          itemStyle: { color: heatingColor, borderColor: '#fff', borderWidth: 1 },
          tooltip: { show: false },
        },
        // Operating point(s) — line series with no line (markPoint workaround)
        {
          type: 'line' as const,
          name: 'operating-point',
          data: operatingPoints,
          showSymbol: true,
          symbol: 'circle',
          lineStyle: { width: 0 },
          tooltip: { show: false },
        },
        // WWSD zone — filled area from t_out_max to tTarget
        ...(this._isWWSD ? [{
          type: 'line' as const,
          name: 'wwsd',
          data: [
            [this._toDisplayTemp(cfg.t_out_max), this._toDisplayTemp(curveParams.maxFlow + 5)] as [number, number],
            [this._toDisplayTemp(this._tTarget), this._toDisplayTemp(curveParams.maxFlow + 5)] as [number, number],
          ],
          showSymbol: false,
          lineStyle: { width: 0 },
          areaStyle: { color: wwsdFill },
          tooltip: { show: false },
        }] : []),
      ],
    };
  }

  protected override _renderChart(): TemplateResult | typeof nothing {
    if (!this._echartConfig) return nothing;
    const { options, data } = this._echartConfig;
    return html`
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${options}
          .data=${data}
          height="100%"
          hide-reset-button
        ></ha-chart-base>
        <eq-manual-overlay></eq-manual-overlay>
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      paramsFooterStyles,
      tunableFooterStyles,
      kpiFooterStyles,
      css`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
          padding: 0 8px;
        }
        .chart-wrapper ha-chart-base {
          height: 100%;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const lookup = (id: string) => this._entityState(id)!;
    const adjustingDir = getAdjustingDirection(this._config, lookup);
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name ?? this._config.title, this.hass) || localize('curve_card.default_title')
      : (this._config.title ?? localize('curve_card.default_title'));

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:thermostat',
          clickEntity: this._config.climate_entity,
          title,
        })}
        ${this._renderChart()}
        ${this._renderKpiFooter({
          adjustingDir: adjustingDir ?? undefined,
          curveOutput: this._curveOutputTempFormatted || undefined,
        })}
        ${this._renderParamsFooterContent()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showDialog ? html`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showDialog}
          @closed=${() => { this._showDialog = false; }}
        ></eq-tuning-dialog>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'equitherm-curve-card': EquithermCurveCard;
  }
}

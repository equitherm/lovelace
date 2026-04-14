import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { PointAnnotations } from 'apexcharts';
import type { CurveCardConfig } from './curve-card-config';
import type { LovelaceGridOptions, LovelaceCard } from '../../ha/panels/lovelace/types';
import type { HomeAssistant } from '../../ha';
import type { ClimateEntity } from '../../ha/data/climate';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { EquithermBaseCard } from '../../utils/base-card';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { CURVE_CARD_NAME, CURVE_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS } from './const';
import { validateCurveCardConfig } from './curve-card-config';
import { resolveRgbColor, normalizeHvacAction, getHvacActionColor, getHvacBadgeProps } from '../../utils/hvac-colors';

registerCustomCard({
  type: CURVE_CARD_NAME,
  name: 'Equitherm Curve',
  description: 'Heating curve visualization with current operating point',
});
import { buildCurveSeries, flowAtOutdoor } from '../../utils/curve';
import { chartMixin } from '../../utils/chart-mixin';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';
import '../../shared/shape-icon';

/** Curve parameters that affect the curve shape (require full rebuild) */
type CurveStructuralParams = Pick<CurveCardConfig,
  | 'hc' | 'n' | 'shift' | 'min_flow' | 'max_flow' | 't_out_min' | 't_out_max'
>;

/** Series data point for ApexCharts */
interface ChartDataPoint {
  x: number;
  y: number;
}

/** Marker sizes for chart annotations */
const MARKER_SINGLE = 7;
const MARKER_CURVE_OUTPUT = 8;
const MARKER_RATE_LIMITED = 6;

@customElement(CURVE_CARD_NAME)
export class EquithermCurveCard extends chartMixin(EquithermBaseCard<CurveCardConfig>) implements LovelaceCard {
  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);
    if (!this._chart) return;

    // Handle hass changes (entity states + dark mode)
    if (changedProps.has('hass') && this.hass) {
      const isDark = (this.hass.themes as any).darkMode as boolean;
      const darkChanged = this._prevDarkMode !== undefined && this._prevDarkMode !== isDark;
      this._prevDarkMode = isDark;

      if (darkChanged) {
        this._updateChartOptions();
      } else {
        // Entity states changed, update series (marker position)
        this._updateChartSeries();
      }
    }
    // Handle config changes
    if (changedProps.has('_config')) {
      const prevConfig = changedProps.get('_config') as CurveCardConfig | undefined;
      if (this._structuralParamsChanged(prevConfig, this._config)) {
        this._updateChartOptions();
      } else {
        this._updateChartSeries();
      }
    }
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 5, min_rows: 5 };
  }

  static async getStubConfig(hass: HomeAssistant): Promise<CurveCardConfig> {
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

    // Curve output sensor (optional)
    const curveOutputEntity = tempSensors.find(e => e.includes('curve_output')) ?? '';

    return {
      type: 'custom:equitherm-curve-card',
      climate_entity: climateEntity,
      outdoor_entity: outdoorEntity,
      curve_output_entity: curveOutputEntity,
      flow_entity: flowEntity,
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

  getCardSize() { return 3; }

  /** Read a number from an entity state, falling back to a config default */
  private _resolveEntityNumber(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : val;
  }

  private get _climate(): ClimateEntity | undefined {
    return this._entityState(this._config.climate_entity) as ClimateEntity | undefined;
  }

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _tOutdoor(): number | null {
    const s = this._entityState(this._config.outdoor_entity);
    if (!s) return null;
    const val = parseFloat(s.state);
    return isNaN(val) ? null : val;
  }

  private get _tOutdoorUnit(): string | undefined {
    return this._entityAttr<string>(this._config.outdoor_entity, 'unit_of_measurement');
  }

  private get _flowTemp(): number {
    const s = this._entityState(this._config.flow_entity);
    return s ? parseFloat(s.state) : this._config.min_flow;
  }

  private get _flowTempUnit(): string | undefined {
    return this._entityAttr<string>(this._config.flow_entity, 'unit_of_measurement');
  }

  private get _roomTemp(): string {
    const temp = this._climate?.attributes.current_temperature;
    return this._formatTemp(temp, this.hass?.config?.unit_system?.temperature);
  }

  private get _curveOutputTemp(): string {
    const entity = this._rateTargetEntity;
    if (!entity) return '';
    const state = this._entityState(entity);
    if (!state) return '';
    const value = parseFloat(state.state);
    if (isNaN(value)) return '';
    return this._formatTemp(value, this._entityAttr<string>(entity, 'unit_of_measurement'));
  }

  private get _rateLimitingActive(): boolean {
    if (!this._config.rate_limiting_entity) return false;
    return this._entityState(this._config.rate_limiting_entity)?.state === 'on';
  }

  private get _pidActive(): boolean {
    if (!this._config.pid_active_entity) return false;
    return this._entityState(this._config.pid_active_entity)?.state === 'on';
  }

  /** Entity to compare against flow for rate-limit direction: PID output when available, else curve output */
  private get _rateTargetEntity(): string | undefined {
    return this._config.pid_output_entity ?? this._config.curve_output_entity ?? undefined;
  }

  private get _adjustingDirection(): 'rising' | 'falling' | null {
    if (!this._rateLimitingActive || !this._rateTargetEntity) return null;

    const flowState = this._entityState(this._config.flow_entity);
    const targetState = this._entityState(this._rateTargetEntity);
    if (!flowState || !targetState) return null;

    const flow = parseFloat(flowState.state);
    const target = parseFloat(targetState.state);
    if (isNaN(flow) || isNaN(target)) return null;

    if (flow < target) return 'rising';
    if (flow > target) return 'falling';
    return null;
  }

  private get _isDark(): boolean {
    return this.hass?.themes?.darkMode ?? false;
  }

  protected _buildChartOptions() {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const curveParams = {
      tTarget: this._tTarget,
      hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
      n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
      shift: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.shift_entity, cfg.shift) : cfg.shift,
      minFlow: cfg.min_flow,
      maxFlow: cfg.max_flow,
    };

    // Resolve colors at runtime from CSS variables
    const style = getComputedStyle(this);
    const gradientStart = style.getPropertyValue('--curve-gradient-start').trim();
    const gradientEnd = style.getPropertyValue('--curve-gradient-end').trim();
    const heatingColor = gradientStart ? `rgb(${gradientStart})` : resolveRgbColor(this, 'heating');
    const coolingColor = gradientEnd ? `rgb(${gradientEnd})` : resolveRgbColor(this, 'cooling');

    const curveSeries = buildCurveSeries(curveParams, cfg.t_out_min, cfg.t_out_max);
    const tOutdoor = this._tOutdoor;

    // Using annotations instead of scatter series to avoid hover conflicts
    const annotationPoints: PointAnnotations[] = [];
    if (tOutdoor !== null) {
      const currentFlow = flowAtOutdoor(curveParams, tOutdoor);
      if (this._rateLimitingActive) {
        // Target the rate limiter is ramping toward (PID-adjusted if available, else pure curve)
        const rateTarget = this._rateTargetEntity
          ? (this._entityState(this._rateTargetEntity) ? parseFloat(this._entityState(this._rateTargetEntity)!.state) : currentFlow)
          : currentFlow;

        // Pure curve output — shown as hollow ring when PID output is separately configured
        if (this._config.pid_output_entity && this._config.curve_output_entity) {
          const curveOutput = this._entityState(this._config.curve_output_entity);
          const curveValue = curveOutput ? parseFloat(curveOutput.state) : currentFlow;
          annotationPoints.push({
            x: -tOutdoor,
            y: curveValue,
            marker: { size: MARKER_RATE_LIMITED, fillColor: 'transparent', strokeColor: heatingColor, strokeWidth: 1.5 },
          });
        }

        // Rate-limit target (PID-adjusted or curve)
        annotationPoints.push({
          x: -tOutdoor,
          y: rateTarget,
          marker: { size: MARKER_CURVE_OUTPUT, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
        });

        // Current flow setpoint (where we actually are, ramping up)
        annotationPoints.push({
          x: -tOutdoor,
          y: this._flowTemp,
          marker: { size: MARKER_RATE_LIMITED, fillColor: 'transparent', strokeColor: heatingColor, strokeWidth: 2 },
        });
      } else {
        annotationPoints.push({
          x: -tOutdoor,
          y: currentFlow,
          marker: { size: MARKER_SINGLE, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
        });
      }
    }

    return {
      chart: {
        type: 'line' as const,
        width: '100%',
        height: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 400 },
        background: 'transparent',
      },
      theme: { mode: this._isDark ? 'dark' as const : 'light' as const },
      series: [
        {
          name: localize('curve_card.flow_temp'),
          // Negate x values to reverse axis: warm (left) → cold (right)
          data: curveSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })),
        },
      ],
      annotations: { points: annotationPoints },
      stroke: { curve: 'straight' as const, width: 2 },
      colors: [heatingColor],
      fill: {
        type: 'gradient',
        gradient: {
          type: 'horizontal',
          gradientToColors: [coolingColor],
          shadeIntensity: 1,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 0,
        discrete: curveSeries
          .reduce<Array<{ seriesIndex: number; dataPointIndex: number; size: number; fillColor: string; strokeColor: string; strokeWidth: number }>>(
            (acc, _p, i) => (i % 50 === 0 ? [...acc, { seriesIndex: 0, dataPointIndex: i, size: 3, fillColor: heatingColor, strokeColor: '#fff', strokeWidth: 1 }] : acc),
            [],
          ),
        hover: { size: 6 },
      },
      xaxis: {
        type: 'numeric' as const,
        // Negated min/max for reversed display: warm (left) → cold (right)
        min: -cfg.t_out_max,
        max: -cfg.t_out_min,
        forceNiceScale: false,
        title: { text: localize('curve_card.outdoor_axis'), style: { color: 'var(--secondary-text-color)', fontWeight: 400 } },
        labels: {
          style: { colors: 'var(--secondary-text-color)', fontWeight: 400 },
          formatter: (val: number) => `${(-val).toFixed(1)}`,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: localize('curve_card.flow_axis'), style: { color: 'var(--secondary-text-color)', fontWeight: 400 } },
        labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400 } },
        min: cfg.min_flow - 5,
        max: cfg.max_flow + 5,
      },
      grid: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: {
        theme: this._isDark ? 'dark' : 'light',
        x: { formatter: (v: number) => localize('curve_card.outdoor_tooltip', { temp: (-v).toFixed(1) }) },
        y: { formatter: (v: number) => localize('curve_card.flow_tooltip', { temp: v.toFixed(1) }) },
      },
    };
  }

  private _updateChartSeries(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    this._chart.updateSeries(opts.series, false);
    // Annotations are part of options, not series - must update separately
    this._chart.updateOptions({ annotations: opts.annotations }, false, false);
  }

  private _structuralParamsChanged(prev: CurveCardConfig | undefined, next: CurveCardConfig): boolean {
    if (!prev) return true;
    const keys: (keyof CurveStructuralParams)[] = ['hc', 'n', 'shift', 'min_flow', 'max_flow', 't_out_min', 't_out_max'];
    return keys.some(key => prev[key] !== next[key]);
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      css`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
          flex-shrink: 0;
        }
        eq-shape-icon {
          cursor: pointer;
          flex-shrink: 0;
        }
        .header-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .badges {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .title {
          font-size: var(--font-size-md);
          font-weight: 600;
          color: var(--primary-text-color);
        }
        .state {
          font-size: var(--ha-font-size-s, 12px);
          font-weight: var(--ha-font-weight-normal, 400);
          line-height: var(--ha-line-height-condensed, 1.2);
          letter-spacing: 0.4px;
          color: var(--primary-text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .chart-wrapper { flex: 1; min-height: 0; }
        #chart { width: 100%; height: 100%; }
        .footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
          flex-shrink: 0;
        }
        .footer-metric {
          display: flex;
          align-items: baseline;
          gap: 4px;
          padding: 0 12px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .footer-metric:hover {
          background: var(--secondary-background-color, rgba(0,0,0,0.04));
        }
        .footer-value {
          font-size: var(--font-size-md);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          white-space: nowrap;
          line-height: 1;
        }
        .footer-value.flow { color: var(--gradient-hot); }
        .footer-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          white-space: nowrap;
          margin-top: 0;
        }
        .footer-sep {
          font-size: var(--font-size-sm);
          color: var(--divider-color, rgba(0,0,0,0.2));
          user-select: none;
        }
        .flow-target {
          font-size: 0.68rem;
          color: var(--secondary-text-color);
          margin-left: 2px;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const adjustingDir = this._adjustingDirection;
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name ?? this._config.title, this.hass) || localize('curve_card.default_title')
      : (this._config.title ?? localize('curve_card.default_title'));

    // Build icon styles from action color (Mushroom pattern)
    const color = getHvacActionColor(hvacAction);
    const iconStyles = styleMap({
      '--icon-color': `rgb(${color})`,
      '--shape-color': `rgba(${color}, 0.2)`,
    });

    const hvacBadge = getHvacBadgeProps(localize, hvacAction, this._rateLimitingActive, adjustingDir);

    // PID status chip
    const pidChip = this._config.pid_active_entity
      ? html`<eq-badge-info
          .label=${'PID'}
          style=${`--badge-info-color: ${this._pidActive ? 'var(--rgb-success)' : 'var(--rgb-disabled)'}`}
          .icon=${this._pidActive ? undefined : 'mdi:alert-circle-outline'}
        ></eq-badge-info>`
      : nothing;

    return html`
      <ha-card>
        <div class="header">
          <eq-shape-icon
            .icon=${'mdi:thermostat'}
            .size=${42}
            style=${iconStyles}
            @click=${() => this._openMoreInfo(this._config.climate_entity)}
          ></eq-shape-icon>
          <div class="header-info">
            <span class="title">${title}</span>
            ${this._climate?.attributes.temperature != null ? html`
              <span class="state">· ${this._formatTemp(this._climate.attributes.temperature, this.hass?.config?.unit_system?.temperature)}</span>
            ` : nothing}
          </div>
          <div class="badges">
            ${pidChip}
            <eq-badge-info
              .label=${hvacBadge.label}
              style=${`--badge-info-color: ${hvacBadge.color}`}
              .icon=${hvacBadge.icon}
              .active=${hvacBadge.active}
            ></eq-badge-info>
          </div>
        </div>
        <div class="chart-wrapper">
          <div id="chart"></div>
        </div>
        <div class="footer">
          <div class="footer-metric" @click=${() => this._openMoreInfo(this._config.outdoor_entity)}>
            <span class="footer-value">${this._formatTemp(this._tOutdoor, this._tOutdoorUnit)}</span>
            <span class="footer-label">${localize('common.outdoor')}</span>
          </div>
          <span class="footer-sep" aria-hidden="true">·</span>
          <div class="footer-metric" @click=${() => this._openMoreInfo(this._config.flow_entity)}>
            <span class="footer-value flow">${this._formatTemp(this._flowTemp, this._flowTempUnit)}</span>
            ${adjustingDir && this._curveOutputTemp ? html`<span class="flow-target">→ ${this._curveOutputTemp}</span>` : nothing}
            <span class="footer-label">${localize('common.flow')}</span>
          </div>
          <span class="footer-sep" aria-hidden="true">·</span>
          <div class="footer-metric" @click=${() => this._openMoreInfo(this._config.climate_entity)}>
            <span class="footer-value">${this._roomTemp}</span>
            <span class="footer-label">${localize('common.room')}</span>
          </div>
        </div>
      </ha-card>
    `;
  }
}

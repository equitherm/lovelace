import { html, css, nothing } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import ApexCharts from 'apexcharts';
import type { CurveCardConfig } from './curve-card-config';
import type { LovelaceGridOptions } from '../../ha/data/lovelace';
import type { HomeAssistant } from '../../ha';
import type { ClimateEntity } from '../../ha/data/climate';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { EquithermBaseCard } from '../../utils/base-card';
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
const MARKER_SINGLE = 10;
const MARKER_CURVE_OUTPUT = 8;
const MARKER_RATE_LIMITED = 6;

@customElement(CURVE_CARD_NAME)
export class EquithermCurveCard extends EquithermBaseCard<CurveCardConfig> {
  private _prevDarkMode?: boolean;
  @query('#chart') private _chartEl!: HTMLElement;
  @query('.chart-wrapper') private _chartWrapper!: HTMLElement;
  private _chart?: ApexCharts;
  private _resizeObserver?: ResizeObserver;
  private _chartInitialized = false;

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

  private get _rateLimitingActive(): boolean {
    if (!this._config.rate_limiting_entity) return false;
    return this._entityState(this._config.rate_limiting_entity)?.state === 'on';
  }

  private get _pidActive(): boolean {
    if (!this._config.pid_active_entity) return false;
    return this._entityState(this._config.pid_active_entity)?.state === 'on';
  }

  private get _adjustingDirection(): 'rising' | 'falling' | null {
    if (!this._rateLimitingActive || !this._config.curve_output_entity) return null;

    const flowState = this._entityState(this._config.flow_entity);
    const curveState = this._entityState(this._config.curve_output_entity);
    if (!flowState || !curveState) return null;

    const flow = parseFloat(flowState.state);
    const curve = parseFloat(curveState.state);
    if (isNaN(flow) || isNaN(curve)) return null;

    if (flow < curve) return 'rising';
    if (flow > curve) return 'falling';
    return null;
  }

  private get _isDark(): boolean {
    return (this.hass?.themes as any)?.darkMode ?? false;
  }

  private _buildChartOptions() {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const curveParams = {
      tTarget: this._tTarget,
      hc: cfg.hc,
      n: cfg.n,
      shift: cfg.shift,
      minFlow: cfg.min_flow,
      maxFlow: cfg.max_flow,
    };

    // Resolve colors at runtime from CSS variables
    const heatingColor = resolveRgbColor(this, 'heating');
    const coolingColor = resolveRgbColor(this, 'cooling');

    const curveSeries = buildCurveSeries(curveParams, cfg.t_out_min, cfg.t_out_max);
    const tOutdoor = this._tOutdoor;

    // Using annotations instead of scatter series to avoid hover conflicts
    const annotationPoints: ApexAnnotations['points'] = [];
    if (tOutdoor !== null) {
      const currentFlow = flowAtOutdoor(curveParams, tOutdoor);
      if (this._rateLimitingActive) {
        const curveOutput = this._entityState(this._config.curve_output_entity);
        const curveOutputValue = curveOutput ? parseFloat(curveOutput.state) : currentFlow;
        annotationPoints.push(
          {
            x: -tOutdoor,
            y: curveOutputValue,
            marker: { size: MARKER_CURVE_OUTPUT, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
          },
          {
            x: -tOutdoor,
            y: this._flowTemp,
            marker: { size: MARKER_RATE_LIMITED, fillColor: 'transparent', strokeColor: heatingColor, strokeWidth: 2 },
          }
        );
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
        type: 'area',
        width: '100%',
        height: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 400 },
        background: 'transparent',
      },
      theme: { mode: this._isDark ? 'dark' : 'light' },
      series: [
        {
          name: localize('curve_card.flow_temp'),
          // Negate x values to reverse axis: warm (left) → cold (right)
          data: curveSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })),
        },
      ],
      annotations: { points: annotationPoints },
      stroke: { curve: 'straight', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          gradientToColors: [coolingColor],
          stops: [0, 100],
          colorStops: [
            { offset: 0, color: heatingColor, opacity: 0.8 },
            { offset: 100, color: coolingColor, opacity: 0.3 },
          ],
        },
      },
      markers: {
        size: 0,
        hover: { size: 6 },
      },
      xaxis: {
        type: 'numeric',
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

  protected async firstUpdated() {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await this.updateComplete;
    this._initChart();
    this._setupResizeObserver();
  }

  private _initChart() {
    if (this._chartInitialized) return;
    this._chart = new ApexCharts(this._chartEl, this._buildChartOptions());
    this._chart.render();
    this._chartInitialized = true;
  }

  private _setupResizeObserver() {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    this._resizeObserver = new ResizeObserver(() => {
      if (!this._chartInitialized || !this._chart) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });
    this._resizeObserver.observe(this._chartWrapper);
  }

  private _updateChartSeries(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    this._chart.updateSeries(opts.series, false);
    // Annotations are part of options, not series - must update separately
    this._chart.updateOptions({ annotations: opts.annotations }, false, false);
  }

  private _updateChartOptions(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    // false, false = no redraw, no animation (prevents perceived lag)
    this._chart.updateOptions(opts, false, false);
  }

  private _structuralParamsChanged(prev: CurveCardConfig | undefined, next: CurveCardConfig): boolean {
    if (!prev) return true;
    const keys: (keyof CurveStructuralParams)[] = ['hc', 'n', 'shift', 'min_flow', 'max_flow', 't_out_min', 't_out_max'];
    return keys.some(key => prev[key] !== next[key]);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._chart?.destroy();
    this._chart = undefined;
    this._chartInitialized = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Reinitialize chart if destroyed (e.g., after exiting HA edit mode)
    if (this._config && this.hass && !this._chartInitialized) {
      requestAnimationFrame(async () => {
        await this.updateComplete;
        this._initChart();
        this._setupResizeObserver();
      });
    }
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
          margin-bottom: 8px;
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
        .chart-wrapper { flex: 1; min-height: 0; }
        #chart { width: 100%; height: 100%; }
        .footer {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: var(--font-size-sm);
          color: var(--secondary-text-color);
          margin-top: 4px;
          flex-shrink: 0;
        }
        .footer strong { color: var(--primary-text-color); }
        .footer .flow-temp { color: var(--gradient-hot); }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const adjustingDir = this._adjustingDirection;
    const title = this._config.title ?? this._entityAttr<string>(this._config.climate_entity, 'friendly_name') ?? localize('curve_card.default_title');

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
          <span><strong>${this._formatTemp(this._tOutdoor, this._tOutdoorUnit)}</strong> ${localize('common.outdoor').toLowerCase()}</span>
          <span>→</span>
          <span><strong class="flow-temp">${this._formatTemp(this._flowTemp, this._flowTempUnit)}</strong> ${localize('common.flow').toLowerCase()}</span>
        </div>
      </ha-card>
    `;
  }
}

import { html, css, nothing } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import ApexCharts from 'apexcharts';
import type { CurveCardConfig, LovelaceGridOptions, HomeAssistant } from '../../types';
import type { ClimateEntity } from '../../ha/data/climate';
import { EquithermBaseCard } from '../../utils/base-card';
import { tokens, cardBase, applyDarkMode } from '../../styles/tokens';
import { resolveRgbColor } from '../../utils/colors';
import { buildCurveSeries, flowAtOutdoor } from '../../utils/curve';
import setupCustomlocalize from '../../localize';
import '../../shared/action-badge';

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

@customElement('equitherm-curve-card')
export class EquithermCurveCard extends EquithermBaseCard<CurveCardConfig> {
  private _prevDarkMode?: boolean;
  @query('#chart') private _chartEl!: HTMLElement;
  @query('.chart-wrapper') private _chartWrapper!: HTMLElement;
  private _chart?: ApexCharts;
  private _resizeObserver?: ResizeObserver;
  private _chartInitialized = false;

  protected _watchedEntities(): (string | undefined)[] {
    return [
      this._config?.climate_entity,
      this._config?.outdoor_entity,
      this._config?.curve_output_entity,
      this._config?.flow_entity,
      this._config?.rate_limiting_entity,
    ];
  }

  // Override hass setter to track dark mode changes for chart theme
  set hass(hass: HomeAssistant) {
    const isDark = applyDarkMode(this, hass);
    const darkChanged = this._prevDarkMode !== undefined && this._prevDarkMode !== isDark;
    this._prevDarkMode = isDark;

    const oldHass = this._hass;
    super.hass = hass;

    // Additional chart update for theme changes
    if (darkChanged && this._chart && oldHass === this._hass) {
      this._updateChartOptions();
    }
  }
  get hass() { return super.hass; }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 5, min_rows: 5 };
  }

  static getStubConfig(): CurveCardConfig {
    return {
      type: 'custom:equitherm-curve-card',
      climate_entity: 'climate.equitherm',
      outdoor_entity: 'sensor.outdoor_temperature',
      curve_output_entity: 'sensor.heating_curve_output',
      flow_entity: 'sensor.flow_setpoint',
      hc: 1.2,
      n: 1.25,
      shift: 0,
      min_flow: 25,
      max_flow: 70,
      t_out_min: -20,
      t_out_max: 20,
    };
  }

  static async getConfigElement() {
    await import('./curve-card-editor');
    return document.createElement('equitherm-curve-card-editor');
  }

  setConfig(config: unknown) {
    const cfg = config as CurveCardConfig;
    if (!cfg.climate_entity) throw new Error('climate_entity is required');
    if (!cfg.outdoor_entity) throw new Error('outdoor_entity is required');
    if (!cfg.flow_entity) throw new Error('flow_entity is required');
    // Config is frozen since HA 0.106 — must clone before storing
    this._config = { ...cfg };
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

  private _buildChartOptions() {
    const localize = setupCustomlocalize(this._hass);
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
      theme: { mode: this._prevDarkMode ? 'dark' : 'light' },
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

  protected updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('_config') && this._chart) {
      const prevConfig = changedProps.get('_config') as CurveCardConfig | undefined;
      if (this._structuralParamsChanged(prevConfig, this._config)) {
        this._updateChartOptions();
      } else {
        this._updateChartSeries();
      }
    }
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
    if (this._config && this._hass && !this._chartInitialized) {
      requestAnimationFrame(async () => {
        await this.updateComplete;
        this._initChart();
        this._setupResizeObserver();
      });
    }
  }

  static styles = [
    tokens,
    cardBase,
    css`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .title {
        font-size: var(--eq-font-size-medium);
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .chart-wrapper { flex: 1; min-height: 0; }
      #chart { width: 100%; height: 100%; }
      .footer {
        display: flex;
        justify-content: center;
        gap: 8px;
        font-size: var(--eq-font-size-small);
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      .footer strong { color: var(--primary-text-color); }
      .footer .flow-temp { color: var(--eq-gradient-hot); }
    `,
  ];

  render() {
    if (!this._config || !this._hass) return nothing;
    const localize = setupCustomlocalize(this._hass);
    const action = this._climate?.attributes.hvac_action ?? 'off';
    const title = this._config.title ?? this._entityAttr<string>(this._config.climate_entity, 'friendly_name') ?? localize('curve_card.default_title');

    return html`
      <ha-card>
        <div class="header">
          <span class="title">${title}</span>
          <eq-action-badge .action=${action}></eq-action-badge>
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

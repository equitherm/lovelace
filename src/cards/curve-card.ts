import { LitElement, html, css, nothing } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import ApexCharts from 'apexcharts';
import type { HomeAssistant, CurveCardConfig, LovelaceGridOptions, ClimateEntityAttributes } from '../types';
import { tokens, cardBase, applyDarkMode } from '../styles/tokens';
import { buildCurveSeries, flowAtOutdoor } from '../utils/curve';
import { entitiesChanged } from '../utils/hass';
import { validateCurveCardConfig } from '../config/curve-card-config';
import '../components/action-badge';

/** Curve parameters that affect the curve shape (require full rebuild) */
type CurveStructuralParams = Pick<CurveCardConfig,
  | 'hc' | 'n' | 'shift' | 'min_flow' | 'max_flow' | 't_out_min' | 't_out_max'
>;

/** Series data point for ApexCharts */
interface ChartDataPoint {
  x: number;
  y: number;
}

@customElement('equitherm-curve-card')
export class EquithermCurveCard extends LitElement {
  @state() private _hass?: HomeAssistant;
  get hass() { return this._hass!; }
  set hass(hass: HomeAssistant) {
    // Apply dark mode based on HA theme
    applyDarkMode(this, hass);
    // Chart update is expensive — only trigger when our watched entities change
    const watched = [
      this._config?.climate_entity,
      this._config?.outdoor_entity,
      this._config?.curve_output_entity,
      this._config?.flow_entity,
      this._config?.rate_limiting_entity,
    ];
    if (entitiesChanged(this._hass, hass, watched)) {
      this._hass = hass;
      if (this._chart) this._updateChartSeries();
    }
  }
  @state() private _config!: CurveCardConfig;
  @query('#chart') private _chartEl!: HTMLElement;
  private _chart?: ApexCharts;
  private _resizeObserver?: ResizeObserver;
  private _chartInitialized = false;

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 3, min_rows: 2 };
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
    await import('../editors/curve-card-editor');
    return document.createElement('equitherm-curve-card-editor');
  }

  setConfig(config: unknown) {
    validateCurveCardConfig(config);
    this._config = { ...config };
  }

  getCardSize() { return 3; }

  private get _climate(): { state: string; attributes: Partial<ClimateEntityAttributes> } | undefined {
    return this.hass?.states[this._config.climate_entity] as { state: string; attributes: Partial<ClimateEntityAttributes> } | undefined;
  }

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _tOutdoor(): number {
    const s = this.hass?.states[this._config.outdoor_entity];
    return s ? parseFloat(s.state) : 0;
  }

  private get _flowTemp(): number {
    const s = this.hass?.states[this._config.flow_entity];
    return s ? parseFloat(s.state) : this._config.min_flow;
  }

  private get _rateLimitingActive(): boolean {
    if (!this._config.rate_limiting_entity) return false;
    return this.hass?.states[this._config.rate_limiting_entity]?.state === 'on';
  }

  /** Format temperature using HA's unit system */
  private _formatTemp(value: number | undefined, entityUnit?: string): string {
    if (value == null || isNaN(value)) return '—';
    // Get HA's configured temperature unit (°C or °F)
    const haUnit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const sourceUnit = entityUnit ?? '°C';

    let displayValue = value;

    // Convert if units differ
    if (sourceUnit === '°C' && haUnit === '°F') {
      displayValue = value * 9 / 5 + 32;
    } else if (sourceUnit === '°F' && haUnit === '°C') {
      displayValue = (value - 32) * 5 / 9;
    }

    return `${displayValue.toFixed(1)}${haUnit}`;
  }

  private _buildChartOptions() {
    const cfg = this._config;
    const curveParams = {
      tTarget: this._tTarget,
      hc: cfg.hc,
      n: cfg.n,
      shift: cfg.shift,
      minFlow: cfg.min_flow,
      maxFlow: cfg.max_flow,
    };

    const curveSeries = buildCurveSeries(curveParams, cfg.t_out_min, cfg.t_out_max);
    const currentFlow = flowAtOutdoor(curveParams, this._tOutdoor);

    // Build scatter data based on rate-limiting state
    let scatterData: ChartDataPoint[];
    if (this._rateLimitingActive) {
      // Dual dots: solid (curve output) + hollow (rate-limited flow)
      const curveOutput = this.hass?.states[this._config.curve_output_entity];
      const curveOutputValue = curveOutput ? parseFloat(curveOutput.state) : currentFlow;
      scatterData = [
        { x: this._tOutdoor, y: curveOutputValue },  // Target (solid)
        { x: this._tOutdoor, y: this._flowTemp },    // Actual (hollow)
      ];
    } else {
      // Single dot at current position
      scatterData = [{ x: this._tOutdoor, y: currentFlow }];
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
      theme: { mode: 'dark' },
      series: [
        {
          name: 'Flow Temp',
          data: curveSeries.map((p): ChartDataPoint => ({ x: p.x, y: p.y })),
        },
        {
          name: 'Current',
          type: 'scatter',
          data: scatterData,
        },
      ],
      stroke: { curve: 'smooth', width: [2, 0] },
      fill: {
        type: ['gradient', 'solid'],
        gradient: {
          type: 'vertical',
          gradientToColors: ['#3b82f6'],
          stops: [0, 100],
          colorStops: [
            { offset: 0, color: '#f97316', opacity: 0.8 },
            { offset: 100, color: '#3b82f6', opacity: 0.3 },
          ],
        },
      },
      markers: {
        size: [0, this._rateLimitingActive ? [8, 6] : 10],
        colors: ['transparent', this._rateLimitingActive ? ['#f97316', '#f97316'] : '#f97316'],
        strokeColors: ['transparent', this._rateLimitingActive ? ['transparent', '#ffffff'] : '#ffffff'],
        strokeWidth: 2,
        hover: { size: [0, 12] },
      },
      xaxis: {
        type: 'numeric',
        title: { text: '°C outdoor', style: { color: 'var(--secondary-text-color)' } },
        labels: { style: { colors: 'var(--secondary-text-color)' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: '°C flow', style: { color: 'var(--secondary-text-color)' } },
        labels: { style: { colors: 'var(--secondary-text-color)' } },
        min: cfg.min_flow - 5,
        max: cfg.max_flow + 5,
      },
      grid: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: {
        x: { formatter: (v: number) => `${v}°C outdoor` },
        y: { formatter: (v: number) => `${v.toFixed(1)}°C flow` },
      },
    };
  }

  protected async firstUpdated() {
    // Wait for Lit to finish rendering (ensures container has dimensions)
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await this.updateComplete;
    this._initChart();
    // Set up ResizeObserver to handle container size changes
    let resizeTimeout: ReturnType<typeof setTimeout>;
    this._resizeObserver = new ResizeObserver(() => {
      if (!this._chartInitialized || !this._chart) return;
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Trigger ApexCharts internal resize handler
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });
    // Observe the chart container for size changes
    this._resizeObserver.observe(this._chartEl);
  }

  private _initChart() {
    if (this._chartInitialized) return;
    this._chart = new ApexCharts(this._chartEl, this._buildChartOptions());
    this._chart.render();
    this._chartInitialized = true;
  }

  /** Update series data when entity states change (fast, no animation) */
  private _updateChartSeries(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    // Second arg = false = no animation (prevents perceived lag)
    this._chart.updateSeries(opts.series, false);
  }

  /** Full update: options + series, no animation, no recreate */
  private _updateChartOptions(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    // updateOptions instead of destroy/recreate - false, false = no redraw, no animation
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
        // Structural change (axes, range) - use updateOptions instead of destroy
        this._updateChartOptions();
      } else {
        // Just entity values changed - fast series update
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
    // Reinitialize chart if it was destroyed (e.g., after exiting edit mode)
    if (this._config && this.hass && !this._chartInitialized) {
      requestAnimationFrame(async () => {
        await this.updateComplete;
        this._initChart();
        // Re-setup ResizeObserver
        let resizeTimeout: ReturnType<typeof setTimeout>;
        this._resizeObserver = new ResizeObserver(() => {
          if (!this._chartInitialized || !this._chart) return;
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        });
        this._resizeObserver.observe(this._chartEl);
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
      #chart { flex: 1; min-height: 0; }
      .footer {
        display: flex;
        justify-content: center;
        gap: 8px;
        font-size: var(--eq-font-size-small);
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      .footer strong { color: var(--primary-text-color); }
    `,
  ];

  render() {
    if (!this._config || !this.hass) return nothing;
    const action = this._climate?.attributes.hvac_action ?? 'off';
    const title = this._config.title ?? this.hass.states[this._config.climate_entity]?.attributes.friendly_name ?? 'Heating Curve';

    return html`
      <ha-card>
        <div class="header">
          <span class="title">${title}</span>
          <eq-action-badge .action=${action}></eq-action-badge>
        </div>
        <div id="chart"></div>
        <div class="footer">
          <span><strong>${this._formatTemp(this._tOutdoor)}</strong> outdoor</span>
          <span>→</span>
          <span><strong>${this._formatTemp(this._flowTemp)}</strong> flow</span>
        </div>
      </ha-card>
    `;
  }
}

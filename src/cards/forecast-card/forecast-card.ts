import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type ApexCharts from 'apexcharts';
import type { ForecastCardConfig } from './forecast-card-config';
import type { HomeAssistant } from '../../ha';
import type { ForecastPoint, ForecastCurveConfig } from '../../utils/forecast';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { EquithermChartCard } from '../../utils/base';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { FORECAST_CARD_NAME, FORECAST_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS } from './const';
import { validateForecastCardConfig } from './forecast-card-config';
import { resolveRgbColor, normalizeHvacAction, getHvacActionColor, getHvacBadgeProps } from '../../utils/hvac-colors';
import { buildForecastSeries, peakDemand } from '../../utils/forecast';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';
import '../../shared/shape-icon';

registerCustomCard({
  type: FORECAST_CARD_NAME,
  name: 'Equitherm Forecast',
  description: 'Heating forecast based on weather predictions',
});

/** Series data point for ApexCharts (datetime category axis) */
interface FlowDataPoint {
  x: string;
  y: number;
}

interface OutdoorDataPoint {
  x: string;
  y: number;
}

@customElement(FORECAST_CARD_NAME)
export class EquithermForecastCard extends EquithermChartCard<ForecastCardConfig> {
  @state() private _forecastPoints: ForecastPoint[] = [];
  private _unsub?: () => void;

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);

    // Subscribe to forecast on config change or first hass
    if (changedProps.has('_config') || (!this._unsub && changedProps.has('hass'))) {
      this._subscribeForecast();
    }

    if (!this._chart) return;

    // Handle hass changes (entity states + dark mode)
    if (changedProps.has('hass') && this.hass) {
      const isDark = this._isDark;
      const darkChanged = this._prevDarkMode !== undefined && this._prevDarkMode !== isDark;
      this._prevDarkMode = isDark;

      if (darkChanged) {
        this._updateChartOptions();
      }
      // Forecast data arrives via subscription callback, no manual re-fetch needed
    }
  }

  static async getStubConfig(hass: HomeAssistant): Promise<ForecastCardConfig> {
    const states = hass.states;
    const entityIds = Object.keys(states);

    // Find climate entity
    const climateEntity = entityIds.find(e =>
      CLIMATE_ENTITY_DOMAINS.includes(computeDomain(e))
    );

    // Find weather entity
    const weatherEntity = entityIds.find(e =>
      computeDomain(e) === 'weather'
    );

    // Find temperature sensors
    const tempSensors = entityIds.filter(e => {
      const state = states[e];
      return SENSOR_ENTITY_DOMAINS.includes(computeDomain(e))
        && state?.attributes?.device_class === 'temperature';
    });

    // Prefer flow/supply in name for flow temp
    const flowEntity = tempSensors.find(e =>
      e.includes('flow') || e.includes('supply') || e.includes('forward')
    ) ?? tempSensors[0];

    return {
      type: 'custom:equitherm-forecast-card',
      weather_entity: weatherEntity ?? '',
      climate_entity: climateEntity ?? '',
      flow_entity: flowEntity ?? '',
      hours: 24,
      hc: 1.2,
      n: 1.25,
      shift: 0,
      min_flow: 25,
      max_flow: 70,
    } as ForecastCardConfig;
  }

  static async getConfigElement() {
    await import('./forecast-card-editor');
    return document.createElement(FORECAST_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateForecastCardConfig(config);
  }

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _flowTemp(): number {
    const s = this._entityState(this._config.flow_entity);
    return s ? parseFloat(s.state) : this._config.min_flow;
  }

  private get _flowTempUnit(): string | undefined {
    return this._entityAttr<string>(this._config.flow_entity, 'unit_of_measurement');
  }

  /** Build the curve params from config, optionally reading from live entities */
  private get _curveParams(): ForecastCurveConfig {
    const cfg = this._config;
    return {
      tTarget: this._tTarget,
      hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
      n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
      shift: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.shift_entity, cfg.shift) : cfg.shift,
      minFlow: cfg.min_flow,
      maxFlow: cfg.max_flow,
    };
  }

  /** Process forecast data and update chart */
  private _processForecast(forecast: { datetime: string; temperature: number }[]): void {
    const points = buildForecastSeries(forecast, this._curveParams, this._config.hours);
    this._forecastPoints = points;

    if (this._chartInitialized && this._chart) {
      this._updateChartWithData(points);
    }
  }

  /** Unsubscribe from forecast updates */
  private _unsubscribeForecast(): void {
    if (this._unsub) {
      this._unsub();
      this._unsub = undefined;
    }
  }

  /** Subscribe to weather forecast via HA WebSocket (real-time updates) */
  private async _subscribeForecast(): Promise<void> {
    this._unsubscribeForecast();

    if (!this.isConnected || !this.hass || !this._config?.weather_entity) return;

    try {
      const unsub = await (this.hass as any).connection.subscribeMessage(
        (event: { type: string; forecast: { datetime: string; temperature: number }[] | null }) => {
          if (event.forecast) {
            this._processForecast(event.forecast);
          }
        },
        {
          type: 'weather/subscribe_forecast',
          forecast_type: 'hourly',
          entity_id: this._config.weather_entity,
        },
      );
      // Only store if still the active subscription (not replaced by a newer call)
      if (!this._unsub) {
        this._unsub = unsub;
      } else {
        unsub(); // Another subscription was already set, discard this one
      }
    } catch (err) {
      console.warn('Failed to subscribe to weather forecast:', err);
    }
  }

  protected _buildChartOptions(points: ForecastPoint[] = []): ApexCharts.ApexOptions {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    // Resolve colors at runtime from CSS variables
    const style = getComputedStyle(this);
    const gradientStart = style.getPropertyValue('--curve-gradient-start').trim();
    const gradientEnd = style.getPropertyValue('--curve-gradient-end').trim();
    const heatingColor = gradientStart ? `rgb(${gradientStart})` : resolveRgbColor(this, 'heating');
    const coolingColor = gradientEnd ? `rgb(${gradientEnd})` : resolveRgbColor(this, 'cooling');

    // Build dual series data
    const flowData: FlowDataPoint[] = points.map((p) => ({ x: p.datetime, y: p.tFlow }));
    const outdoorData: OutdoorDataPoint[] = points.map((p) => ({ x: p.datetime, y: p.tOutdoor }));

    // Peak demand annotation
    const peak = peakDemand(points);
    const annotations: Record<string, unknown> = {};
    if (peak) {
      (annotations as any).points = [{
        x: peak.datetime,
        y: peak.tFlow,
        marker: { size: 6, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
        label: {
          text: `${localize('forecast_card.peak')}: ${peak.tFlow.toFixed(1)}°`,
          style: {
            color: '#ffffff',
            background: heatingColor,
            fontSize: '11px',
            fontWeight: 600,
            padding: { left: 6, right: 6, top: 2, bottom: 2 },
          },
        },
      }];
    }

    return {
      chart: {
        type: 'area' as const,
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
          name: localize('forecast_card.flow_temp'),
          data: flowData,
        },
        {
          name: localize('forecast_card.outdoor_temp'),
          data: outdoorData,
        },
      ],
      annotations,
      stroke: {
        curve: 'straight' as const,
        width: [2, 1.5],
        dashArray: [0, 4],
      },
      colors: [heatingColor, coolingColor],
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 0.3,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      markers: {
        size: 0,
        hover: { size: 4 },
      },
      xaxis: {
        type: 'datetime' as const,
        title: {
          text: '',
          style: { color: 'var(--secondary-text-color)', fontWeight: 400 },
        },
        labels: {
          style: { colors: 'var(--secondary-text-color)', fontWeight: 400 },
          datetimeUTC: false,
          format: 'HH:mm',
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: [
        {
          title: {
            text: localize('forecast_card.flow_temp'),
            style: { color: 'var(--secondary-text-color)', fontWeight: 400 },
          },
          labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400 } },
          min: cfg.min_flow - 5,
          max: cfg.max_flow + 5,
        },
        {
          opposite: true,
          title: {
            text: localize('forecast_card.outdoor_temp'),
            style: { color: 'var(--secondary-text-color)', fontWeight: 400 },
          },
          labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400 } },
        },
      ],
      grid: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: {
        theme: this._isDark ? 'dark' : 'light',
        x: { format: 'HH:mm' },
        y: {
          formatter: (v: number) => {
            return this._formatTemp(v, this.hass?.config?.unit_system?.temperature);
          },
        },
      },
    };
  }


  private _updateChartWithData(points: ForecastPoint[]): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions(points);
    this._chart.updateOptions(opts, false, false);
  }

  protected _updateChartOptions(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions(this._forecastPoints);
    this._chart.updateOptions(opts, false, false);
  }

  protected override _onChartDisconnecting(): void {
    this._unsubscribeForecast();
  }

  protected override _onChartReconnected(): void {
    this._subscribeForecast();
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
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name, this.hass) || localize('forecast_card.default_title')
      : localize('forecast_card.default_title');

    // Build icon styles from action color (Mushroom pattern)
    const color = getHvacActionColor(hvacAction);
    const iconStyles = styleMap({
      '--icon-color': `rgb(${color})`,
      '--shape-color': `rgba(${color}, 0.2)`,
    });

    const hvacBadge = getHvacBadgeProps(localize, hvacAction);

    return html`
      <ha-card>
        <div class="header">
          <eq-shape-icon
            .icon=${'mdi:weather-partly-cloudy'}
            .size=${42}
            style=${iconStyles}
            @click=${() => this._openMoreInfo(this._config.weather_entity)}
          ></eq-shape-icon>
          <div class="header-info">
            <span class="title">${title}</span>
            ${this._climate?.attributes.temperature != null ? html`
              <span class="state">· ${this._formatTemp(this._climate.attributes.temperature, this.hass?.config?.unit_system?.temperature)}</span>
            ` : nothing}
          </div>
          <div class="badges">
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
          <div class="footer-metric" @click=${() => this._openMoreInfo(this._config.weather_entity)}>
            <span class="footer-value">${this._formatTemp(this._forecastPoints[0]?.tOutdoor)}</span>
            <span class="footer-label">${localize('forecast_card.outdoor_temp')}</span>
          </div>
          <span class="footer-sep" aria-hidden="true">·</span>
          <div class="footer-metric" @click=${() => this._openMoreInfo(this._config.flow_entity)}>
            <span class="footer-value flow">${this._formatTemp(this._flowTemp, this._flowTempUnit)}</span>
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

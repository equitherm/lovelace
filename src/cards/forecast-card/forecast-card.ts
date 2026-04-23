import { html, css, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { ForecastCardConfig } from './forecast-card-config';
import type { HomeAssistant } from '../../ha';
import type { ForecastPoint, ForecastCurveConfig } from '../../utils/forecast';
import { EquithermEChartCard, type EChartConfig, headerStyles } from '../../utils/base';
import { cardStyle, paramsFooterStyles, kpiFooterStyles, tunableFooterStyles } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { FORECAST_CARD_NAME, FORECAST_CARD_EDITOR_NAME } from './const';
import { findClimateEntity, findWeatherEntity, findFlowEntity } from '../../utils/stub-config';
import { validateForecastCardConfig } from './forecast-card-config';
import { resolveRgbColor } from '../../utils/hvac-colors';
import { buildForecastSeries, peakDemand } from '../../utils/forecast';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';
import '../../shared/eq-manual-overlay';
import '../../shared/eq-param-bar';
import '../../shared/eq-tuning-dialog';
import { buildTuningDialogConfig } from '../../utils/tuning-dialog-config';

registerCustomCard({
  type: FORECAST_CARD_NAME,
  name: 'Equitherm Forecast',
  description: 'Heating forecast based on weather predictions',
});

@customElement(FORECAST_CARD_NAME)
export class EquithermForecastCard extends EquithermEChartCard<ForecastCardConfig> {
  @state() private _forecastPoints: ForecastPoint[] = [];
  private _unsub?: () => void;

  protected override updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);

    // Subscribe to forecast on config change or first hass
    if (changedProps.has('_config') || (!this._unsub && changedProps.has('hass'))) {
      this._subscribeForecast();
    }

    if (changedProps.has('_forecastPoints')) {
      this._updateChartConfig();
    }
  }

  static async getStubConfig(hass: HomeAssistant): Promise<ForecastCardConfig> {
    return {
      type: 'custom:equitherm-forecast-card',
      weather_entity: findWeatherEntity(hass) ?? '',
      climate_entity: findClimateEntity(hass) ?? '',
      flow_entity: findFlowEntity(hass) ?? '',
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
    this._dialogConfig = buildTuningDialogConfig(this._config);
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.weather_entity;
  }

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _flowTemp(): number {
    const s = this._entityState(this._config.flow_entity);
    if (s) {
      const val = parseFloat(s.state);
      if (!isNaN(val)) return this._fromDisplayTemp(val);
    }
    return this._config.min_flow; // config values always °C
  }

  /** Current outdoor temp from dedicated sensor (Kalman etc.) or weather entity (always °C) */
  private get _outdoorTemp(): number {
    if (this._config.outdoor_entity) {
      const s = this._entityState(this._config.outdoor_entity);
      if (s) {
        const val = parseFloat(s.state);
        if (!isNaN(val)) return this._fromDisplayTemp(val);
      }
    }
    const weather = this._entityState(this._config.weather_entity);
    if (weather) {
      const val = parseFloat(weather.attributes.temperature);
      if (!isNaN(val)) return this._fromDisplayTemp(val);
    }
    return NaN;
  }

  /** Override: outdoor formatted with weather entity fallback */
  protected override get _outdoorTempFormatted(): string {
    const temp = this._outdoorTemp;
    return isNaN(temp) ? '—' : this._formatCalcTemp(temp);
  }

  /** Whether current outdoor meets or exceeds room setpoint */
  protected override get _isWWSD(): boolean {
    const tTarget = this._climate?.attributes.temperature;
    if (tTarget == null) return false;
    return !isNaN(this._outdoorTemp) && this._outdoorTemp >= tTarget;
  }

  protected override _wwsdDescription(): string {
    const localize = setupCustomLocalize(this.hass);
    const tTarget = this._climate?.attributes.temperature;
    if (!isNaN(this._outdoorTemp) && tTarget != null) {
      return `${localize('common.outdoor')} ${this._formatCalcTemp(this._outdoorTemp)} ≥ ${this._formatCalcTemp(tTarget)}`;
    }
    return localize('common.wwsd_label');
  }

  /** Build the curve params from config, optionally reading from live entities */
  private get _curveParams(): ForecastCurveConfig {
    const cfg = this._config;
    return {
      tTarget: this._tTarget,
      hc: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.hc_entity, cfg.hc) : cfg.hc,
      n: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.n_entity, cfg.n) : cfg.n,
      shift: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.shift_entity, cfg.shift) : cfg.shift,
      minFlow: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow,
      maxFlow: cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow,
    };
  }

  /** Process forecast data and update chart (converts display units to °C for computation) */
  private _processForecast(forecast: { datetime: string; temperature: number }[]): void {
    const celsiusForecast = forecast.map(f => ({
      datetime: f.datetime,
      temperature: this._fromDisplayTemp(f.temperature),
    }));
    this._forecastPoints = buildForecastSeries(celsiusForecast, this._curveParams, this._config.hours);
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

  protected override _buildEChartOptions(): EChartConfig {
    const points = this._forecastPoints;
    const localize = setupCustomLocalize(this.hass);
    const heatingColor = resolveRgbColor(this, 'heating');
    const coolingColor = resolveRgbColor(this, 'cooling');

    const peak = peakDemand(points);

    // Peak marker data (markPoint workaround)
    const peakData = peak ? [{
      value: [new Date(peak.datetime).getTime(), this._toDisplayTemp(peak.tFlow)] as [number, number],
      symbolSize: 6,
      itemStyle: { color: heatingColor, borderColor: '#fff', borderWidth: 2 },
      label: {
        show: true,
        formatter: `${localize('forecast_card.peak')}: ${this._toDisplayTemp(peak.tFlow).toFixed(1)}${this.hass?.config?.unit_system?.temperature ?? '°C'}`,
        color: '#fff',
        backgroundColor: heatingColor,
        fontSize: 11,
        fontWeight: 600,
        padding: [2, 6] as [number, number],
        borderRadius: 3,
        position: 'top' as const,
      },
    }] : [];

    return {
      options: {
        animation: false,
        xAxis: {
          type: 'time' as const,
          axisLabel: { fontSize: 10, hideOverlap: true, formatter: (value: number) => this._formatChartTime(value) },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: [
          {
            type: 'value' as const,
            axisLabel: { fontSize: 10 },
            min: this._toDisplayTemp((this._curveParams.minFlow ?? 20) - 5),
            max: this._toDisplayTemp((this._curveParams.maxFlow ?? 70) + 5),
          },
          {
            type: 'value' as const,
            axisLabel: { fontSize: 10 },
          },
        ],
        grid: { top: 15, right: 15, bottom: 25, left: 35 },
        tooltip: {
          trigger: 'axis' as const,
          backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
          borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
          borderWidth: 1,
          padding: [8, 12],
          textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
          formatter: (params: any) => {
            const time = this._formatChartTime(params[0].value[0] as number);
            const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
            let out = `<span style="opacity:0.6">${time}</span><br/>`;
            for (const p of params) {
              if (p.seriesName === 'peak') continue;
              const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${p.color};"></span>`;
              out += `${marker}${p.seriesName}: <b>${p.value[1].toFixed(1)}${unit}</b><br/>`;
            }
            return out;
          },
        },
        legend: { show: false },
      },
      data: [
        {
          type: 'line' as const,
          name: localize('forecast_card.flow_temp'),
          data: points.map(p => [new Date(p.datetime).getTime(), this._toDisplayTemp(p.tFlow)]),
          showSymbol: false,
          lineStyle: { width: 2 },
          itemStyle: { color: heatingColor },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: `rgba(${heatingColor.replace('rgb(', '').replace(')', '')}, 0.4)` },
                { offset: 1, color: `rgba(${heatingColor.replace('rgb(', '').replace(')', '')}, 0.05)` },
              ],
            },
          },
        },
        {
          type: 'line' as const,
          name: localize('forecast_card.outdoor_temp'),
          data: points.map(p => [new Date(p.datetime).getTime(), this._toDisplayTemp(p.tOutdoor)]),
          yAxisIndex: 1,
          showSymbol: false,
          lineStyle: { width: 1.5, type: 'dashed' as const },
          itemStyle: { color: coolingColor },
        },
        // Peak marker (markPoint workaround)
        ...(peak ? [{
          type: 'line' as const,
          name: 'peak',
          data: peakData,
          showSymbol: true,
          symbol: 'circle',
          lineStyle: { width: 0 },
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
      headerStyles,
      paramsFooterStyles,
      kpiFooterStyles,
      tunableFooterStyles,
      css`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .chart-wrapper {
          --chart-max-height: none;
        }
        .chart-wrapper ha-chart-base {
          height: 100%;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const title = this._computeCardTitle('forecast_card.default_title');

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:weather-partly-cloudy',
          clickEntity: this._config.weather_entity,
          title,
        })}
        ${this._renderChart()}
        ${this._renderKpiFooter({
          outdoorClickEntity: this._config.outdoor_entity ?? this._config.weather_entity,
        })}
        ${this._config.curve_from_entities
          ? this._renderTunableParamsFooter(
              {
                hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: this._config.hc } : undefined,
                n: this._config.n_entity ? { entity: this._config.n_entity, fallback: this._config.n } : undefined,
                shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: this._config.shift } : undefined,
              },
              () => { this._showTuningDialog = true; },
            )
          : nothing}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showTuningDialog ? html`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : nothing}
    `;
  }

}

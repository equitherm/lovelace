import { html, nothing } from 'lit';
import { query } from 'lit/decorators.js';
import ApexCharts from 'apexcharts';
import { EquithermBaseCard, type EquithermCardConfig } from './base-card';
import { computeDarkMode } from './base-element';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';

/**
 * Base class for equitherm cards with ApexCharts.
 * Extends EquithermBaseCard with chart lifecycle management:
 * init, resize, connect/disconnect, and destroy.
 *
 * Cards must override _buildChartOptions() to supply chart configuration.
 * Optionally override _onChartReconnected() / _onChartDisconnecting()
 * for data source lifecycle (e.g., WebSocket subscriptions).
 */
export abstract class EquithermChartCard<TConfig extends EquithermCardConfig> extends EquithermBaseCard<TConfig> {
  @query('#chart') protected _chartEl!: HTMLElement;
  @query('.chart-wrapper') protected _chartWrapper!: HTMLElement;

  protected _chart: ApexCharts | null = null;
  protected _chartInitialized = false;
  protected _resizeObserver: ResizeObserver | null = null;
  protected _prevDarkMode = false;

  // --- Card sizing (shared by all chart cards) ---

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 5, min_rows: 5 };
  }

  public override getCardSize(): number {
    return 3;
  }

  /** Whether HA is in dark mode */
  protected get _isDark(): boolean {
    return computeDarkMode(this.hass);
  }

  // --- Lifecycle ---

  protected async firstUpdated(): Promise<void> {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await this.updateComplete;
    this._initChart();
    this._setupResizeObserver();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Reinitialize chart if destroyed (e.g., after exiting HA edit mode)
    if (this._config && this.hass && !this._chartInitialized) {
      requestAnimationFrame(async () => {
        await this.updateComplete;
        this._initChart();
        this._setupResizeObserver();
        this._onChartReconnected();
      });
    }
  }

  public disconnectedCallback(): void {
    this._onChartDisconnecting();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._chart?.destroy();
    this._chart = null;
    this._chartInitialized = false;
    super.disconnectedCallback();
  }

  // --- Chart management ---

  protected _setupResizeObserver(): void {
    this._resizeObserver?.disconnect();
    if (!this._chartWrapper) return;
    // Inlined debounced resize observer (was src/utils/resize.ts)
    let timeout: ReturnType<typeof setTimeout>;
    this._resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    });
    this._resizeObserver.observe(this._chartWrapper);
  }

  protected _updateChartOptions(): void {
    if (!this._chart) return;
    this._chart.updateOptions(this._buildChartOptions(), false, false);
  }

  /** Build ApexCharts options. Cards must override this method. */
  protected _buildChartOptions(): ApexCharts.ApexOptions {
    return {};
  }

  protected _initChart(): void {
    if (this._chartInitialized || !this._chartEl) return;
    this._chart = new ApexCharts(this._chartEl, this._buildChartOptions());
    this._chart.render();
    this._chartInitialized = true;
  }

  /** Hook called after chart is reconnected (e.g., HA edit mode). */
  protected _onChartReconnected(): void {}

  /** Hook called before chart is disconnected. */
  protected _onChartDisconnecting(): void {}

  /** Overlay shown over chart when manual preset bypasses the curve. */
  protected _renderManualOverlay(): typeof nothing | ReturnType<typeof html> {
    if (!this._isManualPreset) return nothing;
    return html`
      <div class="manual-overlay">
        <ha-icon icon="mdi:hand-back-right"></ha-icon>
        <span>Manual override</span>
      </div>
    `;
  }
}

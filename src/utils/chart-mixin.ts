import type { LitElement } from 'lit';
import { query } from 'lit/decorators.js';
import ApexCharts from 'apexcharts';
import { createChartResizeObserver } from './resize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = abstract new (...args: any[]) => T;

/**
 * Mixin that provides ApexCharts lifecycle management for Lovelace cards.
 *
 * Follows the HA frontend canonical mixin pattern. Cards using this mixin
 * must extend `EquithermBaseCard<TConfig>` (which provides `_config` and `hass`)
 * and override `_buildChartOptions()` to supply chart configuration.
 *
 * Usage:
 *   class MyCard extends chartMixin(EquithermBaseCard<MyConfig>) { ... }
 */
export function chartMixin<T extends Constructor<LitElement>>(superClass: T) {
  abstract class ChartMixinClass extends superClass {
    @query('#chart') protected declare _chartEl: HTMLElement;
    @query('.chart-wrapper') protected declare _chartWrapper: HTMLElement;

    protected _chart: ApexCharts | null = null;
    protected _chartInitialized = false;
    protected _resizeObserver: ResizeObserver | null = null;
    protected _prevDarkMode = false;

    // --- Lifecycle hooks ---

    protected async firstUpdated(): Promise<void> {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );
      await this.updateComplete;
      this._initChart();
      this._setupResizeObserver();
    }

    public connectedCallback(): void {
      super.connectedCallback();
      // Reinitialize chart if destroyed (e.g., after exiting HA edit mode).
      // _config and hass come from EquithermBaseCard when the mixin is applied.
      if (
        (this as any)._config &&
        (this as any).hass &&
        !this._chartInitialized
      ) {
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
      this._resizeObserver = createChartResizeObserver(this._chartWrapper);
    }

    protected _updateChartOptions(): void {
      if (!this._chart) return;
      const opts = this._buildChartOptions();
      // false, false = no redraw, no animation (prevents perceived lag)
      this._chart.updateOptions(opts, false, false);
    }

    /**
     * Build ApexCharts options. Cards must override this method.
     */
    protected _buildChartOptions(): ApexCharts.ApexOptions {
      return {};
    }

    protected _initChart(): void {
      if (this._chartInitialized) return;
      this._chart = new ApexCharts(this._chartEl, this._buildChartOptions());
      this._chart.render();
      this._chartInitialized = true;
    }

    /**
     * Hook called after chart is reconnected (e.g., HA edit mode).
     * Override in subclasses to resubscribe to data sources.
     */
    protected _onChartReconnected(): void {
      // No-op by default
    }

    /**
     * Hook called before chart is disconnected.
     * Override in subclasses to unsubscribe from data sources.
     */
    protected _onChartDisconnecting(): void {
      // No-op by default
    }
  }

  return ChartMixinClass as typeof ChartMixinClass & Pick<T, keyof T>;
}

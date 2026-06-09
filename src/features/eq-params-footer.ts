/**
 * eq-params-footer — self-contained params footer for equitherm cards.
 *
 * Renders HC, n, Shift, and Sigma parameter bars with optional
 * interactive tuning wrapper that emits a `eq-tuning-requested` event.
 *
 * Extracted from EquithermBaseCard to reduce base class size.
 */
import { LitElement, html, nothing, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from '../ha';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { EqParamsFooterConfig } from './eq-feature-types';
import { formatNumber } from '../ha';
import { computeDomain } from '../ha/common/entity/compute_domain';
import { isImperial, celsiusToDisplayDelta, displayDeltaToCelsius } from '../utils/temperature';
import '../shared/eq-param-bar';

@customElement('eq-params-footer')
export class EqParamsFooter extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;

  @property({ attribute: false }) config!: EqParamsFooterConfig;

  // ── Entity helpers ──

  private _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  private _entityAttr<T = unknown>(entityId: string | undefined, key: string): T | undefined {
    return this._entityState(entityId)?.attributes?.[key] as T | undefined;
  }

  private _resolveEntityNumber(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : val;
  }

  private _entityExists(entityId: string | undefined): boolean {
    return !!this._entityState(entityId);
  }

  // ── Temperature conversion for delta params ──

  private get _imperial(): boolean {
    return isImperial(this.hass);
  }

  private _toDisplayDelta(celsius: number): number {
    return celsiusToDisplayDelta(celsius, this._imperial);
  }

  private _fromDisplayDelta(display: number): number {
    return displayDeltaToCelsius(display, this._imperial);
  }

  // ── Formatting ──

  private _formatParamNum(value: number, decimals: number, options?: Intl.NumberFormatOptions): string {
    return formatNumber(value, this.hass?.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      ...options,
    });
  }

  // ── Entity range/step ──

  private _getEntityRange(entityId: string | undefined, defaultMin: number, defaultMax: number): [number, number] {
    if (!entityId) return [defaultMin, defaultMax];
    const min = this._entityAttr<number>(entityId, 'min');
    const max = this._entityAttr<number>(entityId, 'max');
    return [min ?? defaultMin, max ?? defaultMax];
  }

  private _getEntityStep(entityId: string | undefined, defaultStep: number): number {
    if (!entityId) return defaultStep;
    return this._entityAttr<number>(entityId, 'step') ?? defaultStep;
  }

  // ── Service calls ──

  private _onParamChanged = (e: CustomEvent<{ value: number }>): void => {
    const entityId = (e.target as HTMLElement).dataset.entityId;
    if (!entityId || !this.hass) return;
    this.hass.callService(computeDomain(entityId), 'set_value', {
      entity_id: entityId,
      value: e.detail.value,
    });
  };

  private _onDeltaParamChanged = (e: CustomEvent<{ value: number }>): void => {
    const entityId = (e.target as HTMLElement).dataset.entityId;
    if (!entityId || !this.hass) return;
    const celsiusValue = this._fromDisplayDelta(e.detail.value);
    this.hass.callService(computeDomain(entityId), 'set_value', {
      entity_id: entityId,
      value: celsiusValue,
    });
  };

  // ── Event dispatch ──

  private _dispatchTuningRequest = (): void => {
    this.dispatchEvent(new CustomEvent('eq-tuning-requested', {
      bubbles: true,
      composed: true,
    }));
  };

  // ── Param renderers ──

  private _renderDeltaParamItem(
    label: string,
    entityId: string | undefined,
    fallback: number,
    defaultRange: [number, number],
  ): TemplateResult {
    const rawValue = this._resolveEntityNumber(entityId, fallback);
    const [rawMin, rawMax] = this._getEntityRange(entityId, defaultRange[0], defaultRange[1]);
    const rawStep = this._getEntityStep(entityId, 1);
    const displayVal = this._toDisplayDelta(rawValue);
    const displayMin = this._toDisplayDelta(rawMin);
    const displayMax = this._toDisplayDelta(rawMax);
    const displayStep = this._toDisplayDelta(rawStep);
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const formatted = this._formatParamNum(displayVal, 1, { signDisplay: 'always' }) + unit;
    const valClass = displayVal > 0 ? 'positive' : displayVal < 0 ? 'negative' : '';
    const color = displayVal >= 0 ? 'var(--success-color, #4caf50)' : 'var(--error-color, #e53935)';
    const canInteract = !!entityId && !!this.hass && !this.config.interactive;

    return html`
      <div class="param-item">
        <span class="param-label">${label}</span>
        <span class="param-value ${valClass}">${formatted}</span>
        <eq-param-bar
          .min=${displayMin} .max=${displayMax} .step=${displayStep}
          .value=${displayVal} centered .color=${color} indicator
          ?interactive=${canInteract}
          data-entity-id=${entityId ?? ''}
          @value-changed=${canInteract ? this._onDeltaParamChanged : nothing}
        ></eq-param-bar>
      </div>
    `;
  }

  private _renderParamsFooter(): TemplateResult | typeof nothing {
    const cfg = this.config;
    if (!cfg) return nothing;

    const items: TemplateResult[] = [];

    // HC param
    if (cfg.hc_entity) {
      const entity = cfg.hc_entity;
      const value = this._resolveEntityNumber(entity, cfg.hc_fallback ?? 0.9);
      const [min, max] = this._getEntityRange(entity, 0.5, 3.0);
      const step = this._getEntityStep(entity, 0.1);
      const canInteract = !!entity && !!this.hass && !cfg.interactive;
      items.push(html`
        <div class="param-item">
          <span class="param-label">HC</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar
            .min=${min} .max=${max} .step=${step} .value=${value} indicator
            ?interactive=${canInteract}
            data-entity-id=${entity}
            @value-changed=${canInteract ? this._onParamChanged : nothing}
          ></eq-param-bar>
        </div>
      `);
    }

    // n param
    if (cfg.n_entity) {
      const entity = cfg.n_entity;
      const value = this._resolveEntityNumber(entity, cfg.n_fallback ?? 1.25);
      const [min, max] = this._getEntityRange(entity, 1.0, 2.0);
      const step = this._getEntityStep(entity, 0.01);
      const canInteract = !!entity && !!this.hass && !cfg.interactive;
      items.push(html`
        <div class="param-item">
          <span class="param-label">n</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar
            .min=${min} .max=${max} .step=${step} .value=${value} indicator
            ?interactive=${canInteract}
            data-entity-id=${entity}
            @value-changed=${canInteract ? this._onParamChanged : nothing}
          ></eq-param-bar>
        </div>
      `);
    }

    // Shift param (delta)
    if (cfg.shift_entity) {
      items.push(this._renderDeltaParamItem(
        'Shift', cfg.shift_entity, cfg.shift_fallback ?? 0, [-15, 15],
      ));
    }

    // PID correction / Sigma param (delta)
    if (cfg.pid_correction_entity) {
      items.push(this._renderDeltaParamItem(
        'Σ', cfg.pid_correction_entity, cfg.pid_correction_fallback ?? 0, [-10, 10],
      ));
    }

    if (items.length === 0) return nothing;
    return html`<div class="params-footer">${items}</div>`;
  }

  // ── Main render ──

  render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;

    const inner = this._renderParamsFooter();
    if (inner === nothing) return nothing;

    // When interactive (tunable), wrap in tunable container with pencil icon
    if (this.config.interactive) {
      return html`
        <div class="params-footer-tunable" @click=${this._dispatchTuningRequest}>
          ${inner}
          <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
        </div>
      `;
    }

    return inner;
  }

  static get styles() {
    return css`
      .params-footer {
        display: flex;
        align-items: stretch;
        gap: 4px;
        padding: var(--eq-params-padding, 8px 12px);
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
        font-variant-numeric: tabular-nums;
        flex-shrink: 0;
      }
      .params-footer .param-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        flex: 1;
        min-width: 0;
        cursor: pointer;
        border-radius: 8px;
        padding: 4px 6px;
        transition: background 0.2s;
      }
      .params-footer .param-item:hover {
        background: var(--secondary-background-color, rgba(0,0,0,0.04));
      }
      .params-footer .param-label {
        font-size: 10px;
        font-weight: var(--ha-font-weight-medium, 500);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        line-height: 1;
      }
      .params-footer .param-value {
        font-size: var(--ha-font-size-s, 0.85rem);
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1;
      }
      .params-footer .param-value.positive { color: var(--success-color, #4caf50); }
      .params-footer .param-value.negative { color: var(--error-color, #e53935); }

      .params-footer-tunable {
        display: flex;
        align-items: stretch;
        gap: 4px;
        padding: var(--eq-params-padding, 8px 12px);
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
        font-variant-numeric: tabular-nums;
        flex-shrink: 0;
        cursor: pointer;
        position: relative;
        transition: background 0.2s;
      }
      .params-footer-tunable:hover {
        background: rgba(var(--rgb-primary, 33, 150, 243), 0.06);
      }
      .params-footer-tunable .params-footer {
        border-top: none;
        padding: 0;
        flex: 1;
      }
      .params-footer-tunable .param-item {
        pointer-events: none;
      }
      .params-footer-tunable .pencil-icon {
        --mdc-icon-size: 14px;
        color: var(--secondary-text-color);
        opacity: 0.5;
        align-self: center;
        flex-shrink: 0;
      }
      .params-footer-tunable:hover .pencil-icon {
        opacity: 0.8;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-params-footer': EqParamsFooter;
  }
}

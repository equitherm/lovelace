import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { StatusCardConfig, LovelaceGridOptions, ClimateEntityAttributes, HomeAssistant } from '../types';
import { EquithermBaseCard } from '../utils/base-card';
import { tokens, cardBase } from '../styles/tokens';
import { localize } from '../localize';
import { STATUS_CARD_DEFAULTS } from '../config/status-card-config';
import '../components/action-badge';

@customElement('equitherm-status-card')
export class EquithermStatusCard extends EquithermBaseCard<StatusCardConfig> {
  // Layout property reflected to attribute for CSS styling
  @property({ reflect: true, type: String }) layout: 'default' | 'vertical' | 'horizontal' = 'default';

  protected _watchedEntities(): (string | undefined)[] {
    return [
      this._config?.climate_entity,
      this._config?.outdoor_entity,
      this._config?.flow_entity,
      this._config?.curve_output_entity,
      this._config?.rate_limiting_entity,
      this._config?.control_mode_entity,
    ];
  }

  public getGridOptions(): LovelaceGridOptions {
    const layout = this._config?.layout ?? 'default';

    switch (layout) {
      case 'vertical':
        return { columns: 6, rows: 4, min_rows: 4 };
      default:
        return { columns: 12, rows: 3, min_rows: 1 };
    }
  }

  static getStubConfig(): StatusCardConfig {
    return { type: 'custom:equitherm-status-card' } as StatusCardConfig;
  }

  static async getConfigElement() {
    await import('../editors/status-card-editor');
    return document.createElement('equitherm-status-card-editor');
  }

  setConfig(config: StatusCardConfig) {
    if (!config.climate_entity) throw new Error('climate_entity is required');
    if (!config.outdoor_entity) throw new Error('outdoor_entity is required');
    if (!config.flow_entity) throw new Error('flow_entity is required');

    this._config = { ...STATUS_CARD_DEFAULTS, ...config };

    // Set layout property (reflected to attribute via @property decorator)
    this.layout = this._config.layout ?? 'default';
  }

  private get _climate(): { state: string; attributes: Partial<ClimateEntityAttributes> } | undefined {
    return this._entityState(this._config.climate_entity) as { state: string; attributes: Partial<ClimateEntityAttributes> } | undefined;
  }

  private get _outdoorTemp(): string {
    const state = this._entityState(this._config.outdoor_entity);
    if (!state) return '—';
    return this._formatTemp(parseFloat(state.state), this._entityAttr<string>(this._config.outdoor_entity, 'unit_of_measurement'));
  }

  private get _flowTemp(): string {
    const state = this._entityState(this._config.flow_entity);
    if (!state) return '—';
    return this._formatTemp(parseFloat(state.state), this._entityAttr<string>(this._config.flow_entity, 'unit_of_measurement'));
  }

  private get _roomTemp(): string {
    const temp = this._climate?.attributes.current_temperature;
    return this._formatTemp(temp, this._hass?.config?.unit_system?.temperature);
  }

  private get _controlMode(): string {
    return this._entityState(this._config.control_mode_entity)?.state ?? '';
  }

  private get _rateLimitingActive(): boolean {
    return this._entityState(this._config.rate_limiting_entity)?.state === 'on';
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

  private get _curveOutputTemp(): string {
    const state = this._entityState(this._config.curve_output_entity);
    if (!state) return '';
    const value = parseFloat(state.state);
    if (isNaN(value)) return '';
    return this._formatTemp(value, this._entityAttr<string>(this._config.curve_output_entity, 'unit_of_measurement'));
  }

  static styles = [
    tokens,
    cardBase,
    css`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        gap: 8px;
      }
      .header eq-action-badge { cursor: pointer; }
      .mode { cursor: pointer; }
      .temps {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }
      .temp-block {
        text-align: center;
        min-width: 0;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .temp-block:hover {
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
      }
      .temp-value {
        font-size: var(--eq-font-size-large);
        font-weight: 600;
        line-height: 1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .temp-label {
        font-size: var(--eq-font-size-small);
        color: var(--secondary-text-color);
        margin-top: 4px;
        white-space: nowrap;
      }
      .arrow {
        color: var(--secondary-text-color);
        font-size: 1.2rem;
        padding-bottom: calc(var(--eq-font-size-small) + 4px);
      }
      .divider { width: 1px; background: var(--divider-color, #e0e0e0); height: 40px; flex-shrink: 0; }
      .mode { font-size: var(--eq-font-size-small); color: var(--secondary-text-color); cursor: pointer; }
      .ramping {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        background: var(--eq-badge-idle-bg, #e5e5e5);
        color: var(--eq-badge-idle-color, #666);
      }
      .ramping ha-icon { --mdc-icon-size: 14px; }
      .flow-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .flow-dual .target { font-size: 0.7rem; color: var(--secondary-text-color); }

      /* Layout variations */
      .temps.vertical {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        gap: var(--eq-spacing-md);
      }
      .temps.vertical .arrow,
      .temps.vertical .divider {
        display: none;
      }
    `,
  ];

  render() {
    if (!this._config || !this._hass) return nothing;
    const layout = this._config.layout ?? 'default';
    const action = this._climate?.attributes.hvac_action ?? 'off';
    const adjustingDir = this._adjustingDirection;
    const curveOutput = this._curveOutputTemp;

    return html`
      <ha-card>
        <div class="header">
          <eq-action-badge .action=${action} @click=${() => this._openMoreInfo(this._config.climate_entity)}></eq-action-badge>
          ${adjustingDir ? html`
            <span class="ramping">
              <ha-icon .icon=${adjustingDir === 'rising' ? 'mdi:trending-up' : 'mdi:trending-down'}></ha-icon>
              ${localize('common.adjusting')}
            </span>
          ` : nothing}
          ${this._controlMode ? html`<span class="mode" @click=${() => this._openMoreInfo(this._config.control_mode_entity!)}>${this._controlMode}</span>` : nothing}
        </div>

        <div class=${classMap({ temps: true, vertical: layout === 'vertical', horizontal: layout === 'horizontal' })}>
          <div class="temp-block" @click=${() => this._openMoreInfo(this._config.outdoor_entity)}>
            <div class="temp-value">${this._outdoorTemp}</div>
            <div class="temp-label">${localize('common.outdoor')}</div>
          </div>
          <div class="arrow" aria-hidden="true">→</div>
          <div class="temp-block" @click=${() => this._openMoreInfo(this._config.flow_entity)}>
            ${adjustingDir && curveOutput ? html`
              <div class="flow-dual">
                <div class="temp-value">${this._flowTemp}</div>
                <div class="target">→ ${curveOutput}</div>
              </div>
            ` : html`
              <div class="temp-value">${this._flowTemp}</div>
            `}
            <div class="temp-label">${localize('common.flow')}</div>
          </div>
          <div class="divider"></div>
          <div class="temp-block" @click=${() => this._openMoreInfo(this._config.climate_entity)}>
            <div class="temp-value">${this._roomTemp}</div>
            <div class="temp-label">${localize('common.room')}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

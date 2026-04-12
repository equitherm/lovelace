import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { StatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceGridOptions } from '../../ha/data/lovelace';
import type { ClimateEntity } from '../../ha/data/climate';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { EquithermBaseCard } from '../../utils/base-card';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import setupCustomLocalize from '../../localize';
import { validateStatusCardConfig } from './status-card-config';
import { STATUS_CARD_NAME, STATUS_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS } from './const';
import { getHvacActionColor, normalizeHvacAction, getHvacBadgeProps } from '../../utils/hvac-colors';
import '../../shared/shape-icon';
import '../../shared/badge-info';

registerCustomCard({
  type: STATUS_CARD_NAME,
  name: 'Equitherm Status',
  description: 'Compact heating status tile with temperature displays',
});

@customElement(STATUS_CARD_NAME)
export class EquithermStatusCard extends EquithermBaseCard<StatusCardConfig> {
  // Layout property reflected to attribute for CSS styling
  @property({ reflect: true, type: String }) layout: 'default' | 'vertical' | 'horizontal' = 'default';

  public getGridOptions(): LovelaceGridOptions {
    const layout = this._config?.layout ?? 'default';

    switch (layout) {
      case 'vertical':
        return { columns: 6, rows: 4, min_rows: 4 };
      default:
        return { columns: 12, rows: 3, min_rows: 1 };
    }
  }

  static async getStubConfig(hass: HomeAssistant): Promise<StatusCardConfig> {
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

    return {
      type: 'custom:equitherm-status-card',
      climate_entity: climateEntity,
      outdoor_entity: outdoorEntity,
      flow_entity: flowEntity,
    } as StatusCardConfig;
  }

  static async getConfigElement() {
    await import('./status-card-editor');
    return document.createElement(STATUS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateStatusCardConfig(config);
    this.layout = this._config.layout ?? 'default';
  }

  private get _climate(): ClimateEntity | undefined {
    return this._entityState(this._config.climate_entity) as ClimateEntity | undefined;
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
    return this._formatTemp(temp, this.hass?.config?.unit_system?.temperature);
  }

  private get _rateLimitingActive(): boolean {
    return this._entityState(this._config.rate_limiting_entity)?.state === 'on';
  }

  private get _pidActive(): boolean {
    if (!this._config.pid_active_entity) return false;
    return this._entityState(this._config.pid_active_entity)?.state === 'on';
  }

  /** Entity to compare against flow for rate-limit direction: PID output when available, else curve output */
  private get _rateTargetEntity(): string | undefined {
    return this._config.pid_output_entity ?? this._config.curve_output_entity;
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

  private get _curveOutputTemp(): string {
    const entity = this._rateTargetEntity;
    if (!entity) return '';
    const state = this._entityState(entity);
    if (!state) return '';
    const value = parseFloat(state.state);
    if (isNaN(value)) return '';
    return this._formatTemp(value, this._entityAttr<string>(entity, 'unit_of_measurement'));
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      css`
        .header {
          display: flex;
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
        .title {
          font-size: var(--font-size-md);
          font-weight: 600;
          color: var(--primary-text-color);
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
        .badges {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
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
          font-size: var(--font-size-lg);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          color: var(--primary-text-color);
          white-space: nowrap;
        }
        .temp-value.flow { color: var(--gradient-hot); }
        .temp-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--secondary-text-color);
          margin-top: 4px;
          white-space: nowrap;
        }
        .arrow {
          color: var(--divider-color, rgba(0,0,0,0.2));
          font-size: 0.9rem;
          padding-bottom: calc(0.68rem + 4px);
        }
        .divider { width: 1px; background: var(--divider-color, rgba(0,0,0,0.1)); height: 32px; flex-shrink: 0; }
        .flow-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .flow-dual .target { font-size: 0.7rem; color: var(--secondary-text-color); }

        /* Layout variations */
        .temps.vertical {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;
          gap: var(--spacing-md);
        }
        .temps.vertical .arrow,
        .temps.vertical .divider {
          display: none;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const layout = this._config.layout ?? 'default';
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const adjustingDir = this._adjustingDirection;
    const curveOutput = this._curveOutputTemp;
    const title = this._config.title ?? this._entityAttr<string>(this._config.climate_entity, 'friendly_name') ?? localize('status_card.default_title');

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

        <div class=${classMap({ temps: true, vertical: layout === 'vertical', horizontal: layout === 'horizontal' })}>
          <div class="temp-block" @click=${() => this._openMoreInfo(this._config.outdoor_entity)}>
            <div class="temp-value">${this._outdoorTemp}</div>
            <div class="temp-label">${localize('common.outdoor')}</div>
          </div>
          <div class="arrow" aria-hidden="true">→</div>
          <div class="temp-block" @click=${() => this._openMoreInfo(this._config.flow_entity)}>
            ${adjustingDir && curveOutput ? html`
              <div class="flow-dual">
                <div class="temp-value flow">${this._flowTemp}</div>
                <div class="target">→ ${curveOutput}</div>
              </div>
            ` : html`
              <div class="temp-value flow">${this._flowTemp}</div>
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

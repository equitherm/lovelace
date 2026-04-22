import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { OtModulationCardConfig } from './ot-modulation-card-config';
import type { HomeAssistant } from '../../../ha';
import { OtBaseCard, headerStyles } from '../../../utils/base';
import { cardStyle } from '../../../utils/card-styles';
import { registerCustomCard } from '../../../utils/register-card';
import { OT_MODULATION_CARD_NAME, OT_MODULATION_CARD_EDITOR_NAME } from './const';
import { validateOtModulationCardConfig } from './ot-modulation-card-config';
import { OtHistoryHelper, type OtHistoryPoint } from '../../../utils/ot-history';
import { computeEntityNameDisplay } from '../../../ha/common/entity/compute_entity_name_display';
import setupCustomLocalize from '../../../localize';
import '../../../shared/badge-info';
import '../../../shared/eq-binary-timeline';
import '../../../shared/eq-param-bar';
import type { BinarySegment } from '../../../shared/eq-binary-timeline';

const DEFAULT_HOURS = 1;
const SHORT_CYCLE_THRESHOLD = 6;

registerCustomCard({
  type: OT_MODULATION_CARD_NAME,
  name: 'OpenTherm Modulation',
  description: 'Boiler modulation and short-cycle diagnostics',
});

@customElement(OT_MODULATION_CARD_NAME)
export class OtModulationCard extends OtBaseCard<OtModulationCardConfig> {
  private _flameHistory: OtHistoryPoint[] = [];
  @state() private _cyclesPerHour = 0;
  private _timelineCache: { segments: BinarySegment[]; startTime: number; endTime: number } | null = null;
  private _fetchTimer?: ReturnType<typeof setInterval>;

  setConfig(config: unknown) {
    this._config = validateOtModulationCardConfig(config);
  }

  static async getConfigElement() {
    await import('./ot-modulation-card-editor');
    return document.createElement(OT_MODULATION_CARD_EDITOR_NAME);
  }

  static async getStubConfig(hass: HomeAssistant): Promise<OtModulationCardConfig> {
    const entityIds = Object.keys(hass.states);
    const mod = entityIds.find(e => e.includes('modulation') || e.includes('rel_mod')) ?? '';
    const maxMod = entityIds.find(e => e.includes('max_rel_mod') || e.includes('max_modulation')) ?? '';
    const flame = entityIds.find(e => e.includes('flame')) ?? '';
    return {
      type: `custom:${OT_MODULATION_CARD_NAME}`,
      modulation_entity: mod,
      max_modulation_entity: maxMod,
      flame_entity: flame,
    } as OtModulationCardConfig;
  }

  private get _flameOn(): boolean {
    return this._entityState(this._config.flame_entity)?.state === 'on';
  }

  protected override _headerIconColor(): string {
    return this._flameOn
      ? 'var(--rgb-state-climate-heat, 244,81,30)'
      : 'var(--rgb-disabled, 158,158,158)';
  }

  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const localize = setupCustomLocalize(this.hass);
    const cycles = this._cyclesPerHour;
    const shortCycling = cycles > SHORT_CYCLE_THRESHOLD;
    return html`
      <div class="badges">
        ${cycles > 0 ? html`
          <eq-badge-info .label=${`${cycles} ${localize('opentherm.modulation_card.cycles_per_hour')}`}
            icon=${shortCycling ? 'mdi:alert' : 'mdi:lightning-bolt'}
            .active=${shortCycling}
            style="--badge-info-color: ${shortCycling ? 'var(--rgb-error, 229,57,53)' : 'var(--rgb-info, 3,169,244)'}">
          </eq-badge-info>
        ` : nothing}
      </div>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();
    this._fetchHistory();
    this._fetchTimer = setInterval(() => this._fetchHistory(), 30_000);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._fetchTimer);
    this._fetchTimer = undefined;
  }

  private async _fetchHistory(): Promise<void> {
    if (!this.hass) return;
    const hours = this._config.hours ?? DEFAULT_HOURS;
    const history = await OtHistoryHelper.fetch(this.hass, [this._config.flame_entity], hours);
    this._flameHistory = history[this._config.flame_entity] ?? [];

    const oneHourAgo = Date.now() - 3600 * 1000;
    const lastHourHistory = this._flameHistory.filter(
      p => new Date(p.last_changed).getTime() >= oneHourAgo,
    );
    this._cyclesPerHour = OtHistoryHelper.countCycles(lastHourHistory);
    this._timelineCache = this._buildTimelineData();
  }

  private async _setMaxModulation(value: number): Promise<void> {
    if (!this.hass) return;
    try {
      await this.hass.callService('number', 'set_value', {
        entity_id: this._config.max_modulation_entity,
        value,
      });
    } catch (err) {
      console.warn('Failed to set max modulation:', err);
    }
  }

  private _buildTimelineData() {
    const hours = this._config.hours ?? DEFAULT_HOURS;
    const endTime = Date.now();
    const startTime = endTime - hours * 3600 * 1000;
    const nowMs = endTime;

    const segments: BinarySegment[] = [];
    const points = this._flameHistory.filter(p => {
      const t = new Date(p.last_changed).getTime();
      return t >= startTime && t <= nowMs;
    });

    for (let i = 0; i < points.length; i++) {
      const segStart = new Date(points[i].last_changed).getTime();
      const segEnd = i + 1 < points.length
        ? new Date(points[i + 1].last_changed).getTime()
        : nowMs;
      segments.push({
        start: segStart,
        end: segEnd,
        state: points[i].state === 'on' ? 'on' : 'off',
      });
    }

    return { segments, startTime, endTime };
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.flame_entity;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        ha-card { height: 100%; overflow: hidden; display: flex; flex-direction: column; }
        .body { padding: 8px 12px 4px; display: flex; flex-direction: column; gap: 6px; }
        .mod-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mod-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--secondary-text-color);
          min-width: 56px;
        }
        .mod-row eq-param-bar {
          flex: 1;
          --eq-bar-height: 6px;
          --eq-bar-fill-color: var(--gradient-hot, #f97316);
        }
        .mod-row:hover eq-param-bar {
          --eq-bar-height: 8px;
        }
        .mod-value {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 36px;
          text-align: right;
        }
        .max-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        ha-slider { width: 100%; }
        .timeline-section {
          padding: 6px 12px 0;
          border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
          margin-top: 2px;
        }
        .timeline-label {
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
          opacity: 0.7;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const mod = this._resolveEntityNumber(cfg.modulation_entity, 0);
    const maxMod = this._resolveEntityNumber(cfg.max_modulation_entity, 100);
    const maxMin = this._entityAttr<number>(cfg.max_modulation_entity, 'min') ?? 0;
    const maxMax = this._entityAttr<number>(cfg.max_modulation_entity, 'max') ?? 100;
    const modState = this._entityState(cfg.modulation_entity);
    const title = modState
      ? computeEntityNameDisplay(modState, cfg.name, this.hass) || localize('opentherm.modulation_card.default_title')
      : localize('opentherm.modulation_card.default_title');

    const { segments, startTime, endTime } = this._timelineCache ?? this._buildTimelineData();

    return html`
      <ha-card>
        ${this._renderHeader({ iconName: 'mdi:lightning-bolt', clickEntity: cfg.modulation_entity, title })}
        <div class="body">
          <div class="mod-row">
            <span class="mod-label">${localize('opentherm.modulation_card.current')}</span>
            <eq-param-bar .min=${0} .max=${100} .value=${mod}></eq-param-bar>
            <span class="mod-value">${mod.toFixed(0)}%</span>
          </div>
          <div class="max-row">
            <span class="mod-label">${localize('opentherm.modulation_card.max')}</span>
            <ha-slider
              .min=${maxMin}
              .max=${maxMax}
              .step=${1}
              .value=${maxMod}
              pin
              @change=${(e: Event) => this._setMaxModulation(parseFloat((e.target as HTMLInputElement).value))}
            ></ha-slider>
            <span class="mod-value">${maxMod.toFixed(0)}%</span>
          </div>
        </div>
        <div class="timeline-section">
          <div class="timeline-label">Flame</div>
          <eq-binary-timeline
            .hass=${this.hass}
            .segments=${segments}
            .startTime=${startTime}
            .endTime=${endTime}
          ></eq-binary-timeline>
        </div>
        ${this._renderFooterMeta()}
      </ha-card>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-modulation-card': OtModulationCard;
  }
}

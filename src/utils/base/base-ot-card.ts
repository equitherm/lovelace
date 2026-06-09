import { html, nothing } from 'lit';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import { BaseCard } from './abstract-base-card';
import setupCustomLocalize from '../../localize';

export interface OtCardConfig {
  show_last_updated?: boolean;
  fault_entity?: string;
  [key: string]: unknown;
}

export abstract class OtBaseCard<TConfig extends OtCardConfig>
  extends BaseCard<TConfig> implements LovelaceCard {

  /** Override to customize header icon color. Return a CSS rgb() value or var() reference. */
  protected override _headerIconColor(): string {
    return 'var(--rgb-disabled, 158,158,158)';
  }

  /** Whether a boiler fault is active */
  protected _hasFault(): boolean {
    if (!this._config.fault_entity) return false;
    return this._entityState(this._config.fault_entity)?.state === 'on';
  }

  /** Returns error color if fault active, null otherwise. Call from _headerIconColor(). */
  protected _faultOverride(): string | null {
    return this._hasFault() ? 'var(--rgb-error, 229,57,53)' : null;
  }

  /** Shared fault badge for use in _renderHeaderBadges() */
  protected _renderFaultBadge(): typeof nothing | ReturnType<typeof html> {
    if (!this._hasFault()) return nothing;
    const localize = setupCustomLocalize(this.hass);
    return html`
      <eq-badge-info
        .label=${localize('opentherm.common.fault')}
        .icon=${'mdi:alert-circle'}
        .active=${true}
        style="--badge-info-color: var(--rgb-error, 229,57,53)"
      ></eq-badge-info>
    `;
  }

  /** Render a not-found state for missing entity */
  protected _renderNotFound(entityId: string | undefined, label?: string): typeof nothing | ReturnType<typeof html> {
    if (!entityId || this._entityExists(entityId)) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const display = label ?? entityId;
    return html`
      <div class="not-found">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${localize('common.not_found', { entity: display })}</span>
      </div>
    `;
  }

  /** Format minutes into Xh Ym string */
  protected _formatActiveTime(totalMinutes: number): string {
    if (totalMinutes < 60) return `${totalMinutes}min`;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  }
}

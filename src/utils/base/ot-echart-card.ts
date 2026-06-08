// src/utils/base/ot-echart-card.ts
import { html, nothing } from 'lit';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import { EChartCardBase } from './echart-base';
import type { OtCardConfig } from './base-ot-card';
import setupCustomLocalize from '../../localize';

/**
 * EChart base for OpenTherm cards.
 * Combines chart lifecycle from EChartCardBase with OT-specific capabilities:
 *   - _renderNotFound()
 *   - _faultOverride() / _renderFaultBadge()
 */
export abstract class OtEChartCard<TConfig extends OtCardConfig>
  extends EChartCardBase<TConfig> implements LovelaceCard {

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
  protected _renderNotFound(entityId: string | undefined, label?: string) {
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
}

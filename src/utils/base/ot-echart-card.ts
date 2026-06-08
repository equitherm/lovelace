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
 *   - _faultOverride() / _renderFaultBadge() (once fault awareness is added)
 */
export abstract class OtEChartCard<TConfig extends OtCardConfig>
  extends EChartCardBase<TConfig> implements LovelaceCard {

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

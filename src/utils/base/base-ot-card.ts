import { html, nothing } from 'lit';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import { BaseCard } from './abstract-base-card';
import setupCustomLocalize from '../../localize';

export interface OtCardConfig {
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export abstract class OtBaseCard<TConfig extends OtCardConfig>
  extends BaseCard<TConfig> implements LovelaceCard {

  /** Override to customize header icon color. Return a CSS rgb() value or var() reference. */
  protected override _headerIconColor(): string {
    return 'var(--rgb-disabled, 158,158,158)';
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
}

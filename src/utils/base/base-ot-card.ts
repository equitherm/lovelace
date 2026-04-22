import { html, nothing } from 'lit';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import { BaseCard } from './abstract-base-card';

export interface OtCardConfig {
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export abstract class OtBaseCard<TConfig extends OtCardConfig>
  extends BaseCard<TConfig> implements LovelaceCard {

  // ── Header (template method) ──

  /** Override to customize header icon color. Return a CSS rgb() value or var() reference. */
  protected _headerIconColor(): string {
    return 'var(--rgb-disabled, 158,158,158)';
  }

  protected _renderHeaderIcon(iconName: string, clickEntity: string): ReturnType<typeof html> {
    return html`
      <ha-tile-icon .interactive=${true}
        style="--tile-icon-color: rgb(${this._headerIconColor()}); --tile-icon-size: 42px"
        @click=${() => this._openMoreInfo(clickEntity)}>
        <ha-icon slot="icon" .icon=${iconName}></ha-icon>
      </ha-tile-icon>
    `;
  }

  protected _renderHeaderInfo(title: string, subtitle?: string | typeof nothing): ReturnType<typeof html> {
    const stateLine = subtitle !== undefined && subtitle !== nothing
      ? html`<span class="state">${subtitle}</span>` : nothing;
    return html`
      <div class="header-info">
        <span class="title">${title}</span>
        ${stateLine}
      </div>
    `;
  }

  protected _renderHeaderBadges(): ReturnType<typeof html> | typeof nothing {
    return nothing;
  }

  protected _renderHeader(opts: {
    iconName: string;
    clickEntity: string;
    title: string;
    subtitle?: string | typeof nothing;
  }): ReturnType<typeof html> | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    return html`
      <div class="header">
        ${this._renderHeaderIcon(opts.iconName, opts.clickEntity)}
        ${this._renderHeaderInfo(opts.title, opts.subtitle)}
        ${this._renderHeaderBadges()}
      </div>
    `;
  }
}

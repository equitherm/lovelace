import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import { BaseCard } from './abstract-base-card';

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
}

import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { StatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { EquithermBaseCard, headerStyles } from '../../utils/base';
import { cardStyle, kpiFooterStyles } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { validateStatusCardConfig } from './status-card-config';
import { STATUS_CARD_NAME, STATUS_CARD_EDITOR_NAME } from './const';
import { findClimateEntity, findOutdoorEntity, findFlowEntity } from '../../utils/stub-config';
import { getAdjustingDirection } from '../../utils/climate-helpers';
import '../../shared/badge-info';
import '../../shared/eq-tuning-dialog';
import { buildTuningDialogConfig } from '../../utils/tuning-dialog-config';

registerCustomCard({
  type: STATUS_CARD_NAME,
  name: 'Equitherm Status',
  description: 'Compact heating status tile with temperature displays',
});

@customElement(STATUS_CARD_NAME)
export class EquithermStatusCard extends EquithermBaseCard<StatusCardConfig> {

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: this._activeRows, min_rows: 2 };
  }

  static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[],
  ): StatusCardConfig {
    return {
      type: 'custom:equitherm-status-card',
      climate_entity: findClimateEntity(hass, entities, entitiesFallback) ?? '',
      outdoor_entity: findOutdoorEntity(hass) ?? '',
      flow_entity: findFlowEntity(hass) ?? '',
    } as StatusCardConfig;
  }

  static async getConfigElement() {
    await import('./status-card-editor');
    return document.createElement(STATUS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateStatusCardConfig(config);
    this._dialogConfig = buildTuningDialogConfig(this._config);
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.flow_entity;
  }

  private get _hasParamsFooter(): boolean {
    const cfg = this._config;
    return !!cfg.hc_entity || !!cfg.shift_entity || !!cfg.n_entity || !!cfg.pid_correction_entity;
  }

  private get _activeRows(): number {
    let rows = 1; // header (always)
    if (this._config.show_kpi_footer !== false
      && this._entityExists(this._config.outdoor_entity)
      && this._entityExists(this._config.flow_entity)
      && this._entityExists(this._config.climate_entity)) {
      rows += 1;
    }
    if (this._config.show_params_footer !== false) rows += 1;
    if (this._config.show_last_updated) rows += 1;
    return rows;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      kpiFooterStyles,
      css`
        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        eq-temp-kpis {
          flex-shrink: 0;
          min-width: 0;
        }
      `,
    ];
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const lookup = (id: string) => this._entityState(id)!;
    const adjustingDir = getAdjustingDirection(this._config, lookup);
    const title = this._computeCardTitle('status_card.default_title');

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:thermostat',
          clickEntity: this._config.climate_entity,
          title,
        })}

        ${this._renderKpiFooter({
          adjustingDir: adjustingDir ?? undefined,
          curveOutput: this._curveOutputTempFormatted || undefined,
        })}
        ${this._config.show_params_footer !== false ? html`
          <eq-params-footer
            .hass=${this.hass}
            .config=${{
              type: 'custom:eq-params-footer' as const,
              hc_entity: this._config.hc_entity,
              hc_fallback: 0.9,
              n_entity: this._config.n_entity,
              n_fallback: 1.25,
              shift_entity: this._config.shift_entity,
              shift_fallback: 0,
              pid_correction_entity: this._config.pid_correction_entity,
              interactive: !!this._config.tunable,
            }}
            @eq-tuning-requested=${() => { this._showTuningDialog = true; }}
          ></eq-params-footer>
        ` : nothing}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._dialogConfig && this._showTuningDialog ? html`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._dialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : nothing}
    `;
  }

}

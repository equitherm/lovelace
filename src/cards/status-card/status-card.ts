import { html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { StatusCardConfig } from './status-card-config';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { EquithermBaseCard, headerStyles } from '../../utils/base';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle, paramsFooterStyles, kpiFooterStyles, tunableFooterStyles } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import setupCustomLocalize from '../../localize';
import { validateStatusCardConfig } from './status-card-config';
import { STATUS_CARD_NAME, STATUS_CARD_EDITOR_NAME } from './const';
import { findClimateEntity, findOutdoorEntity, findFlowEntity } from '../../utils/stub-config';
import { getAdjustingDirection } from '../../utils/climate-helpers';
import '../../shared/badge-info';
import '../../shared/eq-param-bar';
import '../../shared/eq-tuning-dialog';
import type { TuningDialogConfig } from '../../shared/eq-tuning-dialog-config';
import { buildTuningDialogConfig } from '../../utils/tuning-dialog-config';

registerCustomCard({
  type: STATUS_CARD_NAME,
  name: 'Equitherm Status',
  description: 'Compact heating status tile with temperature displays',
});

@customElement(STATUS_CARD_NAME)
export class EquithermStatusCard extends EquithermBaseCard<StatusCardConfig> {

  private get _tuningDialogConfig(): TuningDialogConfig | undefined {
    return buildTuningDialogConfig(this._config);
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: this._config.show_last_updated ? 4 : 3, min_rows: 3 };
  }

  static async getStubConfig(hass: HomeAssistant): Promise<StatusCardConfig> {
    return {
      type: 'custom:equitherm-status-card',
      climate_entity: findClimateEntity(hass),
      outdoor_entity: findOutdoorEntity(hass),
      flow_entity: findFlowEntity(hass),
    } as StatusCardConfig;
  }

  static async getConfigElement() {
    await import('./status-card-editor');
    return document.createElement(STATUS_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateStatusCardConfig(config);
  }

  protected override _lastUpdatedEntity(): string | undefined {
    return this._config.flow_entity;
  }

  private get _hasParamsFooter(): boolean {
    const cfg = this._config;
    return !!cfg.hc_entity || !!cfg.shift_entity || !!cfg.n_entity || !!cfg.pid_correction_entity;
  }

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      paramsFooterStyles,
      tunableFooterStyles,
      kpiFooterStyles,
      css`
        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .kpi-footer {
          flex: 1;
          min-width: 0;
          place-content: center;
        }
      `,
    ];
  }

  private _renderParamsFooterWithTune() {
    return this._renderTunableParamsFooter(
      {
        hc: this._config.hc_entity ? { entity: this._config.hc_entity, fallback: 0.9 } : undefined,
        n: this._config.n_entity ? { entity: this._config.n_entity, fallback: 1.25 } : undefined,
        shift: this._config.shift_entity ? { entity: this._config.shift_entity, fallback: 0 } : undefined,
        pid_correction: this._config.pid_correction_entity ? { entity: this._config.pid_correction_entity } : undefined,
      },
      () => { this._showTuningDialog = true; },
    );
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const lookup = (id: string) => this._entityState(id)!;
    const adjustingDir = getAdjustingDirection(this._config, lookup);
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name ?? this._config.title, this.hass) || localize('status_card.default_title')
      : (this._config.title ?? localize('status_card.default_title'));

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
        ${this._renderParamsFooterWithTune()}
        ${this._renderFooterMeta()}
      </ha-card>

      ${this._tuningDialogConfig && this._showTuningDialog ? html`
        <eq-tuning-dialog
          .hass=${this.hass}
          .config=${this._tuningDialogConfig}
          .open=${this._showTuningDialog}
          @closed=${() => { this._showTuningDialog = false; }}
        ></eq-tuning-dialog>
      ` : nothing}
    `;
  }

}

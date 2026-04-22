import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtEfficiencyCardConfig } from './ot-efficiency-card-config';
import { validateOtEfficiencyCardConfig } from './ot-efficiency-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_EFFICIENCY_CARD_EDITOR_NAME } from './const';

@customElement(OT_EFFICIENCY_CARD_EDITOR_NAME)
export class OtEfficiencyCardEditor extends EquithermBaseEditor<OtEfficiencyCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtEfficiencyCardConfig;
  }

  protected _validate(config: OtEfficiencyCardConfig): void {
    validateOtEfficiencyCardConfig(config);
  }

  private _schemaMemo = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('boiler_temp_entity', { domain: ['sensor', 'input_number'] }),
      schemaHelpers.entityName('name', { entity: 'boiler_temp_entity' }),
      schemaHelpers.entity('return_temp_entity', { domain: ['sensor', 'input_number'] }),
      // Optional
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('flame_entity', { domain: ['binary_sensor', 'input_boolean'] }),
        schemaHelpers.entity('ch_active_entity', { domain: ['binary_sensor', 'input_boolean'] }),
        schemaHelpers.number('condensing_threshold', 30, 80, 1, { unit_of_measurement: '°C' }),
        schemaHelpers.number('hours', 1, 48, 1),
        { name: 'show_last_updated', selector: { boolean: {} } },
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-efficiency-card-editor': OtEfficiencyCardEditor;
  }
}

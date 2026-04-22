import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtDhwCardConfig } from './ot-dhw-card-config';
import { validateOtDhwCardConfig } from './ot-dhw-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_DHW_CARD_EDITOR_NAME } from './const';

@customElement(OT_DHW_CARD_EDITOR_NAME)
export class OtDhwCardEditor extends EquithermBaseEditor<OtDhwCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtDhwCardConfig;
  }

  protected _validate(config: OtDhwCardConfig): void {
    validateOtDhwCardConfig(config);
  }

  private _schemaMemo = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('dhw_enable_entity', { domain: ['switch', 'input_boolean'] }),
      schemaHelpers.entityName('name', { entity: 'dhw_enable_entity' }),
      schemaHelpers.entity('dhw_setpoint_entity', { domain: ['number', 'input_number'] }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('dhw_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('dhw_temp_entity', { domain: ['sensor', 'input_number'], required: false }),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-dhw-card-editor': OtDhwCardEditor;
  }
}

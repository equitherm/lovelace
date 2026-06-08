import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtModulationCardConfig } from './ot-modulation-card-config';
import { validateOtModulationCardConfig } from './ot-modulation-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_MODULATION_CARD_EDITOR_NAME } from './const';

@customElement(OT_MODULATION_CARD_EDITOR_NAME)
export class OtModulationCardEditor extends EquithermBaseEditor<OtModulationCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtModulationCardConfig;
  }

  protected _validate(config: OtModulationCardConfig): void {
    validateOtModulationCardConfig(config);
  }

  private _schemaMemo = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      schemaHelpers.entity('modulation_entity', { domain: ['sensor', 'input_number'] }),
      schemaHelpers.entity('max_modulation_entity', { domain: ['number', 'input_number'] }),
      schemaHelpers.entity('flame_entity', { domain: ['binary_sensor', 'input_boolean'] }),
      schemaHelpers.entityName('name', { entity: 'modulation_entity' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:tune', [
        { name: 'hours', selector: { number: { min: 1, max: 24, step: 1, mode: 'box' as const } } },
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-modulation-card-editor': OtModulationCardEditor;
  }
}

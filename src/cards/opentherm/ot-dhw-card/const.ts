import { editorName } from '../../../utils/register-card';

export const OT_DHW_CARD_NAME = 'opentherm-dhw-card';
export const OT_DHW_CARD_EDITOR_NAME = editorName(OT_DHW_CARD_NAME);

export { NUMBER_DOMAINS } from '../../../utils/domains';

/** Writable binary domains (switch/input_boolean) — excludes read-only binary_sensor */
export const WRITABLE_BINARY_DOMAINS = ['switch', 'input_boolean'] as const;

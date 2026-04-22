import { PREFIX_NAME } from '../../const';
import { editorName } from '../../utils/register-card';

export const CURVE_CARD_NAME = `${PREFIX_NAME}-curve-card`;
export const CURVE_CARD_EDITOR_NAME = editorName(CURVE_CARD_NAME);

export const CLIMATE_ENTITY_DOMAINS: readonly string[] = ['climate'];
export const SENSOR_ENTITY_DOMAINS: readonly string[] = ['sensor'];

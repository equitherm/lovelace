import { PREFIX_NAME } from '../../const';
import { editorName } from '../../utils/register-card';

export const STATUS_CARD_NAME = `${PREFIX_NAME}-status-card`;
export const STATUS_CARD_EDITOR_NAME = editorName(STATUS_CARD_NAME);

export const CLIMATE_ENTITY_DOMAINS: readonly string[] = ['climate'];
export const SENSOR_ENTITY_DOMAINS: readonly string[] = ['sensor'];

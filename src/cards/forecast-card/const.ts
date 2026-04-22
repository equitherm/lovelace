import { PREFIX_NAME } from '../../const';
import { editorName } from '../../utils/register-card';

export const FORECAST_CARD_NAME = `${PREFIX_NAME}-forecast-card`;
export const FORECAST_CARD_EDITOR_NAME = editorName(FORECAST_CARD_NAME);

export const CLIMATE_ENTITY_DOMAINS: readonly string[] = ['climate'];
export const WEATHER_ENTITY_DOMAINS: readonly string[] = ['weather'];
export const SENSOR_ENTITY_DOMAINS: readonly string[] = ['sensor'];

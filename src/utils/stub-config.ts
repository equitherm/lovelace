import type { HomeAssistant } from '../ha/types';
import { computeDomain } from '../ha/common/entity/compute_domain';

const CLIMATE_DOMAINS: readonly string[] = ['climate'];
const SENSOR_DOMAINS: readonly string[] = ['sensor'];

export function findClimateEntity(hass: HomeAssistant): string | undefined {
  return Object.keys(hass.states).find(e =>
    CLIMATE_DOMAINS.includes(computeDomain(e)),
  );
}

export function findWeatherEntity(hass: HomeAssistant): string | undefined {
  return Object.keys(hass.states).find(e => computeDomain(e) === 'weather');
}

function findTempSensors(hass: HomeAssistant): string[] {
  const states = hass.states;
  return Object.keys(states).filter(e => {
    const state = states[e];
    return SENSOR_DOMAINS.includes(computeDomain(e))
      && state?.attributes?.device_class === 'temperature';
  });
}

export function findOutdoorEntity(hass: HomeAssistant): string | undefined {
  const temps = findTempSensors(hass);
  return temps.find(e =>
    e.includes('outdoor') || e.includes('outside') || e.includes('exterior'),
  ) ?? temps[0];
}

export function findFlowEntity(hass: HomeAssistant): string | undefined {
  const temps = findTempSensors(hass);
  return temps.find(e =>
    e.includes('flow') || e.includes('supply') || e.includes('forward'),
  ) ?? temps[0];
}

export function findCurveOutputEntity(hass: HomeAssistant): string {
  return findTempSensors(hass).find(e => e.includes('curve_output')) ?? '';
}

import { computeFlowTemperature, type CurveParams } from '@equitherm/core';

/** Curve parameters without tOutdoor (provided per forecast entry) */
export type ForecastCurveConfig = Omit<CurveParams, 'tOutdoor'>;

export interface ForecastPoint {
  datetime: string;
  hour: string;
  tOutdoor: number;
  tFlow: number;
}

export function buildForecastSeries(
  forecast: { datetime: string; temperature: number }[],
  params: ForecastCurveConfig,
  hours: number,
): ForecastPoint[] {
  return forecast.slice(0, hours).map((entry) => ({
    datetime: entry.datetime,
    hour: new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    tOutdoor: entry.temperature,
    tFlow: computeFlowTemperature({ ...params, tOutdoor: entry.temperature }),
  }));
}

export function peakDemand(points: ForecastPoint[]): ForecastPoint | undefined {
  if (points.length === 0) return undefined;
  return points.reduce((max, p) => (p.tFlow > (max?.tFlow ?? 0) ? p : max), points[0]);
}

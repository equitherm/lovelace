import { describe, it, expect } from 'vitest';
import { buildForecastSeries, peakDemand } from './forecast';

const params = { tTarget: 21, hc: 1.2, n: 1.25, shift: 0, minFlow: 25, maxFlow: 70 };
const mockForecast = [
  { datetime: '2026-01-01T06:00:00Z', temperature: -5 },
  { datetime: '2026-01-01T07:00:00Z', temperature: -10 },
  { datetime: '2026-01-01T08:00:00Z', temperature: -3 },
];

describe('buildForecastSeries', () => {
  it('limits to requested hours', () => {
    const result = buildForecastSeries(mockForecast, params, 2);
    expect(result).toHaveLength(2);
  });

  it('calculates flow temp for each entry', () => {
    const result = buildForecastSeries(mockForecast, params, 3);
    expect(result[0].tFlow).toBeGreaterThan(25);
    expect(result[1].tFlow).toBeGreaterThan(result[0].tFlow); // colder = higher flow
  });

  it('formats hour from datetime', () => {
    const result = buildForecastSeries(mockForecast, params, 1);
    expect(result[0].hour).toBeTruthy();
    expect(result[0].datetime).toBe('2026-01-01T06:00:00Z');
  });

  it('returns empty array for empty forecast', () => {
    const result = buildForecastSeries([], params, 24);
    expect(result).toHaveLength(0);
  });
});

describe('peakDemand', () => {
  it('returns entry with highest flow temp', () => {
    const result = buildForecastSeries(mockForecast, params, 3);
    const peak = peakDemand(result);
    expect(peak?.tOutdoor).toBe(-10);
  });

  it('returns undefined for empty array', () => {
    expect(peakDemand([])).toBeUndefined();
  });
});

import { describe, it, expect } from 'vitest';
import { buildCurveSeries, flowAtOutdoor } from './curve';

const params = { tTarget: 21, hc: 1.2, n: 1.25, shift: 0, minFlow: 25, maxFlow: 70 };

describe('buildCurveSeries', () => {
  it('returns correct number of points', () => {
    const series = buildCurveSeries(params, -20, 20, 50);
    expect(series).toHaveLength(50);
  });

  it('first point x equals tOutMin', () => {
    const series = buildCurveSeries(params, -20, 20);
    expect(series[0].x).toBe(-20);
  });

  it('last point x equals tOutMax', () => {
    const series = buildCurveSeries(params, -20, 20);
    expect(series[series.length - 1].x).toBe(20);
  });

  it('clamps y to minFlow at warm outdoor temps', () => {
    const series = buildCurveSeries(params, -20, 20);
    const lastPoint = series[series.length - 1];
    expect(lastPoint.y).toBe(25); // minFlow
  });
});

describe('flowAtOutdoor', () => {
  it('returns minFlow when outdoor >= target', () => {
    expect(flowAtOutdoor(params, 25)).toBe(25);
  });

  it('returns higher flow for colder outdoor temp', () => {
    const cold = flowAtOutdoor(params, -10);
    const mild = flowAtOutdoor(params, 5);
    expect(cold).toBeGreaterThan(mild);
  });
});

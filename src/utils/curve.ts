import { computeFlowTemperature, type CurveParams } from '@equitherm/core';

export { computeFlowTemperature };

export interface CurvePoint {
  x: number;  // outdoor temp
  y: number;  // flow temp
}

/** Curve parameters without tOutdoor (provided separately) */
export type CurveConfig = Omit<CurveParams, 'tOutdoor'>;

/**
 * Generate points along the heating curve for chart rendering.
 * Uses 0.1° step size for smooth hover interpolation.
 */
export function buildCurveSeries(params: CurveConfig, tOutMin: number, tOutMax: number): CurvePoint[] {
  const step = 0.1;
  const points = Math.round((tOutMax - tOutMin) / step) + 1;
  return Array.from({ length: points }, (_, i) => {
    const x = tOutMin + i * step;
    const y = computeFlowTemperature({ ...params, tOutdoor: x });
    return { x, y: parseFloat(y.toFixed(1)) };
  });
}

/**
 * Find the flow temp for a given outdoor temp on the curve.
 */
export function flowAtOutdoor(params: CurveConfig, tOutdoor: number): number {
  return computeFlowTemperature({ ...params, tOutdoor });
}

import { computeFlowTemperature, type CurveParams } from '@equitherm/core';

export { computeFlowTemperature };

export interface CurvePoint {
  x: number;  // outdoor temp
  y: number;  // flow temp
}

/** Curve parameters without tOutdoor (provided separately) */
export type CurveConfig = Omit<CurveParams, 'tOutdoor'>;

/**
 * Generate N evenly-spaced points along the heating curve for chart rendering.
 */
export function buildCurveSeries(params: CurveConfig, tOutMin: number, tOutMax: number, points = 40): CurvePoint[] {
  const step = (tOutMax - tOutMin) / (points - 1);
  return Array.from({ length: points }, (_, i) => {
    const x = tOutMin + i * step;
    const y = computeFlowTemperature({ ...params, tOutdoor: x });
    return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(1)) };
  });
}

/**
 * Find the flow temp for a given outdoor temp on the curve.
 */
export function flowAtOutdoor(params: CurveConfig, tOutdoor: number): number {
  return computeFlowTemperature({ ...params, tOutdoor });
}

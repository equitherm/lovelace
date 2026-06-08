// @source home-assistant/frontend/src/data/entity/entity.ts
// @synced 2026-06-08 @ SHA 1cca5f3

import { arrayLiteralIncludes } from "../common/array/literal-includes";

export const UNAVAILABLE = "unavailable";
export const UNKNOWN = "unknown";

export const ON = "on";
export const OFF = "off";

export const OFF_STATES = [UNAVAILABLE, UNKNOWN, OFF] as const;

export const isOffState = arrayLiteralIncludes(OFF_STATES);

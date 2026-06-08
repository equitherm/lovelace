// Custom utility functions for entity state checking and display.
// Inspired by patterns in home-assistant/frontend/src/data/entity/entity_attributes.ts
// but does not vendor upstream content — the functions here are specific to our codebase.
// Upstream entity_attributes.ts contains STATE_ATTRIBUTES, TEMPERATURE_ATTRIBUTES,
// computeShownAttributes, etc. which we don't use.

import type { HassEntity } from "home-assistant-js-websocket";
import { UNAVAILABLE, UNKNOWN } from "./entity";

export function isAvailable(stateObj: HassEntity) {
  return stateObj.state !== UNAVAILABLE;
}

export function isUnknown(stateObj: HassEntity) {
  return stateObj.state !== UNKNOWN;
}

export function getEntityPicture(stateObj: HassEntity) {
  return (
    (stateObj.attributes.entity_picture_local as string | undefined) ||
    stateObj.attributes.entity_picture
  );
}

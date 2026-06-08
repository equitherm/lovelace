// @source home-assistant/frontend/src/data/entity/entity_attributes.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// Minimal extract — only functions used by our codebase.

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

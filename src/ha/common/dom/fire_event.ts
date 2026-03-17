// src/ha/common/dom/fire_event.ts
// Polymer legacy event helper - vendored from Mushroom

import type { LovelaceCardConfig } from '../../panels/lovelace/types';

// HASS DOM Events - events used by Home Assistant frontend
export interface HASSDomEvents {
  'hass-more-info': { entityId?: string };
  'config-changed': { config: LovelaceCardConfig };
}

export type ValidHassDomEvent = keyof HASSDomEvents;

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export const fireEvent = <HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
): Event => {
  options = options || {};
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as unknown as { detail: unknown }).detail = detail;
  node.dispatchEvent(event);
  return event;
};

// src/utils/actions.ts
/**
 * Action handling utilities for Lovelace cards.
 * Based on Mushroom's action patterns.
 */
import { fireEvent } from '../ha/common/dom/fire_event';
import type { HomeAssistant, ActionConfig } from '../types';

/** Check if an action is configured (not 'none') */
export function hasAction(action?: ActionConfig): boolean {
  return action?.action !== 'none' && action?.action !== undefined;
}

/** Execute a Lovelace action (more-info, navigate, call-service, url) */
export function executeAction(
  element: HTMLElement,
  hass: HomeAssistant,
  action: ActionConfig | undefined,
  entityId?: string
): void {
  if (!action || action.action === 'none') return;

  switch (action.action) {
    case 'more-info':
      fireEvent(element, 'hass-more-info', {
        entityId: entityId ?? action.entity,
      });
      break;

    case 'navigate':
      if (action.navigation_path) {
        // Use History API directly for navigation (Mushroom pattern)
        window.history.pushState(null, '', action.navigation_path);
        window.dispatchEvent(new Event('location-changed'));
      }
      break;

    case 'call-service':
      if (action.service) {
        const [domain, service] = action.service.split('.', 2);
        hass.callService(domain, service, action.service_data ?? {});
      }
      break;

    case 'url':
      if (action.url_path) {
        window.open(action.url_path, '_blank');
      }
      break;

    case 'assist':
      // HA 2024.x+ assist action - use custom event
      element.dispatchEvent(
        new CustomEvent('hass-assist', { bubbles: true, composed: true })
      );
      break;
  }
}

/** Default actions for entity cards */
export const DEFAULT_TAP_ACTION: ActionConfig = { action: 'more-info' };
export const DEFAULT_HOLD_ACTION: ActionConfig = { action: 'more-info' };

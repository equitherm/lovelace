// src/shared/config/appearance-config.ts
import { optional, enums, object, boolean } from 'superstruct';

// Layout options
export const LAYOUTS = ['default', 'vertical', 'horizontal'] as const;
export type Layout = (typeof LAYOUTS)[number];
export const LayoutStruct = optional(enums(LAYOUTS));

// Info display options
export const INFOS = ['name', 'state', 'last-changed', 'last-updated', 'none'] as const;
export type Info = (typeof INFOS)[number];
export const InfoStruct = optional(enums(INFOS));

// Icon type options
export const ICON_TYPES = ['icon', 'entity-picture', 'none'] as const;
export type IconType = (typeof ICON_TYPES)[number];
export const IconTypeStruct = optional(enums(ICON_TYPES));

// Appearance configuration interface
export interface AppearanceConfig {
  layout?: Layout;
  hide_icon?: boolean;
  hide_state?: boolean;
  primary_info?: Info;
  secondary_info?: Info;
  icon_type?: IconType;
}

// Superstruct schema for validation
export const AppearanceConfigStruct = object({
  layout: LayoutStruct,
  hide_icon: optional(boolean()),
  hide_state: optional(boolean()),
  primary_info: InfoStruct,
  secondary_info: InfoStruct,
  icon_type: IconTypeStruct,
});

// Default values
export const APPEARANCE_DEFAULTS: AppearanceConfig = {
  layout: 'default',
  hide_icon: false,
  hide_state: false,
  primary_info: 'state',
  secondary_info: 'none',
  icon_type: 'icon',
};

// Helper to merge with defaults
export function createAppearanceConfig(config?: Partial<AppearanceConfig>): AppearanceConfig {
  return { ...APPEARANCE_DEFAULTS, ...config };
}

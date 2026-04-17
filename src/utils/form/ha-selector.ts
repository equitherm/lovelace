// src/utils/form/ha-selector.ts
/**
 * HA Selector types for form schemas.
 * Copied from mushroom (which copies from HA frontend).
 */

export interface EntitySelector {
  entity?: {
    domain?: string | string[];
    device_class?: string;
    integration?: string;
    multiple?: boolean;
  };
}

export interface NumberSelector {
  number?: {
    min?: number;
    max?: number;
    step?: number | 'any';
    mode?: 'slider' | 'box';
    unit_of_measurement?: string;
  };
}

export interface TextSelector {
  text?: {
    multiline?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  };
}

export interface BooleanSelector {
  boolean?: Record<string, never>;
}

export interface SelectSelector {
  select?: {
    options: Array<string | { value: string; label: string; image?: { src: string; src_dark?: string } }>;
    mode?: 'dropdown' | 'list' | 'buttons' | 'box';
    multiple?: boolean;
    custom_value?: boolean;
  };
}

export interface IconSelector {
  icon?: {
    placeholder?: string;
  };
}

export interface ColorSelector {
  color_rgb?: Record<string, never>;
}

export interface EntityNameSelector {
  entity_name?: {
    entity_id?: string;
    default_name?: string | string[];
  };
}

export type Selector =
  | EntitySelector
  | NumberSelector
  | TextSelector
  | BooleanSelector
  | SelectSelector
  | IconSelector
  | ColorSelector
  | EntityNameSelector;

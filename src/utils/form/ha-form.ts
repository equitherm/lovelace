// src/utils/form/ha-form.ts
/**
 * HA Form schema types.
 * Copied from mushroom (which copies from HA frontend).
 */
import type { Selector } from './ha-selector';

export interface HaFormBaseSchema {
  name: string;
  default?: HaFormData;
  required?: boolean;
  disabled?: boolean;
  context?: Record<string, string>;
  description?: {
    suffix?: string;
    suggested_value?: HaFormData;
  };
}

export interface HaFormSelectorSchema extends HaFormBaseSchema {
  type?: never;
  selector: Selector;
}

export interface HaFormGridSchema extends HaFormBaseSchema {
  type: 'grid';
  flatten?: boolean;
  column_min_width?: string;
  schema: readonly HaFormSchema[];
}

export interface HaFormExpandableSchema extends HaFormBaseSchema {
  type: 'expandable';
  flatten?: boolean;
  title?: string;
  icon?: string;
  iconPath?: string;
  expanded?: boolean;
  schema: readonly HaFormSchema[];
}

export type HaFormSchema =
  | HaFormSelectorSchema
  | HaFormGridSchema
  | HaFormExpandableSchema;

export type HaFormData = string | number | boolean | string[] | null;

export type HaFormDataContainer = Record<string, HaFormData>;

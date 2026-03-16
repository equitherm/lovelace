// src/utils/editor.ts
/**
 * Shared editor utilities for ha-form based card editors.
 * Types match Home Assistant's internal form schema structure.
 */

/** HA form selector types */
export interface HaFormSelector {
  entity?: { domain?: string | string[]; device_class?: string };
  number?: { min: number; max: number; step?: number; mode?: 'slider' | 'box' };
  text?: Record<string, never>;
  boolean?: Record<string, never>;
}

/** Base schema field */
export interface HaFormSchemaBase {
  name: string;
  required?: boolean;
  selector?: HaFormSelector;
}

/** Grid layout for side-by-side fields */
export interface HaFormGridSchema extends HaFormSchemaBase {
  type: 'grid';
  flatten?: boolean;
  schema: HaFormSchemaBase[];
}

/** Collapsible section */
export interface HaFormExpandableSchema extends HaFormSchemaBase {
  type: 'expandable';
  title: string;
  icon?: string;
  schema: (HaFormSchemaBase | HaFormGridSchema)[];
}

export type HaFormSchema = HaFormSchemaBase | HaFormGridSchema | HaFormExpandableSchema;

/** Reusable schema field builders */
export const schemaHelpers = {
  /** Create an entity selector field */
  entity: (
    name: string,
    opts: { domain?: string | string[]; device_class?: string; required?: boolean } = {}
  ): HaFormSchemaBase => ({
    name,
    required: opts.required ?? true,
    selector: { entity: { domain: opts.domain, device_class: opts.device_class } },
  }),

  /** Create a number slider field */
  number: (
    name: string,
    min: number,
    max: number,
    step = 1,
    mode: 'slider' | 'box' = 'slider'
  ): HaFormSchemaBase => ({
    name,
    required: true,
    selector: { number: { min, max, step, mode } },
  }),

  /** Create a text input field */
  text: (name: string, required = false): HaFormSchemaBase => ({
    name,
    required,
    selector: { text: {} },
  }),

  /** Group fields side-by-side in a grid */
  grid: (fields: HaFormSchemaBase[]): HaFormGridSchema => ({
    type: 'grid',
    name: '',
    schema: fields,
  }),

  /** Create a collapsible section */
  expandable: (
    title: string,
    icon: string,
    schema: (HaFormSchemaBase | HaFormGridSchema)[]
  ): HaFormExpandableSchema => ({
    type: 'expandable',
    title,
    icon,
    name: '',
    schema,
  }),
};

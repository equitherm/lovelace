// src/utils/form/schema-helpers.ts
/**
 * Reusable schema field builders for ha-form.
 */
import type { HaFormSchema, HaFormSelectorSchema, HaFormGridSchema, HaFormExpandableSchema } from './ha-form';

/** Create an entity selector field */
export function entity(
  name: string,
  opts: { domain?: string | string[]; device_class?: string; required?: boolean } = {}
): HaFormSelectorSchema {
  return {
    name,
    required: opts.required ?? true,
    selector: { entity: { domain: opts.domain, device_class: opts.device_class } },
  };
}

/** Create a number field */
export function number(
  name: string,
  min: number,
  max: number,
  step = 1,
  opts: { mode?: 'slider' | 'box'; unit_of_measurement?: string; required?: boolean; default?: number } = {},
): HaFormSelectorSchema {
  return {
    name,
    required: opts.required ?? false,
    ...(opts.default !== undefined && { default: opts.default }),
    selector: { number: { min, max, step, mode: opts.mode ?? 'box', unit_of_measurement: opts.unit_of_measurement } },
  };
}

/** Create a text input field */
export function text(name: string, required = false): HaFormSelectorSchema {
  return {
    name,
    required,
    selector: { text: {} },
  };
}

/** Create an entity name picker field */
export function entityName(name: string, context?: Record<string, string>): HaFormSelectorSchema {
  return {
    name,
    selector: { entity_name: {} },
    context,
  };
}

/** Group fields side-by-side in a grid */
export function grid(fields: HaFormSelectorSchema[]): HaFormGridSchema {
  return {
    type: 'grid',
    name: '',
    schema: fields,
  };
}

/** Create a collapsible section */
export function expandable(
  title: string,
  icon: string,
  schema: (HaFormSelectorSchema | HaFormGridSchema)[]
): HaFormExpandableSchema {
  return {
    type: 'expandable',
    flatten: true,
    title,
    icon,
    name: '',
    schema,
  };
}

/** Convenience object for namespaced imports */
export const schemaHelpers = {
  entity,
  number,
  text,
  entityName,
  grid,
  expandable,
};

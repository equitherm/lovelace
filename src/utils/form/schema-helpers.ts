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

/** Create a number slider field */
export function number(
  name: string,
  min: number,
  max: number,
  step = 1,
  mode: 'slider' | 'box' = 'slider'
): HaFormSelectorSchema {
  return {
    name,
    required: true,
    selector: { number: { min, max, step, mode } },
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
    title,
    icon,
    name: '',
    schema,
  };
}

/** Reusable schema field builders (object form for backward compatibility) */
export const schemaHelpers = {
  entity,
  number,
  text,
  grid,
  expandable,
};

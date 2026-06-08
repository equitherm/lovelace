// @source home-assistant/frontend/src/common/array/literal-includes.ts
// @synced 2026-06-08 @ SHA 1cca5f3

/**
 * Creates a type predicate function for determining if an array literal includes a given value
 * @param array - The array to check
 * @returns A type predicate function
 */
export const arrayLiteralIncludes =
  <T extends readonly unknown[]>(array: T) =>
  (searchElement: unknown, fromIndex?: number): searchElement is T[number] =>
    array.includes(searchElement as T[number], fromIndex);

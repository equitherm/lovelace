// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) return false;
    let i: number | [any, any];
    let length: number;
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      for (i of a.entries()) if (!deepEqual(i[1], b.get(i[0]))) return false;
      return true;
    }
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = (a as any).length;
      if (length !== (b as any).length) return false;
      for (i = length; i-- !== 0;) if ((a as any)[i] !== (b as any)[i]) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === (b as RegExp).source && a.flags === (b as RegExp).flags;
    if ((a as any).valueOf !== Object.prototype.valueOf) return (a as any).valueOf() === (b as any).valueOf();
    if ((a as any).toString !== Object.prototype.toString) return (a as any).toString() === (b as any).toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0;) { const key = keys[i]; if (!deepEqual((a as any)[key], (b as any)[key])) return false; }
    return true;
  }
  return a !== a && b !== b;
};

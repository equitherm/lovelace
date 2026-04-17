// Backported from HA frontend src/common/string/slugify.ts

export const slugify = (string: string, separator = "-"): string => {
  return string
    .toLowerCase()
    .replace(/[\s\W-]+/g, separator)
    .replace(new RegExp(`\\${separator}$`), "");
};

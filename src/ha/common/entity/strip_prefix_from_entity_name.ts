const SUFFIXES = [" ", ": ", " - "];

/**
 * Strips a device name from an entity name.
 */
export const stripPrefixFromEntityName = (
  entityName: string,
  prefix: string
) => {
  const lowerCasedEntityName = entityName.toLowerCase();
  const lowerCasedPrefix = prefix.toLowerCase();
  for (const suffix of SUFFIXES) {
    const lowerCasedPrefixWithSuffix = `${lowerCasedPrefix}${suffix}`;

    if (lowerCasedEntityName.startsWith(lowerCasedPrefixWithSuffix)) {
      const newName = entityName.substring(lowerCasedPrefixWithSuffix.length);
      if (newName.length) {
        return hasUpperCase(newName.substring(0, newName.indexOf(" ")))
          ? newName
          : newName[0].toUpperCase() + newName.slice(1);
      }
    }
  }

  return undefined;
};

const hasUpperCase = (str: string): boolean => str.toLowerCase() !== str;

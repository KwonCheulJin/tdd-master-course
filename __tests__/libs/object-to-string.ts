/* eslint-disable @typescript-eslint/no-explicit-any */
export const objectToString = (obj: any): string => {
  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return `[${obj.map(item => objectToString(item)).join(', ')}]`;
    } else if (obj instanceof Date) {
      return `new Date("${obj.toISOString()}")`;
    } else {
      const entries = Object.entries(obj)
        .map(([key, value]) => `${key}: ${objectToString(value)}`)
        .join(', ');
      return `{${entries}}`;
    }
  }

  if (typeof obj === 'string') {
    return `"${obj}"`;
  }
  return String(obj);
};

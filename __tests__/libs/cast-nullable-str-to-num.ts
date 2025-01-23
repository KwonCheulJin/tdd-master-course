export const castNullableStrToNum = (str: string | null): number | null => {
  if (str === null) return null;
  if (isNaN(Number(str))) return null;
  return Number(str);
};

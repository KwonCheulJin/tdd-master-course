import { castNullableStrToNum } from '__tests__/libs/cast-nullable-str-to-num';
import { describe, expect, test } from 'vitest';

describe('castNullableStrToNum', () => {
  test.each([
    {
      str: null,
      expected: null,
    },
    {
      str: 'abc',
      expected: null,
    },
    {
      str: '123',
      expected: 123,
    },
  ])('$str -> $expected', ({ str, expected }) => {
    const result = castNullableStrToNum(str);

    expect(result).toEqual(expected);
  });
});

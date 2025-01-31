import { localizeDate } from '@/libs/sub-string';
import { expect, test } from 'vitest';

test('localizeDate', () => {
  const date = new Date('2024-12-24T12:00:00');
  const expected = '2024년 12월 24일';

  const result = localizeDate(date);

  expect(result).toEqual(expected);
});

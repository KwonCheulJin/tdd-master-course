import {
  validateBody,
  validateTitle,
} from '@/domains/content/content-validation';
import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';

describe('validate title', () => {
  test.each([
    {
      title: faker.string.sample(1),
      expected: false,
    },
    {
      title: faker.string.sample(81),
      expected: false,
    },
    {
      title: faker.string.sample(2),
      expected: true,
    },
  ])(`$title($title.length) -> $expected`, ({ title, expected }) => {
    const result = validateTitle(title);

    expect(result).toEqual(expected);
  });
});

describe('validate body', () => {
  test.each([
    {
      body: faker.string.sample(20001),
      expected: false,
    },
    {
      body: faker.string.sample(20000),
      expected: true,
    },
  ])(`$body($body.length) -> $expected`, ({ body, expected }) => {
    const result = validateBody(body);

    expect(result).toEqual(expected);
  });
});

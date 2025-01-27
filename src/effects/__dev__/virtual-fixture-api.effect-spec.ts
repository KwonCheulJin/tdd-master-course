import { virtualFixtureApi } from '@/effects/__dev__/virtual-fixture-api.effect';
import { describe, expect, test } from 'vitest';

describe('virtualFixtureApi', () => {
  describe('reset', () => {
    test('호출에 성공하면 status 201', async () => {
      const response = await virtualFixtureApi.reset();

      expect(response.status).toEqual(201);
    });
  });
});

'use server';

import { virtualFixtureApi } from '@/effects/__dev__/virtual-fixture-api.effect';

export const resetVirtualFixtureAction = async () => {
  await virtualFixtureApi.reset();
};

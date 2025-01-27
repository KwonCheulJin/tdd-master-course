import { contentFixtures } from '__tests__/fixture/contents';
import { userFixtures } from '__tests__/fixture/users';
import { cloneDeep } from 'radashi';

export const reset = () => {
  globalThis.virtual = {
    contents: cloneDeep(contentFixtures),
    users: cloneDeep(userFixtures),
  };
};

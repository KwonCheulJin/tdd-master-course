import { ContentView } from '@/domains/content/type';
import { contentApi } from '@/effects/main/content-api.effect';
import { contentFixture } from '__tests__/fixture/content';
import { userFixture } from '__tests__/fixture/user';
import { omit } from 'radashi';
import { describe, expect, test } from 'vitest';

describe('contentApi', () => {
  test('fineOne', async () => {
    const content = contentFixture[0];
    const author = userFixture[0];

    const id = content.id;
    const expected: ContentView = {
      ...omit(content, ['authorId']),
      author,
    };

    const response = await contentApi.findOne(id);
    expect(response.status).toEqual(200);
    if (response.status !== 200) throw new Error();
    expect(response.data.content).toEqual(expected);
  });
});

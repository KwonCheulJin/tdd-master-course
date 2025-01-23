import { PAGE_TAKE } from '@/components/organisms/contents-main/constant';
import { ContentView } from '@/domains/content/type';
import { contentApi } from '@/effects/main/content-api.effect';
import { contentFixtures } from '__tests__/fixture/content';
import { userFixtures } from '__tests__/fixture/user';
import { omit } from 'radashi';
import { describe, expect, test } from 'vitest';

describe('contentApi', () => {
  test('findAll', async () => {
    const pageNum = 1;
    // const sort = contentSortOption.titleAsc;
    const content = contentFixtures[3];
    const search = content.title.slice(0, 10);

    const response = await contentApi.findAll({
      pageTake: PAGE_TAKE,
      pageNum,
      search,
    });
    expect(response.status).toEqual(200);
    expect(response.data.contents[0].title).toEqual(content.title);
    expect(response.data.contents).toHaveLength(1);
  });

  test('countAll', async () => {
    const search = contentFixtures[0].title;

    const response = await contentApi.countAll(search);
    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
  test('fineOne', async () => {
    const content = contentFixtures[0];
    const author = userFixtures[0];

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

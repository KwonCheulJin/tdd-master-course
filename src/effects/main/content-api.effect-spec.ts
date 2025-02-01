import { PAGE_TAKE } from '@/components/organisms/contents-main/constant';
import { ContentView } from '@/domains/content/type';
import { contentApi } from '@/effects/main/content-api.effect';
import { contentFixtures } from '__tests__/fixture/contents';
import { userFixtures } from '__tests__/fixture/users';
import { gen } from '__tests__/generator';
import { reset } from '__tests__/mock-api/virtual/setup';
import { omit } from 'radashi';
import { describe, expect, test } from 'vitest';

describe('contentApi', () => {
  test('findAll', async () => {
    const pageNum = 1;
    // const sort = contentSortOption.titleAsc;
    const content = contentFixtures[3];
    const search = content.title.slice(0, 10).toLowerCase();

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

  test('fineMyOne', async () => {
    const content = contentFixtures[0];
    const author = userFixtures[0];

    const id = content.id;

    const response = await contentApi.findMyOne(id, author.nickname);

    expect(response.status).toEqual(200);
    expect(response).toHaveProperty('data.content');
  });

  test('create', async () => {
    const user = userFixtures[0];

    const authorization = user.nickname;
    const title = gen.content.title();
    const body = gen.content.body();
    const thumbnail = gen.img();
    const expected = { title, body, thumbnail, authorId: user.id };

    const response = await contentApi.create({
      authorization,
      title,
      body,
      thumbnail,
    });
    expect(response.status).toEqual(201);
    if (response.status !== 201) throw new Error();
    expect(response.data.content).toMatchObject(expected);
    expect(response.data.content.id).toBeUuid();
    expect(response.data.content.createdAt).toBeCloseDate(new Date());

    reset();
  });

  test('edit', async () => {
    const user = userFixtures[0];
    const content = contentFixtures[0];
    const authorization = user.nickname;
    const title = gen.content.title();
    const body = gen.content.body();
    const thumbnail = gen.img();
    const expected = { ...content, title, body, thumbnail };

    const response = await contentApi.edit({
      authorization,
      id: content.id,
      title,
      body,
      thumbnail,
    });
    expect(response.status).toEqual(200);
    if (response.status !== 200) throw new Error();

    expect(response.data.content).toEqual(expected);

    reset();
  });
  test('delete', async () => {
    const user = userFixtures[1];
    const content = contentFixtures[0];

    const authorization = user.nickname;

    const response = await contentApi.delete({
      authorization,
      id: content.id,
    });
    expect(response.status).toEqual(404);
  });
});

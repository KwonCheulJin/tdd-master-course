// src/mocks/handlers.js
import { Content } from '@/domains/content/entity';
import { ContentView } from '@/domains/content/type';
import { contentFixtures } from '__tests__/fixture/content';
import { contentCreated } from '__tests__/fixture/create-content';
import { userFixtures } from '__tests__/fixture/user';
import { castNullableStrToNum } from '__tests__/libs/cast-nullable-str-to-num';
import { http, HttpResponse } from 'msw';
import { omit } from 'radashi';

export const contentsHandler = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`,
    ({ request }) => {
      const url = new URL(request.url);

      const pageTake = castNullableStrToNum(url.searchParams.get('pageTake'));
      const pageNum = castNullableStrToNum(url.searchParams.get('pageNum'));
      const sort = url.searchParams.get('sort');
      const search = url.searchParams.get('search');

      if (pageTake === null || pageNum === null)
        return HttpResponse.json({
          status: 400,
        });
      const startAt = (pageNum - 1) * pageTake;
      const endAt = pageNum * pageTake;
      let inter = contentFixtures;

      if (search !== null) {
        inter = inter.filter(c => c.title.toLowerCase().includes(search));
      }

      if (sort !== null) {
        inter = inter.toSorted((a, b) => {
          if (sort === 'title-asc') {
            return a.title > b.title ? 1 : -1;
          }
          return a.createdAt > b.createdAt ? -1 : 1;
        });
      }

      const contents = inter.slice(startAt, endAt).map(c => {
        const author = userFixtures.find(user => c.authorId === user.id);
        if (!author) throw new Error('Not found Author');
        const content: ContentView = {
          ...omit(c, ['authorId']),
          author,
        };

        return content;
      });

      return HttpResponse.json({
        data: { contents },
        status: 200,
      });
    }
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/count`,
    ({ request }) => {
      const url = new URL(request.url);

      const search = url.searchParams.get('search');

      const filtered = search
        ? contentFixtures.filter(c => c.title.includes(search))
        : contentFixtures;

      const count = filtered.length;
      return HttpResponse.json({
        data: { count },
        status: 200,
      });
    }
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/${contentCreated.id}`,
    () => {
      const author = userFixtures.find(c => c.id === contentCreated.authorId);
      if (!author) throw new Error();

      const content: ContentView = {
        ...omit(contentCreated, ['authorId']),
        author,
      };

      return HttpResponse.json({
        data: { content },
        status: 200,
      });
    }
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/:id`,
    ({ params }) => {
      const { id } = params;
      if (typeof id !== 'string') {
        return HttpResponse.json({
          status: 400,
        });
      }
      const found = contentFixtures.find(c => c.id === id);
      if (!found) {
        return HttpResponse.json({
          status: 404,
        });
      }

      const author = userFixtures.find(c => c.id === found.authorId);
      if (!author) throw new Error();

      const content: ContentView = {
        ...omit(found, ['authorId']),
        author,
      };

      return HttpResponse.json({
        data: { content },
        status: 200,
      });
    }
  ),
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`,
    ({ request }) => {
      const { headers } = request;

      const auth = headers.get('authorization');
      const user = userFixtures.find(c => c.nickname === auth);

      if (user === undefined) {
        return HttpResponse.json({
          status: 401,
        });
      }

      const content: Content = {
        ...contentCreated,
        createdAt: new Date(),
      };

      return HttpResponse.json({
        data: { content },
        status: 201,
      });
    }
  ),
];

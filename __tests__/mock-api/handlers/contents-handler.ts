// src/mocks/handlers.js
import { ContentView } from '@/domains/content/type';
import { contentFixture } from '__tests__/fixture/content';
import { userFixture } from '__tests__/fixture/user';
import { http, HttpResponse } from 'msw';
import { omit } from 'radashi';

export const contentsHandler = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`, () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/:id`,
    ({ params }) => {
      const { id } = params;
      if (typeof id !== 'string') {
        return HttpResponse.json({
          status: 400,
        });
      }
      const found = contentFixture.find(c => c.id === id);
      if (!found) {
        return HttpResponse.json({
          status: 404,
        });
      }

      const author = userFixture.find(c => c.id === found.authorId);
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
];

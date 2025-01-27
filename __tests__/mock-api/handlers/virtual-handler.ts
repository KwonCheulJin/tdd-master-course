import { reset } from '__tests__/mock-api/virtual/setup';
import { http, HttpResponse } from 'msw';

export const virtualHandler = [
  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual/reset`, () => {
    reset();
    return HttpResponse.json({
      status: 201,
    });
  }),
];

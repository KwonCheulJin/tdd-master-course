// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const contentsHandler = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`, () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];

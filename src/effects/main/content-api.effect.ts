import { ContentView } from '@/domains/content/type';
import { jsonDateParser } from 'json-date-parser';
export const contentApi = {
  async findOne(id: string): Promise<
    | {
        data: {
          content: ContentView;
        };
        status: 200;
      }
    | {
        status: 404;
      }
  > {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents/${id}`
    );
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
};

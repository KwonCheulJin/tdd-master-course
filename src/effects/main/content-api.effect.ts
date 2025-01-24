import { Content } from '@/domains/content/entity';
import { ContentSortOption, ContentView } from '@/domains/content/type';
import { jsonDateParser } from 'json-date-parser';
import qs from 'qs';

export const contentApi = {
  async findAll(query: {
    pageTake: number;
    pageNum: number;
    sort?: ContentSortOption;
    search?: string;
  }): Promise<{
    data: {
      contents: Array<ContentView>;
    };
    status: 200;
  }> {
    const relative = `/contents?${qs.stringify(query)}`;
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${relative}`
    );
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
  async countAll(search?: string): Promise<{
    data: {
      count: number;
    };
    status: 200;
  }> {
    const relative = search
      ? `/contents/count?${qs.stringify({ search })}`
      : `/contents/count`;
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${relative}`
    );
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
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
  async create({
    authorization,
    ...body
  }: Pick<Content, 'title' | 'body' | 'thumbnail'> & {
    authorization: string;
  }): Promise<
    | {
        data: {
          content: Content;
        };
        status: 201;
      }
    | {
        status: 400;
      }
    | {
        status: 401;
      }
  > {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`;
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
      body: JSON.stringify(body),
    });
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
};

'use server';

import { Content } from '@/domains/content/entity';
import { contentApi } from '@/effects/main/content-api.effect';
import { cookies } from 'next/headers';

export const editContentAction = async (
  partial: Pick<Content, 'title' | 'body' | 'thumbnail' | 'id'>
) => {
  const cookieStore = await cookies();

  const authorization = cookieStore.get('authorization')?.value;
  if (authorization === undefined) return undefined;

  const response = await contentApi.edit({ authorization, ...partial });
  if (response.status !== 200) return undefined;

  return response.data.content;
};

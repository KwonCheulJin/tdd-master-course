import { contentSortOption } from '@/domains/content/constants';
import { Content } from '@/domains/content/entity';
import { User } from '@/domains/user/entity';

export interface ContentView extends Omit<Content, 'authorId'> {
  author: User;
}

export type ContentSortOption =
  (typeof contentSortOption)[keyof typeof contentSortOption];

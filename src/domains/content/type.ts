import { Content } from '@/domains/content/entity';
import { User } from '@/domains/user/entity';

export interface ContentView extends Omit<Content, 'authorId'> {
  author: User;
}

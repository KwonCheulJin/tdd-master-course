/* eslint-disable no-var */
import { Content } from '@/domains/content/entity';

export declare global {
  var virtual: {
    contents: Array<Content>;
    users: Array<User>;
  };
}

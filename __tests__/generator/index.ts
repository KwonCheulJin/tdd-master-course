import { Content } from '@/domains/content/entity';
import { User } from '@/domains/user/entity';
import { faker } from '@faker-js/faker';
import { draw } from 'radashi';

const imgPath = [
  '/file.svg',
  '/globe.svg',
  '/next.svg',
  '/vercerl.svg',
  '/window.svg',
];
export const gen = {
  img: () => draw(imgPath) as string,
  content: {
    instance: (partial?: Partial<Content>): Content => ({
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      title: faker.book.title(),
      body: faker.word.words({ count: { min: 5, max: 25 } }),
      thumbnail: gen.img(),
      authorId: faker.string.uuid(),
      ...partial,
    }),
  },
  user: {
    instance: (partial?: Partial<User>): User => ({
      id: faker.string.uuid(),
      nickname: faker.person.firstName(),
      imgUrl: gen.img(),
      ...partial,
    }),
  },
};

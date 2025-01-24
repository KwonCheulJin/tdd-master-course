import { uploadImg } from '@/effects/image/image.effect';
import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';

describe('uploadImg', () => {
  test('업로드에 성공하면 리턴 타입이 string이다', async () => {
    const imageFile = new File([], `${faker.string.alpha()}.png`);

    const result = await uploadImg(imageFile);

    expect(typeof result).toEqual('string');
  });
});

import { gen } from '__tests__/generator';
import { objectToString } from '__tests__/lib/object-to-string';
import { list } from 'radashi';

const main = (len: number) => {
  const instance = list(0, len - 1).map(() => gen.content.instance());
  const str = objectToString(instance);
  console.log('🚀 ~ main ~ instance:', str);
};

main(1);

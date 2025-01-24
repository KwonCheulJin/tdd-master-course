import { userFixtures } from '__tests__/fixture/user';
import { gen } from '__tests__/generator';
import { objectToString } from '__tests__/libs/object-to-string';
import fs from 'fs';
import path from 'path';
import { list } from 'radashi';
import { fileURLToPath } from 'url';

const main = (len: number) => {
  const instance = list(0, len - 1).map(() => {
    const user = userFixtures[0];
    return gen.content.instance({ authorId: user.id });
  });
  const str = objectToString(instance);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, '../fixture/create-content.ts');
  const fileContent = `import { Content } from '@/domains/content/entity';

  export const contentCreated: Content = ${str};
  `;
  fs.writeFileSync(filePath, fileContent);
};

main(1);

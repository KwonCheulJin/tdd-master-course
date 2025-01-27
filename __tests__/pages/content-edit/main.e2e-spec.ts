import { localizeDate } from '@/libs/sub-string';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { contentFixtures } from '__tests__/fixture/contents';
import { imgFileName } from '__tests__/fixture/file-name';
import { userFixtures } from '__tests__/fixture/users';
import { gen } from '__tests__/generator';
import { Helper } from '__tests__/pages/content-edit/helper';
import { guardTest, headerTest } from '__tests__/playwright/shared-test';

test.describe('content-edit page', () => {
  const getUrl = (id: string) => `/contents/${id}/edit`;
  test.describe('guard', () => {
    const content = contentFixtures[0];
    const redirectUrl = '/users/sign-in';
    const url = getUrl(content.id);

    guardTest.private(url, redirectUrl);
    test('컨텐츠를 찾지 못했다면, "/contents"로 리다이랙트', async ({
      page,
      context,
    }) => {
      const user = userFixtures[0];
      const helper = new Helper(page, context);

      const id = faker.string.uuid();

      await helper.signin(user.nickname);
      await helper.gotoTargetPage(id);
      await helper.strictHaveUrl('/contents');
    });

    test('컨텐츠는 존재하지만 작성자가 아닌 경우, "/contents"로 리다이랙트', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[1];
      const helper = new Helper(page, context);

      await helper.signin(user.nickname);
      await helper.gotoTargetPage(content.id);
      await helper.strictHaveUrl('/contents');
    });
  });
  test.describe('header', () => {
    const content = contentFixtures[0];
    const url = getUrl(content.id);
    headerTest.singIn(url);

    test('방문하면 "{작성자}님 블로그"가 보인다.', async ({
      page,
      context,
    }) => {
      const helper = new Helper(page, context);
      const content = contentFixtures[0];
      const user = userFixtures[0];

      await helper.signin(user.nickname);
      await helper.gotoTargetPage(content.id);
      await expect(
        page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
      ).toBeVisible();
    });
  });
  test.describe('form', () => {
    test('initial status.', async ({ page, context }) => {
      const content = contentFixtures[0];
      const user = userFixtures[0];
      const helper = new Helper(page, context);

      await helper.signin(user.nickname);
      await helper.gotoTargetPage(content.id);

      await expect(helper.getTitle).toHaveText(content.title);
      await expect(helper.getBody).toHaveText(content.body);
      await expect(helper.getThumbnailSrc).toHaveAttribute(
        'src',
        content.thumbnail
      );
      await expect(helper.getForm).toContainText(user.nickname);
      await expect(helper.getForm).toContainText(
        localizeDate(content.createdAt)
      );
    });
    test.describe('input image', () => {
      test('이미지를 업로드하면 썸네일 미리보기의 주소가 변경된다.', async ({
        page,
        context,
      }) => {
        const content = contentFixtures[0];
        const user = userFixtures[0];
        const helper = new Helper(page, context);

        await helper.signin(user.nickname);
        await helper.gotoTargetPage(content.id);

        await expect(helper.getThumbnailSrc).toHaveAttribute(
          'src',
          content.thumbnail
        );
        const setFile = helper.uploadFile();
        await helper.getThumbnail.evaluate((el: HTMLInputElement) =>
          el.click()
        );
        await setFile(imgFileName);

        await expect(helper.getThumbnailSrc).not.toHaveAttribute(
          'src',
          content.thumbnail
        );
      });
    });
    test.describe('validation', () => {
      const content = contentFixtures[0];
      const user = userFixtures[0];
      test.beforeEach(
        '로그인 후 컨텐츠 수정 페이지로 이동',
        async ({ page, context }) => {
          const helper = new Helper(page, context);

          await helper.signin(user.nickname);
          await helper.gotoTargetPage(content.id);
        }
      );
      test('title 길이가 81일 때, 생성하기 버튼 disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(81);

        const helper = new Helper(page, context);

        await helper.fillForm({
          body: gen.content.body(),
        });
        await expect(helper.getSubmit).toBeEnabled();

        await helper.fillForm({
          title,
        });
        await expect(helper.getSubmit).toBeDisabled();
      });
      test('title 길이가 1일 때, 생성하기 버튼 disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(1);

        const helper = new Helper(page, context);

        await helper.fillForm({
          body: gen.content.body(),
        });
        await expect(helper.getSubmit).toBeEnabled();

        await helper.fillForm({
          title,
        });
        await expect(helper.getSubmit).toBeDisabled();
      });
      test('body 길이가 20001일 때, 생성하기 버튼 disabled', async ({
        page,
        context,
      }) => {
        const body = faker.string.sample(20001);

        const helper = new Helper(page, context);

        await helper.fillForm({
          title: gen.content.title(),
        });
        await expect(helper.getSubmit).toBeEnabled();

        await helper.fillForm({
          body,
        });

        await expect(helper.getSubmit).toBeDisabled();
      });

      test('만약에 컨텐츠 내용이 변경이 되지 않았다면 수정하기 버튼이 비활성화 된다.', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(2);

        const helper = new Helper(page, context);

        await helper.fillForm({
          title,
        });

        await expect(helper.getSubmit).toBeEnabled();

        await helper.fillForm({
          title: content.title,
        });

        await expect(helper.getSubmit).toBeDisabled();
      });
    });
    test('수정이 완료되면 원본 데이터가 수정된다.', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[0];
      const title = gen.content.title();
      const body = gen.content.body();
      const fileName = imgFileName;

      const helper = new Helper(page, context);

      await helper.signin(user.nickname);
      await helper.gotoTargetPage(content.id);

      await helper.fillForm({
        title,
        body,
        fileName,
      });

      await helper.getSubmit.click();

      await helper.strictHaveUrl(`/contents/${content.id}`);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);

      await helper.resetVirtualFixtures();
    });
  });
});

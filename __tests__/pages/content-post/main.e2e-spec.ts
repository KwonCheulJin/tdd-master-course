import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { imgFileName } from '__tests__/fixture/file-name';
import { userFixtures } from '__tests__/fixture/users';
import { gen } from '__tests__/generator';
import { uuidGlobalRegExp } from '__tests__/libs/reg.exp';
import { Helper } from '__tests__/pages/content-post/helper';
import { guardTest, headerTest } from '__tests__/playwright/shared-test';

test.describe('content-post page', () => {
  const url = '/contents/post';
  const redirectUrl = '/users/sign-in';
  test.describe('guard', () => {
    guardTest.private(url, redirectUrl);
  });
  test.describe('header', () => {
    headerTest.singIn(url);
  });
  test.describe('form', () => {
    test.beforeEach(async ({ page, context }) => {
      const helper = new Helper(page, context);
      const user = userFixtures[0];

      await helper.signin(user.nickname);
      await helper.gotoTargetPage();
    });
    test.describe('input image', () => {
      test('이미지를 업로드하면 썸네일 미리보기의 주소가 변경된다.', async ({
        page,
        context,
      }) => {
        const helper = new Helper(page, context);

        const setFile = helper.uploadFile();
        await helper.getThumbnail.evaluate((el: HTMLInputElement) =>
          el.click()
        );
        await setFile(imgFileName);

        await expect(helper.getThumbnailSrc).not.toHaveAttribute(
          'src',
          '/file.svg'
        );
      });
    });
    test.describe('validation', () => {
      test('title 길이가 81일 때, 생성하기 버튼 disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(81);

        const helper = new Helper(page, context);
        await helper.setUpValidation();
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
        await helper.setUpValidation();
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
        await helper.setUpValidation();
        await helper.fillForm({
          body,
        });

        await expect(helper.getSubmit).toBeDisabled();
      });
      test('썸네일이 선택되지 않았을 때, 생성하기 버튼 disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(2);

        const helper = new Helper(page, context);

        await helper.fillForm({
          title,
        });

        await page.waitForTimeout(2 * 1000);
        await expect(helper.getSubmit).toBeDisabled();
      });
    });

    test('컨텐츠 생성이 성공하면, 컨텐츠 상세 페이지로 리다이렉트 된다.', async ({
      page,
      context,
    }) => {
      const helper = new Helper(page, context);

      const title = gen.content.title();
      const body = gen.content.body();
      const fileName = imgFileName;

      await helper.fillForm({
        title,
        body,
        fileName,
      });

      await helper.getSubmit.click();

      const url = new RegExp(
        `^${helper.baseUrl}/contents/${uuidGlobalRegExp.source}$`
      );

      await expect(page).toHaveURL(url);
      await expect(page.getByText(title)).toBeVisible();

      await helper.resetVirtualFixtures();
    });
  });
});

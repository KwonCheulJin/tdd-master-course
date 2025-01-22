import { expect, test } from '@playwright/test';
import { contentFixture } from '__tests__/fixture/content';
import { userFixture } from '__tests__/fixture/user';
import { BaseHelper } from '__tests__/playwright/base-helper';

const getUrl = (id: string) => `/contents/${id}`;

test.describe('header', () => {
  test('로그인 되지 않은 사용자는 로그인 버튼이 보인다', async ({ page }) => {
    const content = contentFixture[0];

    const url = getUrl(content.id);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('link', { name: '로그인' })
    ).toBeVisible();
  });
  test('로그인 된 사용자는 유저 메뉴가 보인다.', async ({ page, context }) => {
    const helper = new BaseHelper(page, context);
    const content = contentFixture[0];
    const user = userFixture[0];
    const url = getUrl(content.id);

    await helper.signin(user.nickname);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('button', { name: 'user-menu' })
    ).toBeVisible();
  });
  test('방문하면 "{작성자}님 블로그"가 보인다.', async ({ page }) => {
    const content = contentFixture[0];
    const user = userFixture[0];

    const url = getUrl(content.id);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
    ).toBeVisible();
  });
});

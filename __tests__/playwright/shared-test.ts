import { expect, test } from '@playwright/test';
import { userFixtures } from '__tests__/fixture/user';
import { BaseHelper } from '__tests__/playwright/base-helper';

export const headerTest = (url: string) => {
  test('로그인 되지 않은 사용자는 로그인 버튼이 보인다', async ({ page }) => {
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('link', { name: '로그인' })
    ).toBeVisible();
  });
  test('로그인 된 사용자는 유저 메뉴가 보인다.', async ({ page, context }) => {
    const helper = new BaseHelper(page, context);
    const user = userFixtures[0];

    await helper.signin(user.nickname);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('button', { name: 'user-menu' })
    ).toBeVisible();
  });
};

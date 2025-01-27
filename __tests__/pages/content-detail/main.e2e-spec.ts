import { localizeDate } from '@/libs/sub-string';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { contentFixtures } from '__tests__/fixture/contents';
import { userFixtures } from '__tests__/fixture/users';
import { Helper } from '__tests__/pages/content-detail/helper';
import { headerTest } from '__tests__/playwright/shared-test';

const getUrl = (id: string) => `/contents/${id}`;

test.describe('guard', () => {
  test('컨텐츠를 찾지 못했다면, "/contents"로 리다이랙트', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);

    const id = faker.string.uuid();

    await helper.gotoTargetPage(id);
    await helper.strictHaveUrl('/contents');
  });
});
test.describe('header', () => {
  const content = contentFixtures[0];
  const url = getUrl(content.id);
  headerTest.noSignIn(url);
  headerTest.singIn(url);

  test('방문하면 "{작성자}님 블로그"가 보인다.', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);
    await expect(
      page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
    ).toBeVisible();
  });
});

test.describe('main', () => {
  test('컨텐츠가 제대로 렌더링 된다.', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);
    await expect(helper.getMain.getByText(content.title)).toBeVisible();
    await expect(helper.getMain.getByText(user.nickname)).toBeVisible();
    await expect(
      helper.getMain.getByText(localizeDate(content.createdAt))
    ).toBeVisible();
    await expect(helper.getMain.getByText(content.body)).toBeVisible();
  });
});

test.describe('author-aside', () => {
  test('유저 정보가 제대로 렌더링 된다.', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);
    await expect(
      helper.getAuthorAside.getByAltText(user.nickname)
    ).toHaveAttribute('src', user.imgUrl);
    await expect(helper.getAuthorAside.getByText(user.nickname)).toBeVisible();
  });
});

test.describe('comment-section', () => {
  test('로그인 안된 사용자가 코맨트 영역을 클릭 했을 때 "/user/sign-in"으로 리다이렉트 된다.', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];

    await helper.gotoTargetPage(content.id);

    await helper.getCommentSection.getByRole('textbox').click();
    await helper.strictHaveUrl('/users/sign-in');
  });

  test('로그인 되었을 때 리다이랙트 되지 않는다.', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.signin(user.id);
    await helper.gotoTargetPage(content.id);

    await helper.getCommentSection.getByRole('textbox').click();
    await expect(page).not.toHaveURL(`/users/sign-in`);
  });
});

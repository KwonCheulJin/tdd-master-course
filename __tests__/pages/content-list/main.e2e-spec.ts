import { expect, test } from '@playwright/test';
import { contentFixtures } from '__tests__/fixture/content';
import { Helper } from '__tests__/pages/content-list/helper';
import { headerTest } from '__tests__/playwright/shared-test';

const url = '/contents';
test.describe('header', () => {
  headerTest(url);
});
test.describe('items', () => {
  test('pagination', async ({ page, context }) => {
    const helper = new Helper(page, context);
    await helper.gotoTargetPage(false);

    await test.step('컨텐츠 리스트에 접근 했을 때, 12개의 아이템이 보인다', async () => {
      await expect(helper.getContentItems).toHaveCount(12);
    });
    await test.step('페이지 2를 클릭 했을 때, 2개의 아이템이 보인다', async () => {
      await helper.getPageButton(2).click();
      await expect(helper.getContentItems).toHaveCount(2);
    });
  });
  test('sort', async ({ page, context }) => {
    const helper = new Helper(page, context);
    await helper.gotoTargetPage(false);

    await test.step('컨텐츠 리스트에 접근 했을 때, 정렬 옵션을 최신순으로 선택하면 컨텐츠[0] 아이템이 첫번째 아이템으로 보인다.', async () => {
      await expect(helper.getSortOption).toHaveValue('created-at-desc');
      await expect(helper.getContentItems.first()).toContainText(
        contentFixtures[1].title
      );
    });
    await test.step('정렬 옵션을 제목순으로 변경하면 컨텐츠[1] 아이템이 첫번째 아이템으로 보인다.', async () => {
      await helper.getSortOption.selectOption({ label: '제목순' });
      await expect(helper.getContentItems.first()).toContainText(
        contentFixtures[2].title
      );
    });
  });
  test.describe('search', () => {
    test('검색 인풋에 제목의 일부만 검색했을 때 하나의 아이템만 검색된다.', async ({
      page,
      context,
    }) => {
      const helper = new Helper(page, context);
      const content = contentFixtures[3];
      const search = content.title.slice(0, 10);
      await helper.gotoTargetPage(false);

      await helper.getSearchInput.fill(search.toLowerCase());
      await helper.getSearchInput.press('Enter');

      await expect(helper.getContentItems).toHaveCount(1);
      await expect(helper.getContentItems).toContainText(content.title);
    });
  });
});
test.describe('pagination', () => {
  test('pages', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    await helper.gotoTargetPage(false);
    await test.step('컨텐츠 리스트에 접근 했을 때, 페이지 3은 보이지 않고, 페이지 2까지만 보인다.', async () => {
      await expect(helper.getPageButton(3)).toBeHidden();
      await expect(helper.getPageButton(2)).toBeVisible();
    });
    await test.step('제목으로 검색하면 페이지 1만 보인다.', async () => {
      await helper.getSearchInput.fill(content.title);
      await helper.getSearchInput.press('Enter');
      await expect(helper.getPageButton(2)).toBeHidden();
      await expect(helper.getPageButton(1)).toBeVisible();
    });
  });

  test('pageLoc', async ({ page, context }) => {
    const helper = new Helper(page, context);

    await helper.gotoTargetPage(false);
    await test.step('컨텐츠 리스트에 접근 했을 때, 페이지 1이 선택되고 페이지 2는 선택되지 않는다', async () => {
      await expect(helper.getPageButton(1)).toHaveAttribute(
        'data-selected',
        'true'
      );
    });
    await test.step('페이지 2를 클릭하면 페이지 2가 선택되고 페이지 1은 선택되지 않는다.', async () => {
      await helper.getPageButton(2).click();
      await expect(helper.getPageButton(1)).toHaveAttribute(
        'data-selected',
        'false'
      );
      await expect(helper.getPageButton(2)).toHaveAttribute(
        'data-selected',
        'true'
      );
    });
  });
});

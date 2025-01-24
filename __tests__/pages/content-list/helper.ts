import { BrowserContext, Locator, Page } from '@playwright/test';
import { BaseHelper } from '__tests__/playwright/base-helper';

export class Helper extends BaseHelper {
  url = '/contents';
  readonly getPagination: Locator;
  readonly getContentItems: Locator;
  readonly getSearchInput: Locator;
  readonly getSortOption: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getPagination = page.getByTestId('pagination');
    this.getContentItems = page.getByTestId('content-item');
    this.getSearchInput = page.getByRole('textbox', { name: 'search' });
    this.getSortOption = page.getByLabel('sort');
  }

  async gotoTargetPage() {
    await this.page.goto(this.url);
  }

  getPageButton(num: number) {
    return this.getPagination.getByRole('button', { name: `${num}` });
  }
}

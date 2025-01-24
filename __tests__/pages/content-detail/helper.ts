import { BrowserContext, Locator, Page } from '@playwright/test';
import { BaseHelper } from '__tests__/playwright/base-helper';

export class Helper extends BaseHelper {
  readonly getMain: Locator;
  readonly getAuthorAside: Locator;
  readonly getCommentSection: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getMain = page.getByRole('main');
    this.getAuthorAside = page.getByTestId('author-aside');
    this.getCommentSection = page.getByTestId('comment-section');
  }

  getUrl(id: string) {
    return `/contents/${id}`;
  }

  async gotoTargetPage(id: string) {
    const url = this.getUrl(id);
    await this.page.goto(url);
  }
}

import { Locator, Page } from "@playwright/test";

export class WaitUI {
  readonly page: Page;
  readonly loader: Locator;
  constructor(page: Page) {
    this.page = page;

    this.loader = page.locator("//*[@id='loading']");
  }

  async waitSpinner() {
    await this.loader.waitFor({
      state: "hidden",
    });
  }
}

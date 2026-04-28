import { expect, Locator, Page } from "@playwright/test";
import { BpTypes } from "../../../types/Online Application/BpApplication";

export class BpApplication {
  readonly page: Page;

  constructor({ page }: { page: Page }) {
    this.page = page;
  }

  async gotoApplication() {
    await this.page.goto(
      "http://192.168.20.71:1024/Account/Login?statusCode=0",
    );
  }
}

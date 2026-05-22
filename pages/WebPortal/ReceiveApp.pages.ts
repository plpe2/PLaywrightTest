import { expect, Page } from "@playwright/test";

export class ReceiveApp {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async loginWebPortal() {
    await this.page.goto(process.env.TEST_WebPortal as string);

    await this.page
      .getByRole("textbox", { name: "Username" })
      .fill("admin super");
    await this.page.getByRole("textbox", { name: "Password" }).fill("P@ssw0rd");
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async ReceiveApp(AppNo: string) {
    await this.page.getByRole("textbox", { name: "Enter Keyword" }).fill(AppNo);
    await this.page.getByRole("button", { name: "Go" }).click();
    await this.page.getByRole("gridcell", { name: AppNo }).click();

    await expect(this.page.getByText("Loading...").first()).not.toBeAttached();
    await this.page.getByRole("button", { name: "Submit Application" }).click();
  }
}

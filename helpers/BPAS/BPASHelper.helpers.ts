import { expect, Locator, Page } from "@playwright/test";

export class BPASHelper {
  readonly page: Page;
  readonly bpasURL: string;
  readonly testEnvironment: boolean;

  // Login elements
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testEnvironment = false;
    this.bpasURL = this.testEnvironment
      ? (process.env.TEST_BPAS as string)
      : (process.env.LIVE_BPAS as string);

    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }

  async loginBPAS() {
    await this.page.goto(this.bpasURL);
    await this.userName.fill("admin marla");
    await this.password.fill("adminP@ssw0rd");
    await this.loginButton.click();
    await expect(this.page.getByText("Information Successfully")).toBeVisible({
      timeout: 10000,
    });
    await this.page.getByRole("button", { name: "OK" }).click();
    // await this.page.waitForURL(this.bpasURL + "Records/RecordsForm");
  }

  async closeSaveEval() {
    var modal = this.page.getByText("Saved Successfully Saved Close");
    await expect(modal).toBeVisible();
    var closeBtn = this.page.getByRole("button", { name: "Close" });
    expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // wait for modal to disappear
    await expect(modal).not.toBeVisible();
  }

  async searchApp(AppNo: string) {
    await this.page.getByRole("textbox", { name: "Enter Keyword" }).fill(AppNo);
    await this.page.locator("#btnSearchEvalRecord").click();
  }
}

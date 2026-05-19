import { expect, Locator, Page } from "@playwright/test";

export class BPASHelper {
  readonly page: Page;
  readonly bpasURL: string;

  // Login elements
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bpasURL = "http://192.168.20.71:1027/";

    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }

  async loginBPAS() {
    await this.page.goto(this.bpasURL);
    await this.userName.fill("admin marla");
    await this.password.fill("adminP@ssw0rd");
    await this.loginButton.click();
    await expect(this.page.getByText("Information Successfully")).toBeVisible();
    await this.page.getByRole("button", { name: "OK" }).click();
    // await this.page.waitForURL(this.bpasURL + "Records/RecordsForm");
  }
}

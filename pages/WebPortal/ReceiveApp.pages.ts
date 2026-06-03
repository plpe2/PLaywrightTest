import { expect, Page, request } from "@playwright/test";

export class ReceiveApp {
  readonly page: Page;
  readonly testEnvironment: boolean;
  readonly urlLink: string;

  constructor({
    page,
    testEnvironment,
  }: {
    page: Page;
    testEnvironment: boolean;
  }) {
    this.page = page;
    this.testEnvironment = testEnvironment;
    this.urlLink = testEnvironment
      ? (process.env.TEST_WebPortal as string)
      : (process.env.LIVE_WebPortal as string);
  }

  async loginWebPortal() {
    await this.page.goto(this.urlLink);

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

    await expect(this.page.getByText("Loading...").first()).toBeHidden({
      timeout: 8500,
    });
    await expect(
      this.page.getByText("A3. Valid Government ID Card"),
    ).toBeVisible();
    await this.page.waitForTimeout(6000);
    await this.page.getByRole("button", { name: "Submit Application" }).click();
    // const submittedDocsUrl = await request.newContext({
    //   baseURL: this.urlLink,
    // });

    // const checkDocs = await (
    //   await submittedDocsUrl.get("/Building/GetSubmittedDocs", {
    //     params: { appNo: AppNo, appType: "Building Permit" },
    //   })
    // ).json();

    // expect(checkDocs.success).toBe(true);

    // console.log(checkDocs);

    // submittedDocsUrl.dispose();
  }
}

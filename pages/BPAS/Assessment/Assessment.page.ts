import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";
import { Page } from "@playwright/test";

export class Assessment extends BPASHelper {
  readonly testEnvironment: boolean;
  readonly urlLink: string;

  constructor({
    page,
    testEnvironment,
  }: {
    page: Page;
    testEnvironment: boolean;
  }) {
    super(page);
    this.testEnvironment = testEnvironment;
    this.urlLink = testEnvironment
      ? (process.env.TEST_BPAS as string)
      : (process.env.LIVE_BPAS as string);
  }

  async AssessApp(AppNo: string) {
    await this.page.goto(this.urlLink + "Assessment/AssessmentForm");
    await this.page.getByRole("textbox", { name: "ENTER KEYWORD" }).fill(AppNo);
    await this.page.locator("#btnSearchAssess").click();
    await this.page.getByRole("gridcell", { name: AppNo }).click();
    await this.page
      .getByRole("row", { name: new RegExp(`1\\s+.*\\s+${AppNo}\\s+.*`) })
      .getByRole("button")
      .click();
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }
}

import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Findings extends BPASHelper {
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

  async EncodeRemarks(AppNo: string) {
    await this.page.goto(this.urlLink + "Inspection/Inspection");
    await this.page.getByRole("link", { name: "Findings" }).click();
    await this.page
      .locator("#tblMissionOrder_filter")
      .getByRole("searchbox", { name: "Search:" })
      .fill(AppNo);
    await this.page
      .locator("#tblMissionOrder")
      .getByRole("gridcell", { name: AppNo })
      .click();

    await this.page
      .locator("#InspectionComponentId")
      .selectOption("Building Inspection");
    await this.page.locator("#txtOtherFindings").fill("NYS");
    await this.page.getByRole("button", { name: "Save", exact: true }).click();
  }
}

import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Occupancy extends BPASHelper {
  readonly urlLink: string;

  constructor({
    page,
    testEnvironment,
  }: {
    page: Page;
    testEnvironment: boolean;
  }) {
    super(page);
    this.urlLink = testEnvironment
      ? (process.env.TEST_BPAS as string)
      : (process.env.LIVE_BPAS as string);
  }

  async OccEvaluation(AppNo: string) {
    await this.page.goto(
      this.urlLink + "PermitEvaluation/PermitEvaluationOccupancy",
    );

    await this.page.getByRole("gridcell", { name: AppNo }).click();
    await this.page.getByPlaceholder("0", { exact: true }).fill("54");
    await this.page.locator("#txtAdditionalProjectCostOcc").fill("500000");
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(5000);
  }
}

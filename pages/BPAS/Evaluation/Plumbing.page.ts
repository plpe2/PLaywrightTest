import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Plumbing extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationPlumbing",
    );

    await this.page.getByRole("gridcell", { name: "NBP2605-00003" }).click();
    await this.page.locator("#WSWDSRemarks").fill("1");
    await this.page.locator("#btnSaveBldgEvalPlumbingWSWDS").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
    await this.page.locator("#btnSaveBldgEvalPlumbing").click();
  }
}

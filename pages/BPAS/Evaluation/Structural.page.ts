import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Structural extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationStructural",
    );

    await this.page.getByRole("gridcell", { name: "NBP2605-00009" }).click();
    await this.page.locator('input[name="GDCRReferralCode"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalStructuralGDCR").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
    await this.page.locator("#btnSaveBldgEvalStructural").click();
  }
}

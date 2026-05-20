import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Geodetic extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  // Main evaluation process of Geodetic Evaluation
  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationGeodetic",
    );

    await this.page.getByRole("gridcell", { name: "NBP2605-00011" }).click();
    await await this.page.getByText("Compliant").first().click();
    await await this.page.getByText("Compliant").nth(1).click();
    await await this.page.getByText("Compliant").nth(2).click();
    await this.page.locator("#btnSaveGeodeticPlans").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page.locator("a").filter({ hasText: "Complied" }).click();
    await this.page.locator("#btnSaveGeodeticEval").click();
    // await this.page.waitForTimeout(5000);
  }
}

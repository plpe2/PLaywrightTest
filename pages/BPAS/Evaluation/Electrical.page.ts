import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Electrical extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationElectrical",
    );

    await this.page.getByRole("gridcell", { name: "NBP2605-00009" }).click();
    await this.page.locator("#NoOfPoleAttachment").fill("1");
    await this.page.locator("#btnAttachment").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
    await this.page.locator("#btnSaveElectricalIns").click();
  }
}

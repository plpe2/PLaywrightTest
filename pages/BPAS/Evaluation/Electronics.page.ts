import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Electronics extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationElectronics",
    );
    await this.page.getByRole("gridcell", { name: "NBP2605-00003" }).click();
    await this.page.locator("a").filter({ hasText: "Layout" }).click();
    await this.page.locator("#txtLayout").fill("1");
    await this.page.locator("#btnSaveCompleteness").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
    await this.page.locator("#btnSaveAll").click();
  }
}

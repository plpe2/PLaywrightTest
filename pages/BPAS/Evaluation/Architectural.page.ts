import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Architectural extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async FZandFR() {
    await this.page.locator("input[name='FireAveCover']").fill("1");
    await this.page.locator("#btnSaveBldgEvalFire").click();
    await this.closeSaveEval();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
  }

  async BP() {
    await this.page.locator(".float-right.ml-2.fa.fa-plus").first().click();
    await this.page.locator("#txtFootings").fill("1");
    await this.page.locator("#btnSaveBldgEvalBP").click();
    await this.closeSaveEval();
    await this.page.locator("a").filter({ hasText: "Complied" }).nth(2).click();
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationArchitectural",
    );

    // await expect(
    //   this.page.locator("#dataTables-BuildingPermitEval"),
    // ).toHaveCount(1);
    await this.page.getByRole("gridcell", { name: "NBP2605-00011" }).click();
    await this.FZandFR();
    await this.BP();
    // await this.page.waitForTimeout(3500);
  }
}

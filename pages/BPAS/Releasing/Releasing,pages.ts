import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Releasing extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async releasingProcess(AppNo: string) {
    await this.page.goto(
      this.bpasURL + "PermitCertsIssuance/PermitCertsIssuanceForm",
    );

    await this.page.getByRole("textbox", { name: "ENTER KEYWORD" }).fill(AppNo);
    await this.page.locator("#cmbCertSearchBy").selectOption("Application No.");
    await this.page.locator("#btnSearchCertRecord").click();

    await this.page
      .locator("#tblApplicationRecords")
      .getByRole("gridcell", { name: AppNo })
      .click();
    await this.page.locator("#chk_all").click();
    await this.page.waitForTimeout(5000);
    await this.page
      .getByRole("button", { name: "Assign Permit Number" })
      .click();
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page.locator("#chk_all").click();
    await await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(5000);
  }
}

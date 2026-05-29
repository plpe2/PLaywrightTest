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

    await this.page
      .locator("#tblApplicationRecords")
      .getByRole("gridcell", { name: new RegExp(`\\s+.*\\s+${AppNo}`) })
      .click();
    var checkAll = await this.page.locator("#chk_all");
    checkAll.click();
    await this.page
      .getByRole("button", { name: "Assign Permit Number" })
      .click();
    await this.page.getByRole("button", { name: "OK" }).click();
    await checkAll.click();
    await this.page.waitForTimeout(5000);
  }
}

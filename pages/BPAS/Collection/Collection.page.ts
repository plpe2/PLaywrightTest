import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";
import { parse } from "node:path";

export class Collection extends BPASHelper {
  constructor(page: Page) {
    super(page);
  }

  async collectionProcess(AppNo: string) {
    await this.page.goto(this.bpasURL + "Collection/TaxCollection");
    await this.page.getByRole("gridcell", { name: AppNo }).click();
    await this.page.getByRole("link", { name: "Payment Information" }).click();
    var val = await this.page.locator("#txtPayableAmount").inputValue();
    await this.page.locator("#txtPaymentAmount").fill(val.replace(/,/g, ""));
    await this.page.getByRole("button", { name: "Add" }).click();
    await this.page.getByRole("button", { name: "Post" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }
}

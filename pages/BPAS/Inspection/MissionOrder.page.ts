import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class MissionOrder extends BPASHelper {
  readonly testEnvironment: boolean;
  readonly urlLink: string;

  constructor({
    page,
    testEnvironment,
  }: {
    page: Page;
    testEnvironment: boolean;
  }) {
    super(page);

    this.testEnvironment = testEnvironment;
    this.urlLink = testEnvironment
      ? (process.env.TEST_BPAS as string)
      : (process.env.LIVE_BPAS as string);
  }

  async GenerateMissionOrder(AppNo: string) {
    await this.page.goto(this.urlLink + "Inspection/Inspection");

    const fString = AppNo.split("-")[0].split("");
    const AppType = fString.splice(0, 3).join("");

    if (AppType == "OCC") {
      await this.page.getByText("Occupancy Inspection").click();
    }

    await await this.page
      .getByRole("searchbox", { name: "Search:" })
      .fill(AppNo);
    await this.page.getByRole("gridcell", { name: AppNo }).click();
    await this.page.getByRole("button", { name: "Generate" }).click();
    await this.page.getByRole("button", { name: "Select" }).click();
    await this.page
      .getByRole("row", { name: "TEAM 1" })
      .getByRole("radio")
      .click();
    await this.page.getByRole("button", { name: "Assign" }).click();
    await this.page.locator("#txtRemarks").fill("1");
    await this.page.getByRole("button", { name: "Save Mission Order" }).click();
    await this.page.getByRole("button", { name: "OK" }).click();
  }
}

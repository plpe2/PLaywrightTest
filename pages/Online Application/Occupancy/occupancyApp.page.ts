import { Page } from "@playwright/test";
import { WaitUI } from "../../../helpers/WaitUI.helper";

export class occupancyApp {
  readonly page: Page;
  readonly OccAppNo: string;
  readonly Helpers: WaitUI;

  constructor({ page, OccAppNo }: { page: Page; OccAppNo: string }) {
    this.page = page;
    this.OccAppNo = OccAppNo;
    this.Helpers = new WaitUI(page);
  }

  async gotoApp() {
    await this.page.goto(
      "http://192.168.20.71:1024/Account/Login?statusCode=0",
    );
  }

  async gotoOccupancy() {
    await this.page.goto("http://192.168.20.71:1021/OccupancyPermit/Occupancy");
  }

  async fillOccupancyApp() {
    await this.page
      .getByRole("gridcell", { name: this.OccAppNo, exact: true })
      .click();
    await this.page.getByRole("button", { name: "Select" }).click();

    await this.Helpers.waitSpinner();
    await this.page.getByRole("link", { name: "Next" }).click();
    await this.Helpers.waitSpinner();
    await this.page.getByRole("link", { name: "Next" }).click();
    await this.page.waitForTimeout(5000);
  }
}

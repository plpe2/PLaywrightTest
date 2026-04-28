import { Page } from "@playwright/test";

export class occupancyApp {
  readonly page: Page;
  readonly OccAppNo: string;

  constructor({ page, OccAppNo }: { page: Page; OccAppNo: string }) {
    this.page = page;
    this.OccAppNo = OccAppNo;
  }

  async gotoOccupancy() {
    await this.page.goto("http://192.168.20.71:1021/OccupancyPermit/Occupancy");
  }

  async fillOccupancyApp() {
    await this.page
      .getByRole("gridcell", { name: this.OccAppNo, exact: true })
      .click();
    await this.page.getByRole("button", { name: "Select" }).click();
  }
}

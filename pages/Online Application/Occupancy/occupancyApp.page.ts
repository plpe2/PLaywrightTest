import { expect, Page } from "@playwright/test";
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
    // await this.page.getByRole("link", { name: "Next" }).click();
    await this.page.locator("#NoFloors").fill("1");
    const date = this.page.locator("#txtOpenSpace");

    await expect(date).toBeVisible();
    await expect(date).toBeEditable();

    await date.fill("2026-08-12");
    await this.page.getByRole("link", { name: "Save" }).click();
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page.getByRole("link", { name: "Next" }).click();
  }

  async ProfessionalInfoEncoding() {
    await this.page
      .getByRole("button", {
        name: "Search Existing Professional",
      })
      .click();
    await this.page.getByRole("gridcell", { name: "ROMELO, MARTIN" }).click();
    await this.page.getByRole("button", { name: "Select" }).click();
    await this.page.waitForTimeout(4000);
    await this.page.getByRole("link", { name: "Next" }).click();
  }

  async DocumentSubmission() {
    await this.page.locator(".m-2").first().click();
    await this.page
      .locator(
        "div:nth-child(2) > .d-flex.align-items-center.upload-group > .upload-input-group > .m-2",
      )
      .first()
      .click();

    await this.page
      .locator(
        "div:nth-child(3) > .d-flex.align-items-center.upload-group > .upload-input-group > .m-2",
      )
      .first()
      .click();
    await this.page
      .locator(
        "div:nth-child(2) > .card-body > div > .d-flex.align-items-center.upload-group > .upload-input-group > .m-2",
      )
      .first()
      .click();
    await this.page
      .locator(
        "div:nth-child(2) > .card-body > div:nth-child(2) > .d-flex.align-items-center.upload-group > .upload-input-group > .m-2",
      )
      .click();
    await this.page
      .locator(
        "div:nth-child(2) > .card-body > div:nth-child(3) > .d-flex.align-items-center.upload-group > .upload-input-group > .m-2",
      )
      .click();
    await this.page.getByRole("link", { name: "Next" }).click();
    await this.page.waitForTimeout(1000);
  }

  async submitApp() {
    await this.page.getByRole("link", { name: "Submit Application" }).click();
    await this.page
      .locator("#ModalSubmit")
      .getByText("Yes", { exact: true })
      .click();
    await this.page.getByRole("button", { name: "OK" }).click();
    // await this.page
    //   .locator("#ModalSubmit")
    //   .getByText("OK", { exact: true })
    //   .click();
    // // await this.page.getByRole("button", { name: "OK" }).click();
  }
}

import { expect, Page } from "@playwright/test";
import { WaitUI } from "../../../helpers/WaitUI.helper";

export class CFEIApp {
  readonly page: Page;
  readonly AppNumber: string;
  readonly Helper: WaitUI;

  constructor(page: Page, AppNumber: string) {
    this.page = page;
    this.AppNumber = AppNumber;
    this.Helper = new WaitUI(page);
  }

  async gotoApp() {
    await this.page.goto(
      "http://192.168.20.71:1024/Account/Login?statusCode=0",
    );
  }

  async CFEIApplication() {
    await this.page.goto("http://192.168.20.71:1021/CFEIPermit/CFEI");
    await this.page.getByRole("gridcell", { name: this.AppNumber }).click();
    await this.page.getByRole("button", { name: "Select" }).click();
    await this.Helper.waitSpinner();
    await this.page.getByRole("link", { name: "Next" }).click();
    await this.Helper.waitSpinner();
    await this.page.locator("#NoFloors").fill("1");
    await this.page
      .locator('input[name="BPASCFEIEvalAssess.TotalConnectedLoad"]')
      .fill("15");
    await this.page
      .locator('input[name="BPASCFEIEvalAssess.TotalTransformerCapacity"]')
      .fill("200");
    await this.page
      .locator('input[name="BPASCFEIEvalAssess.TotalGeneratorCapacity"]')
      .fill("200");
    await this.page
      .locator('input[name="BPASCFEIEvalAssess.TotalUpsCapacity"]')
      .fill("200");
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

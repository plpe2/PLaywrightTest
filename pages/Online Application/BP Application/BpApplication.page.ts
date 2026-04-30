import { Locator, Page } from "@playwright/test";
import { BldgAppInfo } from "../../../types/Online Application/BpApplication";
import { WaitUI } from "../../../helpers/WaitUI.helper";

export class BpApplication {
  readonly page: Page;
  readonly WaitUI: WaitUI;

  // Section: Project Information
  readonly Pin: Locator;
  readonly ProjectTitle: Locator;
  readonly BldgName: Locator;
  readonly TDN: Locator;
  readonly TCTNo: Locator;
  readonly ProjectCost: Locator;
  readonly FloorArea: Locator;
  readonly StoreyNo: Locator;
  readonly LotArea: Locator;
  readonly BldgHeight: Locator;
  readonly Progress: Locator;
  readonly LotNo: Locator;
  readonly BlkNo: Locator;
  readonly BrgyName: Locator;

  // Parameters for data-driven function
  readonly BldgAppInfo: BldgAppInfo;
  readonly isExisting: boolean;
  readonly isNewAccount: boolean;

  // Navigation buttons
  readonly Savebtn: Locator;
  readonly Nextbtn: Locator;

  constructor({
    page,
    isNewAccount,
    isExisting,
    BpAppInfo,
  }: {
    page: Page;
    isNewAccount: boolean;
    isExisting: boolean;
    BpAppInfo: BldgAppInfo;
  }) {
    this.page = page;
    this.BldgAppInfo = BpAppInfo;
    this.isExisting = isExisting;
    this.isNewAccount = isNewAccount;
    this.WaitUI = new WaitUI(page);

    this.Pin = this.page.locator('input[name="Building.Project.PIN"]');
    this.ProjectTitle = this.page
      .getByRole("button", { name: "Nothing selected" })
      .first();
    this.BldgName = this.page.locator(
      'input[name="Building.Project.BaseBuildingName"]',
    );
    this.TDN = this.page.locator('input[name="Building.Project.TDN"]');
    this.TCTNo = this.page.locator('input[name="Building.Project.TCTNo"]');
    this.ProjectCost = this.page.locator("#txtProjectCost");
    this.FloorArea = this.page.locator("#txtFloorArea");
    this.StoreyNo = this.page.locator("#NoFloors");
    this.LotArea = this.page.locator("#LotArea");
    this.BldgHeight = this.page.locator(
      'input[name="Building.Project.Height"]',
    );
    this.Progress = this.page.locator(
      "#Building_Project_ConstructionProgressDescription",
    );
    this.LotNo = this.page.locator(
      'input[name="Building.Project.Address.LotNo"]',
    );
    this.BlkNo = this.page.locator(
      'input[name="Building.Project.Address.BlockNo"]',
    );
    this.BrgyName = this.page.locator("#Building_Project_Address_BarangayName");

    this.Savebtn = this.page.getByRole("link", { name: "Save" });
    this.Nextbtn = this.page.getByRole("link", { name: "Next >" });
  }

  async gotoApplication() {
    await this.page.goto(
      "http://192.168.20.71:1024/Account/Login?statusCode=0",
    );
  }

  async ProjectInfoEncoding() {
    await this.WaitUI.waitSpinner();

    if (this.isExisting) {
      await this.page
        .getByRole("gridcell", {
          name: this.BldgAppInfo.BldgName.toUpperCase(),
        })
        .click();

      await this.page.getByRole("button", { name: "Select" }).click();
      await this.WaitUI.waitSpinner();
    } else {
      if (!this.isNewAccount) {
        await this.page.getByRole("button", { name: "Add New" }).click();
        await this.WaitUI.waitSpinner();
      }
    }

    await this.page.getByText("Next >").click();
    await this.WaitUI.waitSpinner();

    await this.Pin.fill(this.BldgAppInfo.Pin);
    await this.BldgName.fill(this.BldgAppInfo.BldgName);
    await this.TDN.fill(this.BldgAppInfo.TDN);
    await this.TCTNo.fill(this.BldgAppInfo.TCTNo);
    await this.ProjectCost.fill(String(this.BldgAppInfo.ProjectCost));
    await this.FloorArea.fill(String(this.BldgAppInfo.FloorArea));
    await this.StoreyNo.fill(String(this.BldgAppInfo.StoreyNo));
    await this.LotArea.fill(String(this.BldgAppInfo.FloorArea));
    await this.BldgHeight.fill(String(this.BldgAppInfo.BldgHeight));
    await this.Progress.selectOption("To Start");
    await this.LotNo.fill(this.BldgAppInfo.LotNo);
    await this.BlkNo.fill(this.BldgAppInfo.BlkNo);
    await this.BrgyName.selectOption("ALIMA");

    if (!this.isExisting) {
      await this.ProjectTitle.click();
      await this.page
        .locator(
          "//*[@id='formProjectInfo']/div/div/div/div[2]/div[3]/div[1]/div[1]/div[1]/div/div[2]/div/div[2]/ul/li[2]/a",
        )
        .click();
    }
    await this.Savebtn.click();
    await this.page.locator("xpath=/html/body/div[3]/div").isVisible();
    await this.page.getByRole("button", { name: "OK" }).click();
    // await this.page.waitForTimeout(5000);
    await this.Nextbtn.click();
  }

  async ProfessionalInfoEncoding() {
    await this.page
      .getByRole("button", {
        name: "Search Existing Professional",
      })
      .click();
    await this.page.getByRole("gridcell", { name: "MARTINES, ARTHUR" }).click();
    await this.page.getByRole("button", { name: "Select" }).click();
    await this.page.waitForTimeout(1500);
    await this.Nextbtn.click();
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
    await this.Nextbtn.click();
    // await this.page.waitForTimeout(2500);
  }

  async submitApp() {
    await this.page.getByRole("link", { name: "Submit Application" }).click();
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page
      .locator("#ModalSubmit")
      .getByText("Yes", { exact: true })
      .click();
    await this.page.getByRole("button", { name: "OK" }).click();
  }
}

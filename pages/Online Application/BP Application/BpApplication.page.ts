import { Locator, Page } from "@playwright/test";
import { BldgAppInfo } from "../../../types/Online Application/BpApplication";
import { WaitUI } from "../../../helpers/WaitUI.helper";
import { parse } from "node:path";

export class BpApplication {
  readonly page: Page;
  readonly WaitUI: WaitUI;
  readonly testEnvironment: boolean;
  readonly urlLink: string;

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
  //Added Locators
  readonly ScopeofWork: Locator;
  readonly UnitsNo: Locator;
  readonly ZoningClass: Locator;
  readonly BuildingGroup: Locator;
  readonly BuildingDivision: Locator;

  // Parameters for data-driven function
  readonly BldgAppInfo: BldgAppInfo;
  readonly isExisting: boolean;
  readonly isNewAccount: boolean;

  // Navigation buttons
  readonly Savebtn: Locator;
  readonly Nextbtn: Locator;

  constructor({
    page,
    testEnvironment,
    isNewAccount,
    isExisting,
    BpAppInfo,
  }: {
    page: Page;
    testEnvironment: boolean;
    isNewAccount: boolean;
    isExisting: boolean;
    BpAppInfo: BldgAppInfo;
  }) {
    this.page = page;
    this.testEnvironment = testEnvironment;
    this.urlLink = testEnvironment
      ? (process.env.TEST_OnlineApp as string)
      : (process.env.LIVE_OnlineApp as string);

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

    //Added Locators
    this.ScopeofWork = this.page.locator("#Building_Project_ScopeofWork");
    this.UnitsNo = this.page.locator('[name="Building.Project.TotalUnits"]');
    this.ZoningClass = this.page.locator("#Building_ZoningUse");
    this.BuildingGroup = this.page.locator(
      "#Building_UseorCharacterofOccupancy",
    );
    this.BuildingDivision = this.page.locator("#Building_Division");

    this.Savebtn = this.page.getByRole("link", { name: "Save" });
    this.Nextbtn = this.page.getByRole("link", { name: "Next >" });
  }

  async gotoApplication() {
    await this.page.goto(this.urlLink);
  }

  async SelectAppNo() {
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
      } else {
        // await this.WaitUI.waitSpinner();
        // await this.page.locator(".modal-content").waitFor({
        //   state: "detached",
        // });
        await this.page.waitForTimeout(2000);
      }
    }

    await this.WaitUI.waitSpinner();
    await this.page.getByRole("link", { name: "Next >" }).click();

    const messageDialog = this.page.getByRole("dialog", { name: "Message" });

    if (await messageDialog.isVisible()) {
      await this.page.getByRole("button", { name: "OK" }).click();
      await this.page.getByRole("link", { name: "Next >" }).click();
    }
    await this.page.waitForTimeout(2500);
    await this.page.getByRole("link", { name: "Next >" }).click();
    await this.page.waitForTimeout(2500);
    await this.page.getByRole("link", { name: "Next >" }).click();
    await this.page.getByRole("link", { name: "Next >" }).click();

    // await this.page.waitForTimeout(5000);
    // await this.page.getByRole("link", { name: "Next >" }).click();

    await this.page.waitForTimeout(5000);
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
      } else {
        // await this.WaitUI.waitSpinner();
        // await this.page.locator(".modal-content").waitFor({
        //   state: "detached",
        // });
        await this.page.waitForTimeout(2000);
      }
    }

    await this.WaitUI.waitSpinner();
    await this.page.getByRole("link", { name: "Next >" }).click();

    const messageDialog = this.page.getByRole("dialog", { name: "Message" });

    if (await messageDialog.isVisible()) {
      await this.page.getByRole("button", { name: "OK" }).click();
      await this.page.getByRole("link", { name: "Next >" }).click();
    }

    await this.page
      .locator("#navPermits")
      .getByText("Mechanical", { exact: true })
      .click();

    await this.Pin.fill(this.BldgAppInfo.Pin);
    await this.BldgName.fill(this.BldgAppInfo.BldgName);
    await this.TDN.fill(this.BldgAppInfo.TDN);
    await this.TCTNo.fill(this.BldgAppInfo.TCTNo);
    await this.ProjectCost.fill(String(this.BldgAppInfo.ProjectCost));
    await this.FloorArea.fill(String(this.BldgAppInfo.FloorArea));
    await this.StoreyNo.fill(String(this.BldgAppInfo.StoreyNo));
    await this.LotArea.fill(String(this.BldgAppInfo.FloorArea));
    await this.BldgHeight.fill(String(this.BldgAppInfo.BldgHeight));

    // if (!this.isExisting) {
    await this.ProjectTitle.click();
    const activeDropdown = this.page.locator(
      '.dropdown-menu.show[role="combobox"]:visible',
    );

    await activeDropdown
      .getByRole("textbox", { name: "Search" })
      .fill(this.BldgAppInfo.ProjectTitle);

    await this.page.waitForTimeout(1000);

    await activeDropdown
      .locator("ul.dropdown-menu.inner > li:first-child")
      .click();
    // }

    await this.Progress.selectOption("To Start");
    await this.LotNo.fill(this.BldgAppInfo.LotNo);
    await this.BlkNo.fill(this.BldgAppInfo.BlkNo);
    await this.BrgyName.selectOption("ALIMA");

    await this.ScopeofWork.selectOption(this.BldgAppInfo.ScopeofWork);
    await this.UnitsNo.fill(String(this.BldgAppInfo.UnitsNo));
    await this.ZoningClass.selectOption(this.BldgAppInfo.ZoningClass);
    await this.BuildingGroup.selectOption(this.BldgAppInfo.BuildingGroup);
    await this.BuildingDivision.selectOption(this.BldgAppInfo.BuildingDivision);

    await this.Savebtn.click();
    await this.page.locator("xpath=/html/body/div[3]/div").isVisible();
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.Nextbtn.click();
  }

  async ProfessionalInfoEncoding({
    fname,
    mname,
    lname,
    profession,
    prc,
    dateIssued,
    issuedAt,
    Validity,
  }: {
    fname: string;
    mname: string;
    lname: string;
    profession: string;
    prc: string;
    dateIssued: string;
    issuedAt: string;
    Validity: string;
  }) {
    await this.page
      .getByRole("button", {
        name: "Search Existing Professional",
      })
      .click();

    await this.page.getByRole("textbox", { name: "Enter Keyword" }).fill(lname);
    await this.page
      .getByRole("button", { name: "Search", exact: true })
      .click();
    const profVal = this.page.getByRole("gridcell", {
      name: lname + ", " + fname + " " + mname,
    });

    let professionalExists = false;

    try {
      await profVal.first().waitFor({
        state: "visible",
        timeout: 5000,
      });

      professionalExists = true;
    } catch {
      professionalExists = false;
    }

    if (professionalExists) {
      await profVal.waitFor({ state: "visible" });

      if (await profVal.isEnabled()) {
        await profVal.click();
      }
      await this.page.getByRole("button", { name: "Select" }).click();
      await this.page.waitForTimeout(4000);
      await this.Nextbtn.click();
    } else {
      await this.page.getByRole("button", { name: "Close" }).click();
      await this.page
        .getByRole("button", { name: "Add New Professional" })
        .click();

      await this.page
        .locator("#divModalProf #Person_Title")
        .selectOption("Mr.");
      await this.page
        .locator('#divModalProf input[name="Person.FirstName"]')
        .fill(fname);

      await this.page
        .locator('#divModalProf input[name="Person.MiddleName"]')
        .fill(mname);

      await this.page
        .locator('#divModalProf input[name="Person.LastName"]')
        .fill(lname);

      await this.page.locator("#Person_Gender").selectOption("Male");

      await this.page
        .locator("#divModalProf #Discipline")
        .selectOption(profession);

      await this.page
        .locator(
          "xpath=//*[@id='divModalProf']/div/div/div[2]/div[3]/div/div[2]/input",
        )
        .fill("9155352294");

      await this.page
        .locator('#divModalProf input[name="License.LicenseNo"]')
        .fill(prc);

      const convertedDate = `${dateIssued.substring(4, 8)}-${dateIssued.substring(2, 4)}-${dateIssued.substring(0, 2)}`;
      const ValidityDate = `${Validity.substring(4, 8)}-${Validity.substring(2, 4)}-${Validity.substring(0, 2)}`;

      await this.page
        .locator('#divModalProf input[name="License.DateIssued"]')
        .fill(convertedDate);

      await this.page
        .locator('#divModalProf input[name="License.IssuedAt"]')
        .fill(issuedAt);

      await this.page
        .locator('#divModalProf input[name="License.ExpirationDate"]')
        .fill(ValidityDate);

      await this.page
        .locator('#divModalProf input[name="License1.LicenseNo"]')
        .fill(prc);

      await this.page
        .locator('#divModalProf input[name="License1.DateIssued"]')
        .fill(convertedDate);

      await this.page
        .locator('#divModalProf input[name="License1.IssuedAt"]')
        .fill(issuedAt);

      await this.page
        .locator('#divModalProf input[name="License1.ExpirationDate"]')
        .fill(ValidityDate);

      await this.page
        .locator('#divModalProf input[name="Person.Address.FullAddress"]')
        .fill("B7 L1 MOLINO HOMES MOLINO IV BACOOR, CAVITE");

      await this.page.getByRole("button", { name: "Add", exact: true }).click();

      await this.page.getByRole("button", { name: "OK" }).click();
      await this.page.getByRole("button", { name: "Close" }).click();

      await this.page
        .getByRole("button", {
          name: "Search Existing Professional",
        })
        .click();

      await this.page
        .getByRole("textbox", { name: "Enter Keyword" })
        .fill(lname);
      await this.page
        .getByRole("button", { name: "Search", exact: true })
        .click();
      await profVal.click();
      await this.page.getByRole("button", { name: "Select" }).click();
      await this.page.waitForTimeout(4000);
      await this.Nextbtn.click();

      await this.page.waitForTimeout(5000);
    }
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

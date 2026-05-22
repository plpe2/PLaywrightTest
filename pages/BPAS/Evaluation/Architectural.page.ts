import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Architectural extends BPASHelper {
  readonly AppNo: string;

  constructor(page: Page, AppNo: string) {
    super(page);

    this.AppNo = AppNo;
  }

  // Main function for the evaluation process

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationArchitectural",
    );

    await this.searchApp(this.AppNo);
    await this.page.getByRole("gridcell", { name: this.AppNo }).click();
    await this.FZandFR();
    // await this.BP();
    // await this.AS();
    // await this.MHB();
    // await this.PS();
    // await this.OL();
    // await this.GandO();
    // await this.AA();
    // await this.LandV();
    // await this.LandG();
    // await this.SwMP();
  }

  // sub-functions for each evaluation criterias

  async FZandFR() {
    await this.page.locator("input[name='FireAveCover']").fill("1");
    await this.page.locator("#btnSaveBldgEvalFire").click();
    await this.closeSaveEval();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();
  }

  async BP() {
    await this.page.locator(".float-right.ml-2.fa.fa-plus").first().click();
    await this.page.locator("#txtFootings").fill("1");
    await this.page.locator("#btnSaveBldgEvalBP").click();
    await this.closeSaveEval();
    await this.page.locator("a").filter({ hasText: "Complied" }).nth(2).click();
  }

  async AS() {
    await this.page
      .locator(
        "#dvFireCounter3 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="ASDwellingUnits"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalAS").click();
    await this.closeSaveEval();
    await this.page.locator("a").filter({ hasText: "Complied" }).nth(4).click();
  }

  async MHB() {
    await this.page
      .locator(
        "#dvFireCounter4 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator("#rmrksMaxHeight").fill("1");
    await this.page
      .locator("#collapse4")
      .getByRole("button", { name: "Save" })
      .click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter4 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async PS() {
    await this.page
      .locator(
        "#dvFireCounter5 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="PSParkingSlot"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalPS").click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter5 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async OL() {
    await this.page
      .locator(
        "#dvFireCounter6 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="OLUnitArea"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalOL").click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter6 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async GandO() {
    await this.page
      .locator(
        "#dvFireCounter7 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="GaOOpeningMaterial"]').fill("1");
    await this.page
      .locator("#collapse7")
      .getByRole("button", { name: "Save" })
      .click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter7 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async AA() {
    await this.page
      .locator(
        "#dvFireCounter8 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator("#rmrksAccessAbility").fill("1");
    await this.page.locator("#btnSaveBldgEvalAAccessibility").click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter8 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async LandV() {
    await this.page
      .locator(
        "#dvFireCounter9 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="LVCeilingHeight"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalLV").click();
    await this.closeSaveEval();
    await this.page
      .locator("//*[@id='card_one']/div[1]/div/h3/a[1]")
      .first()
      .click();
  }

  async LandG() {
    await this.page
      .locator(
        "#dvFireCounter10 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator("#txtFrontage").fill("1");
    await this.page.locator("#btnSaveBldgEvalLG").click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter10 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }

  async SwMP() {
    await this.page
      .locator(
        "#dvFireCounter11 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator('input[name="SMPPerimeter"]').fill("1");
    await this.page.locator("#btnSaveBldgEvalSMP").click();
    await this.closeSaveEval();
    await this.page
      .locator(
        "#dvFireCounter11 > #card_one > .card-header > .row > .card-title > a",
      )
      .first()
      .click();
  }
}

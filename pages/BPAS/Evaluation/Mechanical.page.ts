import { expect, Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class Mechanical extends BPASHelper {
  readonly AppNo: string;
  constructor(page: Page, AppNo: string) {
    super(page);
    this.AppNo = AppNo;
  }

  async evaluationProcess() {
    await this.page.goto(
      this.bpasURL + "PermitEvaluation/PermitEvaluationMechanical",
    );
    await this.page.getByRole("gridcell", { name: this.AppNo }).click();
    await this.page.locator("#GuardFenceQty").fill("1");
    await this.page.locator("#btnSaveGuardings").click();
    await expect(this.page.locator("#modalbtnSaveB")).toBeVisible();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page
      .locator("a")
      .filter({ hasText: "Complied" })
      .first()
      .click();

    await this.page
      .locator(
        "#dvFireCounter3 > #card_one > .card-header > .row > .card-title > .float-right.ml-2",
      )
      .click();
    await this.page.locator("#HoistHstQty").fill("1");
    await this.page.locator("#HoistLoad").fill("1");
    await this.page.locator("#HoistLength").fill("1");
    await this.page.locator("#btnSaveHoist").click();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page.locator("a").filter({ hasText: "Complied" }).nth(4).click();

    //AirCon Installation
    await this.page.locator("#MechCapacity").fill("5");
    await this.page.locator("#Units").fill("1");
    await this.page.locator("#AirConDescription").fill("Cooler");
    await this.page.locator("#AirConTotalCoolingCapacity").fill("260");
    await this.page.getByRole("button", { name: "Add" }).click();
    await this.page.getByRole("button", { name: "Close" }).click();

    await this.page.locator("#InstallationID").selectOption("B. Escalators");
    await this.page.locator("#MechCapacity").fill("200");
    await this.page.locator("#Units").fill("1");
    await this.page.locator("#EscaPassengerHour").fill("8");
    await this.page.locator("#EscaSpeed").fill("40");
    await this.page.locator("#EscaEffectiveWidth").fill("12");
    await this.page.locator("#EscaTreadWidth").fill("12");
    await this.page.locator("#EscaFloorHeight").fill("4");
    await this.page.locator("#EscaMotorRating").fill("240");
    await this.page.locator("#EscaFloorsServed").fill("2");
    await this.page.locator('input[name="TotalHorsePower"]').fill("300");
    await this.page.getByRole("button", { name: "Add" }).click();
    await this.page.getByRole("button", { name: "Close" }).click();

    await this.page.locator("#InstallationID").selectOption("C. Elevators");
    await this.page.locator("#Units").fill("1");
    await this.page.locator("#ElevClassification").fill("Type 1");
    await this.page.locator("#ElevWorkingLoad").fill("250");
    await this.page.locator("#ElevNoOfPassengers").fill("8");
    await this.page.getByRole("button", { name: "Add" }).click();
    await this.page.getByRole("button", { name: "Close" }).click();

    await this.page.locator("#txtEvalRemarks").fill("1");
    await this.page.locator("#btnSave").click();
  }
}

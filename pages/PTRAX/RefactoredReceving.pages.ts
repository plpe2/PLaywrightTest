import { expect, Locator, Page } from "@playwright/test";
import { ProcessHandler } from "../../helpers/PTRAX/ProcessHandler.helpers";

export class RefactoredReceiving extends ProcessHandler {
  constructor(page: Page, testEnvironment: boolean) {
    super({ page: page, testEnvironment: testEnvironment });
  }

  async ReceiveApp(appNumber: string) {
    await this.clickCheckbox(appNumber);
    await this.receiveBtn.click();

    await this.proceedBtn.waitFor({ state: "visible" });

    await this.AcceptDialog();

    await this.proceedBtn.click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();
  }

  async JumpApp(appNumber: string, step: string) {
    // await this.waitForMailbox();

    await this.page.getByRole("gridcell", { name: appNumber }).click();

    await this.jumpSelection.waitFor({ state: "attached" });
    await this.jumpSelection.selectOption(step, { force: true });

    await this.AcceptDialog();
    await this.page.locator("//*[@id='btnJump']").click();
    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();
  }

  async ReleasingPermit(appNumber: string) {
    await this.page.waitForTimeout(3000);
    await this.page
      .locator("#MainContent_ctlDocMgr_Inc_SanPedro1_txtDocMgr_Inc_DIN")
      .fill(appNumber);
    await this.page
      .locator("#MainContent_ctlDocMgr_Inc_SanPedro1_btnDocMgr_Search")
      .click();

    await this.page.getByRole("gridcell", { name: appNumber }).click();
    await this.AcceptDialog();
    await this.page
      .getByRole("button", { name: "FOR RELEASING" })
      .click({ delay: 1500 });
  }
}

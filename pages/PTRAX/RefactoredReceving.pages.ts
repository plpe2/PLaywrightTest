import { Locator, Page } from "@playwright/test";
import { ProcessHandler } from "../../helpers/PTRAX/ProcessHandler.helpers";

export class RefactoredReceiving {
  readonly page: Page;
  readonly PTRAXHelper: ProcessHandler;

  constructor(page: Page) {
    this.page = page;

    this.PTRAXHelper = new ProcessHandler(page);
  }

  async ReceiveApp(appNumber: string) {
    await this.PTRAXHelper.clickCheckbox(appNumber);
    await this.PTRAXHelper.receiveBtn.click();

    await this.PTRAXHelper.proceedBtn.waitFor({ state: "visible" });

    await this.PTRAXHelper.AcceptDialog();

    await this.PTRAXHelper.proceedBtn.click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();
  }

  async JumpApp(appNumber: string, step: string) {
    // await this.PTRAXHelper.waitForMailbox();

    await this.page.getByRole("gridcell", { name: appNumber }).click();

    await this.PTRAXHelper.jumpSelection.waitFor({ state: "attached" });
    await this.PTRAXHelper.jumpSelection.selectOption(step);

    await this.PTRAXHelper.AcceptDialog();
    await this.page.locator("//*[@id='btnJump']").click();
  }
}

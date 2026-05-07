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
    this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    await this.PTRAXHelper.receiveBtn.waitFor({ state: "visible" });

    await this.PTRAXHelper.AcceptDialog();

    await this.PTRAXHelper.receiveBtn.click();
  }

  async JumpApp(appNumber: string, step: string) {
    await this.page.getByRole("gridcell", { name: appNumber });
    await this.PTRAXHelper.jumpSelection.waitFor({ state: "attached" });
    await this.PTRAXHelper.jumpSelection.selectOption(step);

    await this.PTRAXHelper.AcceptDialog();
    await this.page.locator("//*[@id='btnJump']").click();
  }
}

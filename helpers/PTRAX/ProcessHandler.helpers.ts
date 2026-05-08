import { Locator, Page } from "@playwright/test";

export class ProcessHandler {
  readonly page: Page;

  // Login Values
  readonly username: Locator;
  readonly password: Locator;

  // Login button
  readonly loginBtn: Locator;
  readonly receiveBtn: Locator;
  readonly jumpSelection: Locator;

  private readonly baseUrl =
    "http://192.168.20.71:1023/Account/DtraxLogin.aspx";

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator("#ContentPlaceHolder1_ctlLogin1_txtUser");
    this.password = page.locator("#ContentPlaceHolder1_ctlLogin1_txtPass");
    this.loginBtn = page.locator(
      "//*[@id='ContentPlaceHolder1_ctlLogin1_btnLogin']",
    );

    this.receiveBtn = page.locator("#MainContent_btnDocMgr_batchAcceptance");
    this.jumpSelection = page.locator(
      "//*[@id='MainContent_ctlDocMgr_OperatorsAdvice1_ddl_JumpTo_Steps']",
    );
  }

  async waitForMailbox() {
    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });
  }

  async AcceptDialog() {
    await this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  async loginAcc(userAccount: string, pass = "P@ssw0rd") {
    await this.page.goto(this.baseUrl);

    await this.username.fill(userAccount);
    await this.password.fill(pass);
    await this.loginBtn.click();

    await this.waitForMailbox();
  }

  async logout() {
    await this.page.getByRole("link", { name: "Logout" }).click();
  }

  async clickCheckbox(appNo: string) {
    await this.page
      .locator(
        `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`,
      )
      .click();
  }
}

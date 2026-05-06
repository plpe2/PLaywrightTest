import { Locator, Page } from "@playwright/test";

export class BpProcess {
  readonly page: Page;

  // Login elements
  readonly username: Locator;
  readonly password: Locator;
  readonly loginbtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator("#ContentPlaceHolder1_ctlLogin1_txtUser");
    this.password = page.locator("#ContentPlaceHolder1_ctlLogin1_txtPass");
    this.loginbtn = page.locator(
      "//*[@id='ContentPlaceHolder1_ctlLogin1_btnLogin']",
    );
  }

  async ReceiveApp(appNo: string, forInspection: boolean) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("receiving");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();

    await this.page.getByRole("gridcell", { name: appNo }).click();

    var jumpSelection = this.page.locator(
      "//*[@id='MainContent_ctlDocMgr_OperatorsAdvice1_ddl_JumpTo_Steps']",
    );

    await jumpSelection.waitFor({ state: "attached" });

    if (forInspection === true) {
      await jumpSelection.selectOption("Step 3 : SITE VERIFICATION");
    } else {
      await jumpSelection.selectOption("Step 4 : EVALUATION AND ASSESSMENT");
    }

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.page.locator("//*[@id='btnJump']").click();

    await this.page.getByRole("link", { name: "Logout" }).click();
  }

  async InspecApp(appNo: string) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("siteverification");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();
  }

  async EvalApp(appNo: string) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("evaluator");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();
  }

  async EvalintoBilling(appNo: string) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("evaluator");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.getByRole("gridcell", { name: appNo }).click();

    var jumpSelection = this.page.locator(
      "//*[@id='MainContent_ctlDocMgr_OperatorsAdvice1_ddl_JumpTo_Steps']",
    );

    await jumpSelection.waitFor({ state: "attached" });

    await jumpSelection.selectOption(
      "Step 8 : BILLING (ISSUANCE OF ORDER OF PAYMENT)",
    );

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.page.locator("//*[@id='btnJump']").click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();

    await this.page.getByRole("link", { name: "Logout" }).click();

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("billingdbo");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();
  }

  async BillingintoTreasury(appNo: string) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("billingdbo");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.getByRole("gridcell", { name: appNo }).click();

    var jumpSelection = this.page.locator(
      "//*[@id='MainContent_ctlDocMgr_OperatorsAdvice1_ddl_JumpTo_Steps']",
    );

    await jumpSelection.waitFor({ state: "attached" });

    await jumpSelection.selectOption("Step 9 : CASHIER(FOR PAYMENT POSTING)");

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.page.locator("//*[@id='btnJump']").click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();

    await this.page.getByRole("link", { name: "Logout" }).click();

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("treasury");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();
  }

  async TreasuryintoReleasing(appNo: string) {
    const checkboxLocator = `//td[contains(text(), '${appNo}')]/parent::tr//input[@type='checkbox']`;

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("treasury");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.getByRole("gridcell", { name: appNo }).click();

    var jumpSelection = this.page.locator(
      "//*[@id='MainContent_ctlDocMgr_OperatorsAdvice1_ddl_JumpTo_Steps']",
    );

    await jumpSelection.waitFor({ state: "attached" });

    await jumpSelection.selectOption(
      "Step 11 : RELEASING AND ISSUANCE OF BUILDING PERMIT",
    );

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.page.locator("//*[@id='btnJump']").click();

    await this.page.locator("xpath=/html/body/div[13]/div[1]/a/span").click();

    await this.page.getByRole("link", { name: "Logout" }).click();

    await this.page.goto("http://192.168.20.71:1023/Account/DtraxLogin.aspx");
    await this.username.fill("releasingdbo");
    await this.password.fill("P@ssw0rd");
    await this.loginbtn.click();

    await this.page
      .locator("//*[@id='gbox_grdMailbox_Procurement']")
      .waitFor({ state: "visible" });

    await this.page.locator(checkboxLocator).click();
    await this.page.locator("#MainContent_btnDocMgr_batchAcceptance").click();

    const acceptBtn = this.page.locator("#MainContent_btnDocMgr_AcceptOk");
    await acceptBtn.waitFor({ state: "visible" });

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await acceptBtn.click();
  }
}

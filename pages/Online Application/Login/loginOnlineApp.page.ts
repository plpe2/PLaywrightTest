import { expect, Locator, Page } from "@playwright/test";

export class loginOnlineApplication {
  readonly page: Page;

  readonly prefix: Locator;
  readonly pincode: Locator;
  readonly year: Locator;
  readonly securityCode: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // -- Locators initialization of Login Credentials
    this.prefix = page.locator('#formLogin input[name="Prefix"]');
    this.pincode = page.locator('#formLogin input[name="pincode"]');
    this.year = page.locator('#formLogin input[name="year"]');
    this.securityCode = page.locator('#formLogin input[name="SeriesNo"]');
    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async loginAccount(securityCode: string, userName: string) {
    await this.prefix.fill("BLG");
    await this.pincode.fill("1234");
    await this.year.fill("26");
    await this.securityCode.fill(securityCode);
    await this.userName.fill(userName);
    await this.password.fill("P@ssw0rd");
    await this.loginBtn.click();
  }

  async otpCode() {
    const otpLocator = this.page.locator("#hidVerCode");

    // Wait until the value is actually populated
    await expect(otpLocator).toHaveAttribute("value", /.+/);

    const otpCode = await otpLocator.getAttribute("value");

    if (!otpCode) {
      throw new Error("OTP code not found");
    }

    await this.page
      .getByRole("textbox", { name: "ENTER VERIFICATION CODE" })
      .fill(otpCode);

    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}

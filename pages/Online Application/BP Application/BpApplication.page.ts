import { expect, Locator, Page } from "@playwright/test";

export class BpApplication {
  readonly page: Page;

  // -- Login Credentials Locators
  readonly prefix: Locator;
  readonly pincode: Locator;
  readonly year: Locator;
  readonly securityCode: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  // -- Login Credentials variables
  readonly loginCredentials: {
    userNameValue: string;
    securityCodeValue: string;
  };

  constructor({
    page,
    loginCredentials,
  }: {
    page: Page;
    loginCredentials: {
      userNameValue: string;
      securityCodeValue: string;
    };
  }) {
    this.page = page;
    this.loginCredentials = loginCredentials;

    // -- Locators initialization of Login Credentials
    this.prefix = page.locator('#formLogin input[name="Prefix"]');
    this.pincode = page.locator('#formLogin input[name="pincode"]');
    this.year = page.locator('#formLogin input[name="year"]');
    this.securityCode = page.locator('#formLogin input[name="SeriesNo"]');
    this.userName = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async gotoApplication() {
    await this.page.goto(
      "http://192.168.20.71:1024/Account/Login?statusCode=0",
    );
  }

  async loginAccount() {
    await this.prefix.fill("BLG");
    await this.pincode.fill("1234");
    await this.year.fill("26");
    await this.securityCode.fill(this.loginCredentials.securityCodeValue);
    await this.userName.fill(this.loginCredentials.userNameValue);
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

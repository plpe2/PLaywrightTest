import { test, expect } from "@playwright/test";
import { BpApplication } from "../pages/Online Application/BP Application/bpApplication.page";

test("BpApplication", async ({ page }) => {
  var BpApp = new BpApplication({
    page,
    passedValues: {
      userNameValue: "RCAMBAL",
      securityCodeValue: "0000025",
    },
  });

  await BpApp.gotoApplication();
  await BpApp.loginAccount();
  await BpApp.otpCode();

  // await page.goto("http://192.168.20.71:1024/Account/Login?statusCode=0");
});

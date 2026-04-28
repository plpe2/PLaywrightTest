import { test, expect } from "@playwright/test";
import { BpApplication } from "../pages/Online Application/BP Application/bpApplication.page";
import { occupancyApp } from "../pages/Online Application/Occupancy/occupancyApp.page";

test("BpApplication", async ({ page }) => {
  var BpApp = new BpApplication({
    page,
    loginCredentials: {
      userNameValue: "JHANERO",
      securityCodeValue: "0000013",
    },
  });

  var OccApp = new occupancyApp({ page, OccAppNo: "123" });

  await BpApp.gotoApplication();
  await BpApp.loginAccount();
  await BpApp.otpCode();
  await OccApp.gotoOccupancy();
  await OccApp.fillOccupancyApp();

  // await page.goto("http://192.168.20.71:1024/Account/Login?statusCode=0");
});

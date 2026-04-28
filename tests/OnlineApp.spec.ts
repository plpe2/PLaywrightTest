import { test, expect } from "@playwright/test";
import { BpApplication } from "../pages/Online Application/BP Application/bpApplication.page";
import { occupancyApp } from "../pages/Online Application/Occupancy/occupancyApp.page";
import { loginOnlineApplication } from "../pages/Online Application/Login/loginOnlineApp.page";

test("BpApplication", async ({ page }) => {
  var BpApp = new BpApplication({
    page,
  });
  var loginApp = new loginOnlineApplication(page);

  var OccApp = new occupancyApp({ page, OccAppNo: "TIRONA" });

  await BpApp.gotoApplication();
  await loginApp.loginAccount("0000026", "mtirona");
  await loginApp.otpCode();
  await OccApp.gotoOccupancy();
  await OccApp.fillOccupancyApp();

  // await page.goto("http://192.168.20.71:1024/Account/Login?statusCode=0");
});

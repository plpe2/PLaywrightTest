import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";

test("WebPortal Receiving", async ({ page }) => {
  var WebPortal = new ReceiveApp({ page: page, testEnvironment: false });

  await WebPortal.loginWebPortal();
  await WebPortal.ReceiveApp("NBP2605-00007");
});

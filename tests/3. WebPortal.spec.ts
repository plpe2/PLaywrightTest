import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";

test("WebPortal Receiving", async ({ page }) => {
  var WebPortal = new ReceiveApp({ page: page, testEnvironment: true });

  await WebPortal.loginWebPortal();
  await WebPortal.ReceiveApp("NBP2606-00006");
});

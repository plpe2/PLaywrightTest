import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";
import { Findings } from "../pages/BPAS/Inspection/Findings";

test("Receiving to Releasing", async ({ browser }) => {
  // global value for Application Number
  const AppNumber = "NBP2606-000111";
  const isTestEnvironment: boolean = true;
  const context = await browser.newContext();
  test.setTimeout(10 * 60 * 1000);

  await test.step("PTRAX Receiving", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page);
    var PTRAXLogin = new ProcessHandler({
      page: page,
      testEnvironment: isTestEnvironment,
    });

    // Inspection
    await PTRAXLogin.loginAcc("receiving");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXLogin.jumpSteps[3]);
    await PTRAXLogin.logout();

    await page.close();
  });

  await test.step("PTRAX Inspection", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page);
    var PTRAXLogin = new ProcessHandler({
      page: page,
      testEnvironment: isTestEnvironment,
    });

    // Inspection
    await PTRAXLogin.loginAcc("siteverification");
    await PTRAXProcess.ReceiveApp(AppNumber);

    await page.close();
  });

  await test.step("BPAS Inspection", async () => {
    const page = await context.newPage();
    var InspectionMO = new MissionOrder({ page: page, testEnvironment: true });
    var FindingsTab = new Findings({ page: page, testEnvironment: true });

    await InspectionMO.loginBPAS();
    await InspectionMO.GenerateMissionOrder(AppNumber);
    await FindingsTab.EncodeRemarks(AppNumber);

    await page.close();
  });

  //Evaluation

  //Assessment
  //Collection
  //Releasing
});

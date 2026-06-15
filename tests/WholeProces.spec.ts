import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";
import { Findings } from "../pages/BPAS/Inspection/Findings";

test("Receiving to Releasing", async ({ page }) => {
  // global value for Application Number
  const AppNumber = "NBP2606-00014";
  const isTestEnvironment: boolean = false;
  // Initialization of classes that will be used in this test
  var WebPortal = new ReceiveApp({
    page: page,
    testEnvironment: isTestEnvironment,
  });
  var PTRAXProcess = new RefactoredReceiving(page);
  var PTRAXLogin = new ProcessHandler({
    page: page,
    testEnvironment: isTestEnvironment,
  });
  var InspectionMO = new MissionOrder({ page: page, testEnvironment: false });
  var FindingsTab = new Findings({ page: page, testEnvironment: false });

  //Receving
  await WebPortal.loginWebPortal();
  await WebPortal.ReceiveApp(AppNumber);

  // Inspection
  await PTRAXLogin.loginAcc("receiving");
  await PTRAXProcess.ReceiveApp(AppNumber);
  await PTRAXProcess.JumpApp(AppNumber, await PTRAXLogin.jumpSteps[3]);
  await PTRAXLogin.logout();
  await PTRAXLogin.loginAcc("siteverification");
  await PTRAXProcess.ReceiveApp(AppNumber);

  await InspectionMO.loginBPAS();
  await InspectionMO.GenerateMissionOrder(AppNumber);
  await FindingsTab.EncodeRemarks(AppNumber);

  //Evaluation

  //Assessment
  //Collection
  //Releasing
});

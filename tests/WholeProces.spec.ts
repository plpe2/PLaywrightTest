import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";

test("Receiving to Releasing", async ({ page }) => {
  // global value for Application Number
  const AppNumber = "NBP2606-00003";
  // Initialization of classes that will be used in this test
  var WebPortal = new ReceiveApp({ page: page, testEnvironment: true });
  var PTRAXProcess = new RefactoredReceiving(page);
  var PTRAXLogin = new ProcessHandler(page);

  //Receving
  await WebPortal.loginWebPortal();
  await WebPortal.ReceiveApp(AppNumber);

  // Inspection
  await PTRAXLogin.loginAcc("receiving");
  await PTRAXProcess.ReceiveApp(AppNumber);
  await PTRAXProcess.JumpApp(AppNumber, await PTRAXLogin.jumpSteps[3]);
  await PTRAXLogin.loginAcc("siteverification");
  await PTRAXProcess.ReceiveApp(AppNumber);

  //Evaluation

  //Assessment
  //Collection
  //Releasing
});

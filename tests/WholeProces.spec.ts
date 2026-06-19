import test from "@playwright/test";
import { ReceiveApp } from "../pages/WebPortal/ReceiveApp.pages";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";
import { Findings } from "../pages/BPAS/Inspection/Findings";
import { Architectural } from "../pages/BPAS/Evaluation/Architectural.page";
import { Geodetic } from "../pages/BPAS/Evaluation/Geodetic.page";
import { Electrical } from "../pages/BPAS/Evaluation/Electrical.page";
import { Mechanical } from "../pages/BPAS/Evaluation/Mechanical.page";
import { Structural } from "../pages/BPAS/Evaluation/Structural.page";
import { Electronics } from "../pages/BPAS/Evaluation/Electronics.page";

test("Receiving to Releasing", async ({ browser }) => {
  // global value for Application Number
  const AppNumber = "NBP2606-00022";
  const isTestEnvironment: boolean = true;
  const context = await browser.newContext();
  test.setTimeout(10 * 60 * 1000);

  const permitMap = {
    archi: Architectural,
    geo: Geodetic,
    elec: Electrical,
    mech: Mechanical,
    struc: Structural,
    electronics: Electronics,
  };

  // await test.step("PTRAX Receiving", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page);
  //   var PTRAXLogin = new ProcessHandler({
  //     page: page,
  //     testEnvironment: isTestEnvironment,
  //   });

  //   // Inspection
  //   await PTRAXLogin.loginAcc("receiving");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXLogin.jumpSteps[3]);
  //   await PTRAXLogin.logout();

  //   await page.close();
  // });

  // await test.step("PTRAX Inspection", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page);
  //   var PTRAXLogin = new ProcessHandler({
  //     page: page,
  //     testEnvironment: isTestEnvironment,
  //   });

  //   // Inspection
  //   await PTRAXLogin.loginAcc("siteverification");
  //   await PTRAXProcess.ReceiveApp(AppNumber);

  //   await page.close();
  // });

  // await test.step("BPAS Inspection", async () => {
  //   const page = await context.newPage();
  //   var InspectionMO = new MissionOrder({ page: page, testEnvironment: true });
  //   var FindingsTab = new Findings({ page: page, testEnvironment: true });

  //   await InspectionMO.loginBPAS();
  //   await InspectionMO.GenerateMissionOrder(AppNumber);
  //   await FindingsTab.EncodeRemarks(AppNumber);

  //   await page.close();
  // });

  await test.step("PTRAX Evaluation jump", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, true);

    await PTRAXProcess.loginAcc("siteverification");
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.jumpSteps[4]);
    await PTRAXProcess.logout();
    await page.close();
  });

  await test.step("PTRAX Evaluation Receiving ", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, true);

    await PTRAXProcess.loginAcc("evaluator");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await PTRAXProcess.logout();
    await page.close();
  });

  //Evaluation
  // const toEvalPermits = ["geo", "elec", "archi"];
  // for (const permit of toEvalPermits) {
  //   await test.step(`${permit}`, async () => {
  //     var page = await context.newPage();
  //     // var EvalClass = new permitMap[permit](page, "");
  //     console.log("haha");
  //   });
  // }

  //Assessment
  //Collection
  //Releasing
});

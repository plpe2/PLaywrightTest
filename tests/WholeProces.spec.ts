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
import { BPASHelper } from "../helpers/BPAS/BPASHelper.helpers";
import { Assessment } from "../pages/BPAS/Assessment/Assessment.page";

test("Receiving to Releasing", async ({ browser }) => {
  // global value for Application Number
  const AppNumber = "NBP2607-00015";
  const isTestEnvironment: boolean = true;
  const context = await browser.newContext();
  test.setTimeout(10 * 60 * 1000);

  const permitMap: Record<string, any> = {
    archi: Architectural,
    geo: Geodetic,
    elec: Electrical,
    mech: Mechanical,
    struc: Structural,
    electronics: Electronics,
  };

  // await test.step("PTRAX Receiving", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   // Inspection
  //   await PTRAXProcess.loginAcc("receiving");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.jumpSteps[3]);

  //   await page.close();
  // });

  // await test.step("PTRAX Inspection", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   // Inspection
  //   await PTRAXProcess.loginAcc("siteverification");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await page.close();
  // });

  // await test.step("BPAS Inspection", async () => {
  //   const page = await context.newPage();
  //   var InspectionMO = new MissionOrder({
  //     page: page,
  //     testEnvironment: isTestEnvironment,
  //   });
  //   var FindingsTab = new Findings({
  //     page: page,
  //     testEnvironment: isTestEnvironment,
  //   });

  //   await InspectionMO.loginBPAS();
  //   await InspectionMO.GenerateMissionOrder(AppNumber);
  //   await FindingsTab.EncodeRemarks(AppNumber);

  //   await page.close();
  // });

  // await test.step("PTRAX Evaluation jump", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   await PTRAXProcess.loginAcc("siteverification");
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.jumpSteps[4]);
  //   await page.close();
  // });

  // await test.step("PTRAX Evaluation Receiving ", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   await PTRAXProcess.loginAcc("evaluator");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await page.close();
  // });

  // // Evaluation
  // const toEvalPermits = ["geo", "archi", "elec", "struc"];
  // await test.step("BPAS Permit Evaluation", async () => {
  //   // Eval process uses existing page, straight through the Inspection module causing error.
  //   const evalContext = await browser.newContext();
  //   const page = await evalContext.newPage();
  //   var BPASLogin = new BPASHelper(page);

  //   await BPASLogin.loginBPAS();
  //   for (const permit of toEvalPermits) {
  //     var EvalClass = new permitMap[permit](page, AppNumber);
  //     await EvalClass.evaluationProcess();
  //   }

  //   await evalContext.close();
  // });

  // await test.step("Evaluation jump in Assessment", async () => {
  //   const page = await browser.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   // Evaluator Account
  //   await PTRAXProcess.loginAcc("evaluator");
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.jumpSteps[8]);
  //   await page.close();
  // });

  // await test.step("Assessment Receiving from Evaluator", async () => {
  //   const page = await browser.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   // Billing Account
  //   await PTRAXProcess.loginAcc("billingdbo");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await page.close();
  // });

  await test.step("Assess permit Application", async () => {
    const AssessContext = await browser.newContext();
    const page = await AssessContext.newPage();

    var AssessModule = new Assessment(page, isTestEnvironment);

    await AssessModule.loginBPAS();
    await AssessModule.AssessApp(AppNumber);
    await page.close();
  });

  await test.step("Assessment into Treasury", async () => {
    const AssessContext = await browser.newContext();
    const page = await AssessContext.newPage();
    const refactorePTRAX = new RefactoredReceiving(page, true);

    await refactorePTRAX.loginAcc("billingdbo");
    await refactorePTRAX.JumpApp(AppNumber, await refactorePTRAX.jumpSteps[9]);
  });

  await test.step("Receiving into Treasury", async () => {
    const AssessContext = await browser.newContext();
    const page = await AssessContext.newPage();
    const refactorePTRAX = new RefactoredReceiving(page, true);

    await refactorePTRAX.loginAcc("treasury");
    await refactorePTRAX.ReceiveApp(AppNumber);
  });

  // test("Collection into Releasing", async () => {
  //   const CollectionContext = await browser.newContext();
  //   const page = await CollectionContext.newPage();
  //   const refactorePTRAX = new RefactoredReceiving(page, true);

  //   await refactorePTRAX.loginAcc("treasury");
  //   await refactorePTRAX.JumpApp(
  //     "NBP2606-00023",
  //     await refactorePTRAX.jumpSteps[11],
  //   );
  //   await refactorePTRAX.loginAcc("releasingdbo");
  //   await refactorePTRAX.ReceiveApp("NBP2606-00023");
  // });

  // await test.step("PTRAX Evaluation jump to Assesment", async () => {
  //   var page = await context.newPage();
  //   console.log("eval jump");
  // });

  // await test.step("PTRAX Assessment receiving", async () => {
  //   var page = await context.newPage();
  //   console.log("assessment receive");
  // });

  //Assessment
  //Collection
  //Releasing
});

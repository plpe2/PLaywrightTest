import test from "@playwright/test";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
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
import { traceApplication } from "../pages/WebPortal/api/getOwnerName.api";
import { Collection } from "../pages/BPAS/Collection/Collection.page";
import { Releasing } from "../pages/BPAS/Releasing/Releasing,pages";
import { BpProcess } from "../pages/PTRAX/BpProcess.pages";
import { Occupancy } from "../pages/BPAS/Evaluation/Occupancy.pages";

test("NBP Receiving to Releasing", async ({ browser, request }) => {
  // global value for Application Number
  const AppNumber = "NBP2607-00014";
  const isTestEnvironment: boolean = false;
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

  await test.step("PTRAX Receiving", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    // Inspection
    await PTRAXProcess.loginAcc("receiving");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.NBPjumpSteps[3]);

    await page.close();
  });

  await test.step("PTRAX Inspection", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    // Inspection
    await PTRAXProcess.loginAcc("siteverification");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await page.close();
  });

  await test.step("BPAS Inspection", async () => {
    const page = await context.newPage();
    var InspectionMO = new MissionOrder({
      page: page,
      testEnvironment: isTestEnvironment,
    });
    var FindingsTab = new Findings({
      page: page,
      testEnvironment: isTestEnvironment,
    });

    await InspectionMO.loginBPAS();
    await InspectionMO.GenerateMissionOrder(AppNumber);
    await FindingsTab.EncodeRemarks(AppNumber);

    await page.close();
  });

  await test.step("PTRAX Evaluation jump", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    await PTRAXProcess.loginAcc("siteverification");
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.NBPjumpSteps[4]);
    await page.close();
  });

  await test.step("PTRAX Evaluation Receiving ", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    await PTRAXProcess.loginAcc("evaluator");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await page.close();
  });

  // Evaluation
  const toEvalPermits = ["geo", "archi", "elec", "struc"];
  await test.step("BPAS Permit Evaluation", async () => {
    // Eval process uses existing page, straight through the Inspection module causing error.
    const evalContext = await browser.newContext();
    const page = await evalContext.newPage();
    var BPASLogin = new BPASHelper(page);

    await BPASLogin.loginBPAS();
    for (const permit of toEvalPermits) {
      var EvalClass = new permitMap[permit](page, AppNumber);
      await EvalClass.evaluationProcess();
    }

    await evalContext.close();
  });

  await test.step("Evaluation jump in Assessment", async () => {
    const page = await browser.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    // Evaluator Account
    await PTRAXProcess.loginAcc("evaluator");
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.NBPjumpSteps[8]);
    await page.close();
  });

  await test.step("Assessment Receiving from Evaluator", async () => {
    const page = await browser.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    // Billing Account
    await PTRAXProcess.loginAcc("billingdbo");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await page.close();
  });

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
    const refactorePTRAX = new RefactoredReceiving(page, isTestEnvironment);

    await refactorePTRAX.loginAcc("billingdbo");
    await refactorePTRAX.JumpApp(
      AppNumber,
      await refactorePTRAX.NBPjumpSteps[9],
    );

    await page.close();
  });

  await test.step("Receiving into Treasury", async () => {
    const AssessContext = await browser.newContext();
    const page = await AssessContext.newPage();
    const refactorePTRAX = new RefactoredReceiving(page, isTestEnvironment);

    await refactorePTRAX.loginAcc("treasury");
    await refactorePTRAX.ReceiveApp(AppNumber);

    await page.close();
  });

  await test.step("Collection process", async () => {
    const BuildingName = await traceApplication(request, AppNumber);
    const CollectionContext = await browser.newContext();
    const page = await CollectionContext.newPage();

    var BPASCollection = new Collection(page);

    await BPASCollection.loginBPAS();
    await BPASCollection.collectionProcess(BuildingName);

    await page.close();
  });

  await test.step("Collection jump into Releasing", async () => {
    const CollectionContext = await browser.newContext();
    const page = await CollectionContext.newPage();
    const refactorePTRAX = new RefactoredReceiving(page, isTestEnvironment);

    await refactorePTRAX.loginAcc("treasury");
    await refactorePTRAX.JumpApp(
      AppNumber,
      await refactorePTRAX.NBPjumpSteps[11],
    );

    await page.close();
  });

  await test.step("Receiving into Releasing", async () => {
    const ReleasingContext = await browser.newContext();
    const page = await ReleasingContext.newPage();
    const refactorePTRAX = new RefactoredReceiving(page, isTestEnvironment);

    await refactorePTRAX.loginAcc("releasingdbo");
    await refactorePTRAX.ReceiveApp(AppNumber);

    await page.close();
  });

  await test.step("Releasing process", async () => {
    const ReleasingContext = await browser.newContext();
    const page = await ReleasingContext.newPage();
    var BPASReleasing = new Releasing(page);

    await BPASReleasing.loginBPAS();
    await BPASReleasing.releasingProcess(AppNumber);
  });
});

test("Occupancy Receiving to Releasing", async ({ browser }) => {
  const AppNumber = "OCC2607-00004";
  const isTestEnvironment: boolean = true;
  const context = await browser.newContext();
  test.setTimeout(10 * 60 * 1000);

  // await test.step("PTRAX Receiving", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, true);

  //   // Inspection
  //   await PTRAXProcess.loginAcc("receiving");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.OccjumpSteps[3]);

  //   await page.close();
  // });

  // await test.step("Inspection Receiving", async () => {
  //   const RecevingContext = await browser.newContext();
  //   const page = await RecevingContext.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, true);

  //   await PTRAXProcess.loginAcc("siteinspector");
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

  //   await PTRAXProcess.loginAcc("siteinspector");
  //   await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.OccjumpSteps[6]);
  //   await page.close();
  // });

  // await test.step("PTRAX Evaluation Receiving ", async () => {
  //   const page = await context.newPage();
  //   var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

  //   await PTRAXProcess.loginAcc("dboadmin");
  //   await PTRAXProcess.ReceiveApp(AppNumber);
  //   await page.close();
  // });

  // await test.step("Occupancy permit Evaluation", async () => {
  //   const EvalContext = await browser.newContext();
  //   const page = await EvalContext.newPage();
  //   const OccPage = new Occupancy({ page: page, testEnvironment: true });

  //   await OccPage.loginBPAS();
  //   await OccPage.OccEvaluation(AppNumber);
  // });

  await test.step("PTRAX Billing jump", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    await PTRAXProcess.loginAcc("dboadmin");
    await PTRAXProcess.JumpApp(AppNumber, await PTRAXProcess.OccjumpSteps[7]);
    await page.close();
  });

  await test.step("PTRAX Billing Receiving ", async () => {
    const page = await context.newPage();
    var PTRAXProcess = new RefactoredReceiving(page, isTestEnvironment);

    await PTRAXProcess.loginAcc("billingdbo");
    await PTRAXProcess.ReceiveApp(AppNumber);
    await page.close();
  });
});

test("Releasing Permit", async ({ page }) => {
  const releasing = new RefactoredReceiving(page, true);

  await releasing.loginAcc("releasingdbo");
  await releasing.ReleasingPermit("DEM2606-00002");
});

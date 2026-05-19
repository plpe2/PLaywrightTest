import test from "@playwright/test";
import { BpProcess } from "../pages/PTRAX/BpProcess.pages";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";

test("Receiving into Inspection", async ({ page }) => {
  const ptraxApp = new BpProcess(page);
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler(page);

  await ptraxHandler.loginAcc("receiving");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
  await refactorePTRAX.JumpApp(
    "NBP2605-00013",
    await ptraxHandler.jumpSteps[3],
  );
  await ptraxHandler.loginAcc("siteverification");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
});

test("Inspection into Evaluation", async ({ page }) => {
  const ptraxApp = new BpProcess(page);
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler(page);

  await ptraxHandler.loginAcc("siteverification");
  await refactorePTRAX.JumpApp(
    "NBP2605-00013",
    await ptraxHandler.jumpSteps[4],
  );
  await ptraxHandler.loginAcc("evaluator");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
});

test("Evaluation into Treasury", async ({ page }) => {
  const ptraxApp = new BpProcess(page);
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler(page);

  await ptraxHandler.loginAcc("evaluator");
  await refactorePTRAX.JumpApp(
    "NBP2605-00013",
    await ptraxHandler.jumpSteps[8],
  );
  await ptraxHandler.loginAcc("billingdbo");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
});

test("Treasury into Collection", async ({ page }) => {
  const ptraxApp = new BpProcess(page);
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler(page);

  await ptraxHandler.loginAcc("billingdbo");
  await refactorePTRAX.JumpApp(
    "NBP2605-00013",
    await ptraxHandler.jumpSteps[9],
  );
  await ptraxHandler.loginAcc("treasury");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
});

test("Collection into Releasing", async ({ page }) => {
  const ptraxApp = new BpProcess(page);
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler(page);

  await ptraxHandler.loginAcc("treasury");
  await refactorePTRAX.JumpApp(
    "NBP2605-00013",
    await ptraxHandler.jumpSteps[11],
  );
  await ptraxHandler.loginAcc("releasingdbo");
  await refactorePTRAX.ReceiveApp("NBP2605-00013");
});

import test from "@playwright/test";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";

test("Receiving into Inspection", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page, true);

  await refactorePTRAX.loginAcc("receiving");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
  await refactorePTRAX.JumpApp(
    "NBP2606-00023",
    await refactorePTRAX.jumpSteps[3],
  );
  await refactorePTRAX.loginAcc("siteverification");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
});

test("Inspection into Evaluation", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page, true);

  await refactorePTRAX.loginAcc("siteverification");
  await refactorePTRAX.JumpApp(
    "NBP2606-00023",
    await refactorePTRAX.jumpSteps[4],
  );
  await refactorePTRAX.loginAcc("evaluator");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
});

test("Evaluation into Treasury", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page, true);

  await refactorePTRAX.loginAcc("evaluator");
  await refactorePTRAX.JumpApp(
    "NBP2606-00023",
    await refactorePTRAX.jumpSteps[8],
  );
  await refactorePTRAX.loginAcc("billingdbo");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
});

test("Treasury into Collection", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page, true);

  await refactorePTRAX.loginAcc("billingdbo");
  await refactorePTRAX.JumpApp(
    "NBP2606-00023",
    await refactorePTRAX.jumpSteps[9],
  );
  await refactorePTRAX.loginAcc("treasury");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
});

test("Collection into Releasing", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page, true);

  await refactorePTRAX.loginAcc("treasury");
  await refactorePTRAX.JumpApp(
    "NBP2606-00023",
    await refactorePTRAX.jumpSteps[11],
  );
  await refactorePTRAX.loginAcc("releasingdbo");
  await refactorePTRAX.ReceiveApp("NBP2606-00023");
});

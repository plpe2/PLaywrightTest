import test from "@playwright/test";
import { RefactoredReceiving } from "../pages/PTRAX/RefactoredReceving.pages";
import { ProcessHandler } from "../helpers/PTRAX/ProcessHandler.helpers";

test("Receiving into Inspection", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler({
    page: page,
    testEnvironment: true,
  });

  await ptraxHandler.loginAcc("receiving");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
  await refactorePTRAX.JumpApp(
    "NBP2606-00015",
    await ptraxHandler.jumpSteps[3],
  );
  await ptraxHandler.loginAcc("siteverification");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
});

test("Inspection into Evaluation", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler({
    page: page,
    testEnvironment: true,
  });

  await ptraxHandler.loginAcc("siteverification");
  await refactorePTRAX.JumpApp(
    "NBP2606-00015",
    await ptraxHandler.jumpSteps[4],
  );
  await ptraxHandler.loginAcc("evaluator");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
});

test("Evaluation into Treasury", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler({
    page: page,
    testEnvironment: true,
  });

  await ptraxHandler.loginAcc("evaluator");
  await refactorePTRAX.JumpApp(
    "NBP2606-00015",
    await ptraxHandler.jumpSteps[8],
  );
  await ptraxHandler.loginAcc("billingdbo");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
});

test("Treasury into Collection", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler({
    page: page,
    testEnvironment: true,
  });

  await ptraxHandler.loginAcc("billingdbo");
  await refactorePTRAX.JumpApp(
    "NBP2606-00015",
    await ptraxHandler.jumpSteps[9],
  );
  await ptraxHandler.loginAcc("treasury");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
});

test("Collection into Releasing", async ({ page }) => {
  const refactorePTRAX = new RefactoredReceiving(page);
  const ptraxHandler = new ProcessHandler({
    page: page,
    testEnvironment: true,
  });

  await ptraxHandler.loginAcc("treasury");
  await refactorePTRAX.JumpApp(
    "NBP2606-00015",
    await ptraxHandler.jumpSteps[11],
  );
  await ptraxHandler.loginAcc("releasingdbo");
  await refactorePTRAX.ReceiveApp("NBP2606-00015");
});

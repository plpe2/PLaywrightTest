import test from "@playwright/test";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";
import { Findings } from "../pages/BPAS/Inspection/Findings";

test("Generate Mission Order", async ({ page }) => {
  var InspectionMO = new MissionOrder({ page: page, testEnvironment: true });

  await InspectionMO.loginBPAS();
  await InspectionMO.GenerateMissionOrder("NBP2606-00006");
});

test("Encoding Findings Remarks", async ({ page }) => {
  var FindingsTab = new Findings({ page: page, testEnvironment: true });

  await FindingsTab.loginBPAS();
  await FindingsTab.EncodeRemarks("NBP2606-00006");
});

test("Full Inspection process", async ({ page }) => {
  var InspectionMO = new MissionOrder({ page: page, testEnvironment: true });
  var FindingsTab = new Findings({ page: page, testEnvironment: true });

  await InspectionMO.loginBPAS();
  await InspectionMO.GenerateMissionOrder("NBP2606-00023");
  await FindingsTab.EncodeRemarks("NBP2606-00023");
});

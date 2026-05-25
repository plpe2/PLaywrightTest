import test from "@playwright/test";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";
import { Findings } from "../pages/BPAS/Inspection/Findings";

test("Generate Mission Order", async ({ page }) => {
  var InspectionMO = new MissionOrder({ page: page, testEnvironment: false });

  await InspectionMO.loginBPAS();
  await InspectionMO.GenerateMissionOrder("NBP2605-00008");
});

test("Encoding Findings Remarks", async ({ page }) => {
  var FindingsTab = new Findings({ page: page, testEnvironment: false });

  await FindingsTab.loginBPAS();
  await FindingsTab.EncodeRemarks("NBP2605-00008");
});

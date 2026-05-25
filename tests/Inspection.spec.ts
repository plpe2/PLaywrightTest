import test from "@playwright/test";
import { MissionOrder } from "../pages/BPAS/Inspection/MissionOrder.page";

test("Generate Mission Order", async ({ page }) => {
  var InspectionMO = new MissionOrder({ page: page, testEnvironment: false });

  await InspectionMO.loginBPAS();
  await InspectionMO.GenerateMissionOrder("NBP2605-00008");
});

import test from "@playwright/test";
import { Assessment } from "../pages/BPAS/Assessment/Assessment.page";

test("Assess fee", async ({ page }) => {
  var AssessModule = new Assessment(page, true);

  await AssessModule.loginBPAS();
  await AssessModule.AssessApp("NBP2605-00012");
});

import test from "@playwright/test";
import { BPASHelper } from "../helpers/BPAS/BPASHelper.helpers";
import { Architectural } from "../pages/BPAS/Evaluation/Architectural.page";
import { Geodetic } from "../pages/BPAS/Evaluation/Geodetic.page";

test("Architectural Evaluation", async ({ page }) => {
  var helpers = new BPASHelper(page);
  var archiTest = new Architectural(page);

  await helpers.loginBPAS();
  await archiTest.evaluationProcess();
  await page.locator("#btnSaveBldgEval").click();
});

test("Geodetic Evaluation", async ({ page }) => {
  var helpers = new BPASHelper(page);
  var geoTest = new Geodetic(page);

  await helpers.loginBPAS();
  await geoTest.evaluationProcess();
});

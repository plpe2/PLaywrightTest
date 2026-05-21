import test from "@playwright/test";
import { BPASHelper } from "../helpers/BPAS/BPASHelper.helpers";
import { Architectural } from "../pages/BPAS/Evaluation/Architectural.page";
import { Geodetic } from "../pages/BPAS/Evaluation/Geodetic.page";
import { Electrical } from "../pages/BPAS/Evaluation/Electrical.page";
import { Mechanical } from "../pages/BPAS/Evaluation/Mechanical.page";
import { Structural } from "../pages/BPAS/Evaluation/Structural.page";
import { Sanitary } from "../pages/BPAS/Evaluation/Sanitary.page";

test("Architectural Evaluation", async ({ page }) => {
  var archiTest = new Architectural(page);

  await archiTest.loginBPAS();
  await archiTest.evaluationProcess();
  await page.locator("#btnSaveBldgEval").click();
});

test("Geodetic Evaluation", async ({ page }) => {
  var geoTest = new Geodetic(page);

  await geoTest.loginBPAS();
  await geoTest.evaluationProcess();
});

test("Electrical Evaluation", async ({ page }) => {
  var elecTest = new Electrical(page);

  await elecTest.loginBPAS();
  await elecTest.evaluationProcess();
});

test("Mechanical Evaluation", async ({ page }) => {
  var mechTest = new Mechanical(page);

  await mechTest.loginBPAS();
  await mechTest.evaluationProcess();
});

test("Structural Evaluation", async ({ page }) => {
  var structTest = new Structural(page);

  await structTest.loginBPAS();
  await structTest.evaluationProcess();
});

test("Sanitary Evaluation", async ({ page }) => {
  var sanitaryTest = new Sanitary(page);

  await sanitaryTest.loginBPAS();
  await sanitaryTest.evaluationProcess();
});

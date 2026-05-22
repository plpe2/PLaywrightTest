import test from "@playwright/test";

import { Architectural } from "../pages/BPAS/Evaluation/Architectural.page";
import { Geodetic } from "../pages/BPAS/Evaluation/Geodetic.page";
import { Electrical } from "../pages/BPAS/Evaluation/Electrical.page";

import { Structural } from "../pages/BPAS/Evaluation/Structural.page";

test("Architectural Evaluation", async ({ page }) => {
  var archiTest = new Architectural(page, "NBP2605-00014");

  await archiTest.loginBPAS();
  await archiTest.evaluationProcess();
  await page.locator("#btnSaveBldgEval").click();
});

test("Geodetic Evaluation", async ({ page }) => {
  var geoTest = new Geodetic(page, "NBP2605-00014");

  await geoTest.loginBPAS();
  await geoTest.evaluationProcess();
});

test("Electrical Evaluation", async ({ page }) => {
  var elecTest = new Electrical(page, "NBP2605-00014");

  await elecTest.loginBPAS();
  await elecTest.evaluationProcess();
});

// test("Mechanical Evaluation", async ({ page }) => {
//   var mechTest = new Mechanical(page);

//   await mechTest.loginBPAS();
//   await mechTest.evaluationProcess();
// });

test("Structural Evaluation", async ({ page }) => {
  var structTest = new Structural(page, "NBP2605-00014");

  await structTest.loginBPAS();
  await structTest.evaluationProcess();
});

// test("Sanitary Evaluation", async ({ page }) => {
//   var sanitaryTest = new Sanitary(page);

//   await sanitaryTest.loginBPAS();
//   await sanitaryTest.evaluationProcess();
// });

// test("Electronics Evaluation", async ({ page }) => {
//   var eletronicTest = new Electronics(page);

//   await eletronicTest.loginBPAS();
//   await eletronicTest.evaluationProcess();
// });

// test("Plumbing Evaluation", async ({ page }) => {
//   var plumbTest = new Plumbing(page);

//   await plumbTest.loginBPAS();
//   await plumbTest.evaluationProcess();
// });

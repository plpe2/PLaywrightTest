import test from "@playwright/test";
import { Releasing } from "../pages/BPAS/Releasing/Releasing,pages";

test("Releasing ", async ({ page }) => {
  var BPASReleasing = new Releasing(page);

  await BPASReleasing.loginBPAS();
  await BPASReleasing.releasingProcess("NBP2607-00021");
});

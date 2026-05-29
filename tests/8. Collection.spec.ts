import test from "@playwright/test";
import { Collection } from "../pages/BPAS/Collection/Collection.page";

test("Fee Collection", async ({ page }) => {
  var BPASCollection = new Collection(page);

  await BPASCollection.loginBPAS();
  await BPASCollection.collectionProcess("MARTIN");
});

import test from "@playwright/test";
import { BpProcess } from "../pages/PTRAX/BpProcess.pages";

test("PTRAX Receiving", async ({ page }) => {
  const ptraxApp = new BpProcess(page);

  await ptraxApp.ReceiveApp("NBP2605-00005");
});

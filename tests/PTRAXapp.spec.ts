import test from "@playwright/test";
import { BpProcess } from "../pages/PTRAX/BpProcess.pages";

test("PTRAX Receiving", async ({ page }) => {
  const ptraxApp = new BpProcess(page);

  // await ptraxApp.ReceiveApp("NBP2605-00004", true);
  // await ptraxApp.InspecApp("NBP2605-00004");
  // await ptraxApp.EvalApp("NBP2605-00004");
  // await ptraxApp.EvalintoBilling("NBP2605-00002");
  await ptraxApp.BillingintoTreasury("NBP2605-00002");
});

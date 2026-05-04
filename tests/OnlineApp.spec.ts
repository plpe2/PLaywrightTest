import { test } from "@playwright/test";
import { BpApplication } from "../pages/Online Application/BP Application/bpApplication.page";
import { occupancyApp } from "../pages/Online Application/Occupancy/occupancyApp.page";
import { loginOnlineApplication } from "../pages/Online Application/Login/loginOnlineApp.page";

test("BpApplication", async ({ page }) => {
  // Initialization of class for calling functions
  var loginApp = new loginOnlineApplication(page);
  var BpApp = new BpApplication({
    page,
    isNewAccount: false,
    isExisting: false,
    BpAppInfo: {
      Pin: "2026-04-00123",
      ProjectTitle: "Proposed Two-Storey Residential Building",
      BldgName: "JOHN",
      TDN: "15-00345",
      TCTNo: "123456",
      ProjectCost: 3500000,
      FloorArea: 45,
      StoreyNo: 2,
      LotArea: 45,
      BldgHeight: 8.5,
      Progress: "New Construction",
      LotNo: "7",
      BlkNo: "13",
      BrgyName: "Barangay San Isidro",
    },
  });

  // function Calling Procees of BpApplication
  await BpApp.gotoApplication();
  await loginApp.loginAccount("0000005", "JDOE");
  await loginApp.otpCode();
  await BpApp.ProjectInfoEncoding();
  await BpApp.ProfessionalInfoEncoding();
  await BpApp.DocumentSubmission();
  await BpApp.submitApp();
});

test("Occupancy Application", async ({ page }) => {
  // Initialization of class for calling functions
  var loginApp = new loginOnlineApplication(page);
  var OccApp = new occupancyApp({ page, OccAppNo: "TIRONA" });

  // function Calling Procees of Occupancy Permit Application
  await OccApp.gotoApp();
  await loginApp.loginAccount("0000026", "mtirona");
  await loginApp.otpCode();
  await OccApp.gotoOccupancy();
  await OccApp.fillOccupancyApp();
});

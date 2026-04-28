import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages//Online Application/Registration/registration.page";

test("Registration", async ({ page }) => {
  var Rp = new RegistrationPage({
    page: page,
    urlLink: "http://192.168.20.71:1024/",
    OwnerInfo: {
      firstName: "donald",
      lastName: "hugh",
    },
    ContactInfo: {
      email: "dhugh@example.com",
      mobileNumber: "09155452264",
      address: "1243 Fleet Street",
      zipCode: "4102",
    },
    usernameValue: "dhugh",
    passwordValue: "P@ssw0rd",
  });

  await Rp.goto();
  await Rp.selectOwnerRegistration();
  await Rp.fillOwnerInfo();
  await Rp.fillContact();
  await Rp.fillAccount();
  await Rp.submit();
  await Rp.confirmIfVisible();
  // await Rp.expectSuccess();

  await page
    .locator("xpath=/html/body/div/div[1]/section/div/div[2]/div[1]/div")
    .isVisible();

  await page.screenshot({ path: "screenshot.png" });
});

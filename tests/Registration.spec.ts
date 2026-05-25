import { test, expect, request } from "@playwright/test";
import { RegistrationPage } from "../pages//Online Application/Registration/registration.page";

test("Registration", async ({ page }) => {
  const dummyUserUrl = await request.newContext({
    baseURL: "https://randomuser.me/api",
  });

  const requestUser = await dummyUserUrl.get("/api", {
    params: { gender: "male" },
  });

  const responseData = await requestUser.json();

  let user = responseData.results[0];

  dummyUserUrl.dispose();

  var Rp = new RegistrationPage({
    page: page,
    testEnvironment: false,
    OwnerInfo: {
      firstName: user.name.first,
      lastName: user.name.last,
    },
    ContactInfo: {
      mobileNumber: user.phone,
      address: `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.state}`,
      zipCode: `${user.location.postcode}`,
    },
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

  // await page.screenshot({ path: "screenshot.png" });
});

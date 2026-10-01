import { test, expect, request } from "@playwright/test";
import { RegistrationPage } from "../pages/Online Application/Registration/registration.page";

test("Sample Registration", async ({ page }) => {
  const dummyUserUrl = await request.newContext({
    baseURL: "https://randomuser.me/api",
  });

  const requestUser = await dummyUserUrl.get("/api", {
    params: { gender: "male", nat: "us" },
  });

  const responseData = await requestUser.json();

  let user = responseData.results[0];

  dummyUserUrl.dispose();

  var Rp = new RegistrationPage({
    page: page,
    testEnvironment: true,
    isOwner: true,
    OwnerInfo: {
      firstName: user.name.first,
      middleName: user.name.first,
      lastName: user.name.last,
    },
    ContactInfo: {
      mobileNumber: user.phone,
      address: `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.state}`,
      zipCode: `${user.location.postcode}`,
    },
    RepresentativeInfo: {
      firstName: "Hello",
      middleName: "Hello",
      lastName: "World",
    },
    RepresentativeContactInfo: {
      mobileNumber: "09155352294",
      address: "BLK 8 Lot 8 Molino IV Bacoor Cavite",
      zipCode: "4102",
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

test("Application Registration", async ({ page }) => {
  var Rp = new RegistrationPage({
    page: page,
    testEnvironment: false,
    isOwner: true,
    OwnerInfo: {
      firstName: "First",
      middleName: "User",
      lastName: "Information",
    },
    ContactInfo: {
      mobileNumber: "09155352294",
      address: "BLK 8 Lot 8 Molino IV Bacoor Cavite",
      zipCode: "4102",
    },
    RepresentativeInfo: {
      firstName: "Second",
      middleName: "User2nd",
      lastName: "Information2nd",
    },
    RepresentativeContactInfo: {
      mobileNumber: "09155352294",
      address: "BLK 18 Lot 28 Molino IV Bacoor Cavite",
      zipCode: "4103",
    },
  });

  await Rp.goto();
  await Rp.selectOwnerRegistration();
  await Rp.fillOwnerInfo();
  await Rp.fillContact();
  await Rp.fillAccount();
  await Rp.fillRepresentativeInfo();
  await Rp.submit();
  // await page.waitForTimeout(5000);
  await Rp.confirmIfVisible();
  // await Rp.expectSuccess();

  await page
    .locator("xpath=/html/body/div/div[1]/section/div/div[2]/div[1]/div")
    .isVisible();
});

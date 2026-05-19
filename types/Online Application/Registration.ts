import { Page } from "@playwright/test";

export type RegistrationTypes = {
  page: Page;
  testEnvironment: string;
  OwnerInfo: {
    firstName: string;
    lastName: string;
  };
  ContactInfo: {
    mobileNumber: string;
    address: string;
    zipCode: string;
  };
};

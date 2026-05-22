import { Page } from "@playwright/test";

export type RegistrationTypes = {
  page: Page;
  testEnvironment: boolean;
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

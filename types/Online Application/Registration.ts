import { Page } from "@playwright/test";

export type RegistrationTypes = {
  page: Page;
  testEnvironment: boolean;
  isOwner: boolean;
  OwnerInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  ContactInfo: {
    mobileNumber: string;
    address: string;
    zipCode: string;
  };
  RepresentativeInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
  };

  // -- Constructor : Passed ContactInfo
  RepresentativeContactInfo: {
    mobileNumber: string;
    address: string;
    zipCode: string;
  };
};

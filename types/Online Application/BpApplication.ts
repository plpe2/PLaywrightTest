import { Page } from "@playwright/test";

export type BpTypes = {
  page: Page;
  loginCredentials: {
    userNameValue: string;
    securityCodeValue: string;
  };
};

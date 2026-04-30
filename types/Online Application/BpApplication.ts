import { Page } from "@playwright/test";

export type BpTypes = {
  page: Page;
  loginCredentials: {
    userNameValue: string;
    securityCodeValue: string;
  };
};

export type BldgAppInfo = {
  Pin: string;
  ProjectTitle?: string;
  BldgName: string;
  TDN: string;
  TCTNo: string;
  ProjectCost: number;
  FloorArea: number;
  StoreyNo: number;
  LotArea: number;
  BldgHeight: number;
  Progress: string;
  LotNo: string;
  BlkNo: string;
  BrgyName?: string;
};

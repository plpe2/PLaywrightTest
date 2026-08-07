import { Page } from "@playwright/test";
import { BPASHelper } from "../../../helpers/BPAS/BPASHelper.helpers";

export class CFEI extends BPASHelper {
  readonly testEnvironment: boolean;
  readonly urlLink: string;

  constructor({
    page,
    testEnvironment,
  }: {
    page: Page;
    testEnvironment: boolean;
  }) {
    super(page);
    this.testEnvironment = testEnvironment;
    this.urlLink = testEnvironment
      ? (process.env.TEST_BPAS as string)
      : (process.env.LIVE_BPAS as string);
  }

  async CFEIEvaluation(AppNo: string) {
    await this.page.goto(
      this.urlLink + "PermitEvaluation/PermitEvaluationCFEI",
    );
    await this.page.getByRole("gridcell", { name: AppNo }).click();
    await this.page.getByText("Compliant").first().click();
    await this.page.getByText("Compliant").nth(1).click();
    await this.page.getByText("Compliant").nth(2).click();
    await this.page.locator("div:nth-child(4) > .col-md-2").click();
    await this.page.getByText("Compliant").nth(4).click();
    await this.page.getByText("Compliant").nth(5).click();
    await this.page.locator("#btnSaveCFEIPlans").click();
    await this.page.getByRole("button", { name: "Close" }).click();
    await this.page.locator("a").filter({ hasText: "Complied" }).click();
    await this.page.locator("#btnSaveCFEIEval").click();
  }
}

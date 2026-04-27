import { test, expect } from "@playwright/test";

test("BpApplication", async ({ page }) => {
  await page.goto("http://192.168.20.71:1024/Account/Login?statusCode=0");
});

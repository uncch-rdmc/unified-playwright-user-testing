import { test, expect } from "@playwright/test";

test("browse dataset records", async ({ page }) => {
  await page.goto("");
  await page.getByRole("button", { name: "Sort" }).click();
  await page.getByRole("link", { name: "Name" }).first().click();
  await page
    .locator("#resultsTable")
    .locator("tbody")
    .locator("tr")
    .first()
    .locator("a")
    .first()
    .click();
  await page.getByRole("link", { name: "Metadata" }).click();
});

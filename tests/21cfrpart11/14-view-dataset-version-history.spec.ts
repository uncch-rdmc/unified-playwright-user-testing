import { test, expect } from "@playwright/test";

test("view dataset version history", async ({ page }) => {
  await page.goto("");
  await page
    .locator("#resultsTable")
    .locator("tbody")
    .locator("tr")
    .first()
    .locator("a")
    .first()
    .click();
  await page.getByRole("link", { name: "Versions" }).click();
  await page.getByRole("link", { name: "DRAFT" }).click();
});

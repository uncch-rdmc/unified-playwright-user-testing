import { test, expect } from "@playwright/test";

test("search dataset records", async ({ page }) => {
  await page.goto("");
  await page.getByPlaceholder("Search this dataverse").fill("UAT");
  await page.getByRole("link", { name: "Find" }).click();
  await page.getByRole("link", { name: "Advanced Search" }).click();
  await page.locator('[id="advancedSearchForm:dvFieldName"]').fill("UAT");
  await page.getByRole("button", { name: "Find" }).last().click();
  await expect(page).toHaveURL(/UAT/);
});

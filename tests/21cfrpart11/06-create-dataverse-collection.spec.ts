import { test, expect } from "@playwright/test";

test("create dataverse collection", async ({ page }) => {
  await page.goto("");
  await page.getByRole("button", { name: "Add Data" }).click();
  await page.getByRole("link", { name: "New Dataverse" }).click();
  await page
    .getByRole("textbox", { name: "Identifier" })
    .fill("playwright-testing-collection");
  await page.getByLabel("Category").selectOption("Department");
  await page.getByRole("button", { name: "Create Dataverse" }).click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByRole("link", { name: "Delete Dataverse" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
});

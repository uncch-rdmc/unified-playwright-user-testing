import { test, expect } from "@playwright/test";

test("create and edit metadata template", async ({ page }) => {
  await page.goto("");
  await page.getByText("Edit").click();
  await page.getByText("Dataset Templates").click();
  await page.getByText("Create Dataset Template").click();
  await page.locator('[id$=":templateName"]').type("Playwright Test Template");
  const templateFormLocators = await page.locator('[id$=":inputText"]').all();
  await templateFormLocators[0].type("Test Citation");
  await templateFormLocators[6].type("Playwright Auto Tester");
  await templateFormLocators[11].type("tester-dummy@unc.edu");
  await page
    .locator('[id$=":description"]')
    .first()
    .type(
      "This is a dummy template created by Playwright for testing purposes.",
    );

  await page
    .locator(".ui-selectcheckboxmenu-multiple-container")
    .first()
    .click();

  await page
    .locator(".ui-selectcheckboxmenu-items-wrapper")
    .first()
    .getByText("Chemistry")
    .click();

  // await templateFormLocators[12].type("Dummy Citation by Playwright");
  // await templateFormLocators[13].selectOption({ label: "Chemistry" });
  await page.getByRole("button", { name: "Save + Add Terms" }).click();
  await page.getByRole("button", { name: "Save Dataset Template" }).click();

  await page.getByRole("button", { name: "Edit Template" }).first().click();
  await page.getByRole("link", { name: "Metadata" }).click();
  await page
    .locator('[id$=":templateName"]')
    .fill("Playwright Test Template II");
  await page.getByRole("button", { name: "Save Changes" }).click();

  await page
    .locator(".btn-group")
    .first()
    .locator('[data-original-title="Delete"]')
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
});

import { test as setup, expect } from "@playwright/test";

import * as userData from "../../sensitive-data/user.json";

const authFile = "playwright/.auth/user.json";

setup("log in to shibboleth with 2FA", async ({ page }) => {
  await page.goto("");

  await page
    .getByRole("link", { name: "Log In", exact: true })
    .click({ force: true });

  await page
    .locator("#idpSelectSelector")
    .selectOption("https://sso.unc.edu/idp");

  await page.getByRole("button", { name: "Continue" }).click({ force: true });

  await page.locator("#username").fill(userData.username);

  await page.locator("#nextBtn").click();

  await page.locator("#password").fill(userData.password);

  await page.locator("#submitBtn").click();

  await expect(page).toHaveURL(/duosecurity/);

  await page.getByText("Yes").click();

  await expect(page).toHaveURL(/dataverse.xhtml/);

  await page.context().storageState({ path: authFile });
});

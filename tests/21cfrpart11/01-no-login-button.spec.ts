import { test, expect } from "@playwright/test";

test("verify that login button is not visible when user is logged in", async ({
  page,
}) => {
  await page.goto("");
  const loginButton = page.getByRole("link", { name: "Log In", exact: true });
  await expect(loginButton).toBeHidden();
});

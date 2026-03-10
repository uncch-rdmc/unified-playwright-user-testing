import { test, expect } from '@playwright/test';

test('has root title', async ({ page }) => {
  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Root/);
});

test('has log in button', async ({ page }) => {
  await page.goto('');

  // Click the log in anchor.
  await page.getByRole('link', { name: 'Log In', exact: true }).highlight();
  await page.getByRole('link', { name: 'Log In', exact: true }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
});

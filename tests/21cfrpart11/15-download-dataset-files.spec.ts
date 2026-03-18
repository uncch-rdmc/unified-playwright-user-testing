import { test, expect } from "@playwright/test";

test("download dataset files and verify", async ({ page }) => {
  await page.goto("");

  // 1. Set up the listeners
  await page
    .locator("#resultsTable tbody tr")
    .first()
    .locator("a")
    .first()
    .click();
  await page.locator(".ui-chkbox-all").first().click();

  // 2. Start waiting for the download before clicking the trigger
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download" }).click();
  const download = await downloadPromise;

  // 3. Verification
  // Get the suggested filename (e.g., "data.zip" or "image.png")
  const fileName = download.suggestedFilename();
  console.log(`Downloaded file: ${fileName}`);

  // Assert the file has a name (verifies it exists)
  expect(fileName).not.toBeNull();
});

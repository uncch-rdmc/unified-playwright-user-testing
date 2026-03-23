import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  /* Run tests in files in sequence */
  workers: 1,
  fullyParallel: false,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,

    launchOptions: {
      slowMo: 2000,
    },

    // Sets the default viewport size for all tests
    viewport: { width: 1920, height: 1080 },

    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://hpo-dataverse-staging.rdmc.unc.edu/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",

    /* Always collect video and screenshots, even when tests pass. See https://playwright.dev/docs/video-and-screenshots */
    video: {
      mode: "on",
      size: { width: 1920, height: 1080 },
    },

    screenshot: {
      mode: "on",
      fullPage: true,
    },
  },

  /* Configure the output directory for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        channel: "chrome",
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

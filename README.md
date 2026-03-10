# unified-playwright-user-testing
A centralized end-to-end testing framework for IQSS Dataverse and ecosystem integrations.  This repository serves as the unified hub for automated UI and functional testing. By leveraging Playwright, it provides a scalable scaffolding designed to validate diverse environments. Ranging from standard Dataverse to 21 CFR Part 11 compliant instances.

# Setup and Configuration
1. Clone this repository into an empty folder onto your computer or server.
2. Run `npm install` within this folder
3. You can run `npx playwright test` to run the end-to-end tests.
4. The playwright configuration can be modified in `./playwright.config.ts`
5. Any additional npm package can be installed and added as required.
6. It is recommended **strongly** that you use nvm to manage your node installation.
7. It is also **strongly** recommended that you use only LTS versions of node.
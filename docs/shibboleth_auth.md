```yaml
Title: "Shibboleth Auth"
Author: "Snehashish Reddy Manda"
Email: "msreddy@unc.edu"
Date: "April 1, 2026"
``` 

# Shibboleth Auth

The default Dataverse installation does not come with Shibboleth 2FA protection. But, HPO Dataverse is protected by UNC Shibboleth 2FA. Matter of fact, it is the only possible way to log into that dataverse installation

## What does the authentication flow look like?
This very closely mirrors the Playwright authentication flow in `tests/21cfrpart11/01-shibboleth-auth.setup.ts`
This is labelled a setup file instead of a spec file as it means that for every single run regardless of whether you run a single test or the entire test suite, this file has to always run first. This is required as the UAT that we're supposed to run can only be run as an admin user.

This is what the flow looks like:
1. Go to `https://hpo-dataverse-staging.rdmc.unc.edu`
2. Click on the Log In button
3. Select UNC SSO from the dropdown `https://sso.unc.edu/idp`
4. Click on the continue button from Dataverse's side
5. Now the user flow shifts from Dataverse to the UNC SSO endpoint
6. Fill in the ONYEN in the username field
7. Click on the Next Button
8. Fill in the password in the password field
9. Click on the submit button
10. We will now be redirected to Duo Security because of forced 2FA
11. Then we click "Yes" on the Duo page when it asks whether we are logged in from a computer that we own or is shared. Yes is important to click here as it will determine the lifetime of the cookie. Clicking yes gives the cookie a 7-day lifetime whereas clicking "No" gives the 2FA cookie a 24-hr lifetime. Generally, we want the longer lifetime due to reasons that will be mentioned later
12. We land back on the Dataverse page logged in as the user


Dataverse detects whether you're logged in or not using browser cookies. We want to choose the longer 7-day cookie lifetime during the Duo Auth due to the fact that every single time this flow is run, you need to open your phone associated with the ONYEN and approve the Duo 2FA request. So the test cannot be initiated automatically, it always has to be initiated manually and approved manually. Sometimes we run dozens of single tests at a time to check for flakiness or when developing/modifying tests, as without the authentication flow the tests cannot be run in the first place.

So, to make the best of both worlds, the authentication flow is run exactly once, and then the cookies are saved to `playwright/auth/user.json`. Once, the cookies are saved they are always pre-injected into the Playwright testing environment before the tests are actually run. If you do not see the "Log In" or "Sign Up" buttons on the Dataverse Landing Page after the cookie injection, it means that the cookies are still very valid. If you do not see those buttons, it means the cookies are invalid, and it will take you through the authentication flow once more to save new valid cookies.

If there are no saved cookies at all, then the authentication flow will happen regardless. This way, we can make sure that we can ensure compliance to the Duo 2FA workflow while making life easier when running the tests because the auth only has to happen once every 7 days no matter how many times you run the test.

**NOTE:** Although technically speaking, the cookies should last 7 days, waiting past a day causes some oddly flaky behavior with Duo. It is even worse when you click "No" and choose the 24 hour cookies. Personally, I like to delete the `user.json` cookie after every 24hrs just to ensure I'm not dealing with any flakiness during the Shibboleth Auth flow.
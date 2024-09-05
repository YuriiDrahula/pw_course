import { test, expect, Locator } from "@playwright/test";

test("Verify that nav menu buttons redirects to the correct links", async ({
  page,
}) => {
  //Nav bar locators
  const docsNavButton: Locator = page.locator(
    '[class="navbar__items"] [href="/docs/intro"]'
  );
  const apiNavButton: Locator = page.locator(
    '[class="navbar__items"] [href="/docs/api/class-playwright"]'
  );
  const communityNavButton: Locator = page.locator(
    '[class="navbar__items"] [href="/community/welcome"]'
  );
  const playwrightButton: Locator = page.locator(
    '[class="navbar__items"] [class*="navbar__title"]'
  );

  //Navigation menu test
  await page.goto("https://playwright.dev/");
  await docsNavButton.click();
  await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  await apiNavButton.click();
  await expect(page).toHaveURL(
    "https://playwright.dev/docs/api/class-playwright"
  );
  await communityNavButton.click();
  await expect(page).toHaveURL("https://playwright.dev/community/welcome");
  await playwrightButton.click();
  await expect(page).toHaveURL("https://playwright.dev/");
});

test("Verify that search suggestion navigate to the expected page", async ({
  page,
}) => {
  //Search locators
  const searchNavMenuInput: Locator = page.locator(
    '[class*="navbar__items--right"] [class="DocSearch-Button-Placeholder"]'
  );
  const popUpSearchInputField: Locator = page.locator(
    "input[class=DocSearch-Input]"
  );
  const searchSuggestion: Locator = page.locator(
    'a[href*="installing-playwright"] span[class="DocSearch-Hit-title"]'
  );
  const installingPageTitle: Locator = page.locator("#installing-playwright");
  const installingNpmCodeSnippet: Locator = page.locator(
    '//span[contains(text(), "npm")]/following-sibling::span[contains(text(), "init playwright@latest")]'
  );

  await page.goto("https://playwright.dev/");
  await searchNavMenuInput.click();
  await popUpSearchInputField.fill("ins");
  await searchSuggestion.click();
  await expect(installingPageTitle).toHaveText("Installing Playwright");
  await expect(installingNpmCodeSnippet).toContainText(
    "init playwright@latest"
  );
});

test("Verify that direct link is displayed after navigating threw article on the right nav menu", async ({
  page,
}) => {
  // Test locators
  const getStartedButton: Locator = page.locator(
    'div[class="buttons_pzbO"] a[class="getStarted_Sjon"]'
  );
  const runningExampleTestLink: Locator = page.locator(
    'ul[class="table-of-contents table-of-contents__left-border"] a[href="#running-the-example-test-in-ui-mode"]'
  );
  const runningExampleTestHeader: Locator = page.locator(
    "h2[id=running-the-example-test-in-ui-mode]"
  );

  //Test
  await page.goto("https://playwright.dev/");
  await getStartedButton.click();
  await runningExampleTestLink.click();
  await expect(page).toHaveURL(
    "https://playwright.dev/docs/intro#running-the-example-test-in-ui-mode"
  );
  await expect(runningExampleTestHeader).toBeVisible();
});

test('Verify that the "Getting started VS Code" page is displayed only for Node.js', async ({
  page,
}) => {
  //Test locators
  const getStartedButton: Locator = page.locator(
    'div[class="buttons_pzbO"] a[class="getStarted_Sjon"]'
  );
  const gettingStartedVSCodeDropdownLink: Locator = page.locator(
    'li[class*="theme-doc-sidebar-item-link"] a[href="/docs/getting-started-vscode"]'
  );
  const docMainHeader: Locator = page.locator("header h1");
  const navbarCodeLanguagesDropdown: Locator = page.locator(
    'div[class="navbar__item dropdown dropdown--hoverable"]'
  );
  const dropdownItemPython: Locator = page.locator(
    'ul[class="dropdown__menu"] a[data-language-prefix="/python/"]'
  );
  const dropdownItemJava: Locator = page.locator(
    'ul[class="dropdown__menu"] a[data-language-prefix="/java/"]'
  );
  const dropdownItemDotNet: Locator = page.locator(
    'ul[class="dropdown__menu"] a[data-language-prefix="/dotnet/"]'
  );
  const unavailablePageTitle: Locator = page.locator('h1[class="hero__title"]');

  //Test
  await page.goto("https://playwright.dev/");
  await getStartedButton.click();
  await gettingStartedVSCodeDropdownLink.click();
  await expect(docMainHeader).toBeVisible();

  await navbarCodeLanguagesDropdown.hover();
  await dropdownItemPython.click();
  await expect(unavailablePageTitle).toContainText(
    "This page is not available for Python."
  );

  await navbarCodeLanguagesDropdown.hover();
  await dropdownItemJava.click();
  await expect(unavailablePageTitle).toContainText(
    "This page is not available for Java."
  );

  await navbarCodeLanguagesDropdown.hover();
  await dropdownItemDotNet.click();
  await expect(unavailablePageTitle).toContainText(
    "This page is not available for .NET."
  );
});

test("Verify that the dropdown is hidden", async ({ page }) => {
  //Test locators
  const getStartedButton: Locator = page.locator(
    'div[class="buttons_pzbO"] a[class="getStarted_Sjon"]'
  );
  const gettingStartedDropdown: Locator = page.locator(
    '//ul[@class="menu__list" and preceding-sibling::div[a[text()="Getting Started"]]]'
  );
  const gettingStartedDropdownButton: Locator = page.locator(
    '//div[a[text()="Getting Started"]]'
  );

  //Test
  await page.goto("https://playwright.dev/");
  await getStartedButton.click();
  await expect(gettingStartedDropdown).toHaveCSS("overflow", "visible");
  await gettingStartedDropdownButton.click();
  await expect(gettingStartedDropdown).toHaveCSS("overflow", "hidden");
});

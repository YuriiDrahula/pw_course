import { test, expect, Locator } from "@playwright/test";

// Test user credentials
const testUserEmail: string = "ydtest@mail.com";
const testUserPassword: string = "11111";
const textUserName: string = "ydtest";

test("LWD-1: create article", async ({ page }) => {
  await test.step("Log in", async () => {
    //Sign in locators
    const loginButton: Locator = page.locator(
      '//li[@class="nav-item"]/a[@href="/login"]'
    );
    const emailInputField: Locator = page.locator(
      '//form//input[@type="email"]'
    );
    const passwordInputField: Locator = page.locator(
      '//form//input[@type="password"]'
    );
    const signInButton: Locator = page.locator(
      '//form//button[contains(text(),"Sign in")]'
    );

    //Login test
    await page.goto("https://demo.learnwebdriverio.com/login");
    await loginButton.click();
    await emailInputField.fill(testUserEmail);
    await passwordInputField.fill(testUserPassword);
    await signInButton.click();
  });

  // Article fields
  const articleTitle: string = "YD Test Article";
  const articleDescription: string = "test hello article";
  const articleHeader: string = "Hello world!!!";
  const articleBody: string =
    "This is my first article written into the text area";
  const articleTags: string = "ydtest, hello world, first article";

  await test.step("Create an article", async () => {
    //Create article page locators
    const newArticleButton: Locator = page.locator(
      '//li[@class="nav-item"]/a[@href="/editor"]'
    );
    const articleTitleInput: Locator = page.locator(
      '//fieldset/input[@data-qa-id="editor-title"]'
    );
    const articleDescriptionInput: Locator = page.locator(
      '//fieldset/input[@data-qa-id="editor-description"]'
    );
    const articleTextArea: Locator = page.locator(
      '//textarea[@placeholder="Write your article (in markdown)"]'
    );
    const boldTextButton: Locator = page.locator(
      '//button[@title="粗体 (ctrl+b)"]'
    );
    const articleTagsInput: Locator = page.locator(
      '//fieldset/input[@data-qa-id="editor-tags"]'
    );
    const publishArticleButton: Locator = page.locator(
      '//button[@data-qa-id="editor-publish"]'
    );

    //Create article test
    await newArticleButton.click();
    await articleTitleInput.fill(articleTitle);
    await articleDescriptionInput.fill(articleDescription);
    await articleTextArea.fill(articleHeader);
    await articleTextArea.click();
    await page.keyboard.press("Meta+A");
    await boldTextButton.click();
    await articleTextArea.click();
    await page.keyboard.press("Enter");
    await articleTextArea.type(articleBody);
    await articleTagsInput.fill(articleTags);
    await publishArticleButton.click();
  });

  await test.step("Check an article on the feed", async () => {
    //Article on feed locators
    const articlePageBanner: Locator = page.locator('//div[@class="banner"]');
    const homeButton: Locator = page.locator('//a[contains(text(), "Home")]');
    const firsArticleAuthorName = page.locator(
      '//div[@data-qa-type="article-preview"][1]//a[@data-qa-type="author-name"]'
    );
    const firstArticleTitle: Locator = page.locator(
      '//div[@data-qa-type="article-preview"][1]//h1[@data-qa-type="preview-title"]'
    );
    const firstArticleDescription: Locator = page.locator(
      '//div[@data-qa-type="article-preview"][1]//p[@data-qa-type="preview-description"]'
    );

    await articlePageBanner.waitFor({ state: "visible" });
    await homeButton.click();
    await expect(firsArticleAuthorName).toHaveText(textUserName);
    await expect(firstArticleTitle).toHaveText(articleTitle);
    await expect(firstArticleDescription).toHaveText(articleDescription);
  });

  page.close();
});

import { test, expect } from "@playwright/test";

test("WD-1 test login", async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
  await page
    .locator('//input[@placeholder="Email"]')
    .fill("randomname@mail.com");
  await page
    .locator('//input[@placeholder="Password"]')
    .fill("randomname@mail.com");
  await page.locator('//button[contains(text(), "Sign in")]').click();
  await expect(
    page.locator(
      '//ul[@class="error-messages"]/li[text()="email or password is invalid"]'
    )
  ).toBeVisible();
});

import { test, expect, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://telemart.ua/ua/");
});

test.afterEach(({ page }) => {
  page.close();
});

test("TM-1: Check banners carrousel", async ({ page }) => {
  const banners = await page
    .locator('//div[@class="categories-slider__image"]')
    .all();

  const swipeButton: Locator = page.locator(
    '//div[@class="swiper-button-next"]'
  );
  const activeVisibleBanner: Locator = page.locator(
    '//a[@class="swiper-slide swiper-slide-active"]'
  );

  // There is more than 2 banner
  await expect(banners.length).toBeGreaterThan(2);

  await swipeButton.click();
  await page.waitForTimeout(1000);
  await swipeButton.click();

  // Active banner that is now visible should have position 3
  await expect(activeVisibleBanner).toHaveAttribute(
    "data-banner-position",
    "3"
  );
});

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
  const nextBanner: Locator = page.locator(
    '//a[@class="swiper-slide swiper-slide-next"]'
  );

  // There are mote than two banners
  await expect(banners.length).toBeGreaterThan(2);

  await swipeButton.click();
  await page.waitForTimeout(1000);
  const nextBannerLink: string | null = await nextBanner.getAttribute("href");
  await swipeButton.click();

  // Active banner that is now visible should have position 3
  await expect(activeVisibleBanner).toHaveAttribute(
    "data-banner-position",
    "3"
  );

  // Check the navigation after clicking banner
  if (nextBannerLink) {
    await activeVisibleBanner.click();
    await expect(page).toHaveURL(nextBannerLink);
  } else {
    throw new Error("The next banner does not have a valid href attribute.");
  }
});

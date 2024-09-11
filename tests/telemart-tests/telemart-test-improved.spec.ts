import { test, expect, Locator, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://telemart.ua/ua/");
});

test.afterEach(({ page }) => {
  page.close();
});

test("TM-1: Check banners carrousel", async ({ page }) => {
  const carrousel = carrouselObject(page);
  const currentBannerPosition: number = Number(
    await carrousel.currentBannerPositionOld()
  );

  await swipeBanner(page, carrousel.swipeButton);
  await swipeBanner(page, carrousel.swipeButton);

  const bannerPosition = await carrousel.activeBanner.getAttribute(
    "data-banner-position"
  );
  const bannerPositionNum = Number(bannerPosition);
  expect(bannerPositionNum).toEqual(Number(currentBannerPosition) + 2);
});

async function swipeBanner(page: Page, swipeButton: Locator) {
  const ids = await getBannersId(page);
  await Promise.all([
    page
      .locator(
        `a[class*= 'active']:not(.swiper-slide-duplicate)[data-banner-id = '${ids.nextBannerId}']`
      )
      .waitFor(),
    swipeButton.click(),
  ]);
}

function carrouselObject(page: Page) {
  return {
    activeBanner: page.locator(
      `a[class*= 'active']:not(.swiper-slide-duplicate)`
    ),
    swipeButton: page.locator('//div[@class="swiper-button-next"]'),

    currentBannerPositionOld: async () =>
      await page
        .locator(`a[class*= 'active']:not(.swiper-slide-duplicate)`)
        .getAttribute("data-banner-position"),

    getBannersId: async (page: Page) => {
      const prevBannerId: string | null = await page
        .locator(`a[class*= 'prev']:not(.swiper-slide-duplicate)`)
        .getAttribute("data-banner-id");

      const activeBannerId: string | null = await page
        .locator(`a[class*= 'active']:not(.swiper-slide-duplicate)`)
        .getAttribute("data-banner-id");

      const nextBannerId: string | null = await page
        .locator(`a[class*= 'next']:not(.swiper-slide-duplicate)`)
        .getAttribute("data-banner-id");

      return { prevBannerId, activeBannerId, nextBannerId };
    },
  };
}

async function getBannersId(page: Page) {
  const prevBannerId: string | null = await page
    .locator(`a[class*= 'prev']:not(.swiper-slide-duplicate)`)
    .getAttribute("data-banner-id");

  const activeBannerId: string | null = await page
    .locator(`a[class*= 'active']:not(.swiper-slide-duplicate)`)
    .getAttribute("data-banner-id");

  const nextBannerId: string | null = await page
    .locator(`a[class*= 'next']:not(.swiper-slide-duplicate)`)
    .getAttribute("data-banner-id");

  return { prevBannerId, activeBannerId, nextBannerId };
}

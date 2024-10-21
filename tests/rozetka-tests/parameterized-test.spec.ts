import test, { expect } from "@playwright/test";

const testFilters = [
  {
    testId: "RZTK-001",
    producer: "Acer",
  },
  {
    testId: "RZTK-002",
    producer: "Apple",
  },
  {
    testId: "RZTK-003",
    producer: "Dell",
  },
];

test.describe("RZTK filters suite", () => {
  test("Apply multiple filters in one session", async ({ page }) => {
    await page.goto("/computers/c80095/");
    await expect.soft(page.locator('[id="rz-banner-img"]')).toBeVisible();

    const bannerCloseButton = page.locator('span[class="exponea-close-cross"]');
    if (await bannerCloseButton.isVisible()) {
      await bannerCloseButton.click();
    }

    for (const filter of testFilters) {
      const checkboxLocator = `[data-id="${filter.producer}"]`;

      await page.locator(checkboxLocator).click();
      await expect(page.locator(checkboxLocator)).toHaveAttribute(
        "class",
        "checkbox-filter__link checkbox-filter__link--checked"
      );
    }
  });
});

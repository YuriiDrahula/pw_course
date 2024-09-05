import { test, expect, Locator, Page } from "@playwright/test";

class MainCoffeePage {
  readonly espressoCup: Locator;
  readonly espressoMacchiatoCup: Locator;
  readonly cappuccinoCup: Locator;
  readonly mochaCup: Locator;
  readonly flatWhiteCup: Locator;
  readonly americanoCup: Locator;
  readonly cafeLatteCup: Locator;
  readonly espressoConPannaCup: Locator;
  readonly cafeBreveCup: Locator;
  readonly totalButton: Locator;
  readonly cartPageLink: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.espressoCup = page.locator('[data-test="Espresso"]');
    this.espressoMacchiatoCup = page.locator(
      '[data-test="Espresso_Macchiato"]'
    );
    this.cappuccinoCup = page.locator('[data-test="Cappuccino"]');
    this.mochaCup = page.locator('[data-test="Mocha"]');
    this.flatWhiteCup = page.locator('[data-test="Flat_White"]');
    this.americanoCup = page.locator('[data-test="Americano"]');
    this.cafeLatteCup = page.locator('[data-test="Cafe_Latte"]');
    this.espressoConPannaCup = page.locator('[data-test="Espresso_Con Panna"]');
    this.cafeBreveCup = page.locator('[data-test="Cafe_Breve"]');
    this.totalButton = page.locator('[data-test="checkout"]');
    this.cartPageLink = page.locator('a[aria-label="Cart page"]');
    this.successMessage = page.locator('div[class="snackbar success"]');
  }
}

class PaymentDetailsForm {
  readonly nameInputField: Locator;
  readonly emailInputField: Locator;
  readonly promotionCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.nameInputField = page.locator("form input[id=name]");
    this.emailInputField = page.locator("form input[id=email]");
    this.promotionCheckbox = page.locator("form input[id=promotion]");
    this.submitButton = page.locator('form button[id="submit-payment"]');
  }
}

class PromoBanner {
  readonly bannerDiv: Locator;
  readonly bannerTitle: Locator;
  readonly yesButton: Locator;

  constructor(page: Page) {
    this.bannerDiv = page.locator('[class="promo"]');
    this.bannerTitle = page.locator('[class="promo"] span');
    this.yesButton = page.locator('button[class="yes"]');
  }
}

test.beforeEach(({ page }) => {
  page.goto("https://coffee-cart.app/");
});

test.afterEach(({ page }) => {
  page.close();
});

test("YD-1: Verify that the total is increased after clicking the coffee card", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const checkoutItem: Locator = page.locator("ul span");
  const checkoutCount: Locator = page.locator("ul span[class=unit-desc]");

  // Test
  await mainCoffeePage.espressoCup.click();
  await expect(mainCoffeePage.totalButton).toContainText("Total: $10.00");
  await mainCoffeePage.totalButton.hover();
  await expect(checkoutItem.filter({ hasText: "Espresso" })).toBeVisible();
  await expect(checkoutCount.filter({ hasText: " x 1" })).toBeVisible();
});

test('YD-2: Verify that the quantity can be increased in the "Total" pop-up', async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const addOneFlatWhiteButton: Locator = page.locator(
    'button[aria-label="Add one Flat White"]'
  );
  const checkoutCount: Locator = page.locator("ul span[class=unit-desc]");

  await mainCoffeePage.flatWhiteCup.click();
  await mainCoffeePage.totalButton.hover();
  await addOneFlatWhiteButton.click();
  await expect(checkoutCount).toContainText(" x 2");
  await expect(mainCoffeePage.totalButton).toContainText("Total: $36.00");
});

test('YD-3: Verify that the quantity can be decreased in the "Total" pop-up', async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const removeOneAmericanoButton = page.locator(
    'button[aria-label="Remove one Americano"]'
  );
  const removeOneCafeLatteButton = page.locator(
    'button[aria-label="Remove one Cafe Latte"]'
  );
  const removeOneFlatWhiteButton = page.locator(
    'button[aria-label="Remove one Flat White"]'
  );
  const removeOneMochaButton = page.locator(
    'button[aria-label="Remove one Mocha"]'
  );

  await mainCoffeePage.mochaCup.click();
  await mainCoffeePage.flatWhiteCup.click();
  await mainCoffeePage.americanoCup.click();
  await mainCoffeePage.cafeLatteCup.click();
  await mainCoffeePage.totalButton.hover();
  await removeOneAmericanoButton.click();
  await removeOneCafeLatteButton.click();
  await removeOneFlatWhiteButton.click();
  await removeOneMochaButton.click();
  await expect(mainCoffeePage.totalButton).toContainText("Total: $0.00");
});

test("YD-4: Verify that item is added to the cart on the cart page", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const cafeLatteInCartList: Locator = page.locator(
    '//div[text()="Cafe Latte"]'
  );

  await mainCoffeePage.cafeLatteCup.click();
  await expect(mainCoffeePage.cartPageLink).toContainText("cart (1)");
  await mainCoffeePage.cartPageLink.click();
  await expect(cafeLatteInCartList).toBeVisible();
});

// Test user credentials
const userName: string = "test";
const userEmail: string = "test@mail.com";

test("YD-5: Verify payment can be successfully finished", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const paymentDetailsForm = new PaymentDetailsForm(page);

  await mainCoffeePage.flatWhiteCup.click();
  await mainCoffeePage.cartPageLink.click();
  await mainCoffeePage.totalButton.click();
  await paymentDetailsForm.nameInputField.fill(userName);
  await paymentDetailsForm.emailInputField.fill(userEmail);
  await paymentDetailsForm.promotionCheckbox.check();
  await paymentDetailsForm.submitButton.click();
  await expect(mainCoffeePage.successMessage).toBeVisible();
  await expect(mainCoffeePage.successMessage).toContainText(
    "Thanks for your purchase. Please check your email for payment."
  );
});

test("YD-6: Verify that the promotion offer is displayed after adding 3 items to the cart", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const promoBanner = new PromoBanner(page);

  await mainCoffeePage.flatWhiteCup.click();
  await mainCoffeePage.espressoConPannaCup.click();
  await mainCoffeePage.mochaCup.click();
  await expect(promoBanner.bannerDiv).toBeVisible();
  await expect(promoBanner.bannerTitle).toContainText(
    "It's your lucky day! Get an extra cup of Mocha for $4."
  );
});

test("YD-7: Verify that promotion item is added to the cart with the promotion price", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const promoBanner = new PromoBanner(page);
  const discountedMocha: Locator = page.locator(
    '//div[text()="(Discounted) Mocha"]'
  );
  const discountedMochaPrice = page.locator(
    '//div[text()="(Discounted) Mocha"]/following-sibling::div[2]'
  );

  await mainCoffeePage.espressoCup.click();
  await mainCoffeePage.americanoCup.click();
  await mainCoffeePage.cafeLatteCup.click();
  await promoBanner.yesButton.click();
  await mainCoffeePage.cartPageLink.click();
  await expect(discountedMocha).toBeVisible();
  await expect(discountedMochaPrice).toContainText("$4.00");
});

test("YD-8: Verify that the cart is empty after removing all items", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const itemList: Locator = page.locator('[class="list-header"]');
  const deleteItemButton: Locator = page
    .locator("li[class=list-item] button[class=delete]")
    .first();

  await mainCoffeePage.espressoConPannaCup.click();
  await mainCoffeePage.espressoMacchiatoCup.click();
  await mainCoffeePage.cafeBreveCup.click();
  await mainCoffeePage.cartPageLink.click();

  while (await itemList.isVisible()) {
    await deleteItemButton.click();
  }

  await expect(page.getByRole("paragraph")).toContainText(
    "No coffee, go add some."
  );
});

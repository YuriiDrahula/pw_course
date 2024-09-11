import { test, expect } from "@playwright/test";
import {
  CartPage,
  CoffeeNames,
  DataTestCoffeeNames,
  MainCoffeePage,
  PaymentDetailsForm,
  PromoBanner,
} from "./coffee-pages/CoffePagesIt2";

test.beforeEach(async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
});

test.afterEach(({ page }) => {
  page.close();
});

test("YD-1: Verify that the total is increased after clicking the coffee card", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const coffee = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffee.espresso);
  await expect(mainCoffeePage.totalButton).toContainText("Total: $10.00");
  await mainCoffeePage.totalButton.hover();
  await expect(
    mainCoffeePage.checkoutItem.filter({ hasText: coffee.espresso })
  ).toBeVisible();
  await expect(
    mainCoffeePage.coffeeCount.filter({ hasText: " x 1" })
  ).toBeVisible();
});

test('YD-2: Verify that the quantity can be increased in the "Total" pop-up', async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const coffeeId = new DataTestCoffeeNames();
  const coffeeName = new CoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffeeId.flatWhite);
  await mainCoffeePage.totalButton.hover();
  await mainCoffeePage.addPlusOneCup(coffeeName.flatWhite);
  await expect(mainCoffeePage.coffeeCount).toContainText(" x 2");
  await expect(mainCoffeePage.totalButton).toContainText("Total: $36.00");
});

test('YD-3: Verify that the quantity can be decreased in the "Total" pop-up', async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const coffeeId = new DataTestCoffeeNames();
  const coffeeName = new CoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffeeId.mocha);
  await mainCoffeePage.addOneCupToCart(coffeeId.flatWhite);
  await mainCoffeePage.addOneCupToCart(coffeeId.americano);
  await mainCoffeePage.addOneCupToCart(coffeeId.cafeLatte);
  await mainCoffeePage.totalButton.hover();
  await mainCoffeePage.removeOneCup(coffeeName.americano);
  await mainCoffeePage.removeOneCup(coffeeName.cafeLatte);
  await mainCoffeePage.removeOneCup(coffeeName.flatWhite);
  await mainCoffeePage.removeOneCup(coffeeName.mocha);
  await expect(mainCoffeePage.totalButton).toContainText("Total: $0.00");
});

test("YD-4: Verify that item is added to the cart on the cart page", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const cartPage = new CartPage(page);
  const coffeeId = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffeeId.cafeLatte);
  await expect(mainCoffeePage.cartPageLink).toContainText("cart (1)");
  await mainCoffeePage.cartPageLink.click();
  await expect(cartPage.getCartItem("Cafe Latte")).toBeVisible();
});

// Test user credentials
const userName: string = "test";
const userEmail: string = "test@mail.com";

test("YD-5: Verify payment can be successfully finished", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const paymentDetailsForm = new PaymentDetailsForm(page);
  const coffee = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffee.flatWhite);
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
  const coffee = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffee.cafeBreve);
  await mainCoffeePage.addOneCupToCart(coffee.espressoConPanna);
  await mainCoffeePage.addOneCupToCart(coffee.espressoMacchiato);
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
  const cartPage = new CartPage(page);
  const coffee = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffee.espresso);
  await mainCoffeePage.addOneCupToCart(coffee.americano);
  await mainCoffeePage.addOneCupToCart(coffee.cafeLatte);
  await promoBanner.yesButton.click();
  await mainCoffeePage.cartPageLink.click();
  await expect(cartPage.discountedMocha).toBeVisible();
  await expect(cartPage.discountedMochaPrice).toContainText("$4.00");
});

test("YD-8: Verify that the cart is empty after removing all items", async ({
  page,
}) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const cartPage = new CartPage(page);
  const coffee = new DataTestCoffeeNames();

  await mainCoffeePage.addOneCupToCart(coffee.cafeBreve);
  await mainCoffeePage.addOneCupToCart(coffee.espressoMacchiato);
  await mainCoffeePage.addOneCupToCart(coffee.cappuccino);
  await mainCoffeePage.cartPageLink.click();

  while (await cartPage.itemList.isVisible()) {
    await cartPage.deleteItemButton.click();
  }

  await expect(cartPage.emptyStateText).toContainText(
    "No coffee, go add some."
  );
});

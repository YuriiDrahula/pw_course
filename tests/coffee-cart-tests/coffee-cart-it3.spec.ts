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

test("Test Coffee Cart Page Functionality", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const coffeeId = new DataTestCoffeeNames();
  const coffeeName = new CoffeeNames();

  await test.step("YD-1: Verify that the total is increased after clicking the coffee card", async () => {
    await mainCoffeePage.addOneCupToCart(coffeeId.espresso);
    await expect(mainCoffeePage.totalButton).toContainText("Total: $10.00");
    await mainCoffeePage.totalButton.hover();
    await expect(
      mainCoffeePage.checkoutItem.filter({ hasText: coffeeName.espresso })
    ).toBeVisible();
    await expect(
      mainCoffeePage.coffeeCount.filter({ hasText: " x 1" })
    ).toBeVisible();
  });

  await test.step('YD-2: Verify that the quantity can be increased in the "Total" pop-up', async () => {
    await mainCoffeePage.addPlusOneCup(coffeeName.espresso);
    await expect(mainCoffeePage.coffeeCount).toContainText(" x 2");
    await expect(mainCoffeePage.totalButton).toContainText("Total: $20.00");
  });

  await test.step('YD-3: Verify that the quantity can be decreased in the "Total" pop-up', async () => {
    await mainCoffeePage.removeOneCup(coffeeName.espresso);
    await mainCoffeePage.removeOneCup(coffeeName.espresso);
    await expect(mainCoffeePage.totalButton).toContainText("Total: $0.00");
  });
});

test("Test Promotion Offer Functionality", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const promoBanner = new PromoBanner(page);
  const coffee = new DataTestCoffeeNames();
  const cartPage = new CartPage(page);

  await test.step("YD-4: Verify that the promotion offer is displayed after adding 3 items to the cart", async () => {
    await mainCoffeePage.addOneCupToCart(coffee.cafeBreve);
    await mainCoffeePage.addOneCupToCart(coffee.espressoConPanna);
    await mainCoffeePage.addOneCupToCart(coffee.espressoMacchiato);
    await expect(promoBanner.bannerDiv).toBeVisible();
    await expect(promoBanner.bannerTitle).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
  });

  await test.step("YD-5: Verify that promotion item is added to the cart with the promotion price", async () => {
    await promoBanner.yesButton.click();
    await mainCoffeePage.cartPageLink.click();
    await expect(cartPage.discountedMocha).toBeVisible();
    await expect(cartPage.discountedMochaPrice).toContainText("$4.00");
  });
});

test("Test Cart Page", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const cartPage = new CartPage(page);
  const coffeeId = new DataTestCoffeeNames();
  const coffeeName = new CoffeeNames();

  await test.step("YD-6: Verify that items are added to the cart on the cart page", async () => {
    await mainCoffeePage.addOneCupToCart(coffeeId.cafeLatte);
    await mainCoffeePage.addOneCupToCart(coffeeId.cafeBreve);
    await mainCoffeePage.addOneCupToCart(coffeeId.cappuccino);
    await expect(mainCoffeePage.cartPageLink).toContainText("cart (3)");
    await mainCoffeePage.cartPageLink.click();
    await expect(cartPage.getCartItem(coffeeName.cafeLatte)).toBeVisible();
    await expect(cartPage.getCartItem(coffeeName.cafeBreve)).toBeVisible();
    await expect(cartPage.getCartItem(coffeeName.cappuccino)).toBeVisible();
  });

  await test.step("YD-7: Verify that the cart is empty after removing all items", async () => {
    while (await cartPage.itemList.isVisible()) {
      await cartPage.deleteItemButton.click();
    }

    await expect(cartPage.emptyStateText).toContainText(
      "No coffee, go add some."
    );
  });
});

test("YD-8: Verify payment can be successfully finished", async ({ page }) => {
  const mainCoffeePage = new MainCoffeePage(page);
  const paymentDetailsForm = new PaymentDetailsForm(page);
  const coffee = new DataTestCoffeeNames();

  // Test user credentials
  const userName: string = "test";
  const userEmail: string = "test@mail.com";

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

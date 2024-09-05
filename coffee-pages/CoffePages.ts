import { Locator, Page } from "@playwright/test";

export class MainCoffeePage {
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

export class PaymentDetailsForm {
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

export class PromoBanner {
  readonly bannerDiv: Locator;
  readonly bannerTitle: Locator;
  readonly yesButton: Locator;

  constructor(page: Page) {
    this.bannerDiv = page.locator('[class="promo"]');
    this.bannerTitle = page.locator('[class="promo"] span');
    this.yesButton = page.locator('button[class="yes"]');
  }
}

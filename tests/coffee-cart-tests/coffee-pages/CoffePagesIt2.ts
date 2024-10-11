import { Locator, Page } from "@playwright/test";

export class MainCoffeePage {
  readonly page: Page;
  readonly totalButton: Locator;
  readonly checkoutItem: Locator;
  readonly coffeeCount: Locator;
  readonly cartPageLink: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalButton = page.locator('[data-test="checkout"]');
    this.checkoutItem = page.locator("ul span");
    this.coffeeCount = page.locator("ul span[class=unit-desc]");
    this.cartPageLink = page.locator('a[aria-label="Cart page"]');
    this.successMessage = page.locator('div[class="snackbar success"]');
  }

  async addCupToCart(cupOfCoffee: string) {
    await this.page.locator(`[data-test="${cupOfCoffee}"]`).click();
  }

  async plusCup(coffeeName: string) {
    await this.page
      .locator(`button[aria-label="Add one ${coffeeName}"]`)
      .click();
  }

  async removeCup(coffeeName: string) {
    await this.page
      .locator(`button[aria-label="Remove one ${coffeeName}"]`)
      .click();
  }
}

export class CartPage {
  readonly page: Page;
  readonly itemList: Locator;
  readonly deleteItemButton: Locator;
  readonly emptyStateText: Locator;
  readonly discountedMocha: Locator;
  readonly discountedMochaPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator('[class="list-header"]');
    this.deleteItemButton = page
      .locator("li[class=list-item] button[class=delete]")
      .first();
    this.emptyStateText = page.locator("//p");
    this.discountedMocha = page.locator('//div[text()="(Discounted) Mocha"]');
    this.discountedMochaPrice = page.locator(
      '//div[text()="(Discounted) Mocha"]/following-sibling::div[2]'
    );
  }

  getCartItem(coffeeName: string) {
    return this.page.locator(`//div[text()="${coffeeName}"]`);
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

export class DataTestCoffeeNames {
  readonly espresso: string;
  readonly espressoMacchiato: string;
  readonly cappuccino: string;
  readonly mocha: string;
  readonly flatWhite: string;
  readonly americano: string;
  readonly cafeLatte: string;
  readonly espressoConPanna: string;
  readonly cafeBreve: string;

  constructor() {
    this.espresso = "Espresso";
    this.espressoMacchiato = "Espresso_Macchiato";
    this.cappuccino = "Cappuccino";
    this.mocha = "Mocha";
    this.flatWhite = "Flat_White";
    this.americano = "Americano";
    this.cafeLatte = "Cafe_Latte";
    this.espressoConPanna = "Espresso_Con Panna";
    this.cafeBreve = "Cafe_Breve";
  }
}

export class CoffeeNames {
  readonly espresso: string;
  readonly espressoMacchiato: string;
  readonly cappuccino: string;
  readonly mocha: string;
  readonly flatWhite: string;
  readonly americano: string;
  readonly cafeLatte: string;
  readonly espressoConPanna: string;
  readonly cafeBreve: string;

  constructor() {
    this.espresso = "Espresso";
    this.espressoMacchiato = "Espresso Macchiato";
    this.cappuccino = "Cappuccino";
    this.mocha = "Mocha";
    this.flatWhite = "Flat White";
    this.americano = "Americano";
    this.cafeLatte = "Cafe Latte";
    this.espressoConPanna = "Espresso Con Panna";
    this.cafeBreve = "Cafe Breve";
  }
}

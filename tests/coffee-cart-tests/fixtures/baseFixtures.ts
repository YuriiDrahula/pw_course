import test from "@playwright/test";
import {
  CartPage,
  MainCoffeePage,
  PaymentDetailsForm,
  PromoBanner,
} from "../coffee-pages/CoffePagesIt2";

type CoffeeFixture = {
  mainCoffeePage: MainCoffeePage;
  cartPage: CartPage;
  paymentDetailsForm: PaymentDetailsForm;
  promoBanner: PromoBanner;
};

export const coffeeTest = test.extend<CoffeeFixture>({
  mainCoffeePage: async ({ page }, use) => {
    const mainCoffeePage = new MainCoffeePage(page);
    await use(mainCoffeePage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  paymentDetailsForm: async ({ page }, use) => {
    const paymentDetailsForm = new PaymentDetailsForm(page);
    await use(paymentDetailsForm);
  },

  promoBanner: async ({ page }, use) => {
    const promoBanner = new PromoBanner(page);
    await use(promoBanner);
  },
});

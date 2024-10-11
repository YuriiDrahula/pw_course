import { RegisterPage } from "../pages/RegisterPage2";
import test from "@playwright/test";

type MyFixture = {
  registerPage: RegisterPage;
};

export const signInTest = test.extend<MyFixture>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },
});

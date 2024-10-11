import { test } from "@playwright/test";
import { RegisterPage } from "./pages/RegisterPage2";
import { createRandomUserData } from "./helper";

test.describe("register suite", () => {
  const userData = createRandomUserData();
  test("CD-1: success registration", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.navigateToSignUpPage();
    await registerPage.fillInputFields(userData);
    await registerPage.clickSignUpButton();
    await registerPage.verifyProfileNameAtNavMenu(userData.name);
    await registerPage.clickUserProfileLinkAtNavMenu(userData.name);
    await registerPage.verifyUserProfilelink(userData.name);
  });
});

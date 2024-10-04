import { expect, test } from "@playwright/test";
import { RegisterPage } from "./pages/RegisterPage";

test("CD-1: test registration", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.navigateToSignUpPage();
  await registerPage.fillInputFields();
  await registerPage.clickSignUpButton();

  await expect(registerPage.userProfileLink).toContainText(
    registerPage.newUser.randomName
  );
  await registerPage.clickUserProfileLink();
  await expect(page).toHaveURL(registerPage.expectedProfileUrl);
});

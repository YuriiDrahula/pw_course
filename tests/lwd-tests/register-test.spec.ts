import { expect, test } from "@playwright/test";
import { RegisterPage, newUser } from "./pages/RegisterPage";

test("CD-1 test registration", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const expectedUrl = `https://demo.learnwebdriverio.com/@${newUser.randomName.toLowerCase()}/`;

  await page.goto("https://demo.learnwebdriverio.com/register");
  await registerPage.register();
  await expect(registerPage.userProfileLink).toContainText(
    newUser.randomName.toLowerCase()
  );
  await registerPage.userProfileLink.click();
  await expect(page).toHaveURL(expectedUrl);
});

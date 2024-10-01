import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export const newUser = {
  randomName: faker.person.firstName(),
  randomEmail: faker.internet.email(),
  randomPass: faker.internet.password(),
};

export function RegisterPage(page: Page) {
  this.username = page.locator('input[placeholder="Username"]');
  (this.email = page.locator('input[placeholder="Email"]')),
    (this.password = page.locator('input[placeholder="Password"]'));
  this.signUpButton = page.locator('//button[contains(text(), "Sign up")]');
  this.userProfileLink = page.locator(
    `//a[contains(@href, "/@${newUser.randomName.toLowerCase()}/")]`
  );
}

RegisterPage.prototype.register = async function () {
  await this.username.fill(newUser.randomName);
  await this.email.fill(newUser.randomEmail);
  await this.password.fill(newUser.randomPass);
  await this.signUpButton.click();
};

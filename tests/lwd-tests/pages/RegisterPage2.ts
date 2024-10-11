import { expect, Locator, Page } from "@playwright/test";
import { createRandomUserData } from "../helper";

export class RegisterPage {
  private page: Page;
  private readonly signUpPageUrl: string;
  private readonly username: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpPageUrl = "register";
    this.username = page.locator('input[placeholder="Username"]');
    this.email = page.locator('input[placeholder="Email"]');
    this.password = page.locator('input[placeholder="Password"]');
    this.signUpButton = page.locator(
      'button[class="btn btn-lg btn-primary pull-xs-right"]'
    );
  }

  async navigateToSignUpPage() {
    await this.page.goto(this.signUpPageUrl);
  }

  // приклад опціональних параметрів
  async fillInputFields(userData?: {
    name: string;
    email: string;
    pass: string;
  }) {
    if (!userData) {
      userData = createRandomUserData();
    }

    await this.username.fill(userData.name);
    await this.email.fill(userData.email);
    await this.password.fill(userData.pass);

    return userData;
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async verifyProfileNameAtNavMenu(user: string) {
    await expect(
      this.page.locator(`//a[contains(@href, "/@${user}/")]`)
    ).toContainText(`${user}`);
  }

  async clickUserProfileLinkAtNavMenu(user: string) {
    await this.page.locator(`//a[contains(@href, "/@${user}/")]`).click();
  }

  async verifyUserProfilelink(user: string) {
    await expect(this.page).toHaveURL(`/@${user}/`);
  }
}

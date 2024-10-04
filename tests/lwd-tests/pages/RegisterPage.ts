import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegisterPage {
  private page: Page;
  private readonly signUpPageUrl: string;
  private readonly username: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly signUpButton: Locator;
  public readonly userProfileLink: Locator;
  public readonly expectedProfileUrl: string;

  public readonly newUser = {
    randomName: faker.person.firstName().toLowerCase(),
    randomEmail: faker.internet.email(),
    randomPass: faker.internet.password(),
  };

  constructor(page) {
    this.page = page;
    this.signUpPageUrl = "https://demo.learnwebdriverio.com/register";
    this.username = page.locator('input[placeholder="Username"]');
    this.email = page.locator('input[placeholder="Email"]');
    this.password = page.locator('input[placeholder="Password"]');
    this.signUpButton = page.locator(
      'button[class="btn btn-lg btn-primary pull-xs-right"]'
    );
    this.userProfileLink = page.locator(
      `//a[contains(@href, "/@${this.newUser.randomName}/")]`
    );
    this.expectedProfileUrl = `https://demo.learnwebdriverio.com/@${this.newUser.randomName}/`;
  }

  async navigateToSignUpPage() {
    await this.page.goto(this.signUpPageUrl);
  }

  async fillInputFields() {
    await this.username.fill(this.newUser.randomName);
    await this.email.fill(this.newUser.randomEmail);
    await this.password.fill(this.newUser.randomPass);
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async clickUserProfileLink() {
    await this.userProfileLink.click();
  }
}

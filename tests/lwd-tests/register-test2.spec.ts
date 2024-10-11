import { createRandomUserData } from "./helper";
import { signInTest } from "./fixtures/baseFixtures";

signInTest("CD-1: success registration", async ({ registerPage }) => {
  const userData = createRandomUserData();
  await registerPage.navigateToSignUpPage();
  await registerPage.fillInputFields(userData);
  await registerPage.clickSignUpButton();
  await registerPage.verifyProfileNameAtNavMenu(userData.name);
  await registerPage.clickUserProfileLinkAtNavMenu(userData.name);
  await registerPage.verifyUserProfileLink(userData.name);
});

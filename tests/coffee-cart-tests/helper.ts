import { faker } from "@faker-js/faker";

export function createRandomUserData() {
  return {
    name: faker.person.firstName().toLowerCase(),
    email: faker.internet.email(),
  };
}

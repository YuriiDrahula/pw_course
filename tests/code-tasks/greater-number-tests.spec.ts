import { test, expect } from "@playwright/test";
import { greaterOfTwoNumbers } from "./greater-number";

const greaterNumber: number = 55;
const lowerNumber: number = 23;
const negativeLowerNumber: number = -35;
const negativeGreaterNumber: number = -22;
const invalidInput: string = "invalid input";
const stringAsNumber: string = "234";

test("UT-1: first number is greater than second", async () => {
  expect(greaterOfTwoNumbers(greaterNumber, lowerNumber)).toBe(
    `${greaterNumber} is greater than ${lowerNumber}`
  );
});

test("UT-2: first number is lower than second", async () => {
  expect(greaterOfTwoNumbers(lowerNumber, greaterNumber)).toBe(
    `${lowerNumber} is lower than ${greaterNumber}`
  );
});

test("UT-3: numbers are equal", async () => {
  expect(greaterOfTwoNumbers(greaterNumber, greaterNumber)).toBe(
    `${greaterNumber} is equal ${greaterNumber}`
  );
});

test("UT-4: negative number is lower than negative greater number", async () => {
  expect(greaterOfTwoNumbers(negativeLowerNumber, negativeGreaterNumber)).toBe(
    `${negativeLowerNumber} is lower than ${negativeGreaterNumber}`
  );
});

test("UT-5: negative number is greater than negative greater number", async () => {
  expect(greaterOfTwoNumbers(negativeGreaterNumber, negativeLowerNumber)).toBe(
    `${negativeGreaterNumber} is greater than ${negativeLowerNumber}`
  );
});

test("UT-6: invalid input as first number", async () => {
  expect(greaterOfTwoNumbers(invalidInput, negativeLowerNumber)).toBe(
    "Invalid input, please enter a valid number"
  );
});

test("UT-7: invalid input as second number", async () => {
  expect(greaterOfTwoNumbers(greaterNumber, invalidInput)).toBe(
    "Invalid input, please enter a valid number"
  );
});

test("UT-8: test string as number", async () => {
  expect(greaterOfTwoNumbers(stringAsNumber, negativeLowerNumber)).toBe(
    `${stringAsNumber} is greater than ${negativeLowerNumber}`
  );
});

import { test, expect } from "@playwright/test";
import { oddOrEven } from "./odd-or-even";

const evenNumber: number = 204;
const negativeEvenNumber: number = -8582;
const oddNumber: number = 115;
const negativeOddNumber: number = -2899;
const zero: number = 0;
const stringAsEvenNumber: string = "2102";
const invalidInput: string = "invalid input";

test("UT-1: test even number", async () => {
  expect(oddOrEven(evenNumber)).toBe(`${evenNumber} is an even number`);
});

test("UT-2: test odd number", async () => {
  expect(oddOrEven(oddNumber)).toBe(`${oddNumber} is an odd number`);
});

test("UT-3: test zero", async () => {
  expect(oddOrEven(zero)).toBe(`${zero} is an even number`);
});

test("UT-4: test negative even number", async () => {
  expect(oddOrEven(negativeEvenNumber)).toBe(
    `${negativeEvenNumber} is an even number`
  );
});

test("UT-5: test negative odd number", async () => {
  expect(oddOrEven(negativeOddNumber)).toBe(
    `${negativeOddNumber} is an odd number`
  );
});

test("UT-6: test string as number", async () => {
  expect(oddOrEven(stringAsEvenNumber)).toBe(
    `${stringAsEvenNumber} is an even number`
  );
});

test("UT-7: test invalid input", async () => {
  expect(oddOrEven(invalidInput)).toBe(
    "Invalid input, please enter a valid number"
  );
});

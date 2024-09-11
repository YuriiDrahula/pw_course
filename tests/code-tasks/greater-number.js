export function greaterOfTwoNumbers(number1, number2) {
  if (isNaN(number1) || isNaN(number2)) {
    return "Invalid input, please enter a valid number";
  }

  if (number1 > number2) {
    return `${number1} is greater than ${number2}`;
  } else if (number1 === number2) {
    return `${number1} is equal ${number2}`;
  } else {
    return `${number1} is lower than ${number2}`;
  }
}

export function oddOrEven(number) {
  if (isNaN(number)) {
    return "Invalid input, please enter a valid number";
  }

  if (Math.abs(number % 2) === 1) {
    return `${number} is an odd number`;
  } else {
    return `${number} is an even number`;
  }
}

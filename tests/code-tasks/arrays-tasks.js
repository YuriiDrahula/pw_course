// Task 1

// Array of cities
const cities = [
  "miami",
  "barcelona",
  "madrid",
  "amsterdam",
  "berlin",
  "sao paulo",
  "lisbon",
  "mexico city",
  "paris",
];

const citiesCapitalized = cities.map((city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
});
console.log(citiesCapitalized);

// Task 2
citiesCapitalized.forEach((value, index) => {
  index += 1;
  console.log(`${index}. ${value}`);
});

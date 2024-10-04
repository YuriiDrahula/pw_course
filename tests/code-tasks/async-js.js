// Task 1
function waitForTwoSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 20000);
  });
}

waitForTwoSeconds().then(() => {
  console.log("Пройшло 2 секунди");
});

// Task 2
function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 3 completed");
    }, 1000 * getRandomNumber());
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 2 completed");
    }, 1000 * getRandomNumber());
  });
}

function task3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task 3 completed");
    }, 1000 * getRandomNumber());
  });
}

Promise.all([task1(), task2(), task3()]).then(() => {
  console.log("ALl promises are resolved");
});

// Task 3
async function getUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "John", age: 30 });
    }, 1000);
  });
}

async function fetchData() {
  try {
    const user = await getUserData();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

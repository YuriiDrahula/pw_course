/*
Кожен модуль(файл) який використовує playwright тести, повинні мати import
Імпорти в JavaScript (JS) і TypeScript (TS) — це спосіб включити функціональність з інших модулів (файлів) в ваш код.
Це допомагає організувати проєкт та підтримувати чистоту коду, розділяючи його на менші, самостійні частини.
*/
import { chromium, test, expect } from "@playwright/test";

/* 
hooks (гачок, хук) — це спеціальні функції, які дозволяють виконувати певний код до, після або під час тестів.
Вони дозволяють налаштовувати та керувати середовищем тестування на різних етапах життєвого циклу тестів.
*/
test.beforeAll(async () => {
  console.log(
    "beforeAll: хук виконується один раз перед запуском всіх тестів у файлі. Він часто використовується для налаштування початкового середовища або відкриття браузера."
  );
});

test.beforeEach(async ({ page }) => {
  console.log(
    "beforeEach: Цей хук виконується перед кожним тестом у файлі. Його використовують для налаштування стану перед кожним тестом, наприклад, щоб переконатися, що на початку кожного тесту сторінка знаходиться в певному стані."
  );
});

test.afterEach(async ({ page }) => {
  console.log(
    "afterEach: Цей хук виконується після кожного тесту. Використовується для очищення або відновлення середовища після кожного тесту, наприклад, щоб закрити модальні вікна або видалити тимчасові файли."
  );
});

test.afterAll(async () => {
  console.log(
    "afterAll: Цей хук виконується один раз після завершення всіх тестів у файлі. Зазвичай використовується для закриття браузера або інших фінальних операцій."
  );
});

/*
test.describe - дозволяє групувати тести разом в логічні блоки.
Це може бути корисно для організації тестів, особливо коли ви маєте кілька тестів, що перевіряють різні аспекти одного і того ж функціоналу.
*/
test.describe("this is my first test suit", async () => {
  /*
Кожен тест складаєтсья з
1) відкрита сторінка/  page.goto()
2) знаходження веб елемента за допомогою css або xpath/ page.getBy...()  /page.locator()
3) виконання дії над елементом 
4) перевірка
*/

  /*
| Дія                     | Опис                                                                |
|-------------------------|---------------------------------------------------------------------|
| `locator.check()`       | Позначити чекбокс                                                   |
| `locator.click()`       | Клікнути на елемент                                                 |
| `locator.uncheck()`     | Зняти позначку з чекбокса                                           |
| `locator.hover()`       | Навести мишу на елемент                                             |
| `locator.fill()`        | Заповнити поле форми, ввести текст                                  |
| `locator.focus()`       | Сфокусуватися на елементі                                           |
| `locator.press()`       | Натиснути одну клавішу                                              |
| `locator.setInputFiles()` | Обрати файли для завантаження                                      |
| `locator.selectOption()` | Вибрати опцію в розкривному списку

https://playwright.dev/docs/writing-tests#basic-actions|
*/

  /*
    Не варто включати в назву слова на кшталт "check", "verify", "test",
    якщо вони не додають нової інформації. Наприклад, login With Invalid Credentials краще, ніж check Login With Invalid Credentials.
  */
  test(
    "DOJO-01 create user - it should have email", // додавайте ID до кожного тесту (для цього можете використовувати JIRA ID)
    {
      tag: ["@marketing"], // використовуйте теги, хороший інструмент для сепарації тестів по компонентах
    },
    async () => {
      // тести без фікстури кожен раз повинні створювати браузер, контекст і page (web page)
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
    }
  );

  test(
    "{id} create user - it should have status",
    {
      tag: ["@marketing"],
    },
    async ({ page }) => {
      // page - це  web сторінка або таба в браузері
      await page.getByRole("link", { name: "Get started" }).click();

      /*
       matchers — це функції або методи, які використовуються для перевірки результатів тестів.
       Вони допомагають порівняти очікуваний результат з фактичним значенням і визначити, чи пройшов тест успішно.
       */

      /*
| Matcher        | Опис                                                     | Приклад                                       |
| -------------- | -------------------------------------------------------- | --------------------------------------------- |
| toBeVisible    | Перевіряє, чи елемент видимий на сторінці.               | await expect(element).toBeVisible();          |
| toBeHidden     | Перевіряє, чи елемент прихований.                        | await expect(element).toBeHidden();           |
| toBeEnabled    | Перевіряє, чи є елемент активним (enabled).              | await expect(button).toBeEnabled();           |
| toBeDisabled   | Перевіряє, чи є елемент неактивним (disabled).           | await expect(button).toBeDisabled();          |
| toHaveText     | Перевіряє, чи містить елемент певний текст.              | await expect(element).toHaveText('Expected Text'); |
| toHaveAttribute| Перевіряє, чи має елемент певний атрибут з очікуваним значенням. | await expect(element).toHaveAttribute('href', '/home'); |
| toHaveClass    | Перевіряє, чи має елемент певний клас.                   | await expect(element).toHaveClass('active');  |
| toHaveValue    | Перевіряє, чи має елемент певне значення.                | await expect(input).toHaveValue('input text');|

Документація: https://playwright.dev/docs/test-assertions
*/

      await expect(
        page.getByRole("link", { name: "Get started" })
      ).toBeVisible();

      await expect(
        page.getByRole("link", { name: "Get started" })
      ).toContainText("Вітаю, товар доданий до кошика !");

      await expect(
        page.getByRole("link", { name: "Get started" })
      ).toHaveAttribute("");
    }
  );
});

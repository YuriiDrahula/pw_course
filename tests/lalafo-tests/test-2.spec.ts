import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://lalafo.kg/');
  await page.getByText('Войти•Регистрация').click();
  await page.getByText('Регистрация', { exact: true }).click();
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await expect(page.getByText('Поле не может быть пустым')).toBeVisible();
  await expect(page.getByText('Введите пароль')).toBeVisible();
});

test.describe('This is my first test suite', () => {
  test('test', async ({ page }) => {
    await page.goto('https://lalafo.kg/');
    await page.getByText('Войти•Регистрация').click();
    await page.getByText('Регистрация', { exact: true }).click();
    await page.getByRole('button', { name: 'Регистрация' }).click();
    await expect(page.getByText('Поле не может быть пустым')).toBeVisible();
    await expect(page.getByText('Введите пароль')).toBeVisible();
  });
})
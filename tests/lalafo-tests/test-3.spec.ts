import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://lalafo.kg/');
  await page.frameLocator('iframe[name="google_ads_iframe_33953509\\/New_banner_1600x230_0"]').getByRole('link').waitFor({state: 'visible'});
  // await expect.soft(page.frameLocator('iframe[name="google_ads_iframe_33953509\\/New_banner_1600x230_0"]').getByRole('link')).toBeVisible();
  await page.getByText('Войти').click();
  await page.getByText('Регистрация', { exact: true }).click();
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await expect(page.getByText('Поле не может быть пустым')).toBeVisible();
  await expect(page.getByText('Введите пароль')).toBeVisible();
});
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('login to React Admin Demo and reaches dashboard', async ({ page }) => {
  await login(page);
});

// test('login to React Admin Demo and reaches dashboard', async ({ page }) => {
//   await page.goto('https://marmelab.com/react-admin-demo/#/login');
//   await page.getByRole('textbox', { name: 'Username' }).fill('demo');
//   await page.getByRole('textbox', { name: 'Password' }).fill('demo');
//   await page.getByRole('button', { name: 'Sign in' }).click();
  
//   await expect(page.locator('//p[text()="Dashboard"]')).toBeVisible();
// });

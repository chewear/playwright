import { expect } from '@playwright/test';

async function login(page) {
    await page.goto('https://marmelab.com/react-admin-demo/#/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('demo');
    await page.getByRole('textbox', { name: 'Password' }).fill('demo');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.locator('//p[text()="Dashboard"]')).toBeVisible();
}

export { login };
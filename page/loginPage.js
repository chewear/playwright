import { test, expect } from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async login(baseURL, email, password) {
        console.log(`Logging in to ${baseURL} with email: ${email}`);
        await test.step(`[TEST STEP] Login to ${baseURL} with email: ${email}`, async () => {
            await this.page.goto(baseURL);
            await this.page.getByRole('textbox', { name: 'Username' }).fill(email);
            await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
            await this.page.getByRole('button', { name: 'Sign in' }).click();

            await expect(this.page.locator('//p[text()="Dashboard"]')).toBeVisible();
        });   
    }
}

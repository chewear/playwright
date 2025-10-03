import { test } from '@playwright/test';
import LoginPage from '../page/loginPage';

const baseURL = 'https://marmelab.com/react-admin-demo/#/';

test('login to React Admin Demo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(baseURL, 'demo', 'demo');
});


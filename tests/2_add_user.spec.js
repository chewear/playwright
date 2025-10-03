  import { test, expect } from '@playwright/test';
  import LoginPage from '../page/loginPage';
  import CustomerPage from '../page/customerPage';
  import userData from '../test-data/testData_userData.json';

  const selectors = {
    navCustomers: '(//p[text()="Customers"])[2]',
    createButton: '//a[@aria-label="Create"]',
    customerTable: '//table//tbody//tr',
    form: {
      firstName: '//input[@name="first_name"]',
      lastName: '//input[@name="last_name"]',
      email: '//input[@name="email"]',
      birthday: '//input[@name="birthday"]',
      address: '//textarea[@name="address"]',
      city: '//input[@name="city"]',
      state: '//input[@name="stateAbbr"]',
      zipcode: '//input[@name="zipcode"]',
      password: '//input[@name="password"]',
      confirmPassword: '//input[@name="confirm_password"]',
      submit: '//button[@type="submit"]'
    },
    createdConfirmation: '//div[contains(text(), "Customer created")]',
    requiredFieldError: '//p[text()="Required"]',
    requiredFieldErrorToast: '//div[contains(text(),"The form is not valid. Please check for errors")]'
  };

  const baseURL = 'https://marmelab.com/react-admin-demo/#/';

  test.describe('Customer Creation Tests', () => {
    let loginPage;
    let customerPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      customerPage = new CustomerPage(page);
      await loginPage.login(baseURL, 'demo', 'demo');
      await page.locator(selectors.navCustomers).click();
      await page.locator(selectors.createButton).click();
    });

    test('should create customer with all fields', async ({ page }) => {
      const user = userData.fullUserData;
      
      await test.step(`[TEST STEP] Fill in customer form with all fields for ${user.firstName} ${user.lastName}`, async () => {
        console.log(`Filling in customer form with all fields for ${user.firstName} ${user.lastName}`);
        await page.locator(selectors.form.firstName).fill(user.firstName);
        await page.locator(selectors.form.lastName).fill(user.lastName);
        await page.locator(selectors.form.email).fill(user.email);
        await page.locator(selectors.form.birthday).fill(user.birthday);
        await page.locator(selectors.form.address).fill(user.address);
        await page.locator(selectors.form.city).fill(user.city);
        await page.locator(selectors.form.state).fill(user.state);
        await page.locator(selectors.form.zipcode).fill(user.zipcode);
        await page.locator(selectors.form.password).fill(user.password);
        await page.locator(selectors.form.confirmPassword).fill(user.confirmPassword);
      });

      await test.step(`[TEST STEP] Capture screenshot of full customer form`, async () => {
        const screenshot = await page.screenshot();
        await test.info().attach('full-customer-form', {
          body: screenshot,
          contentType: 'image/png'
        });
      });

      
      await page.locator(selectors.form.submit).click();
      await page.locator(selectors.navCustomers).click();
      await page.locator(selectors.navCustomers).click();
      await customerPage.validateCustomerName(selectors, user);

    });

    test('should create customer with required fields only', async ({ page }) => {
      const user = userData.requiredFieldsOnly;
      
      await page.locator(selectors.form.firstName).fill(user.firstName);
      await page.locator(selectors.form.lastName).fill(user.lastName);
      await page.locator(selectors.form.email).fill(user.email);

      await test.step(`[TEST STEP] Capture screenshot of required fields customer form for ${user.firstName} ${user.lastName}`, async () => {
        console.log(`Capturing screenshot of required fields customer form for ${user.firstName} ${user.lastName}`);
        await test.info().attach('required-customer-form', { body: await page.screenshot(), contentType: 'image/png' });
      });
      
      await page.locator(selectors.form.submit).click();
      await page.locator(selectors.navCustomers).click();
      await page.locator(selectors.navCustomers).click();

      await customerPage.validateCustomerName(selectors, user);

    });

    test('should show validation errors with first name only', async ({ page }) => {
      const user = userData.firstNameOnly;
      
      await page.locator(selectors.form.firstName).fill(user.firstName);

      await page.locator(selectors.form.submit).click();

      await test.step(`[TEST STEP] Capture screenshot of validation errors when only first name is filled`, async () => {
        console.log(`Capturing screenshot of validation errors when only first name is filled`);
        await test.info().attach('validation-errors', { body: await page.screenshot(), contentType: 'image/png' });
      });

      await expect(page.locator(selectors.requiredFieldError).first()).toBeVisible();
      await expect(page.locator(selectors.requiredFieldErrorToast)).toBeVisible();

    });
  });

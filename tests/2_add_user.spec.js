import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

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
  }
};

const dummyUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  birthday: '1990-01-01',
  address: '123 Main Street, Suite 101',
  city: 'New York',
  state: 'NY',
  zipcode: '10001',
  password: 'Password123'
};

test('add a new customer', async ({ page }) => {
  // Login first
  await login(page);
  
  // Navigate to customers and create new customer
  await page.locator(selectors.navCustomers).click();
  await page.locator(selectors.createButton).click();
  
  // Wait for form and fill it
  const form = {
    firstName: page.locator(selectors.form.firstName),
    lastName: page.locator(selectors.form.lastName),
    email: page.locator(selectors.form.email),
    birthday: page.locator(selectors.form.birthday),
    address: page.locator(selectors.form.address),
    city: page.locator(selectors.form.city),
    state: page.locator(selectors.form.state),
    zipcode: page.locator(selectors.form.zipcode),
    password: page.locator(selectors.form.password),
    confirmPassword: page.locator(selectors.form.confirmPassword)
  };

  // Wait for any field to be ready, then fill all fields
  await expect(form.firstName).toBeVisible();
  await form.firstName.fill(dummyUser.firstName);
  await form.lastName.fill(dummyUser.lastName);
  await form.email.fill(dummyUser.email);
  await form.birthday.fill(dummyUser.birthday);
  await form.address.fill(dummyUser.address);
  await form.city.fill(dummyUser.city);
  await form.state.fill(dummyUser.state);
  await form.zipcode.fill(dummyUser.zipcode);
  await form.password.fill(dummyUser.password);
  await form.confirmPassword.fill(dummyUser.password);

  // Submit and verify
  await page.locator(selectors.form.submit).click();
  await expect(page.getByText('Customer created')).toBeVisible();

  // Verify customer was added to the list
  await page.locator(selectors.navCustomers).click();
  await expect(page.locator(`text="${dummyUser.firstName} ${dummyUser.lastName}"`)).toBeVisible();
});

import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

const selectors = {
  navCustomers: '(//p[text()="Customers"])[2]',
  customerTable: '//table//tbody//tr',
  editButton: '//button[@aria-label="Edit"]',
  form: {
    firstName: '//input[@name="first_name"]',
    lastName: '//input[@name="last_name"]',
    email: '//input[@name="email"]',
    birthday: '//input[@name="birthday"]',
    address: '//textarea[@name="address"]',
    city: '//input[@name="city"]',
    state: '//input[@name="stateAbbr"]',
    zipcode: '//input[@name="zipcode"]',
    save: '//button[@type="submit"]'
  }
};

// Updated user data
const updatedUser = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  birthday: '1992-02-02',
  address: '456 Park Avenue, Suite 202',
  city: 'Los Angeles',
  state: 'CA',
  zipcode: '90001'
};

test('edit first customer in the list', async ({ page }) => {
  // Login first
  await login(page);
  
  // Navigate to customers
  await page.locator(selectors.navCustomers).click();
  
  // Store the name of the first user before editing
  const firstRow = page.locator(selectors.customerTable).first();
  await expect(firstRow).toBeVisible();
  const originalName = await firstRow.textContent();
  
  // Click the edit button in the same row as our user
  await page.locator(selectors.editButton).first().click();
  
  // Wait for form and fill it with updated information
  const form = {
    firstName: page.locator(selectors.form.firstName),
    lastName: page.locator(selectors.form.lastName),
    email: page.locator(selectors.form.email),
    birthday: page.locator(selectors.form.birthday),
    address: page.locator(selectors.form.address),
    city: page.locator(selectors.form.city),
    state: page.locator(selectors.form.state),
    zipcode: page.locator(selectors.form.zipcode)
  };

  // Wait for form to be visible and clear/fill all fields
  await expect(form.firstName).toBeVisible();
  await form.firstName.fill(updatedUser.firstName);
  await form.lastName.fill(updatedUser.lastName);
  await form.email.fill(updatedUser.email);
  await form.birthday.fill(updatedUser.birthday);
  await form.address.fill(updatedUser.address);
  await form.city.fill(updatedUser.city);
  await form.state.fill(updatedUser.state);
  await form.zipcode.fill(updatedUser.zipcode);

  // Save the changes
  await page.locator(selectors.form.save).click();

  // Verify success message
  await expect(page.getByText('Customer saved')).toBeVisible();

  // Verify updated customer appears in the list with new name
  await page.locator(selectors.navCustomers).click();
  await expect(page.locator(`text="${updatedUser.firstName} ${updatedUser.lastName}"`)).toBeVisible();

  // Verify old name is not present
  const oldNameStillExists = await page.getByText(originalName.trim()).count();
  expect(oldNameStillExists).toBe(0);
});

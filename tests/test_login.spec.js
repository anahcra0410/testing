import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { testData } from '../utils/config.js';

test.describe('Practice Test Automation - Login flow', () => {
  /** @type {LoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with valid credentials', async ({ page }) => {
    await loginPage.login(
      testData.credentials.valid.username,
      testData.credentials.valid.password
    );

    await loginPage.assertOnSecureArea();
    await expect(page).toHaveURL(testData.urls.secureArea);
  });

  test('Login with invalid username', async ({ page }) => {
    await loginPage.login(
      testData.credentials.invalidUsername.username,
      testData.credentials.invalidUsername.password
    );

    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toBe(testData.messages.invalidUsername);
    await expect(page).toHaveURL(testData.urls.login);
  });

  test('Login with invalid password', async ({ page }) => {
    await loginPage.login(
      testData.credentials.invalidPassword.username,
      testData.credentials.invalidPassword.password
    );

    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toBe(testData.messages.invalidPassword);
    await expect(page).toHaveURL(testData.urls.login);
  });

  test('Login with blank fields', async ({ page }) => {
    await loginPage.login(
      testData.credentials.blank.username,
      testData.credentials.blank.password
    );

    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toBe(testData.messages.invalidUsername);
    await expect(page).toHaveURL(testData.urls.login);
  });

  test('Logout functionality', async ({ page }) => {
    await loginPage.login(
      testData.credentials.valid.username,
      testData.credentials.valid.password
    );
    await loginPage.assertOnSecureArea();

    await loginPage.logout();
    await expect(page).toHaveURL(testData.urls.login);
    await expect(loginPage.usernameInput).toBeVisible();
  });
});


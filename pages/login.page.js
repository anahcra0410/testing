import { expect } from '@playwright/test';
import { testData } from '../utils/config.js';

/**
 * Page Object encapsulating interactions with the Practice Test Automation login page.
 */
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
    this.successMessage = page.getByText(testData.messages.success, { exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.secureAreaHeading = page.getByRole('heading', { name: 'Logged In Successfully' });
  }

  /**
   * Navigate to the login page and ensure the form is visible.
   */
  async goto() {
    await this.page.goto(testData.urls.login);
    await expect(this.usernameInput, 'Username input should be visible on login page load').toBeVisible();
  }

  /**
   * Perform a login attempt using the provided credentials.
   * Empty strings are allowed to validate negative scenarios.
   *
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username ?? '');
    await this.passwordInput.fill(password ?? '');
    await this.loginButton.click();
  }

  /**
   * Log out from the secure area page.
   */
  async logout() {
    await expect(this.logoutLink, 'Logout link should be visible before attempting to click').toBeVisible();
    await this.logoutLink.click();
  }

  /**
   * Return the currently displayed error message text.
   */
  async getErrorMessage() {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent())?.trim();
    }
    return '';
  }

  /**
   * Validate that the secure area page has been reached successfully.
   */
  async assertOnSecureArea() {
    await expect(this.secureAreaHeading, 'Secure area heading should be visible after a successful login').toBeVisible();
    await expect(this.successMessage, 'Success message should match expected text').toBeVisible();
  }
}


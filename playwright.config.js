// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for the QA Automation Assignment project.
 * For more options and documentation, visit: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  retries: 0,
  use: {
    baseURL: 'https://practicetestautomation.com/practice-test-login/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  reporter: [['html', { open: 'never' }]]
});


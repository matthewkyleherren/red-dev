import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/qa',
  timeout: 120000,
  expect: { timeout: 10000 },
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});

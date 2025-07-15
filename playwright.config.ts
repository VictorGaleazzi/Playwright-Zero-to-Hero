// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Onde o Playwright vai procurar pelos seus testes
  // Caminho relativo ao diretório onde o playwright.config.ts está
  testDir: './tests', // OU './pw-practice-app' se você quiser que ele procure em subdiretórios

  // Outras configurações...
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Ou 'list', 'dot', etc.

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // ... outros browsers ou configurações
  ],
});
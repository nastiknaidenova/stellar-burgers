import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots'
  }
});

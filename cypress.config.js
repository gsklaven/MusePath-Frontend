const { defineConfig } = require("cypress");
require('dotenv').config(); 

/**
 * Cypress E2E testing configuration.
 * Base URL loaded from environment variables.
 */
module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL, 

    defaultCommandTimeout: process.env.CI ? 120000 : 25000,
    pageLoadTimeout: 30000,
    requestTimeout: process.env.CI ? 120000 : 5000,
    responseTimeout: process.env.CI ? 120000 : 30000,
    
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
});
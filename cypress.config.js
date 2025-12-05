const { defineConfig } = require("cypress");
require('dotenv').config(); 

/**
 * Cypress E2E testing configuration.
 * Base URL loaded from environment variables.
 */
module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL, 

    defaultCommandTimeout: 60000,
    pageLoadTimeout: 30000,
    
  },
});
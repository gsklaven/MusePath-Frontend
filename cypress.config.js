const { defineConfig } = require("cypress");
require('dotenv').config(); 

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL, 
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
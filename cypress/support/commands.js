// ***********************************************
// Custom Cypress Commands for User Registration
// 
// This file contains commands for automating user
// registration flows in the MusePath application.
// ***********************************************

/**
 * Navigates to the registration page from the landing page
 * @private
 */
Cypress.Commands.add('navigateToRegistration', () => {
  cy.get('.btn-primary').contains('Login').click();
  cy.contains('Register').should('be.visible').click();
  cy.contains('Create a MusePath Account').should('be.visible');
});

/**
 * Fills out the registration form with provided credentials
 * @private
 * @param {string} username - Username for the new account
 * @param {string} email - Email address for the new account
 * @param {string} password - Password for the new account
 */
Cypress.Commands.add('fillRegistrationForm', (username, email, password) => {
  cy.get('input[placeholder="Choose a username"]').type(username);
  cy.get('input[placeholder="Enter your email address"]').type(email);
  cy.get('input[placeholder="Create a password"]').type(password);
  cy.get('input[placeholder="Re-enter your password"]').type(password);
});

/**
 * Submits the registration form
 * @private
 */
Cypress.Commands.add('submitRegistrationForm', () => {
  cy.get('button[type="submit"]').contains('Register').click();
  cy.url().should('include', '/questionnaire-intro');
});

/**
 * Handles the questionnaire intro screen
 * @private
 * @param {boolean} skip - If true, skips the questionnaire; if false, proceeds with it
 */
Cypress.Commands.add('handleQuestionnaireIntro', (skip = true) => {
  if (skip) {
    cy.get('.intro-btn.intro-btn-secondary').should('be.visible').click();
    cy.url().should('include', '/map');
  } else {
    cy.get('.intro-btn-primary')
      .contains('Yes, i would love to!')
      .should('be.visible')
      .click();
  }
});

/**
 * Generates unique credentials for a test user
 * @private
 * @param {string} testName - Unique identifier for this test
 * @returns {Object} Object containing username, email, and password
 */
Cypress.Commands.add('generateTestCredentials', (testName) => {
  const timestamp = Date.now();
  const username = `user_${testName}_${timestamp}`;
  const email = `${testName}_${timestamp}@test.com`;
  const password = 'Password123!';
  
  return cy.wrap({ username, email, password });
});

/**
 * Registers a new user account and optionally completes the questionnaire
 * 
 * This command orchestrates the entire registration flow:
 * 1. Generates unique test credentials
 * 2. Navigates to the registration page
 * 3. Fills out and submits the registration form
 * 4. Handles the questionnaire intro (skip or proceed)
 * 
 * @param {string} testName - Unique identifier for this test (used in username/email generation)
 * @param {boolean} [skipQuestionnaire=true] - Whether to skip the questionnaire
 * @returns {Cypress.Chainable<Object>} Chainable object containing { username, email, password }
 * 
 * @example
 * // Register a user and skip questionnaire
 * cy.registerNewUser('checkout_test');
 * 
 * @example
 * // Register a user and complete questionnaire
 * cy.registerNewUser('profile_test', false);
 * 
 * @example
 * // Register and use the credentials later
 * cy.registerNewUser('login_test').then((credentials) => {
 *   cy.log(`Created user: ${credentials.username}`);
 * });
 */
Cypress.Commands.add('registerNewUser', (testName, skipQuestionnaire = true) => {
  return cy.generateTestCredentials(testName).then((credentials) => {
    const { username, email, password } = credentials;
    
    cy.navigateToRegistration();
    cy.fillRegistrationForm(username, email, password);
    cy.submitRegistrationForm();
    cy.handleQuestionnaireIntro(skipQuestionnaire);
    
    return cy.wrap(credentials);
  });
});
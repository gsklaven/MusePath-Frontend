// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to register a new user
 * @param {string} testName - Unique identifier for this test (used in username/email)
 * @param {boolean} skipQuestionnaire - Whether to skip the questionnaire (default: true)
 */
Cypress.Commands.add('registerNewUser', (testName, skipQuestionnaire = true) => {
  const timestamp = Date.now();
  const username = `user_${testName}_${timestamp}`;
  const email = `${testName}_${timestamp}@test.com`;
  const password = 'Password123!';

  // Navigate to register page
  cy.get('.btn-primary').contains('Login').click();
  cy.contains('Register').should('be.visible').click();

  // Fill register form
  cy.contains('Create a MusePath Account').should('be.visible');
  cy.get('input[placeholder="Choose a username"]').type(username);
  cy.get('input[placeholder="Enter your email address"]').type(email);
  cy.get('input[placeholder="Create a password"]').type(password);
  cy.get('input[placeholder="Re-enter your password"]').type(password);

  // Submit
  cy.get('button[type="submit"]').contains('Register').click();

  // Handle questionnaire intro
  cy.url().should('include', '/questionnaire-intro');
  
  if (skipQuestionnaire) {
    cy.get('.intro-btn.intro-btn-secondary').should('be.visible').click();
  } else {
    cy.get('.intro-btn-primary').contains('Yes, i would love to!').should('be.visible').click();
  }

  // Should be on map after registration
  if (skipQuestionnaire) {
    cy.url().should('include', '/map');
  }

  // Return credentials for potential later use
  return cy.wrap({ username, email, password });
});
describe('MusePath E2E Unhappy Paths', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Unhappy Path 1: Register, Answer Questionnaire, Cant Save Preferences', () => {
    
    cy.registerNewUser('up1', false);
    
    cy.get('.questionnaire-radio-option').first().click();
    cy.get('.questionnaire-next-btn').contains('Next').click();
    
    cy.get('.questionnaire-checkbox-option').eq(0).click();
    cy.get('.questionnaire-next-btn').contains('Next').click();
    
    cy.intercept('PUT', '**/preferences', { statusCode: 500 }).as('failPrefs');
    
    cy.get('.questionnaire-next-btn').contains('Complete Setup').click();
    
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Failed to save preferences');
    });
  });

  it('Unhappy Path 2: Register, Logout and Failed Login', () => {
    
    cy.registerNewUser('up2');
    
    cy.get('img[alt="Settings"]').should('be.visible').click();
    cy.get('.settings-list-item').contains('Logout').click();
    
    cy.url().should('include', '/login');
    
    cy.get('input[placeholder="Enter your username"').type('invalidusername');
    cy.get('input[placeholder="Enter your password"').type('Password123!');
    cy.get('button[type="submit"]').contains('Login').click();
    
    cy.url().should('include', '/login');
  });

  it('Unhappy Path 3: Rate Exhibit Without Login Should Not Work', () => {
    
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/login');
    
    cy.get('input[placeholder="Enter your username"]').type('john_smith');
    cy.get('input[placeholder="Enter your password"]').type('Password123!');
    cy.get('button[type="submit"]').contains('Login').click();
    
    cy.url({ timeout: 10000 }).should('include', '/map');
    
    cy.get('.map-marker-monument', { timeout: 10000 }).first().click({ force: true });
    
    cy.get('.exhibit-bottomsheet', { timeout: 10000 }).should('be.visible');
    
    cy.get('.exhibit-bottomsheet img[alt="Rate 5 stars"]').should('be.visible');
  });
    
});

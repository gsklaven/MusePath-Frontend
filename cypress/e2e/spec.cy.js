describe('MusePath E2E User Flows', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Happy Path 1: Login, Add to Favourites, View in Profile, Remove', () => {
    
    // Verify welcome page
    cy.contains('Welcome!').should('be.visible');
    
    // Login flow
    cy.get('.btn-primary').contains('Login').click();
    
    // Verify login page
    cy.url().should('include', '/login');
    cy.contains('Login to your MusePath account').should('be.visible');
    
    // Fill login form
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click(); 
    
    // Verify login was successful
    cy.url().should('include', '/map');
    
    // Wait for markers to load
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // Interaction on map - click monument
    cy.get('img[alt="Statue B"]').click({ force: true });
    
    // Verify bottom sheet opened
    cy.contains('button', 'More Details', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible');

    cy.intercept('POST', '**/favourites').as('addToFavouritesReq');

    cy.get('img[alt="Add to favourites"]').should('be.visible').click();

    cy.wait('@addToFavouritesReq', { timeout: 60000 }).then((interception) => {
        expect(interception.response.statusCode).to.be.oneOf([200, 201, 204]);
    });

    cy.get('img[alt="Remove from favourites"]').should('be.visible');
    
    // Close bottom sheet
    cy.get('.exhibit-bottomsheet-backdrop').click('topLeft', { force: true });

    // Navigation to settings
    cy.get('img[alt="Settings"]').should('be.visible').click();

    // Verify settings page
    cy.url().should('include', '/settings');
    cy.contains('My Favourites').should('be.visible');
    
    // Navigation to favourites
    cy.get('.settings-list-item').contains('My Favourites').click();
    
    cy.url().should('include', '/favourites');
    cy.contains('My Favourites').should('be.visible');
    
    // Verify favourite exists and remove it
    cy.contains('Add exhibits to favourites').should('be.visible');
    
    // Remove the item
    cy.get('.favourites-list-item').first().within(() => {
      cy.contains('button', 'Remove').click();
    });
    
    // Verify list is empty
    cy.contains('You have not added any favourite yet.').should('be.visible');
  });

  it('Happy Path 2: Login, Navigate to Exhibit, Play Audio Guide, Navigate to Exhibit', () => {

    // Verify welcome page
    cy.contains('Welcome!').should('be.visible');
    
    // Login flow
    cy.get('.btn-primary').contains('Login').click();
    
    // Fill login form
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click(); 
    
    // Verify login was successful
    cy.url().should('include', '/map');
    
    // Wait for markers to load
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // Interaction on map - click monument
    cy.get('.map-marker-monument').first().click({ force: true });

    // Wait for bottom sheet
    cy.get('.exhibit-bottomsheet-description', { timeout: 10000 }).should('be.visible');
    cy.get('.exhibit-bottomsheet-features').should('be.visible');

    // Open audio guide
    cy.contains('button', 'Audio Guide Available', { timeout: 15000 }).should('be.visible').click();
    cy.contains('button', 'More Details', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate', { timeout: 10000 }).should('be.visible').click();

    cy.url({ timeout: 30000 }).should('include', '/navigation');
    cy.contains('h2', 'Map Navigation').should('be.visible');

    cy.get('.muse-location-box').should('be.visible');
    cy.get('.muse-location-box').should('contain', 'Current Location');

    cy.contains('button', 'Start Tracking').should('be.visible').click();
    cy.contains('span', 'Live Location (updating every 5s)').should('be.visible');
    
    cy.contains('button', 'Stop Tracking').should('be.visible').click();
    cy.contains('button', 'Cancel Navigation').should('be.visible').click();

    cy.url().should('include', '/map');
  });

  it('Unhappy Path 3: Register, Answer Questionnaire, Cant Save Preferences', () => {
    
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.btn-primary').contains('Register').should('be.visible').click();
    
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('password123');
    cy.get('button[type="submit"]').contains('Register').click();
    
    cy.get('.intro-btn-primary').contains('Yes, i would love to!').should('be.visible').click();
    
    cy.get('.questionnaire-radio-option').first().click();
    cy.get('.questionnaire-next-btn').contains('Next').click();
    
    cy.get('.questionnaire-checkbox-option').eq(0).click();
    cy.get('.questionnaire-next-btn').contains('Next').click();
    
    // Intercept to force failure
    cy.intercept('PUT', '**/preferences', { statusCode: 500 }).as('failPrefs');
    
    cy.get('.questionnaire-next-btn').contains('Complete Setup').click();
    
    // Verify error alert
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Failed to save preferences');
    });
  });

  it('Happy Path 4: Generate Personalized Route', () => {
    
    // Login
    cy.contains('Welcome!').should('be.visible');
    cy.get('.btn-primary').contains('Login').click();
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click();
    
    // Verify on map
    cy.url().should('include', '/map');
    
    // Click Generate Personalized Route button
    cy.get('.generate-route-btn').should('be.visible').click();
    
    // Verify redirect to personalized route page
    cy.url().should('include', '/personalized-route');
    
    // Wait for route to generate
    cy.contains('Your Personalized Route', { timeout: 30000 }).should('be.visible');
    cy.get('img[alt="Route"]', { timeout: 30000 }).should('be.visible');
    
    // Verify route overview section - wait for backend processing
    cy.contains('.label', 'Estimated Duration:', { timeout: 90000 }).should('be.visible');
    cy.get('.exhibits-list', { timeout: 15000 }).should('be.visible');
    
    // Verify route actions buttons
    cy.contains('button', 'Start Navigation').should('be.visible');
    
    // Test Start Navigation button
    cy.contains('button', 'Start Navigation').click();
    cy.url().should('include', '/navigation');
    cy.contains('Personalized Tour').should('be.visible');
  });

  it('Happy Path 5: Check Settings Options', () => {
    
    cy.contains('Welcome!').should('be.visible');
    cy.get('.btn-primary').contains('Login').click();
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click();
    
    cy.get('img[alt="Settings"]').should('be.visible').click();
    cy.url().should('include', '/settings');
    cy.contains('My Favourites').should('be.visible');
    cy.get('.settings-list-item').contains('Change my Preferences').click();
    cy.url().should('include', '/questionnaire');
  });

  it('Unhappy Path 6: Logout and Failed Login', () => {
    
    cy.contains('Welcome!').should('be.visible');
    cy.get('.btn-primary').contains('Login').click();
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click();
    
    cy.get('img[alt="Settings"]').should('be.visible').click();
    cy.get('.settings-list-item').contains('Logout').click();
    
    cy.url().should('include', '/login');
    cy.get('.btn-primary').contains('Login').click();
    cy.get('input[type="email"]').type('user@example');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains('Login').click();
  });
    
});
describe('MusePath E2E User Flows', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Happy Path 1: Login, Add to Favourites, View in Profile, Remove', () => {
    
    // 0. Verify welcome page
    cy.contains('Welcome!').should('be.visible');
    
    // 1. Login flow
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
    cy.get('.map-marker-monument').should('have.length.greaterThan', 0);

    // 2. Interaction on map - click monument
    cy.get('.map-marker-monument').first().click({ force: true });
    
    // Verify bottom sheet opened with fixed buttons at bottom
    cy.contains('button', 'More Details').should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible');

    // Add to favourites (heart icon in header)
    cy.get('img[alt="Add to favourites"]').should('be.visible').click();
    
    // Verify heart changed to filled
    cy.get('img[alt="Remove from favourites"]').should('be.visible');
    
    // Close bottom sheet by clicking backdrop
    cy.get('.exhibit-bottomsheet-backdrop').click('topLeft');
    
    // Wait for bottom sheet to close
    cy.wait(500);

    // 3. Navigation to settings via gear icon
    cy.get('img[alt="Settings"]').should('be.visible').click();

    // Verify settings page
    cy.url().should('include', '/settings');
    cy.contains('My Favourites').should('be.visible');
    cy.contains('My Ratings').should('be.visible');
    
    // 4. Navigation to favourites
    cy.get('.settings-list-item').contains('My Favourites').click();
    
    cy.url().should('include', '/favourites');
    cy.contains('My Favourites').should('be.visible');
    
    // 5. Verify favourite exists and remove it
    cy.contains('Add exhibits to favourites').should('be.visible');
    
    // Remove the item
    cy.get('.favourites-list-item').first().within(() => {
      cy.contains('button', 'Remove').click();
    });
    
    // Verify list is empty
    cy.contains('You have not added any favourite yet.').should('be.visible');
  });

  it('Happy Path 2: Login, Navigate to Exhibit, Play Audio Guide, Navigate to Exhibit', () => {

    // 0. Verify welcome page
    cy.contains('Welcome!').should('be.visible');
    
    // 1. Login flow
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
    cy.get('.map-marker-monument').should('have.length.greaterThan', 0);

    // 2. Interaction on map - click monument
    cy.get('.map-marker-monument').first().click({ force: true });

    cy.get('.exhibit-bottomsheet-description').should('be.visible');
    cy.get('.exhibit-bottomsheet-features').should('be.visible');

    // Open audio guide
    cy.contains('button', 'Audio Guide Available').should('be.visible').click();
    cy.contains('button', 'More Details').should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible').click();

    cy.url().should('include', '/navigatio');
    cy.contains('h2', 'Map Navigation').should('be.visible');

    cy.get('.muse-location-box').should('be.visible');
    cy.get('.muse-location-box').should('contain', 'Current Location');

    cy.contains('button', 'Start Tracking').should('be.visible').click();
    cy.contains('span', 'Live Location (updating every 5s)').should('be.visible');
    cy.get('.muse-location-coords').should('contain', 'Lat:').and('contain', 'Lng:');

    cy.contains('button', 'Stop Tracking').should('be.visible').click();
    cy.get('.muse-location-box').should('contain', 'Current Location');
    cy.get('.btn-danger').click();

    cy.url().should('include', '/map');
  });

  it('Unhappy Path 3: Register, Answer Questionnaire, Cant Save Preferences', () => {
    
    // Verify welcome page loaded
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Welcome!').should('be.visible');
    cy.contains('Discover the world of culture with MusePath').should('be.visible');
    
    // Navigate to Register from welcome page
    cy.get('.btn-primary').contains('Register').should('be.visible').click();
    
    // Verify register page loaded
    cy.url().should('include', '/register');
    cy.contains('Create a MusePath Account').should('be.visible');
    cy.contains('Join the journey into culture').should('be.visible');
    
    // Fill registration form with proper selectors
    cy.get('input[type="email"]').should('be.visible').type('newuser@example.com');
    cy.get('input[type="password"]').first().should('be.visible').type('password123');
    cy.get('input[type="password"]').last().should('be.visible').type('password123');
    
    // Submit registration
    cy.get('button[type="submit"]').contains('Register').click();
    
    // Verify redirect to questionnaire intro
    cy.url().should('include', '/questionnaire-intro');
    cy.get('.questionnaire-intro-logo img').should('be.visible');
    cy.contains('Help us personalize your museum experience!').should('be.visible');
    
    // Accept questionnaire 
    cy.get('.intro-btn-primary').contains('Yes, i would love to!').should('be.visible').click();
    
    // Verify questionnaire page loaded
    cy.url().should('include', '/questionnaire');
    cy.contains('Personalize Your Experience').should('be.visible');
    
    // Step 1: Select historical period
    cy.contains('Which historical time periods fascinate you the most?').should('be.visible');
    cy.get('.questionnaire-radio-option').first().click();
    cy.get('.questionnaire-radio-option.selected').should('have.length', 1);
    cy.get('.questionnaire-next-btn').contains('Next').should('be.enabled').click();
    
    // Step 2: Select artists/civilizations
    cy.contains('Which artists or civilizations fascinate you?').should('be.visible');
    cy.get('.questionnaire-checkbox-option').eq(0).click();
    cy.get('.questionnaire-checkbox-option').eq(1).click();
    cy.get('.questionnaire-checkbox-option.selected').should('have.length', 2);
    cy.get('.questionnaire-next-btn').contains('Next').should('be.enabled').click();
    
    // Complete questionnaire - this should trigger an error (unhappy path)
    cy.get('.questionnaire-next-btn').contains('Complete Setup').should('be.visible').click();
    
    // Verify error alert appears 
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Failed to save preferences');
    });
    
    cy.wait(1000);
    cy.url().should('include', '/questionnaire');
  });
    
  });
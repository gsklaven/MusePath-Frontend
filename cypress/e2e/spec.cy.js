describe('MusePath E2E User Flows', () => {

  beforeEach(() => {
    // Mock critical backend endpoints to remove flakiness in CI
    cy.intercept('GET', '**/coordinates/**', {
      statusCode: 200,
      body: { lat: 40.7128, lng: -74.006 },
    }).as('getCoords');

    cy.intercept('PUT', '**/coordinates/**', {
      statusCode: 200,
      body: { success: true },
    }).as('updateCoords');

    cy.intercept('POST', '**/users/*/favourites', {
      statusCode: 200,
      body: { success: true },
    }).as('addFavourite');

    cy.intercept('DELETE', '**/users/*/favourites/*', {
      statusCode: 200,
      body: { success: true },
    }).as('removeFavourite');

    cy.intercept('POST', '**/routes', {
      statusCode: 200,
      body: {
        route_id: 123,
        instructions: ['Head north', 'Turn right'],
        distance: 1200,
        estimatedTime: 900,
        arrivalTime: '12:00',
      },
    }).as('createRoute');

    cy.intercept('GET', '**/routes/**', {
      statusCode: 200,
      body: {
        route_id: 123,
        instructions: ['Head north', 'Turn right'],
        distance: 1200,
        estimatedTime: 900,
        arrivalTime: '12:00',
      },
    }).as('getRoute');

    cy.intercept('GET', '**/users/**/routes', {
      statusCode: 200,
      body: {
        route_id: 123,
        instructions: ['Head north', 'Turn right'],
        estimated_duration: '30 mins',
        total_distance: 500,
        exhibits: [1, 2, 3],
      },
    }).as('personalizedRoute');

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
    cy.get('.map-marker-monument').first().click({ force: true });
    
    // Verify bottom sheet opened
    cy.contains('button', 'More Details', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible');

    // Add to favourites
    cy.get('img[alt="Add to favourites"]', { timeout: 10000 }).should('be.visible').click();

    // Wait for mocked favourite call
    cy.wait('@addFavourite');
        
    // Verify heart changed to filled
    cy.get('img[alt="Remove from favourites"]', { timeout: 10000 }).should('be.visible');
    
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

    cy.wait('@removeFavourite');
    
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

    // Navigation should redirect after mocked route creation
    cy.wait(['@createRoute', '@getCoords']);
    cy.url({ timeout: 20000 }).should('include', '/navigation');
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
    
    // Setup intercept for the GET request that happens after navigation
    cy.intercept('GET', '**/routes/personalized/*').as('getPersonalizedRoute');
    
    // Click Generate Personalized Route button
    cy.get('.generate-route-btn', { timeout: 10000 }).should('be.visible').click();
    
    // Verify redirect to personalized route page
    cy.url({ timeout: 10000 }).should('include', '/personalized-route');

    // Wait for mocked personalized route fetch
    cy.wait('@personalizedRoute');
    
    // These elements only appear after route loads successfully
    cy.contains('Your Personalized Route').should('be.visible');
    cy.get('img[alt="Route"]').should('be.visible');
    
    // Verify route overview section - check for the overview container and exhibits list
    cy.get('.route-overview').should('be.visible');
    cy.get('.overview-item').should('have.length.at.least', 2);
    cy.get('.exhibits-list').should('be.visible');
    
    // Verify route actions buttons
    cy.contains('button', 'Start Navigation').should('be.visible');
    
    // Test Start Navigation button
    cy.contains('button', 'Start Navigation').click();
    cy.wait('@getRoute');
    cy.url({ timeout: 20000 }).should('include', '/navigation');
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
describe('MusePath E2E Happy Paths', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.contains('Welcome!').should('be.visible');
  });

  it('Happy Path 1: Register, Add to Favourites, View in Profile, Remove', () => {
    
    cy.registerNewUser('hp1');
    
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.map-marker-monument').first().click({ force: true });
    
    cy.contains('button', 'More Details', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible');

    cy.get('img[alt="Add to favourites"]', { timeout: 10000 }).should('be.visible').click();
    cy.get('img[alt="Remove from favourites"]', { timeout: 10000 }).should('be.visible');
    
    cy.get('.exhibit-bottomsheet-backdrop').click('topLeft', { force: true });
    cy.get('img[alt="Settings"]').should('be.visible').click();

    cy.url().should('include', '/settings');
    cy.contains('My Favourites').should('be.visible');
    
    cy.get('.settings-list-item').contains('My Favourites').click();
    
    cy.url().should('include', '/favourites');
    cy.contains('My Favourites').should('be.visible');
    cy.contains('Add exhibits to favourites').should('be.visible');
    
    cy.get('.favourites-list-item').first().within(() => {
      cy.contains('button', 'Remove').click();
    });
    
    cy.contains('You have not added any favourite yet.').should('be.visible');
  });

  it('Happy Path 2: Register, Navigate to Exhibit, Play Audio Guide, Navigate to Exhibit', () => {

    cy.registerNewUser('hp2');
    
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.map-marker-monument').first().click({ force: true });

    cy.get('.exhibit-bottomsheet-description', { timeout: 10000 }).should('be.visible');
    cy.get('.exhibit-bottomsheet-features').should('be.visible');

    cy.contains('button', 'Audio Guide Available', { timeout: 15000 }).should('be.visible').click();
    cy.contains('button', 'More Details', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate', { timeout: 10000 }).should('be.visible').click();

    cy.url({ timeout: 60000 }).should('include', '/navigation');
    cy.contains('h2', 'Map Navigation').should('be.visible');

    cy.contains('button', 'Start Tracking').should('be.visible').click();
    cy.contains('button', 'Stop Tracking').should('be.visible').click();
    cy.contains('button', 'Cancel Navigation').should('be.visible').click();

    cy.url().should('include', '/map');
  });

  it('Happy Path 3: Generate Personalized Route', () => {
    
    cy.registerNewUser('hp3');
    
    cy.url().should('include', '/map');
    cy.get('.generate-route-btn', { timeout: 10000 }).should('be.visible').click();
    
    cy.url({ timeout: 10000 }).should('include', '/personalized-route');

    cy.contains('Your Personalized Route', { timeout: 30000 }).should('be.visible');
    cy.get('img[alt="Route"]', { timeout: 30000 }).should('be.visible');
    
    cy.get('.route-overview', { timeout: 30000 }).should('be.visible');
    cy.get('.overview-item', { timeout: 30000 }).should('have.length.at.least', 2);
    cy.get('.exhibits-list', { timeout: 30000 }).should('be.visible');
    
    cy.contains('button', 'Start Navigation').should('be.visible');
    cy.contains('button', 'Start Navigation').click();
    cy.url({ timeout: 60000 }).should('include', '/navigation');
    cy.contains('Personalized Tour').should('be.visible');
  });

  it('Happy Path 4: Check Settings Options', () => {
    
    cy.registerNewUser('hp4');
    
    cy.get('img[alt="Settings"]').should('be.visible').click();
    cy.url().should('include', '/settings');
    cy.contains('My Favourites').should('be.visible');
    cy.get('.settings-list-item').contains('Change my Preferences').click();
    cy.url().should('include', '/questionnaire');
  });

  it('Happy Path 5: Rate Exhibit, View in Ratings, Edit Rating, Delete Rating', () => {
    
    cy.registerNewUser('hp5');
    
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.map-marker-monument').first().click({ force: true });
    
    cy.get('.exhibit-bottomsheet', { timeout: 10000 }).should('be.visible');
    cy.get('.exhibit-bottomsheet img[alt="Rate 5 stars"]', { timeout: 10000 }).click({ force: true });
    
    cy.contains('Your rating: 5', { timeout: 5000 }).should('be.visible');
    cy.get('.exhibit-bottomsheet-backdrop').click('topLeft', { force: true });

    cy.get('img[alt="Settings"]').should('be.visible').click();
    cy.url().should('include', '/settings');
    
    cy.get('.settings-list-item').contains('My Ratings').click();
    cy.url().should('include', '/ratings');
    
    cy.get('.ratings-list-item', { timeout: 10000 }).should('have.length.at.least', 1);
    cy.get('.ratings-list-item').first().within(() => {
      cy.contains('★★★★★').should('be.visible');
    });
    
    cy.get('.ratings-list-item').first().within(() => {
      cy.contains('button', 'Edit').click();
    });
    
    cy.get('.ratings-list-item').first().find('span').filter(':contains("★")').eq(2).click();
    cy.get('.ratings-list-item').first().within(() => {
      cy.contains('button', 'Save').click();
    });
    
    cy.get('.ratings-list-item').first().within(() => {
      cy.contains('button', 'Edit').should('be.visible');
    });
    
    cy.get('.ratings-list-item').first().within(() => {
      cy.contains('button', 'Delete').click();
    });
    
    cy.contains('You have not made any rating yet.').should('be.visible');
  });

  it('Happy Path 6: Search for Exhibit and Navigate', () => {
    
    cy.registerNewUser('hp6');
    
    cy.get('.map-marker-monument', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
    cy.get('input[placeholder="Search Exhibit"]', { timeout: 5000 }).should('be.visible').type('starry');
    cy.get('.search-bar-mockup form').submit();
    
    cy.get('.search-bar-mockup').contains('div', 'Starry', { timeout: 10000 }).first().click();
    
    cy.get('.exhibit-bottomsheet', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Navigate').should('be.visible');
  });
    
});

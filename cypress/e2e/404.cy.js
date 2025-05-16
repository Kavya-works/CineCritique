// cypress/e2e/404.cy.js

describe('404 Page', () => {
  beforeEach(() => {
    cy.visit('/non-existent-page', { failOnStatusCode: false });
  });

  it('should display the 404 page', () => {
    cy.get('h1').contains('404');
    cy.get('p').contains('Sorry, the page you\'re looking for cannot be found.');
    cy.get('a').contains('Go to Homepage');
  });
});
// cypress/e2e/search.cy.js

describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/search?query=test');
  });

  it('should display search results', () => {
    cy.intercept('GET', '/api/search?query=test', {
      statusCode: 200,
      body: {
        results: [
          { id: 1, title: 'Test Movie' },
        ],
      },
    }).as('searchRequest');

    cy.get('h1').contains('Search Results for test');
    cy.get('.grid').should('exist');

    cy.get('.grid > div').should('have.length', 12); 
    cy.get('.grid > div').contains('Test');
  });
});
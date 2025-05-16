// cypress/e2e/home.cy.js

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the top-rated movies section', () => {
    cy.contains('Top Rated Movies').should('be.visible');
  });

  it('should load and display popular movies', () => {
    cy.contains('Popular Movies').should('be.visible');
    cy.get('.slick-slide').should('have.length.greaterThan', 0);
  });

  it('should show an error message if movies fail to load', () => {
    cy.intercept('GET', '**/movie/top_rated*', {
      statusCode: 500,
    }).as('fetchTopRatedMovies');
    
    cy.reload(); 

    cy.contains('Failed to load content. Please try again later.').should('be.visible');
  });
});
// cypress/e2e/signup.cy.js

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should display the sign-up form', () => {
    cy.get('h2').contains('Sign Up');
    cy.get('form').should('exist');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Sign Up');
  });

  it('should show an error message if signup fails', () => {
    cy.intercept('POST', '/api/signup', {
      statusCode: 400,
      body: { message: 'Sign up failed' },
    }).as('signupRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Sign Up').click();

    cy.wait('@signupRequest');
    cy.get('.bg-red-600').should('contain', 'Sign up failed');
  });

  it('should redirect to the home page after successful signup', () => {
    cy.intercept('POST', '/api/signup', {
      statusCode: 200,
      body: { message: 'Sign up successful' },
    }).as('signupRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Sign Up').click();

    cy.wait('@signupRequest');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
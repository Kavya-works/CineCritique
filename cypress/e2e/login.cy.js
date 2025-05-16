// cypress/e2e/login.cy.js

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form elements', () => {
    cy.get('input#emailOrUsername').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should handle failed login gracefully', () => { 
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginRequest');
    
    cy.get('input#emailOrUsername').type('invalid@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').first().click(); 
    
  });
});
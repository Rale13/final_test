/// <reference types="Cypress" />

describe ('register test', () => {

  it('visit reqister page', () => {
    cy.visit('https://gallery-app.vivifyideas.com');
    cy.url().should('contain', 'gallery-app');
    cy.get('.nav-link').eq(2).click();
    cy.url().should('contain', '/register');
  })

  it('register without credentials', () => {
    cy.get('button').click();
    cy.url().should('include', '/register');
  })

  it('register with email that does not contain @ sign', () => {
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('rastkogmail.com');
    cy.get('#password').type('Test1234');
    cy.get('#password-confirmation').type('Test1234');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('include', '/register');
    cy.get('#email').should('not.contain', '@');
  })

  it('register with email that does not contain name of the user', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('@gmail.com');
    cy.get('#password').type('Test1234');
    cy.get('#password-confirmation').type('Test1234');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('include', '/register');
  })

  it('register with email that does not contain domain', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('rale@gmail');
    cy.get('#password').type('Test1234');
    cy.get('#password-confirmation').type('Test1234');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('include', '/register');
  })

  it('register with password that is shorter than 8 characters', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('rale@gmail.com');
    cy.get('#password').type('Test123');
    cy.get('#password-confirmation').type('Test123');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('include', '/register');

  })

  it('register with password that does not match password confirmation', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('tralala@gmail.com');
    cy.get('#password').type('Test1234');
    cy.get('#password-confirmation').type('Test123');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.get('#password').should('not.eql', '#password-confirmation');
    cy.url().should('include', '/register');
  })

  it('register with password that does not contain numbers', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('rastko1@gmail.com');
    cy.get('#password').type('TestTest');
    cy.get('#password-confirmation').type('TestTest');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('include', '/register');
    cy.get('#password').should('not.contain', Number);
  })

  it('register with valid credentials', () => {
    cy.reload();
    cy.get('#first-name').type('Rale');
    cy.get('#last-name').type('Kole');
    cy.get('#email').type('Brale@gmail.com');
    cy.get('#password').type('Test1234');
    cy.get('#password-confirmation').type('Test1234');
    cy.get('.form-check-input').click();
    cy.get('button').click();
    cy.url().should('not.contain', '/register');
  })
})




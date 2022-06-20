///<reference types="Cypress" />
import {loginScrum} from '../page_objects/loginScrum'

describe('empty spec', () => {

  it('validLogin', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
    }).as('validLogin')

    cy.visit('/login')
    loginScrum.login(
      Cypress.env('VALID_USER_EMAIL'),
      Cypress.env('VALID_USER_PASS')
    )

    cy.url().should('include', '/my-organizations')
    cy.wait('@validLogin').then(interception => {
      expect(interception.response.statusCode).eq(200);
    })
    loginScrum.sidebar.should('be.visible')
  })
})
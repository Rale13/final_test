///<reference types="Cypress" />
import {loginScrum} from '../page_objects/loginScrum'
import { deleteBoard } from '../page_objects/deleteBoard'

describe('empty spec', () => {

    before('validLogin', () => {

    cy.visit('/login')
    loginScrum.login(
      Cypress.env('VALID_USER_EMAIL'),
      Cypress.env('VALID_USER_PASS')
    )

  })

  it('delete board', () => {
    deleteBoard.delete();
  })

  

})
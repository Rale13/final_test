///<reference types="Cypress" />
import {loginScrum} from '../page_objects/loginScrum'
import {addBoard} from '../page_objects/addBoard'
const faker = require('@faker-js/faker')

describe('empty spec', () => {

    let boardName = faker.random.word()
    let boardId;

    before('validLogin', () => {

    cy.visit('/login')
    loginScrum.login(
      Cypress.env('VALID_USER_EMAIL'),
      Cypress.env('VALID_USER_PASS')
    )
  })

  it('addBoard', () => {

    addBoard.board(boardName);
  })
})
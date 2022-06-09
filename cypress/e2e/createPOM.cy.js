/// <reference types="Cypress" />
import {loginPage} from '../page_objects/loginPage'
import {createPage} from '../page_objects/createPage'

describe('create POM', () => {
    
    const loginCredentials = {
    validEmail: 'rale@gmail.com',
    validPass: 'Test1234'
    }

    const createCredentials = {
        validName: 'Test galerija',
        validDescription: 'Probni opis',
        validImage: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Jungle.jpg'
    }
    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
        cy.url().should('include', '/login');
        loginPage.login(
            loginCredentials.validEmail, 
            loginCredentials.validPass
            );
        cy.url().should('not.include', '/login');
        createPage.createBtn.click();
        cy.url().should('include', '/create');
    })

    it('create gallery', () => {
        createPage.create(
            createCredentials.validName,
            createCredentials.validDescription,
            createCredentials.validImage
        )
        cy.url().should('not.include', '/create');
    })
})
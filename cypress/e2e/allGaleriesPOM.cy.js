/// <reference types="Cypress" />

import {loginPage} from '../page_objects/loginPage'
import {allGalleries} from '../page_objects/allGaleries'

describe('create POM', () => {
    
    const loginCredentials = {
    validEmail: 'rale@gmail.com',
    validPass: 'Test1234'
    }

    let filterText = "Test galerija"

    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
        cy.url().should('include', '/login');
        loginPage.login(
            loginCredentials.validEmail, 
            loginCredentials.validPass
            );
        cy.url().should('not.include', '/login');
        cy.get('.cell').should('have.length', 10);
    })

    it('check pagination', () => {
        allGalleries.pagination;
        cy.get('.cell').should('have.length', 10);
    })

    it('find specific gallery', () => {
        allGalleries.findGallery(filterText);
        cy.get('.cell').should('have.length', 1);
        
    
    })
})